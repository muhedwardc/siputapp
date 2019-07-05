<template>
    <v-layout align-center>
        <v-btn :disabled="fetchingData || generatingDocument" @click="getDocument" class="ma-0 mr-2" color="primary">
            <v-icon left>file_download</v-icon>
            Unduh
        </v-btn>
        <v-btn :disabled="fetchingData || generatingDocument" @click="getDocument('print')" class="ma-0" color="warning">
            <v-icon left>print</v-icon>
            Cetak
        </v-btn>
        <span class="black--text ml-2" v-text="message"></span>
    </v-layout>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import documentGenerator from '@/documents/index.js'

export default {
    props: {
        examId: {
            type: Number | String,
            required: true
        }
    },

    data() {
        return {
            recap: null,
            kadep: null,
            sekretaris: null,
            documentObj: null,
            documentDefinition: null,
            pdf: null,
            fetchingData: false,
            generatingDocument: false
        }
    },

    computed: {
        message() {
            let message = this.fetchingData ? 'Mengambil data ...' : this.generatingDocument ? 'Memproses berkas ...' : null
            return message
        }
    },

    methods: {
        async getDocument(type = 'download') {
            this.fetchingData = true
            try {
                const response = this.$store.state.auth.user.is_admin ? await this.$thessa.getExamDocumentData(this.examId) : await this.$thessa.getExamRecap(this.examId)
                this.recap = response.data
                await this.getManagers()
                this.recap.kadep = this.kadep
                this.recap.sekretaris = this.sekretaris
                this.fetchingData = false
                this.generateDocument(type)
            } catch (error) {
                this.$store.dispatch('showSnackbar', error.message ? error.message : error)
                this.fetchingData = false
            }
        },

        async getManagers() {
            try {
                const response = await this.$thessa.getManagers()
                const data = response.data
                this.kadep = data.find(pengelola => pengelola.jabatan == 'Kepala Departemen')
                this.sekretaris = data.find(pengelola => pengelola.jabatan == 'Sekretaris')
            } catch (error) {
                this.$store.dispatch('showSnackbar', error.message ? error.message : error)
                this.fetchingData = false
            }
        },

        generateDocument(type = 'download') {
            try {
                this.generatingDocument = true
                this.documentObj = documentGenerator(this.recap)
                if (this.documentObj) {
                    if (pdfMake.vfs == undefined) {
                        pdfMake.vfs = pdfFonts.pdfMake.vfs
                    }
        
                    this.docDefinition = { 
                        pageOrientation: 'portrait',
                        content: this.documentObj,
                        defaultStyle: {
                            fontSize: 10,
                            lineHeight: 1
                        },
                        pageSize: 'A4',
                        pageMargins: [ 30, 20, 30, 20 ]
                    }
        
                    let pdf = pdfMake.createPdf(this.docDefinition)
                    if (type == 'print') pdf.print()
                    else pdf.download()
                }
                this.generatingDocument = false
            } catch (error) {
                this.$store.dispatch('showSnackbar', error)
                this.generatingDocument = false
            }
        }
    }
}
</script>

