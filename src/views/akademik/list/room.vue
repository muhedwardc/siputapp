<template>
    <div>
        <v-layout row flat color="white" align-center>
            <v-toolbar-title>Daftar Ruangan dan Sesi</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Tambah Ruangan</v-btn>
                </template>
                <v-card>
                    <v-card-title class="mb-0 pb-0 pl-4">
                        <span class="headline">Tambah Ruangan</span>
                    </v-card-title>

                    <v-card-text class="pt-2 pb-0">
                        <v-container>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field v-model="editedItem.name" label="Nama Ruangan"></v-text-field>
                                        <span class="caption">Tanpa 'Ruang' contoh: Sidang</span>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="">Simpan</v-btn>
                        <v-btn color="error" @click="">Batal</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false
            }
        }
    }
</script>