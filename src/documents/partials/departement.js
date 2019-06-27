const listProdiWithKonsentrasi = [
    {
        pendek: 'TE',
        panjang: 'Teknik Elektro',
        konsentrasi: []
    },
    {
        pendek: 'TI',
        panjang: 'Teknologi Informasi',
        konsentrasi: [
            {
                pendek: 'RPL',
                panjang: 'Rekayasa Perangkat Lunak'
            },
            {
                pendek: 'RSI',
                panjang: 'Rekayasa Sistem Informasi'
            },
            {
                pendek: 'RSK',
                panjang: 'Rekayasa Sistem Komputer'
            },
        ]
    }
]

export default {
    getName: function (prodi, konsentrasi) {
        let result = null
        console.log(listProdiWithKonsentrasi)
        if (prodi) {
            const found = listProdiWithKonsentrasi.find(n => n.pendek == prodi)
            if (found) result = [found.panjang]
            if (found && konsentrasi) {
                const konsentrasiFound = found.konsentrasi.find(k => k.pendek == konsentrasi)
                if (konsentrasiFound) result.push(konsentrasiFound.panjang)
            }
        } 
        return result
    },

    getProdiList: function () {
        return listProdiWithKonsentrasi.map(p => p.pendek)
    },

    getKonsentrasiList: function() {
        return listProdiWithKonsentrasi.map(p => {
            return p.konsentrasi.map(k => k.pendek)
        })
    }
}