const listProdiWithKonsentrasi = [
    {
        inisial: 'TE',
        nama: 'Teknik Elektro',
        konsentrasi: [
            {
                inisial: 'TTL',
                nama: 'Teknik Tenaga Listrik'
            },
            {
                inisial: 'TPIEB',
                nama: 'Teknik Pengolahan Isyarat, Elektronika, dan Biomedika'
            },
            {
                inisial: 'TIK',
                nama: 'Teknik Instrumentasi Kendali'
            },
            {
                inisial: 'TT',
                nama: 'Teknik Telekomunikasi'
            },
            {
                inisial: 'TK',
                nama: 'Teknik Komputer'
            },
        ]
    },
    {
        inisial: 'TI',
        nama: 'Teknologi Informasi',
        konsentrasi: [
            {
                inisial: 'RPL',
                nama: 'Rekayasa Perangkat Lunak'
            },
            {
                inisial: 'RSI',
                nama: 'Rekayasa Sistem Informasi'
            },
            {
                inisial: 'RSK',
                nama: 'Rekayasa Sistem Komputer'
            },
        ]
    }
]

export default {
    getProdiWithKonsentrasi: function() {
        return listProdiWithKonsentrasi
    },
    getName: function (prodi, konsentrasi) {
        let result = null
        if (prodi) {
            const found = listProdiWithKonsentrasi.find(n => n.inisial == prodi)
            if (found) result = [found.nama]
            if (found && konsentrasi) {
                const konsentrasiFound = found.konsentrasi.find(k => k.inisial == konsentrasi)
                if (konsentrasiFound) result.push(konsentrasiFound.nama)
            }
        } 
        return result
    },
    getProdiList: function () {
        return listProdiWithKonsentrasi.map(prodi => prodi.inisial)
    },
    getKonsentrasiList: function(type = null) {
        if (type) {
            const prodi = listProdiWithKonsentrasi.find(prodi => prodi.nama == type)
            return prodi.konsentrasi.map(k => k.inisial)
        }

        return listProdiWithKonsentrasi.map(prodi => {
            return prodi.konsentrasi.map(k => k.inisial)
        })
    }
}