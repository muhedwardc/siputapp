<template>
    <div class="full">
        <v-navigation-drawer 
            v-model="drawer" 
            :width="drawerWidth" 
            app
            right
            clipped
            persistent
            mobile-break-point="991" 
            class="correction-section pa-0">
            <v-layout column>
                <!-- <h2 class="mb-2">Lembar Koreksi <v-btn @click="toggleCorrectionSection" v-if="mobileAndShow">sembunyikan</v-btn></h2> -->
                <v-toolbar dark color="primary">
                    <v-toolbar-side-icon @click="toggleCorrectionSection"></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Koreksi</v-toolbar-title>
                </v-toolbar>
                <template class="pa-2">
                    
                </template>
                <v-btn class="primary ma-0 mb-2" @click="creating = true" v-if="!creating">Tambah Koreksi</v-btn>
                <v-layout v-if="creating" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                    <v-form ref="add-correction-form" v-model="valid" lazy-validation></v-form>
                    <v-layout row justify-space-between>
                        <v-select
                            v-model="selectedBab"
                            :items="bab"
                            solo
                            placeholder="Pilih Bab"
                            class="mr-2"></v-select>
                        <v-text-field style="width: 80px; flex-shrink: 0; flex-grow: 0" solo v-model="newCorrection.page" placeholder="hal" type="number" min="0"></v-text-field>
                    </v-layout>
                    <v-textarea rows="3" solo v-model="newCorrection.text" placeholder="Masukkan koreksi"></v-textarea>
                    <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn class="primary ma-0 mb-2" @click="addCorrection(newCorrection.index)">Simpan</v-btn>
                        <v-btn class="primary ma-0 mb-2" @click="resetNewCorrection">Batal</v-btn>
                    </v-layout>
                </v-layout>
                <v-layout column>
                    <v-layout column v-for="(correction, section) in corrections" :key="section">
                        <template v-if="correction.items.length > 0">
                            <h3 class="mb-1" v-text="bab[section]"></h3>
                            <v-layout class="correction-item mb-2 pa-2" column v-for="(item, index) in correction.items" :key="index">
                                <v-layout row align-center>
                                    <span class="font-weight-bold">Halaman {{item.page}}</span>
                                    <!-- <v-btn flat :ripple="false" @click="editcorrection(i, index)">
                                        <v-icon class="warning--text" small>edit</v-icon>
                                        <span class="primary--text ml-1">edit</span>
                                    </v-btn> -->
                                    <v-btn flat :ripple="false" @click="showDialog(section, index)">
                                        <v-icon class="error--text" small>delete</v-icon>
                                        <span class="primary--text ml-1">hapus</span>
                                    </v-btn>
                                </v-layout>
                                <p class="mb-0" v-text="item.text"></p>
                            </v-layout>
                        </template>
                    </v-layout>
                </v-layout>
            </v-layout>
            <v-btn color="primary" class="ma-0" style="float: right">Selanjutnya</v-btn>
        </v-navigation-drawer>
        <v-dialog v-model="dialog.show" persistent max-width="600px">
            <v-card>
                <v-card-title class="title pb-0">Anda ingin menghapus komentar ini?</v-card-title>
                <v-card-text>
                    <h3 v-text="corrections[dialog.section].name"></h3>
                    <span class="font-weight-bold">Halaman {{dialog.page}}</span><br>
                    <p v-text="dialog.text" class="mb-1 mt-1"></p>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-bold" flat @click="closeDialog()">Batal</v-btn>
                <v-btn class="font-weight-bold" color="green darken-1" flat @click="deleteCorrection(dialog.section, dialog.index)">Ya</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-content id="exam-content">
            <iframe src="https://www.otago.ac.nz/library/pdf/Google_searching.pdf" id="exam-content-view"></iframe>
            <v-layout row class="toggle-button">
                <v-btn @click="toggleCorrectionSection()" class="pa-2 flat primary text-capitalize">
                    {{ drawer ? 'Sembunyikan Komentar' : 'Tambah Komentar'}}
                </v-btn>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
export default {
    data() {
        return {
            exam: {},
            drawerWidth: '',
            drawer: true,
            windowWidth: 0,
            dialog: {
                show: false,
                text: '',
                section: 0,
                index: '',
                page: ''
            },
            // newCorrection: null,
            bab: ['ABSTRAK', 'BAB I PENDAHULUAN', 'BAB II DASAR TEORI', 'BAB III METODE PENELITIAN', 'BAB IV HASIL DAN PEMBAHASAN', 'KOMENTAR UMUM/CATATAN'],
            corrections: [],
            newCorrection: {
                text: '',
                page: '',
                index: 0,
                rules: {
                    required: [v => !!v && v.length > 0 || 'Harus diisi'],
                    mustBeNumber: [v => !isNaN(v) && v >= 0 || 'Harus angka'],
                }
            },
            creating: false,
            selectedBab: null,
            valid: true,
            step: 1,
        }
    },

    watch: {
        selectedBab(val) {
            this.newCorrection.index = this.bab.indexOf(val)
        }
    },

    computed: {
        mobileAndShow() {
            return Number(this.windowWidth <= 1000) && this.drawer
        }
    },

    methods: {
        async fetchExam() {
            const exam = await axios.get(`/me/exams/${this.$router.currentRoute.params.id}/`, {
                headers: {
                    'Authorization': this.$store.getters.authToken
                }
            })
            .then(r => r.data)
            .catch(err => {
                this.showSnackbar({
                    message: err.message,
                    type: 'error'
                })
                this.$router.go(-1)
            })

            this.exam = exam
        },

        generateCorrectionsTemplate() {
            this.bab.map(bab => {
                this.corrections.push({
                    items: [],
                    correctionTemp: {
                        index: null,
                        correctionItem: null,
                        page: null,
                        text: null,
                        editing: null,
                    },
                })
            })
        },

        generateExamData() {
            const examData = JSON.parse(localStorage.getItem('exam-data'))
            if (examData && this.$router.currentRoute.params.id == examData.id) {
                this.step = examData.step
                this.corrections = examData.corrections
                this.sortCorrections()
            } else {
                this.updateLocalStorage()
            }
        },

        editCorrection(section, index) {
            this.newCorrection = null
            const { text, page } = this.corrections[section].items[index]
            this.corrections[section].correctionTemp = {
                page,
                text,
                editing: index
            }
        },

        saveChanges(section, index) {
            const correction = this.corrections[section]
            const { text, page } = correction.correctionTemp
            this.corrections[section].items[index] = {
                page,
                text
            }
            this.corrections[section].correctionTemp = {
                page: null,
                text: null,
                editing: null
            }
        },

        discardChanges(section) {
            this.corrections[section].correctionTemp = {
                page: null,
                text: null,
                editing: null
            }
        },

        showDialog(section, index) {
            const { text, page } = this.corrections[section].items[index]
            this.dialog = { show: true, section, index, text,page }
        },

        closeDialog() {
            this.dialog = { show: false, section: 0, index: 0, text: '', page: '' }
        },

        deleteCorrection(section, index) {
            this.corrections[section].items.splice(index, 1)
            this.updateLocalStorage()
            this.closeDialog()
        },

        updateLocalStorage() {
            const examData = {
                id: this.$router.currentRoute.params.id,
                step: this.$router.currentRoute.query.step ? this.$router.currentRoute.query.step : 0,
                corrections: this.corrections
            }
            localStorage.setItem('exam-data', JSON.stringify(examData))
        },

        resetNewCorrection() {
            this.newCorrection = {
                page: '',
                text: '',
                index: 0
            }
            this.creating = false
            this.selectedBab = null
        },

        sortCorrections(section) {
            this.corrections.forEach(correction => correction.items.sort((a, b) => (a.page > b.page) ? 1 : -1)) 
        },

        addCorrection(section) {
            const validInput = this.$refs['add-correction-form'].validate()
            if (validInput) {
                const { page, text } = this.newCorrection
                this.corrections[section].items.push({
                    page,
                    text
                })
                this.corrections[section].items.sort((a, b) => (a.page > b.page) ? 1 : -1)
                this.updateLocalStorage()
                this.resetNewCorrection()
            }
        },

        toggleCorrectionSection() {
            this.drawer = !this.drawer
        },

        getDrawerWidth() {
            this.windowWidth = window.innerWidth
            this.windowWidth > 1000 
                ? this.drawerWidth = this.windowWidth/2 + 'px' 
                : this.windowWidth <= 1000 && this.windowWidth > 425
                ? this.drawerWidth = 90*this.windowWidth/100 + 'px'
                : this.drawerWidth = this.windowWidth + 'px'
        },
    },

    created() {
        if (this.$store.state.auth.token) {
            this.fetchExam()
            this.generateExamData()
            this.generateCorrectionsTemplate()
            this.getDrawerWidth()
            this.windowWidth <= 991 ? this.drawer = false : true
            window.addEventListener('resize', this.getDrawerWidth)
        } else {
            return this.$router.push('/login')
        }
    },

    beforeDestroy: function () {
        window.removeEventListener('resize', this.getDrawerWidth)
    }
}
</script>

<style lang="sass">
    .full
        min-height: 100vh

    #exam-content
        .toggle-button
            position: absolute
            right: 0
            top: 20px
            margin-right: 0
            transform: rotate(-90deg)
            transform-origin: bottom right
        
    #exam-content,
    #exam-content-view
        width: 100%
        height: 100%
        position: relative

    #exam-content-view
        display: block
        height: 100vh
    
    .correction-section
        background-color: white

        .v-text-field--solo
            padding-top: 0 !important

            .v-input__slot
                margin-bottom: 0
                box-shadow: unset !important
                border: 1px solid #c3c3c3
            
            .v-text-field__details
                padding-left: 0
                padding-right: 0

        .v-btn
            text-transform: capitalize

        .correction-item
            background: #f0f0f0
            border-radius: 4px

            .v-btn
                &:before 
                    opacity: 0

                padding: 0
                margin: 0
                text-transform: capitalize
    
        .correction-input       
            border: 1px solid #aaa
            border-radius: 4px
            padding: 4px
            margin-bottom: 4px
</style>