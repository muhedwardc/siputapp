(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f44aa1e"],{"28a5":function(e,t,a){"use strict";var i=a("aae3"),s=a("cb7c"),n=a("ebd6"),r=a("0390"),l=a("9def"),o=a("5f1b"),u=a("520a"),c=a("79e5"),d=Math.min,m=[].push,p="split",h="length",v="lastIndex",g=4294967295,f=!c(function(){RegExp(g,"y")});a("214f")("split",2,function(e,t,a,c){var b;return b="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[h]||2!="ab"[p](/(?:ab)*/)[h]||4!="."[p](/(.?)(.?)/)[h]||"."[p](/()()/)[h]>1||""[p](/.?/)[h]?function(e,t){var s=String(this);if(void 0===e&&0===t)return[];if(!i(e))return a.call(s,e,t);var n,r,l,o=[],c=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,p=void 0===t?g:t>>>0,f=new RegExp(e.source,c+"g");while(n=u.call(f,s)){if(r=f[v],r>d&&(o.push(s.slice(d,n.index)),n[h]>1&&n.index<s[h]&&m.apply(o,n.slice(1)),l=n[0][h],d=r,o[h]>=p))break;f[v]===n.index&&f[v]++}return d===s[h]?!l&&f.test("")||o.push(""):o.push(s.slice(d)),o[h]>p?o.slice(0,p):o}:"0"[p](void 0,0)[h]?function(e,t){return void 0===e&&0===t?[]:a.call(this,e,t)}:a,[function(a,i){var s=e(this),n=void 0==a?void 0:a[t];return void 0!==n?n.call(a,s,i):b.call(String(s),a,i)},function(e,t){var i=c(b,e,this,t,b!==a);if(i.done)return i.value;var u=s(e),m=String(this),p=n(u,RegExp),h=u.unicode,v=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(f?"y":"g"),x=new p(f?u:"^(?:"+u.source+")",v),_=void 0===t?g:t>>>0;if(0===_)return[];if(0===m.length)return null===o(x,m)?[m]:[];var k=0,w=0,y=[];while(w<m.length){x.lastIndex=f?w:0;var T,C=o(x,f?m:m.slice(w));if(null===C||(T=d(l(x.lastIndex+(f?0:w)),m.length))===k)w=r(m,w,h);else{if(y.push(m.slice(k,w)),y.length===_)return y;for(var S=1;S<=C.length-1;S++)if(y.push(C[S]),y.length===_)return y;w=k=T}}return y.push(m.slice(k)),y}]})},"2fdb":function(e,t,a){"use strict";var i=a("5ca1"),s=a("d2c8"),n="includes";i(i.P+i.F*a("5147")(n),"String",{includes:function(e){return!!~s(this,e,n).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},4173:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[e.exam&&e.$store.state.auth.token?a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.editDialog,callback:function(t){e.editDialog=t},expression:"editDialog"}},[a("v-card",[a("v-card-title",{staticClass:"title pb-0"},[e._v("Edit "+e._s(e.editTemp.label))]),a("v-card-text",["file"==e.editTemp.type?[a("v-layout",{attrs:{row:"","align-center":"",wrap:""}},[a("v-btn",{staticClass:"ma-0 primary",attrs:{disabled:e.uploadingScript,loading:e.uploadingScript},on:{click:function(t){return e.$refs.pdf.click()}}},[a("v-icon",{attrs:{left:"",dark:""}},[e._v("attach_file")]),e._v("\n                                    pilih naskah\n                                ")],1),a("span",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"pl-2",domProps:{textContent:e._s(this.editTemp.value.name?this.editTemp.value.name:e.naskahFileName)}})],1),a("input",{ref:"pdf",staticStyle:{display:"none"},attrs:{type:"file",readonly:"",solo:"",accept:"application/pdf,application/vnd.ms-excel"},on:{change:e.onFilePicked}})]:e._e(),"text"==e.editTemp.type?a("v-textarea",{attrs:{label:e.editTemp.label,"auto-grow":""},model:{value:e.editTemp.value,callback:function(t){e.$set(e.editTemp,"value",t)},expression:"editTemp.value"}}):e._e(),"date"==e.editTemp.type?a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"nudge-right":40,"return-value":e.editTemp.value,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","min-width":"290px"},on:{"update:returnValue":function(t){return e.$set(e.editTemp,"value",t)},"update:return-value":function(t){return e.$set(e.editTemp,"value",t)}},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on;return[a("v-text-field",e._g({attrs:{label:e.editTemp.label,"prepend-icon":"event",readonly:""},model:{value:e.editTemp.value,callback:function(t){e.$set(e.editTemp,"value",t)},expression:"editTemp.value"}},i))]}}],null,!1,4193303156),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",scrollable:""},model:{value:e.editTemp.value,callback:function(t){e.$set(e.editTemp,"value",t)},expression:"editTemp.value"}},[a("v-spacer"),a("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v("Cancel")]),a("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.editTemp.value)}}},[e._v("OK")])],1)],1):e._e(),"mahasiswa"==e.editTemp.type?a("v-layout",{attrs:{column:""}},[a("v-form",{attrs:{refs:"formMahasiswa"}},[a("v-form",{ref:"form3",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},e._l(e.editTemp.value,function(t,i){return a("div",{key:i,staticClass:"mb-4"},[a("v-layout",{staticClass:"mb-2",attrs:{row:"",wrap:"","align-center":""}},[a("h3",[e._v("Mahasiswa "+e._s(i+1))])]),a("table",{staticClass:"mahasiswa-table"},[a("tr",[a("td",[a("label",[e._v("Nama")])]),a("td",[e._v(":")]),a("td",[a("v-text-field",{attrs:{placeholder:"Nama Mahasiswa",required:"",disabled:e.submitting,rules:e.rules.required},model:{value:e.editTemp.value[i]["nama"],callback:function(t){e.$set(e.editTemp.value[i],"nama",t)},expression:"editTemp.value[index]['nama']"}})],1)]),a("tr",[a("td",[a("label",[e._v("NIM")])]),a("td",[e._v(":")]),a("td",[a("v-text-field",{attrs:{placeholder:"NIM",required:"",disabled:e.submitting,rules:e.rules.required},model:{value:t["nim"],callback:function(a){e.$set(t,"nim",a)},expression:"mahasiswa['nim']"}})],1)]),a("tr",[a("td",[a("label",[e._v("Prodi/Konsentrasi")])]),a("td",[e._v(":")]),a("td",[a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-select",{attrs:{items:e.options[i].prodiOptions,rules:e.rules.required,placeholder:"Prodi",required:"",disabled:e.submitting},on:{change:function(t){return e.navigateKonsentrasi(i)}},model:{value:t["prodi"],callback:function(a){e.$set(t,"prodi",a)},expression:"mahasiswa['prodi']"}}),a("span",{staticClass:"title ml-2 mr-2"},[e._v("/")]),a("v-select",{attrs:{items:e.options[i].konsentrasiOptions[e.options[i].prodiSelected],rules:e.rules.required,placeholder:"Konsentrasi",disabled:!t["prodi"]||e.submitting},model:{value:t["konsentrasi"],callback:function(a){e.$set(t,"konsentrasi",a)},expression:"mahasiswa['konsentrasi']"}})],1)],1)]),a("tr",[a("td",[a("label",[e._v("Tempat/Tanggal Lahir")])]),a("td",[e._v(":")]),a("td",[a("v-layout",{attrs:{"align-center":"",row:"",wrap:""}},[a("v-text-field",{attrs:{placeholder:"Tempat lahir",required:"",rules:e.rules.required,disabled:e.submitting},model:{value:t["tempat_lahir"],callback:function(a){e.$set(t,"tempat_lahir",a)},expression:"mahasiswa['tempat_lahir']"}}),a("span",{staticClass:"title ml-2 mr-2"},[e._v("/")]),a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"",disabled:e.submitting,"min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(i){var s=i.on;return[a("v-text-field",e._g({attrs:{placeholder:"YYYY-MM-DD","prepend-icon":"event",rules:e.rules.required.concat(e.rules.date),disabled:e.submitting},model:{value:t["tanggal_lahir"],callback:function(a){e.$set(t,"tanggal_lahir",a)},expression:"mahasiswa['tanggal_lahir']"}},s))]}}],null,!0),model:{value:e.options[i].dateDialog,callback:function(t){e.$set(e.options[i],"dateDialog",t)},expression:"options[index].dateDialog"}},[a("v-date-picker",{attrs:{disabled:e.submitting},on:{input:function(t){e.tanggal_dialog=!1}},model:{value:t["tanggal_lahir"],callback:function(a){e.$set(t,"tanggal_lahir",a)},expression:"mahasiswa['tanggal_lahir']"}})],1)],1)],1)]),a("tr",[a("td",[a("label",[e._v("No. Telepon")])]),a("td",[e._v(":")]),a("td",[a("v-text-field",{attrs:{placeholder:"Nomor Telepon",required:"",disabled:e.submitting,rules:e.rules.required.concat(e.rules.isNumber)},model:{value:t["telepon"],callback:function(a){e.$set(t,"telepon",a)},expression:"mahasiswa['telepon']"}})],1)])])],1)}),0)],1)],1):e._e(),"radio"==e.editTemp.type?a("v-layout",{attrs:{column:""}},[a("v-radio-group",{attrs:{rules:e.rules.isBool,disabled:e.submitting},model:{value:e.editTemp.value,callback:function(t){e.$set(e.editTemp,"value",t)},expression:"editTemp.value"}},[a("v-radio",{attrs:{value:!1,label:"Individu",color:"primary"}}),a("v-radio",{attrs:{value:!0,label:"Capstone",color:"primary"}})],1)],1):e._e(),"ruang"==e.editTemp.type?a("v-layout",{attrs:{column:""}},[a("v-select",{attrs:{items:e.ruang,"item-value":"id",placeholder:"Ruangan","item-text":"nama",rules:[function(e){return!!e||"Bidang isian harus diisi"}],disabled:e.submitting},model:{value:e.editTemp.value,callback:function(t){e.$set(e.editTemp,"value",t)},expression:"editTemp.value"}})],1):e._e(),"sesi"==e.editTemp.type?a("v-layout",{attrs:{column:""}},[a("v-select",{attrs:{items:e.sesi,"item-value":"id",placeholder:"Sesi","item-text":"mulai",rules:[function(e){return!!e||"Bidang isian harus diisi"}],disabled:e.submitting},scopedSlots:e._u([{key:"selection",fn:function(t){return[e._v("\n                                    "+e._s(t.item.mulai)+" - "+e._s(t.item.selesai)+"\n                                ")]}},{key:"item",fn:function(t){return[e._v("\n                                    "+e._s(t.item.mulai)+" - "+e._s(t.item.selesai)+"\n                                ")]}}],null,!1,1405249660),model:{value:e.editTemp.value,callback:function(t){e.$set(e.editTemp,"value",t)},expression:"editTemp.value"}})],1):e._e(),"dosen"==e.editTemp.type?a("v-layout",{attrs:{column:""}},[a("v-text-field",{staticClass:"pt-0",attrs:{"append-icon":"search",label:"Cari Dosen",disabled:e.submitting,"single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e.dosen?a("v-data-table",{attrs:{headers:[{text:"Nama",align:"left",value:"nama"},{text:"Aksi",align:"left",sortable:!1,value:"selectedType",width:"200px"}],items:e.dosen,search:e.search,"rows-per-page-items":[10],loading:e.loading},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.nama||t.item.email))]),a("td",[e.submitting?e._e():a("v-menu",{attrs:{bottom:"",origin:"center center",transition:"scale-transition"},scopedSlots:e._u([null==t.item.selectedType?{key:"activator",fn:function(t){var i=t.on;return[a("v-btn",e._g({staticClass:"primary",attrs:{small:"",fab:""}},i),[a("v-icon",[e._v("add")])],1)]}}:{key:"activator",fn:function(i){var s=i.on;return[a("v-btn",e._g({attrs:{color:"success"}},s),[e._v("\n                                                    "+e._s(t.item.selectedType)+"\n                                                ")])]}}],null,!0)},[a("v-list",e._l(e.dosenTypes,function(i,s){return a("v-list-tile",{key:s,on:{click:function(a){return e.setType(s,t.item.id)}}},[1===s?a("v-list-tile-title",[a("v-icon",{attrs:{color:"error"}},[e._v("delete")]),a("span",{staticClass:"error--text"},[e._v(e._s(i))])],1):0===s?a("v-list-tile-title",[a("v-layout",{attrs:{"align-center":""}},[e._v("\n                                                            "+e._s(i)+"\n                                                        ")])],1):e._e()],1)}),1)],1)],1)]}},{key:"no-data",fn:function(){return[a("v-layout",{attrs:{"align-center":"","pa-2":"","justify-center":""}},[e._v("\n                                        Tidak ada data yang ditampilkan\n                                    ")])]},proxy:!0}],null,!1,962827215)}):e._e()],1):e._e()],2),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"font-weight-bold primary--text",attrs:{color:"white",disabled:e.submitting},on:{click:e.discard}},[e._v("Batal")]),e.hasChanged?a("v-btn",{staticClass:"font-weight-bold primary",attrs:{loading:e.submitting},on:{click:e.saveEdit}},[e._v("Ya")]):e._e()],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-text",[e._v("\n                    Anda ingin menghapus ujian untuk skripsi: "),a("br"),a("b",[e._v(e._s(e.exam.skripsi.judul))])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:!e.deleting,expression:"!deleting"}],staticClass:"secondary",on:{click:function(t){e.dialogDelete=!1}}},[e._v("\n                            Batal\n                        ")]),a("v-btn",{staticClass:"error",attrs:{loading:e.deleting},on:{click:e.deleteExam}},[e._v("\n                            Hapus\n                        ")])],1)],1)],1),a("v-card",[e.exam?a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-layout",{attrs:{column:""}},[a("h3",{staticClass:"headline font-weight-regular mt-1 text-capitalize"},[e._v("\n                                "+e._s(e.exam.skripsi.judul)+"\n                                "),e.isAdmin?a("span",{staticClass:"edit--text",on:{click:function(t){return e.edit("skripsi.judul","text","Judul Skripsi")}}},[e._v("[EDIT]")]):e._e()])]),a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.agreementDialog,callback:function(t){e.agreementDialog=t},expression:"agreementDialog"}},[a("v-card",{staticClass:"pa-4"},[a("h2",{staticClass:"mb-2"},[e._v("Mulai ujian?")]),a("p",[e._v("Saat ini ujian skripsi belum dimulai. Dengan menekan tombol "),a("b",[e._v("mulai")]),e._v(", Anda akan mengubah status ujian menjadi mulai sehingga semua dosen terkait dapat memasuki ujian dan Anda akan menjadi "),a("b",[e._v("Ketua Sidang")]),e._v("."),a("br"),e._v("Pastikan jumlah dosen yang hadir telah "),a("b",[e._v("memenuhi syarat")]),e._v(" ujian skripsi.")]),a("v-layout",{attrs:{row:""}},[a("v-spacer"),a("v-btn",{attrs:{color:"error",disabled:e.startingExam},on:{click:function(t){e.agreementDialog=!1}}},[e._v("batal")]),a("v-btn",{attrs:{color:"success",loading:e.startingExam},on:{click:e.startExam}},[e._v("mulai")])],1)],1)],1),e.isAdmin||2!=e.exam.status?e._e():a("v-btn",{staticClass:"ma-0 mt-2",attrs:{depressed:"",color:"primary"},on:{click:function(t){return e.joinExam(e.examId)}}},[a("v-icon",{attrs:{left:""}},[e._v("send")]),e._v("Masuk Ujian")],1),!e.isAdmin&&e.pembimbing&&1==e.exam.status?a("v-btn",{staticClass:"ma-0 mt-2",attrs:{depressed:"",color:"primary",loading:e.checkingStatus},on:{click:function(t){return e.checkExamStatus(e.examId)}}},[a("v-icon",{attrs:{left:""}},[e._v("send")]),e._v("Mulai Ujian")],1):e._e(),e.isAdmin||e.pembimbing||1!=e.exam.status?e._e():a("v-btn",{staticClass:"ma-0 mt-2",attrs:{depressed:"",color:"primary"},on:{click:function(t){return e.joinExam(e.examId)}}},[a("v-icon",{attrs:{left:""}},[e._v("send")]),e._v("Masuk Ujian")],1),e.isAdmin||3!=e.exam.status?e._e():a("v-btn",{staticClass:"ma-0 mt-2",attrs:{depressed:"",color:"success"}},[a("v-icon",{attrs:{left:""}},[e._v("check_circle")]),e._v("Ujian Selesai")],1),e.isAdmin?a("v-btn",{staticClass:"ma-0 mt-2",attrs:{depressed:"",color:"error"},on:{click:function(t){e.dialogDelete=!0}}},[a("v-icon",{attrs:{left:""}},[e._v("delete")]),e._v("hapus ujian")],1):e._e()],1),a("span",{staticClass:"subheading"},[e._v("Tipe: "+e._s(e.exam.skripsi.is_capstone?"Captsone":"Individu"))]),a("v-layout",{staticClass:"mt-2",attrs:{column:""}},[a("span",{staticClass:"font-weight-bold"},[e._v("Naskah Skripsi")]),a("v-layout",{staticClass:"mt-2",attrs:{"align-center":""}},[a("v-icon",{attrs:{flat:""}},[e._v("file_copy")]),a("span",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"ml-2",domProps:{textContent:e._s(e.naskahFileName)}}),e.isAdmin?a("v-btn",{staticClass:"text-capitalize default ma-0 ml-2",staticStyle:{"box-shadow":"none","border-radius":"8px"},on:{click:function(t){return e.edit("skripsi.naskah","file","Naskah")}}},[a("v-icon",{attrs:{left:""}},[e._v("attachment")]),e._v("unggah ulang")],1):e._e(),a("v-btn",{staticClass:"ma-0 ml-2 text-capitalize",staticStyle:{"box-shadow":"none","border-radius":"8px"},attrs:{color:"primary"},on:{click:e.openNaskah}},[a("v-icon",{attrs:{left:"",small:""}},[e._v("open_in_new")]),e._v("lihat naskah")],1)],1)],1),a("hr"),a("v-layout",{attrs:{column:""}},[a("span",{staticClass:"font-weight-bold"},[e._v("Berkas Hasil Ujian "),3==e.exam.status?[a("v-icon",{attrs:{small:"",color:"success"}},[e._v("check_circle")]),a("span",{staticClass:"ma-0 font-weight-regular"},[e._v("Ujian sudah selesai")])]:[a("v-icon",{attrs:{small:"",color:"warning"}},[e._v("error")]),a("span",{staticClass:"ma-0 font-weight-regular"},[e._v("Ujian belum selesai")])]],2),3==e.exam.status?a("app-exam-result",{staticClass:"mt-2",attrs:{examId:e.examId}}):e._e()],1),a("hr"),a("v-layout",{attrs:{column:"","align-content-start":"","align-start":""}},[a("span",{staticClass:"font-weight-bold"},[e._v("Informasi Ujian")]),e.isLeader(e.exam.ketua)&&!e.isAdmin?a("v-chip",{staticClass:"white--text ml-0",attrs:{label:"",flat:"",color:"warning"}},[a("v-avatar",{staticClass:"mr-0"},[a("v-icon",[e._v("verified_user")])],1),e._v("\n                            Ketua\n                        ")],1):e._e(),e.isLeader(e.exam.ketua)||e.isAdmin||!e.pembimbing?e._e():a("v-chip",{staticClass:"white--text ml-0",attrs:{label:"",flat:"",color:"success"}},[a("v-avatar",{staticClass:"mr-0"},[a("v-icon",[e._v("verified_user")])],1),e._v("\n                            Pembimbing\n                        ")],1),a("v-layout",{staticClass:"ml-0 mt-1",class:e.isToday(e.exam.tanggal)?"purple--text":"",attrs:{"align-center":"",color:e.isToday(e.exam.tanggal)?"purple":""}},[a("v-icon",{staticClass:"subheading mr-2"},[e._v("calendar_today")]),e._v("\n                            "+e._s(e.isToday(e.exam.tanggal)?e.date+" (Hari Ini)":e.date)+"\n                            "),e.isAdmin?a("span",{staticClass:"edit--text",on:{click:function(t){return e.edit("tanggal","date","Tanggal Ujian")}}},[e._v("[EDIT]")]):e._e()],1),a("v-layout",{staticClass:"ml-0 mt-2",attrs:{"align-center":""}},[a("v-icon",{staticClass:"subheading mr-2"},[e._v("access_time")]),e._v("\n                            "+e._s(e.exam.sesi)+"\n                            "),e.isAdmin?a("span",{staticClass:"edit--text",on:{click:function(t){return e.edit("sesi","sesi","Sesi")}}},[e._v("[EDIT]")]):e._e()],1),a("v-layout",{staticClass:"ml-0 mt-2",attrs:{"align-center":""}},[a("v-icon",{staticClass:"subheading mr-2"},[e._v("place")]),e._v("\n                            "+e._s(e.exam.ruang)+"\n                            "),e.isAdmin?a("span",{staticClass:"edit--text",on:{click:function(t){return e.edit("ruang","ruang","Ruang")}}},[e._v("[EDIT]")]):e._e()],1)],1),a("hr"),a("v-layout",{attrs:{column:""}},[a("span",{staticClass:"font-weight-bold mb-2"},[e._v("Intisari"),e.isAdmin?a("span",{staticClass:"edit--text font-weight-regular",on:{click:function(t){return e.edit("skripsi.intisari","text","Intisari")}}},[e._v("[EDIT]")]):e._e()]),a("p",{staticClass:"ma-0 mb-2"},[e._v(e._s(e.exam.skripsi.intisari))])]),a("hr"),a("v-layout",{attrs:{column:""}},[a("span",{staticClass:"font-weight-bold"},[e._v("Informasi Mahasiswa"),e.isAdmin?a("span",{staticClass:"edit--text font-weight-regular",on:{click:function(t){return e.edit("skripsi.mahasiswa","mahasiswa","Mahasiswa")}}},[e._v("[EDIT]")]):e._e()]),a("v-data-table",{staticClass:"elevation-1 mt-2 zebra-row solid-container",attrs:{headers:e.headers,items:e.exam.skripsi.mahasiswa,"hide-actions":""},scopedSlots:e._u([{key:"headerCell",fn:function(t){return[a("span",{staticClass:"black--text",staticStyle:{"font-size":"13px"}},[e._v("\n                                    "+e._s(t.header.text)+"\n                                ")])]}},{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.nama))]),a("td",[e._v(e._s(t.item.nim))]),a("td",[e._v(e._s(t.item.prodi))]),a("td",[e._v(e._s(t.item.konsentrasi))]),a("td",[e._v(e._s(t.item.tempat_lahir+", "+e.formatDate(t.item.tanggal_lahir,"LL")))]),a("td",[e._v(e._s(t.item.telepon))])]}}],null,!1,4010294381)})],1),a("hr"),a("v-layout",{staticClass:"mt-3",attrs:{column:""}},[a("v-layout",{attrs:{wrap:"","align-center":""}},[a("span",{staticClass:"font-weight-bold"},[e._v("Informasi Penguji")]),a("v-spacer"),e.isAdmin?a("v-btn",{staticClass:"primary ma-0",on:{click:function(t){return e.edit("penguji","dosen","Penguji")}}},[e._v("Tambah Penguji")]):e._e()],1),a("v-data-table",{staticClass:"elevation-1 mt-2 zebra-row solid-container",attrs:{headers:e.dosenHeaders,items:e.exam.penguji,"hide-actions":""},scopedSlots:e._u([{key:"headerCell",fn:function(t){return[a("span",{staticClass:"black--text",staticStyle:{"font-size":"13px"}},[e._v("\n                                    "+e._s(t.header.text)+"\n                                ")])]}},{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.dosen))]),a("td",[e._v(e._s(0==t.index?"Pembimbing 1":1==t.index?"Pembimbing 2":"Penguji"))])]}}],null,!1,1801782368)})],1)],1):e._e()],1)],1)],1):e._e()],1)},s=[],n=(a("ac6a"),a("6762"),a("2fdb"),a("20d6"),a("a481"),a("96cf"),a("3b8d")),r=(a("7f7f"),a("f499")),l=a.n(r),o=(a("28a5"),a("e499"),a("4ebb"),a("c1df")),u=a.n(o),c=(a("09bd"),{data:function(){return{exam:null,agreementDialog:!1,startingExam:!1,examId:null,search:"",editDialog:"",dialogDelete:!1,deleting:!1,dosen:null,loading:!1,menu:!1,valid:!0,submitting:!1,rules:{required:[function(e){return!!e&&!!e.trim()||"Bidang isian harus diisi"}],requireSelect:[function(e){return!!e||"Bidang isian harus diisi"}],isBool:[function(e){return 0==e||1==e||"Bidang isian ujian harus diisi"}],is_capstone:[function(e){return 0==e||1==e||"Tipe ujian harus diisi"}],isNumber:[function(e){return!isNaN(e)||"Hanya dapat berisi angka"}],date:[function(e){return/[1-9][0-9]{3}-[0-9]{2}-[0-9]{2}/g.test(e)||"Tanggal format YYYY-MM-DD"}]},editTemp:{value:"",oldValue:"",label:"",type:"",date:""},headers:[{text:"Nama",sortable:!1,align:"left",value:"nama"},{text:"NIM",sortable:!1,value:"nim"},{text:"Program Studi",sortable:!1,value:"prodi"},{text:"Konsentrasi",sortable:!1,value:"konsentrasi"},{text:"TTL",sortable:!1,value:"tempat_lahir"},{text:"Telepon",sortable:!1,value:"telepon"}],dosenHeaders:[{text:"Nama",sortable:!1,align:"left",value:"dosen"},{text:"Peran",sortable:!1,align:"left",value:"is_leader"}],options:[],ruang:[],sesi:[],selectedPenguji:null,dosenTypes:["Penguji","Hapus"],report:null,objDocument:null,pdfDocGenerator:null,generating:!1,checkingStatus:!1,leader:!1,admin:!1,uploadingScript:!1}},computed:{date:function(){return u()(this.exam.tanggal,"DD/MM/YYYY").format("LL")},naskahFileName:function(){if(this.exam.skripsi){var e=this.exam.skripsi.naskah.split("/");return decodeURIComponent(e[e.length-1])}},pembimbing:function(){return this.isPembimbing(this.exam.skripsi.pembimbing_satu,this.exam.skripsi.pembimbing_dua)},hasChanged:function(){var e=!1,t=this.editTemp,a=t.value,i=t.oldValue,s=t.type,n=null;return"file"==s&&(n=JSON.parse(l()(a))),e="text"==s?a.trim()&&a.trim()!=i:"mahasiswa"==s?l()(a).trim()&&l()(a).trim()!=l()(this.exam.skripsi.mahasiswa):"file"==s?!!n.name:i&&i!=a,e}},methods:{openNaskah:function(){window.open(this.exam.skripsi.naskah,"_blank")},checkExamStatus:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.checkingStatus=!0,e.prev=1,e.next=4,this.$thessa.getExamStatus(t);case 4:a=e.sent,i=a.data.status,this.exam.status=i,1==i?this.agreementDialog=!0:2==i&&this.$router.push("/ujian/"+t+"/mulai"),this.checkingStatus=!1,e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),this.checkingStatus=!1;case 14:this.agreementDialog=!0;case 15:case"end":return e.stop()}},e,this,[[1,11]])}));function t(t){return e.apply(this,arguments)}return t}(),onFilePicked:function(e){var t={},a=e.target.files;if(void 0!==a[0]){if(t.name=a[0].name,t.name.lastIndexOf(".")<=0)return;var i=new FileReader;i.readAsDataURL(a[0]),i.addEventListener("load",function(){t.file=a[0]})}else t={};this.editTemp.value=t},deleteExam:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.deleting=!0,e.prev=1,e.next=4,this.$thessa.deleteExam(this.examId);case 4:this.showSnackbar({type:"success",message:"Berhasil menghapus ujian"}),this.deleting=!1,this.dialogDelete=!1,this.$router.push("/ujian"),e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](1),this.deleting=!1,this.showSnackbar(e.t0);case 14:case"end":return e.stop()}},e,this,[[1,10]])}));function t(){return e.apply(this,arguments)}return t}(),isSelected:function(e){return e<2?!!this.selectedPenguji[e]:this.selectedPenguji.length>2},fetchRoomSessions:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,this.$thessa.getRoomsAndSessions();case 4:t=e.sent,this.ruang=t.data.Ruang,this.sesi=t.data.Sesi,this.loading=!1,e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](1),this.showSnackbar(e.t0),this.fetchRoomSessions();case 14:case"end":return e.stop()}},e,this,[[1,10]])}));function t(){return e.apply(this,arguments)}return t}(),saveEditedSkripsiItem:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,a){var i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t,a),i=t.replace("skripsi.",""),e.prev=2,s={},s[i]=a,e.next=7,this.$thessa.editEssayItem(this.examId,s);case 7:e.sent,this.exam.skripsi[i]=a,this.discard(),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](2),this.showSnackbar(e.t0.message?e.t0.message:e.t0);case 15:case"end":return e.stop()}},e,this,[[2,12]])}));function t(t,a){return e.apply(this,arguments)}return t}(),saveEditedExamItem:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,a){var i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i={},i[t]=a,e.next=5,this.$thessa.editExamItem(this.examId,i);case 5:s=e.sent,this.exam[t]=s.data.ujian[t],this.discard(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),this.showSnackbar(e.t0.message?e.t0.message:e.t0);case 13:case"end":return e.stop()}},e,this,[[0,10]])}));function t(t,a){return e.apply(this,arguments)}return t}(),assignNewDosen:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.submitting=!0,e.prev=1,e.next=4,this.$thessa.assignNewDosen(this.examId,t);case 4:e.sent,this.exam.penguji.push(this.selectedPenguji),this.selectedPenguji=null,this.editDialog=!1,this.submitting=!1,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](1),this.showSnackbar(e.t0),this.submitting=!1;case 15:case"end":return e.stop()}},e,this,[[1,11]])}));function t(t){return e.apply(this,arguments)}return t}(),cancelUpload:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$store.state.cancelTokenSource.cancel("Pengunggahan naskah dibatalkan."),this.editTemp.value=null;case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),saveEdit:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,a,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if("penguji"!=this.editTemp.key){e.next=4;break}this.assignNewDosen({dosen:this.selectedPenguji.id}),e.next=30;break;case 4:if(t=/skripsi\..+/.test(this.editTemp.key),!t){e.next=29;break}if("skripsi.naskah"!=this.editTemp.key){e.next=26;break}return this.uploadingScript=!0,a=new FormData,a.append("file",this.editTemp.value.file),e.prev=10,i=+new Date+"_"+this.editTemp.value.name,e.next=14,this.$thessa.addThesis(i,a);case 14:return s=e.sent,e.next=17,this.saveEditedSkripsiItem(this.editTemp.key,s.data.file);case 17:this.uploadingScript=!1,e.next=24;break;case 20:e.prev=20,e.t0=e["catch"](10),this.showSnackbar(e.t0),this.uploadingScript=!1;case 24:e.next=27;break;case 26:this.saveEditedSkripsiItem(this.editTemp.key,this.editTemp.value);case 27:e.next=30;break;case 29:this.saveEditedExamItem(this.editTemp.key,this.editTemp.value);case 30:case"end":return e.stop()}},e,this,[[10,20]])}));function t(){return e.apply(this,arguments)}return t}(),navigateKonsentrasi:function(e){var t=this,a=this.options[e].prodiOptions.findIndex(function(a){return a==t.editTemp.value[e].prodi});this.options[e].prodiSelected=a},getExam:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.isAdmin&&this.fetchRoomSessions(),e.prev=1,e.next=4,this.$thessa.getExamById(this.examId);case 4:t=e.sent,this.exam=this.isAdmin?t.data:t.data.ujian,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),404==e.t0.response.status?this.$router.go(-1):this.$store.dispatch("showSnackbar",e.t0.message);case 11:case"end":return e.stop()}},e,this,[[1,8]])}));function t(){return e.apply(this,arguments)}return t}(),joinExam:function(){this.$router.push("/ujian/".concat(this.examId,"/mulai"))},startExam:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.startingExam=!0,e.prev=1,e.next=4,this.$thessa.startExam(this.examId);case 4:this.startingExam=!1,this.$router.push("/ujian/"+this.examId+"/mulai"),e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](1),this.showSnackbar(e.t0),this.startingExam=!1;case 12:case"end":return e.stop()}},e,this,[[1,8]])}));function t(){return e.apply(this,arguments)}return t}(),getValue:function(e){for(var t=this.exam,a=e.split("."),i=0;i<a.length;i++){if(!t.hasOwnProperty(a[i]))return null;t=t[a[i]]}return t},fetchDosen:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.loadingDosen=!0,e.prev=1,e.next=4,this.$thessa.getAllDosen();case 4:t=e.sent,this.dosen=t.data.results,this.loadingDosen=!1,e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](1),this.$store.dispatch("showSnackbar",e.t0),this.loadingDosen=!1;case 13:case"end":return e.stop()}},e,this,[[1,9]])}));function t(){return e.apply(this,arguments)}return t}(),filterList:function(){var e=this.exam.penguji.map(function(e){return e.dosen});this.dosen=this.dosen.filter(function(t){return!e.includes(t.nama)})},edit:function(e,t,a){var i=this;this.options=[];var s=this.getValue(e);"mahasiswa"==t&&s.forEach(function(e){return i.options.push({prodiOptions:["TE","TI"],konsentrasiOptions:[["TTL","SIE"],["RSI","RPL","RSK"]],dateDialog:!1,prodiSelected:"TE"==e.prodi?0:1})}),"date"==t&&(s=u()(s,"DD/MM/YYYY").format("YYYY-MM-DD")),"mahasiswa"==t?(this.editTemp.value=JSON.parse(l()(s)),this.editTemp.oldValue=JSON.parse(l()(s))):"ruang"==t?this.fetchRoomSessions().then(function(){var e=i[t][i[t].findIndex(function(e){return e.nama==s})].id;i.editTemp.value=e,i.editTemp.oldValue=e}).catch(function(e){return i.$store.dispatch("showSnackbar",e)}):"sesi"==t?this.fetchRoomSessions().then(function(){var e=i[t][i[t].findIndex(function(e){return e.mulai+" - "+e.selesai+" WIB"==s})].id;i.editTemp.value=e,i.editTemp.oldValue=e}).catch(function(e){return i.$store.dispatch("showSnackbar",e)}):"dosen"==t?this.fetchDosen().then(function(){i.filterList(),i.editTemp.value=[],i.editTemp.oldValue=[]}):(this.editTemp.value=s,this.editTemp.oldValue=s),this.editTemp.label=a,this.editTemp.key=e,this.editTemp.type=t,this.editDialog=!0},discard:function(){this.editTemp.value="",this.editTemp.oldValue="",this.editDialog=!1},cleanArr:function(){var e=this.selectedPenguji,t=[];this.exam.skripsi.pembimbing_satu=e[0],this.exam.skripsi.pembimbing_dua=e[1];for(var a=2;a<e.length;a++)null==e[a]?(e.splice(a,1),a--):t.push({dosen:e[a]});return this.editTemp.value=t,this.selectedPenguji=e},deleteRole:function(e){this.selectedPenguji=null;var t=this.dosen.findIndex(function(t){return e==t.id}),a=this.dosen[t],i=a.email,s=a.nama;delete this.dosen[t].selectedType,this.dosen[t].selectedType=null,this.dosen[t]["email"]="updating",this.dosen[t]["nama"]="updating",this.dosen[t]["email"]=i,this.dosen[t]["nama"]=s},setType:function(e,t){var a=this;if(1==e)this.deleteRole(t);else if(0==e){if(this.selectedPenguji){var i=this.dosen.findIndex(function(e){return a.selectedPenguji.id==e.id});delete this.dosen[i].selectedType}var s=this.dosen.filter(function(e){return e.id==t})[0];this.selectedPenguji={dosen:s.nama,is_leader:!1,is_present:!1,id:s.id};var n=this.dosen.findIndex(function(e){return t==e.id}),r=this.dosen[n],l=r.email,o=r.nama;this.dosen[n].selectedType="penguji baru",this.dosen[n]["email"]="updating",this.dosen[n]["nama"]="updating",this.dosen[n]["email"]=l,this.dosen[n]["nama"]=o}}},created:function(){this.admin=this.isAdmin,this.examId=this.$router.currentRoute.params.id,this.$store.state.auth.token&&this.getExam()}}),d=c,m=(a("c11e"),a("2877")),p=a("6544"),h=a.n(p),v=a("8212"),g=a("8336"),f=a("b0af"),b=a("99d9"),x=a("12b2"),_=a("cc20"),k=a("a523"),w=a("8fea"),y=a("2e4b"),T=a("169a"),C=a("0e8f"),S=a("4bd4"),j=a("132d"),D=a("a722"),I=a("8860"),E=a("ba95"),R=a("5d23"),$=a("e449"),P=a("67b6"),V=a("43a6"),N=a("b56d"),A=a("9910"),O=a("2677"),M=a("a844"),Y=Object(m["a"])(d,i,s,!1,null,"1fbac230",null);t["default"]=Y.exports;h()(Y,{VAvatar:v["a"],VBtn:g["a"],VCard:f["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:x["a"],VChip:_["a"],VContainer:k["a"],VDataTable:w["a"],VDatePicker:y["a"],VDialog:T["a"],VFlex:C["a"],VForm:S["a"],VIcon:j["a"],VLayout:D["a"],VList:I["a"],VListTile:E["a"],VListTileTitle:R["b"],VMenu:$["a"],VRadio:P["a"],VRadioGroup:V["a"],VSelect:N["a"],VSpacer:A["a"],VTextField:O["a"],VTextarea:M["a"]})},5147:function(e,t,a){var i=a("2b4c")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[i]=!1,!"/./"[e](t)}catch(s){}}return!0}},6762:function(e,t,a){"use strict";var i=a("5ca1"),s=a("c366")(!0);i(i.P,"Array",{includes:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")("includes")},"6a3d":function(e,t,a){},a21f:function(e,t,a){var i=a("584a"),s=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}},aae3:function(e,t,a){var i=a("d3f4"),s=a("2d95"),n=a("2b4c")("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[n])?!!t:"RegExp"==s(e))}},c11e:function(e,t,a){"use strict";var i=a("6a3d"),s=a.n(i);s.a},d2c8:function(e,t,a){var i=a("aae3"),s=a("be13");e.exports=function(e,t,a){if(i(t))throw TypeError("String#"+a+" doesn't accept regex!");return String(s(e))}},f499:function(e,t,a){e.exports=a("a21f")}}]);
//# sourceMappingURL=chunk-1f44aa1e.fe9f2b30.js.map