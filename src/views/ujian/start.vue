<template>
    <div class="full">
        <!-- <v-toolbar class="top-navbar" app flat clipped-right height="48px">
            <app-logo width=30 height=30 class="mr-2"></app-logo>
            <span class="title font-weight-regular pr-2" v-line-clamp="1">{{ exam.ujian ? exam.ujian.skripsi.judul : '' }}</span>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                
            </v-toolbar-items>
        </v-toolbar> -->
        <v-navigation-drawer 
            v-model="drawer" 
            :width="drawerWidth" 
            app
            right
            clipped
            persistent
            mobile-break-point="991" 
            class="comment-section pt-2 pl-4 pr-4 pb-2">
            <v-layout column>
                <h2 class="mb-2">Lembar Koreksi <v-btn @click="toggleCommentSection" v-if="mobileAndShow">sembunyikan</v-btn></h2>
                <v-btn class="primary ma-0 mb-2" @click="creating = true" v-if="!creating">Tambah Koreksi</v-btn>
                <v-layout v-if="creating" column>
                    <v-form ref="add-correction-form" v-model="valid" lazy-validation></v-form>
                    <v-layout row justify-space-between>
                        <v-select
                            v-model="selectedBab"
                            :items="bab"
                            solo
                            placeholder="Pilih Bab"
                            :rules="newCorrection.rules.required"
                            class="mr-2"></v-select>
                        <v-text-field :rules="[...newCorrection.rules.required, ...newCorrection.rules.mustBeNumber]" style="width: 80px; flex-shrink: 0; flex-grow: 0" solo v-model="newCorrection.page" placeholder="hal" type="number" min="0"></v-text-field>
                    </v-layout>
                    <template v-if="selectedBab">
                        <v-textarea :rules="newCorrection.rules.required" rows="3" solo v-model="newCorrection.text" placeholder="Masukkan koreksi"></v-textarea>
                        <v-layout>
                            <v-spacer></v-spacer>
                            <v-btn class="primary ma-0 mb-2" @click="addComment(newCorrection.index)">Simpan</v-btn>
                            <v-btn class="primary ma-0 mb-2" @click="resetNewCorrection">Batal</v-btn>
                        </v-layout>
                    </template>
                </v-layout>
                <v-layout column>
                    <v-layout column v-for="(comment, section) in comments" :key="section">
                        <template v-if="comment.items.length > 0">
                            <h3 class="mb-1" v-text="bab[section]"></h3>
                            <v-layout class="comment-item mb-2 pa-2" column v-for="(item, index) in comment.items" :key="index">
                                <v-layout row align-center>
                                    <span class="font-weight-bold">Halaman {{item.page}}</span>
                                    <!-- <v-btn flat :ripple="false" @click="editComment(i, index)">
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
                <!-- <v-layout class="mb-4" column v-for="(comment, i) in comments" :key="i">
                    <h3 class="mb-1">{{ bab[i] }}</h3>
                    <v-layout column v-for="(item, index) in comment.items" :key="index">
                        <template v-if="comment.commentTemp.editing == index">
                            <input class="comment-input mt-2" placeholder="Halaman" v-model="comment.commentTemp.page"/>
                            <textarea class="comment-input" placeholder="Koreksi anda" v-model="comment.commentTemp.text"></textarea>
                            <v-layout class="mb-2">
                                <v-spacer></v-spacer>
                                <v-btn class="error ma-0" @click="discardChanges(i)">Batal</v-btn>
                                <v-btn class="primary ma-0" @click="saveChanges(i, index)">Simpan</v-btn>
                            </v-layout>
                        </template>
                        <v-layout column v-else class="comment-item mb-2 pa-2">
                            <v-layout row align-center>
                                <span class="font-weight-bold">Halaman {{item.page}}</span>
                                <v-btn flat :ripple="false" @click="editComment(i, index)">
                                    <v-icon class="warning--text" small>edit</v-icon>
                                    <span class="primary--text ml-1">edit</span>
                                </v-btn>
                                <v-btn flat :ripple="false" @click="showDialog(i, index)">
                                    <v-icon class="error--text" small>delete</v-icon>
                                    <span class="primary--text ml-1">hapus</span>
                                </v-btn>
                            </v-layout>
                            <p class="mb-0" v-text="item.text"></p>
                        </v-layout>
                    </v-layout>
                    <template v-if="newComment == i || isNaN(comment.commentTemp.editing)">
                        <input class="comment-input" placeholder="Halaman" v-model="comment.commentTemp.page"/>
                        <textarea class="comment-input" placeholder="Koreksi anda" v-model="comment.commentTemp.text"></textarea>
                        <v-btn class="primary ma-0" @click="addComment(i)">Tambah</v-btn>
                    </template>
                    <v-btn v-else-if="comment.commentTemp.editing == null" class="primary ma-0" @click="addNewComment(i)">Tambah Koreksi</v-btn>
                </v-layout> -->
            </v-layout>
            <v-btn color="primary" class="ma-0" style="float: right">Selanjutnya</v-btn>
        </v-navigation-drawer>
        <v-dialog v-model="dialog.show" persistent max-width="600px">
            <v-card>
                <v-card-title class="title pb-0">Anda ingin menghapus komentar ini?</v-card-title>
                <v-card-text>
                    <h3 v-text="comments[dialog.section].name"></h3>
                    <span class="font-weight-bold">Halaman {{dialog.page}}</span><br>
                    <p v-text="dialog.text" class="mb-1 mt-1"></p>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-bold" flat @click="closeDialog()">Batal</v-btn>
                <v-btn class="font-weight-bold" color="green darken-1" flat @click="deleteComment(dialog.section, dialog.index)">Ya</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-content id="exam-content">
            <iframe src="https://www.otago.ac.nz/library/pdf/Google_searching.pdf" id="exam-content-view"></iframe>
            <v-layout row class="toggle-button">
                <v-btn @click="toggleCommentSection()" class="pa-2 flat primary text-capitalize">
                    {{ drawer ? 'Sembunyikan Komentar' : 'Tambah Komentar'}}
                </v-btn>
                <v-btn @click="toggleCommentSection()" class="pa-2 flat success text-capitalize">
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
            // newComment: null,
            bab: ['ABSTRAK', 'BAB I PENDAHULUAN', 'BAB II DASAR TEORI', 'BAB III METODE PENELITIAN', 'BAB IV HASIL DAN PEMBAHASAN', 'KOMENTAR UMUM/CATATAN'],
            comments: [],
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
            valid: true
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

        generateCommentsTemplate() {
            this.bab.map(bab => {
                this.comments.push({
                    items: [],
                    commentTemp: {
                        index: null,
                        commentItem: null,
                        page: null,
                        text: null,
                        editing: null,
                    },
                })
            })
        },

        generateStoredCorrection() {
            if (this.$router.currentRoute.params.id == localStorage.getItem('exam-id')) {
                const corrections = JSON.parse(localStorage.getItem('exam-corrections'))
                return this.comments = corrections
            } else {
                localStorage.removeItem('exam-id') 
                localStorage.removeItem('exam-corrections')
            }
        },

        addNewComment(i) {
            this.comments.map(comment => {
                comment.commentTemp = {
                    page: null,
                    text: null,
                    editing: null
                }
            })
            this.newComment = i
        },

        editComment(section, index) {
            this.newComment = null
            const { text, page } = this.comments[section].items[index]
            this.comments[section].commentTemp = {
                page,
                text,
                editing: index
            }
        },

        saveChanges(section, index) {
            const comment = this.comments[section]
            const { text, page } = comment.commentTemp
            this.comments[section].items[index] = {
                page,
                text
            }
            this.comments[section].commentTemp = {
                page: null,
                text: null,
                editing: null
            }
        },

        discardChanges(section) {
            this.comments[section].commentTemp = {
                page: null,
                text: null,
                editing: null
            }
        },

        showDialog(section, index) {
            const { text, page } = this.comments[section].items[index]
            this.dialog = { show: true, section, index, text,page }
        },

        closeDialog() {
            this.dialog = { show: false, section: 0, index: 0, text: '', page: '' }
        },

        deleteComment(section, index) {
            this.comments[section].items.splice(index, 1)
            this.updateLocalStorage()
            this.closeDialog()
        },

        updateLocalStorage() {
            localStorage.setItem('exam-id', this.$router.currentRoute.params.id)
            localStorage.setItem('exam-corrections', JSON.stringify(this.comments))
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

        addComment(section) {
            const validInput = this.$refs['add-correction-form'].validate()
            if (validInput) {
                const { page, text } = this.newCorrection
                this.comments[section].items.push({
                    page,
                    text
                })
                this.updateLocalStorage()
                this.resetNewCorrection()
            }
            // const { page, text } = this.comments[section].commentTemp
            // if (page && text && page.trim() && text.trim()) {
            //     this.comments[section].items.push({
            //         text,
            //         page
            //     })
            // }
            // this.comments[section].commentTemp = {
            //     index: null,
            //     commentItem: null,
            //     page: null,
            //     text: null,
            //     editing: null,
            // }
            // this.newComment = null
        },

        toggleCommentSection() {
            this.drawer = !this.drawer
        },

        getDrawerWidth() {
            this.windowWidth = window.innerWidth
            this.windowWidth > 1000 ? this.drawerWidth = this.windowWidth/2 + 'px' : this.drawerWidth = 90*this.windowWidth/100 + 'px'
        },
    },

    created() {
        if (this.$store.state.auth.token) {
            this.fetchExam()
            this.generateStoredCorrection()
            this.generateCommentsTemplate()
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
    
    .comment-section
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

        .comment-item
            background: #f0f0f0
            border-radius: 4px

            .v-btn
                &:before 
                    opacity: 0

                padding: 0
                margin: 0
                text-transform: capitalize
    
        .comment-input       
            border: 1px solid #aaa
            border-radius: 4px
            padding: 4px
            margin-bottom: 4px
</style>