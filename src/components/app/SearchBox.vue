<template>
    <v-layout class="search-box no-message solid-input" align-center>
        <v-text-field
            v-model="search"
            :label="label"
            :disabled="searching"
            single-line
            hide-details
            solo
        ></v-text-field>
        <v-btn class="ma-0" color="primary" @click="onSearch" icon><v-icon>search</v-icon></v-btn>
    </v-layout>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Cari'
        },
    },

    data() {
        return {
            search: '',
            searching: false,
        }
    },

    methods: {
        onSearch() {
            this.$emit('on-search', this.search)
        },
    }
}
</script>

<style>
    .search-box .v-input__control {
        min-height: 36px !important;
    }

    @media screen and (max-width: 500px) {
        .search-box.no-message {
            margin-top: 8px;
        }
    }
</style>

