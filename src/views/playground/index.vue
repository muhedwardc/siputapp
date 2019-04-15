<template>
    <v-layout column>
        <v-btn class="primary" color="primary" @click="generatePDF()">Download</v-btn>
    </v-layout>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'

export default {
    data() {
        return {
            content: [],
            docData: {
                date: 'SENIN, 12 Mei 2019',
                time: '09.00 WIB',
                room: 'Ruang Sidang',
                mahasiswa: {
                    name: 'Muhammad Edward Chakim',
                    nim: '15/385407/TK/44069',
                    tl: 'Batang',
                    tgl: '4 Juni 1998'
                },
                title: 'Pengembangan aplikasi ujian tugas akhir berbasis OBA',
                dosen: ['Ridi Ferdiana', 'Rudi Hartanto', 'Selo', 'Markus', 'Silmi', 'Teguh Bharata Adji'],
                kadep: {
                    name: 'Sarjiya, S.T., M.T., Ph.D.',
                    nip: '197307061999031005'
                },
                nilai: 98,
            },
            text: [
                'oleh penguji dengan susunan sebagai berikut:',
                'dengan hasil:',
                'NILAI ANGKA (0-100):',
                'Ketua Tim Penguji',
                'Mahasiswa yang diuji',
                'Ketua DTETI\nFakultas Teknik UGM',
                '*). Jika Pembimbing 1 berhalangan hadir, maka Pembimbing 2 bertindak sebagai Ketua Tim Penguji.'
            ],
            headers: [
                [ 
                    { text: 'NO.', alignment: 'center' },
                    { text: 'NAMA', alignment: 'center' },
                    { text: 'JABATAN', alignment: 'center' },
                    { text: 'TANDA TANGAN', alignment: 'center' },
                ]
            ],
            scoreBoard: [
                [
                    { text: 'Skor', fillColor: '#CCCCCC', alignment: 'center' },
                    { text: 'Nilai', fillColor: '#CCCCCC', alignment: 'center' },
                ],
                [ '&#8805 84.6', 'A' ],
                [ '81.6 - 84.5', 'A-' ],
                [ '79.6 - 81.5', 'A/B' ],
                [ '75.6 - 79.5', 'B+' ],
                [ '69.6 - 75.5', 'B' ],
                [ '65.6 - 69.5', 'B-' ],
                [ '59.6 - 65.5', 'B/C' ],
                [ '54.6 - 59.5', 'C' ],
                [ '&#8804 54.5', 'D' ],
            ]
        }
    },

    computed: {
        examResult() {
            let result = []
            if (this.docData.nilai < 54.6 ) {
                result = [
                    { text: 'LULUS', decoration: 'lineThrough' },
                    ' / ',
                    { text: 'TIDAK LULUS' },
                ]
            } else {
                result = [
                    { text: 'LULUS' },
                    ' / ',
                    { text: 'TIDAK LULUS', decoration: 'lineThrough' },
                ]
            }
            return result
        }
    },

    methods: {
        generateContent() {
            this.content = []
            this.content.push(
                {
                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wQPFR46+Ufy7AAADYlJREFUaN6lmv1zleWZxz/3eckr4S28JAGj0EREiiAgStoqrRTwpXZ1625bZ93a6W53d2Z3Zmv/gv7S6Q90+kNfnbYzVp1qddtubQ1TX1q1iIAiKIISEUMggCEBkiBJTnLu/vD9Puc5eVEYeWai5zznfu77ur7X9/pe130/BC71uuX+KW4GIFYDm4HLffMI0A6cHzc0enj7lksyI1ySA3HcDHXAPKAJWADMB44Dr/j31b5/Ajjm304SGCCWzfsxHfp4joyPwmLg08BsYBA4idA/CtQC/+J1HgIGgMuAZjs6DTgNvAi8eynOXNiRKakDEAOEzwPLgOeBA0ABmA60+v504FkUuw12ZB/wDnAWyANXAeuB/cCfPXbydQHnchfpcBVwHdBJJnOEYhEINzkaPwPqgS8YZRB9thvlMd87CHzCDq71vZPAy8BPgXvt0F9sV4ujtw344EIGXqwj84HbgG6KxTNefBXwS8T963zvr4gqhbJn21DktzlqBxyJmTb2S8CrwKPAN4AR4BoDcLkB6LyQgZmLdKQShf7HwHvAfwNdvr8W+AXwEvA+UCCUpq1AeVDrz5AJ2NEeR+3nwBqg2nN+EXiGhQ0PAIcv1sapI7L5WxDGpc8HQI4QRonxBUSpg8BS4ACBs0QgRtj6/fK8mofoAzAXOEYxiu+b708ytB94E7jaYOWADo6eyNq5M0DZnBHav38REUlkVVfe4V8BXE2My41uBPoJYQYh9JU0Y6sXON2XPD/byJ/yZ2DUY528AQj0ATOQ6lUiKV+LcupaJB4ViR9TCVB2khNp+JcC/wwsJDBIoAtYhDh/LfCGn5pF4CAA72zXHNXVoLzaBOy19ZuBbsgM0tqmsa1tycor7MQYypkFBuwt27gcWAcMEEIPQGmOSY5s/hZUV8HoGH7oc8CTKEmHgV4btds0afZvN5WMTQ0LBqLFtMkA1yP57SoZoqvKDr/o/x8CHkGKd84R3YYK6O2eu4tYHOdM6khrW+JEC/B5lMBVwD1GqNHGLAB+h/R/FCgCDcAhYkxyqxm4y1HrtSMZA3QY5UVyrUdKVQXMAR5HUt6GZL0F+BTwth36ItBLCL0QJjiScq4S+ArwlI38KvBHCE8T2AvscTRuBp4GNiLZbQO6CKEfyepdKEl7kVAkidtgMN4y2k2ea5cZ8AdTqwt4AsJuM6DPc+5HqnmrbRlLopKVEyWFWg8EIi8QuAdJ6htlTdWYQz7NefIKcAOwwwb1AXfb2U4kFnUokWf5ezOqD6dt0E4D8RKqR4cMkgqplu4FhrRGfBrC5UgR1da0rEtUK2K0rgWeInAjMEwxvlqifHmLkM88Z6Rno9rRhLraH9ixPJLTy4BP+i9pJEdRb/YdP9OAJHomMETHwWdK67RvSTEuDr+q8WE96qJXmO4QAlknXd65sM3QbwB+TQjnSxNCqjTFiLm+EVXlu2zcWSO7z4Z12NkckuAB0yPj31fYuXZH49fU149MuWbI4SjfZuodt517gWLglvsTOT1i3n0Z+L2NUJEbG4PchNoZgMitqEeqtUMdRrzK+dZIUkyVJ0Xgb6igngXucER6gUcJ4Y/ECT1j+5aJBboFuBN4DFjpSO/O0tr2706gIvBZo3MgNThAZlzdzAMLnRObnQ/b7EAzkupKOxMhrLIjr9n9xUiBrjLv9yGpnovyadCUU460tk3sMvqQ6t2JBKUA3Jilte20kavxAi+j9nsOStB6lNxrzPlNdmIxUqJXHMl5QIHABpT8M23Mr1BPVWca1BD4H4O1xw6M2MhG1IQuQpW8yQDNsn0Gh26D1eDvz2dpbZthA3camb1IVTaaFiN25Erz+X3/jRjRx1ArsRSp03Y7MIpUpdLUywBXmFJHPbbRefOggRlEqnXGFKpHMp2zU+vRFuEM8Bnb3AR05rxIwUbnCQFiPOgFWj3R28DrnniRIzEXbZre8+dGlIy77XST7+VtyJCdGEZb3ff93H4j/AJSvCMGabuNxsjXA38CjtrGvG0uANNyDtuA+VsElNzZ7HHfX2pa9djoDtNuWYkqqthP2snPkm5hu0kFNPq5NTboGo/ZYOf3oOQ9gRSpxmPnetweko5AglB0lAeAWRl7e8qcHIVYntyDRF4xqqts/HJ/Pu6kXIFaiAFHb4Ej02fDL/PfHFPiAFLJUzb6en8fcqRW+vtKAzTdOdef4gGmbt4Az88gnT9F2kbrat+SVNUI/J+jcbNRWmFHQMl5wjSqRcVt2IafQ83gi557julQ69wZQIr3Sc/VjRSxAdWlY8BvS9a3bynfiwwiQTkFzM4gJTjnm9ogJfuKraVqXnQ+nPZCWeC0ZTGHtrhXITHo95wY/Rv897YNqkJ1Y4YjuQsYJZfHEWtELUsGFVftOCcfPpy1zeeAqoyNTLpg8bl845IWqA+QQoGktECMCUdrPM8iRyNnoxagE5MOA3DGdBghPai7AsgyWsiYLtNQ3v6Z4GQvjqX2jN9URa9VTFqHJiSJbeMeSNtyXZlwmGJ8F9WSChsfbGCdUap1VOaivchaj9mB9i49NjbrcUPA5YRQJMYKpE5HgJ2ldAgBbv12Cqq6iis8ZyPQm0FqcC3S7yzqZapKEyjEM4DlFONX7HQFKoCgmnE7as3325BhI77O9HrT9Bry3wI7tAe1KYM2co6jW436t+VeO1O2/a50a5R3pFcBe3Jo87MaJdfDaFPzH+YxRjhntI/YgBVIlv+Geqw7vOBlKEHnOtJ1XgijP2BjF6B8O2HK7vCYqw3cU+b+SkdxFOI5j6n3cw+hHBsDXs+ZHk+g7rce9Vp5G5O1E/WOxGovvN8G1hntF5HyzEA9VbOR7SLdDeZQDk1DiT/kvNnjaNZ6/sN+vhYVzf0GNekWelARvM02PgKMZWlpg8Cwjb8LtQrzPWip/zBF9pXx/0qgh0zoIJJBqnXcwBxCXcES0r4t52e7UY0peI5k77IQbbEPILXa49xbZOo3eq4rgRsdreTQr7QfWeMff2S6NKNe63eO0FmjdQ1SikNeYDGRBlSLRmzQbCO+CNWUHaR1Zr4dWI22tp2m4Hy0H+lHHcI8j5mOmthnzYR/8ty/QS3NBoN8LOcI3AH8xIhmTaMtSMnuNoW2O8xDTsbP+f5qU6vCSLeZEt2mRMFzJnJbjZJ4q3874JxJGtQdHltpYDah4ve4bdpkGwbRMet/AT1JjvSi/r7bKAyaq98gPZ4pE3NGzNUiSuDlKHnH0In62RLPQ7gHmE6Mu+xsDxKY2Ub/Vq93xNFOzo2HnW+vG7SvoePVftt12pTtB0KW1rYzEHdBOGYe3+wFWpAM/56kRUhf7ORRG30aqVbBRs60Ac+YLtVGtwOpWaVn6EDqtNh5UH7S+BrjXy1EtB1oMcgdqDFNFPMZXEeAUPRCu/xQt8O6ozRd+5byliVXhmIilwcd8jp0jDTsCJ1BanPe1DxJepL4LsrDPo/vYVxfNa4t2YGE5zhSw72m/pgMSgar9FfasDHSPcRUV94RyNn5Bhv7DlKrRY7IkO+P2vikG+g3ZQc9bhuS+CUeM9W6Q15v1DZWAoXE/twUg4uoBhxFKnUMwsQeJ4sS+jl/X4I4v8oGnbez9Z6v0uP6UP40kex9VFdOIHW83d+HpjioXm6bkr5unLOpIyOjUJEbQ5K4EnW03xQn4zsTJl2AtD45CWlxqJ9HtDxmpNf6e96OvubfFtqgOaTcf8xzNiNJLr8+YUce8JxdwCjnR6dwpKL08SXgPrRr+y06wnzEBiTPzLDDa5BqPY2KZXmS5ghhDClcgRhnIXVM9vygxL+K9Ch1P+qGK1HO4Oj9I9oT5Q3ygwBUpUfX6af0mP884uEtRrjXqO+zUXNIDxpOETKvQnyfyddMYDFB8mjUO4Ez5HLoPSQY/fdQbiwh3Un2I0G410B1Av+KCqReY2wtbbI+9LXWTtRD3YeS8k3gzrIO9bwj1kG0QTFOVJoqoJC8ydFn58qT35tqo3QYHS0NoBYI4B9QH3YQ1ZG37Mika/Lr6STJdFKxCR0NPYzel2+jonIfIyNikcaMNypN0huABp/QZ4ixxui/BEx+JpkLoK4OBgaWobbpQdTQdhHYWiLvBCCmfs8+3pkvIb4eRa3+XxHFuglhYNIRZ3p9HdhJCIu8k+wA1kH4xZSv0rXWNFKZvgm1RY1ANZnM4yU6TvHOPTulCeNfix1GzdlBlIg1SEXWoVzJI/UqlAwSkg2o6t6NEvb/UV82jRDKXzfXoATeiPq0eSj/auz8dcCjxFj4MCc+PCITI6NKnUPKNYiS8xzaSK3y4idQyyIERceVqEAmbcZu02QYyfJMj+/xb0fswBWoQ2jysw9/lBNwwX8wUGquOtGZVgbVgOvtyMtI/2tQ3zQTCcUhRMM1qKuOwH86er9EtWMuasnbPdeV6OVrrQHrNyD7dXQYP9LSC/9blI3/C9lMIBDLqJ1I5VrSnqmTVJ6X2eGjBB7wc/+Git1RJOXJoWAzomqy5X2b9FAbYgy8NhI5+cOPNPPC/4Qjm1FoxgMyArwBuTdgtMlOLTPi/aj+dAHfJLKQtDf6LqLjEgKLiRRQcXyCGLsnvD4w1CGyqlJxu6SIfNg1sRcKOqOZ4PCNiEbBUUi76eD/TPVi52NcfwfWE3B8kr3h1gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNC0xNVQxOTozMDo1OCswMjowMJL7A68AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDQtMTVUMTk6MzA6NTgrMDI6MDDjprsTAAAAK3RFWHRDb21tZW50AFJlc2l6ZWQgb24gaHR0cHM6Ly9lemdpZi5jb20vcmVzaXplQmmNLQAAABJ0RVh0U29mdHdhcmUAZXpnaWYuY29toMOzWAAAAABJRU5ErkJggg==',
                    fit: [30, 30],
                    alignment: 'center',
                    margin: [0, 0, 0, 2]

                },
                {
                    text: [
                        'DEPARTEMEN TEKNIK ELEKTRO DAN TEKNOLOGI INFORMASI\n',
                        'FAKULTAS TEKNIK UNIVERSITAS GADJAH MADA',
                    ],
                    alignment: 'center'
                },
                {
                    text: 'Jl. Grafika No. 2, Fakultas Teknik UGM, Yogyakarta 55281 telp.(0274) 6492201,6492201 fax. (0274) 552305, http://jteti.ugm.ac.id, email:akademikjteti@gm.ac.id', 
                    fontSize: 9,
                    italics: true,
                    margin: [10, 2, 10, 0],
                    alignment: 'center'
                },
                { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1 } ], margin: [0, 5, 0, 0] },
                { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 0] },
                { text: 'BERITA ACARA PENDADARAN', bold: true, alignment: 'center', margin: [0, 10, 0, 5], fontSize: 11 },
            )

            const { date, time, room } = this.docData
            const p = `Pada hari ini ${date} pukul ${time} bertempat di ${room} Departemen Teknik Elektro dan Teknologi Informasi, Fakultas Teknik UGM telah dilaksanakan ujian skripsi bagi mahasiswa:`
            this.content.push({ text: p })

            const { name, nim, tl, tgl } = this.docData.mahasiswa
            const tabelMahasiswa = {
                table: {
                    widths: [ 100, 15, 'auto' ],
                    body: [
                        [ 'Nama', {text: ':', alignment: 'right'}, name ],
                        [ 'NIM', {text: ':', alignment: 'right'}, nim ],
                        [ 'Tempat, tanggal Lahir', {text: ':', alignment: 'right'}, `${tl.toUpperCase()}, ${tgl}` ],
                        [ 'Judul Skripsi', {text: ':', alignment: 'right'}, '' ],
                    ]
                },
                layout: 'noBorders',
                margin: [70, 0, 0, 0]
            }
            this.content.push(tabelMahasiswa)
            this.content.push({
                text: this.docData.title.toUpperCase(),
                alignment: 'center',
                fontSize: 12,
                margin: [0, 5, 0, 5]
            })
            const { dosen } = this.docData
            const tabelPembimbing = {
                table: {
                    widths: [ 100, 15, 'auto' ],
                    body: [
                        [ 'Pembimbing I', {text: ':', alignment: 'right'}, dosen[0]],
                        [ 'Pembimbing II', {text: ':', alignment: 'right'}, dosen[1] ]
                    ]
                },
                layout: 'noBorders',
                margin: [70, 0, 0, 0]
            }
            this.content.push(tabelPembimbing)
            this.content.push({ text: this.text[0], alignment: 'center', margin: [0, 3, 0, 0] })
            let dosenTabel = [
                this.headers[0]
            ]
            dosen.forEach((dosen, i) => {
                dosenTabel.push([`${i+1}.`, dosen.toUpperCase(), (i == 0 ? 'Ketua Tim *)' : 'Anggota'), `${i+1}.`])
            })
            const tabelPenguji = {
                table: {
                    widths: [ 'auto', '*', 80, 120 ],
                    body: dosenTabel
                },
                margin: [0, 2, 0, 2]
            }
            this.content.push(tabelPenguji)
            this.content.push( {text: this.text[1], margin: [0, 5, 0, 0] })
            const scoreColumns = {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        width: 300,
                        table: {
                            widths: [ '*' ],
                            heights: [ 20, 20 ],
                            body: [
                                [ 
                                    { 
                                        text: [
                                            'NILAI ANGKA (0-100): ', 
                                            { text: `${this.docData.nilai}`, bold: true }
                                        ],
                                        margin: [0, 5, 0, 0]
                                    }
                                ],
                                [ 
                                    {
                                        text: this.examResult,
                                        alignment: 'center',
                                        bold: true,
                                        margin: [0, 5, 0, 0]
                                    }
                                ]
                            ]
                        },
                        margin: [0, 0, 10, 0]
                    },
                    {
                        width: 180,
                        table: {
                            widths: [ '*', 80 ],
                            body: this.scoreBoard,
                        }
                    }
                ]
            }
            this.content.push(scoreColumns)
            const signatures = {
                columns: [
                    {
                        width: '*',
                        text: [
                            this.text[3],
                            '\n\n\n\n',
                            { text: this.docData.dosen[0], bold: true }
                        ]
                    },
                    {
                        width: 'auto',
                        text: [
                            this.text[4],
                            '\n\n\n\n',
                            { text: this.docData.mahasiswa.name, bold: true }
                        ]
                    }
                ],
                margin: [0, 8, 0, 0],
                alignment: 'left'
            }
            this.content.push(signatures)
            const kadepSignature = {
                columns: [
                    [
                        this.text[5],
                        { text: this.docData.kadep.name + '\n' + this.docData.kadep.nip, bold: true, margin: [0, 30, 0, 0] }
                    ]
                ],
                margin: [0, 8, 0, 10],
                alignment: 'center'
            }
            this.content.push(kadepSignature)
            this.content.push(this.text[6])
        },

        generatePDF(type) {
            this.generateContent()
            if (pdfMake.vfs == undefined) {
                pdfMake.vfs = pdfFonts.pdfMake.vfs
            }

            const docDefinition = { 
                content: this.content,
                defaultStyle: {
                    fontSize: 10,
                    lineHeight: 1.1
                },
                pageSize: 'A4',
                pageMargins: [ 20, 20, 20, 20 ]
            }

            pdfMake.createPdf(docDefinition).download('createdPDF.pdf')
        },

        dataURL(url){
            console.log(url)
        }
    }
}
</script>


