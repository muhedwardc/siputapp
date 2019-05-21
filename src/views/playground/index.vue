<template>
    <v-layout column>
        <v-btn class="primary" color="primary" :disabled="generating" :loading="generating" @click="generateDocument()">Generate Report</v-btn>
        <span v-if="generating">Generating document ...</span>
        <v-layout column v-show="displayIFrame" id="iframeContainer">
            <iframe id="pdf-file" :src="src" name="pdf-file" frameborder="0"></iframe>
            <v-btn v-if="src" @click="downloadDocument">Download Document</v-btn>
            <v-btn v-if="src" @click="generateDocument('open')">Open Document</v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import doc from './documents/index'
// import beritaAcara from './documents/document-1.js'
// import daftarHadir from './documents/document-2.js'
// import doc3 from './documents/document-3.js'
// import doc4 from './documents/document-4.js'
// import doc5 from './documents/document-5.js'
// import doc6 from './documents/document-6.js'
// import doc7 from './documents/document-7.js'
// import doc8 from './documents/document-8.js'

export default {
    data() {
        return {
            content: [],
            data: {
                hari: 'SENIN',
                tanggal: '12 Mei 2019',
                waktu: '09.00 WIB',
                ruang: 'Ruang Sidang',
                mahasiswa: {
                    nama: 'Muhammad Edward Chakim',
                    nim: '15/385407/TK/44069',
                    tl: 'Batang',
                    tgl: '4 Juni 1998',
                    prodi: 'Teknologi Informasi',
                    konsentrasi: 'Rekayasa Perangkat Lunak'
                },
                judul: 'Pengembangan aplikasi ujian tugas akhir berbasis Outcome Based Assessment Test Dua Baris',
                dosen: ['Ridi Ferdiana', 'Rudi Hartanto', 'Selo', 'Markus', 'Silmi', 'Teguh Bharata Adji'],
                kadep: {
                    nama: 'Sarjiya, S.T., M.T., Ph.D.',
                    nip: '197307061999031005'
                },
                sekretaris: {
                    nama: 'Hanung Adi  Nugroho, S.T., M.E., Ph.D.',
                    nip: '197802242002121001'
                },
                nilai: 98,
            },
            generating: false,
            displayIFrame: false,
            src: '',
            socHeaders: [
                [
                    {text: 'Student Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                    {text: 'Learning Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                    {text: 'Performance Indicator', fillColor: '#CCCCCC', alignment: 'center', colSpan: 4},
                    '', '', '',
                    {text: 'Nilai (0-\n100)', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 2, 0, 0]}
                ],
                [
                    '', '',
                    {text: 'Unsatisfactory (0-49)', fillColor: '#CCCCCC', alignment: 'center'},
                    {text: 'Adequate (50-74)', fillColor: '#CCCCCC', alignment: 'center'},
                    {text: 'Satisfactory (75-84)', fillColor: '#CCCCCC', alignment: 'center'},
                    {text: 'Excellent (85-100)', fillColor: '#CCCCCC', alignment: 'center'},
                    ''
                ],
            ],
            pdfDocGenerator: null
        }
    },

    methods: {
        generateDocument (type) {
            this.generating = true
            this.displayIFrame = true
            this.generatePDF(type)
        },

        generatePDF(type) {
            this.pdfDocGenerator = null
            this.content = doc(this.data, this.socHeaders)
            // console.log(content)
            // const doc1 = beritaAcara(this.data)
            // const doc2 = daftarHadir(this.data)
            // let content = [...doc1, ...doc2, ...doc3(this.data), ...doc4(this.data), ...doc5(this.data), ...doc6(this.data), ...doc7(this.data), ...doc8(this.data)]

            if (pdfMake.vfs == undefined) {
                pdfMake.vfs = pdfFonts.pdfMake.vfs
            }

            const docDefinition = { 
                pageOrientation: 'portrait',
                content: this.content,
                defaultStyle: {
                    fontSize: 10,
                    lineHeight: 1
                },
                pageSize: 'A4',
                pageMargins: [ 20, 20, 20, 20 ]
            }

            this.pdfDocGenerator = pdfMake.createPdf(docDefinition);

            if (type == 'open') {
                this.pdfDocGenerator.open({}, window.frames['pdf-file'])
                this.generating = false
            } 
            this.pdfDocGenerator.getDataUrl((dataUrl) => {
                this.src = dataUrl;
                this.generating = false
            })
        },

        downloadDocument() {
            if (this.src) {
                var a = document.createElement('a');
                a.href = this.src;
                a.target = '_blank';
                a.download = + new Date() + '_rekap-ujian.pdf';
                a.click();
                this.$store.dispatch('showSnackbar', {message: 'Berhasil mengunduh hasil ujian', type: 'success'})
            }
        }
    },

    mounted() {
        this.generateDocument()
    }
}
</script>

<style>
    .full-size {
        width: 100%;
        height: 100%;
    }
</style>


