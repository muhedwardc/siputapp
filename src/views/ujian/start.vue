<template>
    <div class="full">
        <v-toolbar class="top-navbar" app flat clipped-right height="48px">
            <span class="title font-weight-regular pr-2" v-line-clamp="1">Judul Ujian Bro Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, quasi magnam repudiandae dolor obcaecati magni natus cum ea. Illo odio nulla itaque recusandae doloribus enim et provident commodi sequi magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias temporibus eum doloremque earum perspiciatis, sit expedita sed impedit facere, vel reprehenderit sint a amet nihil magnam architecto nemo debitis. In?</span>
            <!-- <v-toolbar-side-icon @click="drawer = !drawer" v-if="!$store.state.onExam.id"></v-toolbar-side-icon> -->
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn @click="toggleCommentSection()" class="pa-2 flat primary text-capitalize">
                    {{ drawer ? 'sembunyikan' : 'perlihatkan'}}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
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
                <h2 class="mb-2">Lembar Koreksi <v-btn @click="toggleCommentSection()" v-if="mobileAndShow">sembunyikan</v-btn></h2>
                <v-btn color="primary" class="ma-0 mb-2" :disabled="commentTemp.editing" @click="newComment()">Tambahkan komentar</v-btn>
                <v-layout column class="comment-input" v-for="(comment, index) in comments" :key="index">
                    <template v-if="comment.editing && commentTemp.index == index">
                        <label for="bab">Nama Bab</label>
                        <input type="text" name="bab" v-model="commentTemp.bab">
                        <label for="halaman">Halaman</label>
                        <input type="number" name="halaman" v-model="commentTemp.page">
                        <label for="komentar">Komentar</label>
                        <textarea name="komentar" v-model="commentTemp.text"></textarea>
                        <v-layout class="mt-2">
                            <v-spacer></v-spacer>
                            <v-btn class="ma-0 pa-0" style="height: auto; width: auto;" color="primary" @click="discardChanges(index)">batal</v-btn>
                            <v-btn class="ma-0 pa-0 ml-2" style="height: auto; width: auto;" color="primary" @click="saveChanges(index)">simpan</v-btn>
                        </v-layout>
                    </template>
                    <template v-else>
                        <v-layout row align-center>
                            <v-layout column>
                                <b>{{ comment.bab }}</b>
                                <b>Halaman {{ comment.page }}</b>
                            </v-layout>
                            <v-spacer></v-spacer>
                            <v-btn class="ma-0 pa-0" style="height: auto; width: auto;" color="warning" @click="editComment(index)">edit</v-btn>
                            <v-btn class="ma-0 pa-0 ml-2" style="height: auto; width: auto;" color="error" @click="comments.splice(index, 1)">delete</v-btn>
                        </v-layout>
                        <p>
                            {{ comment.text }}
                        </p>
                    </template>
                </v-layout>
                <p v-if="comments.length == 0" class="text-xs-center">Belum ada komentar</p>
                <!-- <v-btn color="primary" class="ma-0 mt-2">Generate PDF</v-btn> -->
            </v-layout>
            <v-btn color="primary" class="ma-0" style="float: right">Selanjutnya</v-btn>
        </v-navigation-drawer>
        <v-content id="exam-content">
            <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" id="exam-content-view" width="100%" height="100%"></iframe>
        </v-content>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawerWidth: '',
            drawer: true,
            windowWidth: 0,
            comments: [],
            commentTemp: {
                bab: '',
                page: 0,
                text: '',
                editing: false,
                index: null
            }
        }
    },

    computed: {
        mobileAndShow() {
            return Number(this.windowWidth <= 1000) && this.drawer
        }
    },

    created() {
        this.$store.state.onExam.id = this.$router.currentRoute.params.id
        this.getDrawerWidth()
        this.windowWidth <= 1000 ? this.drawer = false : null
        window.addEventListener('resize', this.getDrawerWidth)
    },

    methods: {
        toggleCommentSection() {
            this.drawer = !this.drawer
        },

        getDrawerWidth() {
            this.windowWidth = window.innerWidth
            this.windowWidth > 1000 ? this.drawerWidth = this.windowWidth/2 + 'px' : this.drawerWidth = 90*this.windowWidth/100 + 'px'
        },

        addComment() {
            this.comments.push()
        },

        discardChanges(index) {
            this.commentTemp = {
                bab: '',
                page: 0,
                text: '',
                editing: false,
                index: null
            }
            if (this.comments[index].bab == null) this.comments.shift()
            else this.comments[index].editing = false
        },

        saveChanges(index) {
            const { bab, page, text } = this.commentTemp
            if (bab.trim() && !isNaN(page) && page >= 0 && text.trim()) {
                this.commentTemp.editing = false
                this.comments[index].bab = this.commentTemp.bab
                this.comments[index].page = this.commentTemp.page
                this.comments[index].text = this.commentTemp.text
                this.comments[index].editing = false
                this.commentTemp = {
                    bab: '',
                    page: 0,
                    text: '',
                    editing: false,
                    index: null
                }
            } else {
                this.$store.dispatch('showSnackbar', {
                    type: 'error',
                    message: 'Ntar dibenerin'
                })
            }
        },

        editComment(index) {
            this.comments[index].editing = true
            const { bab, text, page, editing } = this.comments[index]
            this.commentTemp.bab = bab
            this.commentTemp.text = text
            this.commentTemp.page = page
            this.commentTemp.editing = editing
            this.commentTemp.index = index
        },

        newComment() {
            this.commentTemp.index ? this.comments[this.commentTemp.index].editing = false : null

            this.comments.unshift({
                bab: null,
                page: 0,
                text: '',
                editing: true,
                index: 0
            })

            this.commentTemp.editing = true
            this.commentTemp.index = 0
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
        
    #exam-content,
    #exam-content-view
        width: 100%
        height: 100%
    
    .comment-section
        background-color: white

        .comment-input:not(:last-of-type)
            border-bottom: 1px solid #e5e5e5
    
    .comment-input 
        padding: 16px 0
        
        input, textarea
            border: 1px solid #aaa
            border-radius: 4px
            padding: 4px
            margin-bottom: 4px
</style>