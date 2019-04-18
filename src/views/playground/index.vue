<template>
    <v-layout column>
        <v-btn class="primary" color="primary" @click="generatePDF()">Download</v-btn>
    </v-layout>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import beritaAcara from './documents/document-1.js'
import daftarHadir from './documents/document-2.js'
import doc3 from './documents/document-3.js'
import doc4 from './documents/document-4.js'
import doc5 from './documents/document-5.js'
import doc6 from './documents/document-6.js'

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
        }
    },

    methods: {
        generatePDF(type) {
            const doc1 = beritaAcara(this.data)
            const doc2 = daftarHadir(this.data)
            let content = [...doc1, ...doc2, ...doc3(this.data), ...doc4(this.data), ...doc5(this.data), ...doc6(this.data)]

            if (pdfMake.vfs == undefined) {
                pdfMake.vfs = pdfFonts.pdfMake.vfs
            }

            const docDefinition = { 
                pageOrientation: 'portrait',
                content,
                defaultStyle: {
                    fontSize: 10,
                    lineHeight: 1
                },
                pageSize: 'A4',
                pageMargins: [ 20, 20, 20, 20 ]
            }

            pdfMake.createPdf(docDefinition).open()
        },

        dataURL(url){
            console.log(url)
        }
    }
}
</script>


