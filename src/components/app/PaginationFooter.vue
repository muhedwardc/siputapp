<template>
    <td :colspan="td">
        <v-layout row align-center>
            <v-spacer></v-spacer>
            <span v-text="pageInfo"></span>
            <v-btn :disabled="isFirstPage" @click="page -= 1" flat icon color="primary">
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-btn :disabled="isLastPage" @click="page += 1" flat icon color="primary">
                <v-icon>chevron_right</v-icon>
            </v-btn>
        </v-layout>
    </td>
</template>

<script>
export default {
    props: {
        td: {
            type: Number,
            required: true
        },
        totalItems: {
            type: Number,
            required: true,
            default: 0,
        }
    },

    data() {
        return {
            page: 1,
            rowsPerPage: 10,
        }
    },

    watch: {
        page: function(val) {
            this.$emit('handle-page-change', val)
        }
    },

    computed: {
        pageInfo () {
            const {page, rowsPerPage, totalItems} = this
            const first = (page-1)*rowsPerPage + 1
            const isLastPage = page*rowsPerPage > totalItems
            const last = isLastPage ? totalItems : page*rowsPerPage
            return `${first} - ${last} dari ${totalItems}`
        },
        isLastPage() {
            const {page, rowsPerPage, totalItems} = this
            return page*rowsPerPage >= totalItems
        },
        isFirstPage() {
            return this.page == 1
        },
    }
}
</script>
