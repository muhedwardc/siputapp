(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17bd1513"],{"47cf":function(t,e,a){"use strict";var n=a("c7ab"),s=a.n(n);s.a},5118:function(t,e,a){(function(t){var n="undefined"!==typeof t&&t||"undefined"!==typeof self&&self||window,s=Function.prototype.apply;function i(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new i(s.call(setTimeout,n,arguments),clearTimeout)},e.setInterval=function(){return new i(s.call(setInterval,n,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(n,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},a("6017"),e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof t&&t.clearImmediate||this&&this.clearImmediate}).call(this,a("c8ba"))},"520ab":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dosen-home"},[a("app-loading"),t.$store.state.loadViewContent?t._e():a("v-layout",{attrs:{column:""}},[a("v-container",{staticClass:"no-padding mt-2",attrs:{"grid-list-lg":""}},[a("h3",{staticClass:"mb-1"},[t._v("Ujian Tugas Akhir Hari Ini")]),0===t.todayExams.length?a("span",[t._v("Hari ini tidak ada ujian")]):a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.todayExams.slice(0,3),function(t){return a("v-flex",{key:t.id,attrs:{xs12:"",sm6:""}},[a("app-exam-card",{attrs:{item:t}})],1)}),1)],1),a("v-container",{staticClass:"no-padding mt-2",attrs:{"grid-list-lg":""}},[a("h3",{staticClass:"mb-1 mt-4"},[t._v("Ujian Tugas Akhir yang akan datang")]),0===t.nextExams.length?a("span",[t._v("Tidak ada ujian lagi")]):a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.nextExams,function(t){return a("v-flex",{key:t.id,attrs:{xs12:"",sm6:""}},[a("app-exam-card",{attrs:{item:t}})],1)}),1)],1)],1),a("app-info-box",{attrs:{appear:t.hasFinisedExam,title:"Ujian Tugas Akhir telah diselesaikan"},on:{close:function(e){t.hasFinisedExam=!1}},scopedSlots:t._u([{key:"content",fn:function(){return[a("p",[t._v("Anda telah menyelesaikan ujian:")]),a("v-layout",{staticClass:"exam-detail mb-2",attrs:{column:""}},[a("p",{staticClass:"mb-1",domProps:{textContent:t._s(t.finishedExam.skripsi.judul)}}),a("v-layout",{staticClass:"mb-1"},[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("event")]),a("span",{domProps:{textContent:t._s(t.finishedExam.tanggal)}})],1),a("v-layout",{staticClass:"mb-1"},[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("access_time")]),a("span",{domProps:{textContent:t._s(t.finishedExam.sesi)}})],1),a("v-layout",{staticClass:"mb-1"},[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("location_on")]),a("span",{domProps:{textContent:t._s(t.finishedExam.ruang)}})],1),a("v-layout",{staticClass:"mb-1"},[a("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("person")]),a("span",[t._v(t._s(t.joinToString(t.finishedExam.skripsi.mahasiswa,"nama")))])],1)],1),a("p",{staticClass:"mb-0"},[t._v("Untuk melihat berkas hasil ujian skripsi dapat dilihat di halaman "),a("router-link",{attrs:{to:"/ujian/"+t.finishedExam.id}},[t._v("detail ujian")]),t._v(" ketika Ketua Sidang telah menyelesaikan ujian.")],1)]},proxy:!0}])})],1)},s=[],i=(a("a481"),a("96cf"),a("3b8d")),o=a("cebc"),r=a("c1df"),c=a.n(r),l=a("a78e"),u=a.n(l),m=a("2f62"),d=a("5118"),f={data:function(){return{exams:[],todayExams:[],nextExams:[],newAssignedExams:0,finishedExam:null,hasFinisedExam:!1}},methods:Object(o["a"])({},Object(m["b"])(["logUserOut"]),{filterUjian:function(){var t=this;c.a.locale("id"),this.exams.map(function(e){if(e.ujian.tanggal==c()().format("L"))return t.todayExams.push(e);t.nextExams.push(e)})},getExams:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.state.loadViewContent=!0,t.prev=1,t.next=4,this.$thessa.getMyExams();case 4:e=t.sent,this.exams=e.data.results,this.exams.length>0&&this.filterUjian(),a=this.todayExams.length>0?"Hari ini ada "+this.todayExams.length+" ujian":"Hari ini tidak ada ujian",u.a.get("visit_home")||(this.showSnackbar({message:a,type:"success"}),u.a.set("visit_home",!0)),this.$store.state.loadViewContent=!1,t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](1),t.t0.response&&401==t.t0.response.status?(this.logUserOut(),this.$router.replace("/login")):this.showSnackbar({message:err.message,type:"error"}),this.$store.state.loadViewContent=!1;case 16:case"end":return t.stop()}},t,this,[[1,12]])}));function e(){return t.apply(this,arguments)}return e}()}),computed:{today:function(){return c.a.locale("id"),c()().format("LL")}},created:function(){var t=this;this.$store.state.auth.token&&this.getExams(),this.$store.state.finishedExam&&(this.finishedExam=this.$store.state.finishedExam,Object(d["setTimeout"])(function(){t.hasFinisedExam=!0},500),this.$store.state.finishedExam=null)}},h=f,p=(a("47cf"),a("2877")),v=a("6544"),g=a.n(v),x=a("a523"),y=a("0e8f"),_=a("132d"),b=a("a722"),k=Object(p["a"])(h,n,s,!1,null,"b7caf43c",null);e["default"]=k.exports;g()(k,{VContainer:x["a"],VFlex:y["a"],VIcon:_["a"],VLayout:b["a"]})},6017:function(t,e,a){(function(t,e){(function(t,a){"use strict";if(!t.setImmediate){var n,s=1,i={},o=!1,r=t.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(t);c=c&&c.setTimeout?c:t,"[object process]"==={}.toString.call(t.process)?f():h()?p():t.MessageChannel?v():r&&"onreadystatechange"in r.createElement("script")?g():x(),c.setImmediate=l,c.clearImmediate=u}function l(t){"function"!==typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),a=0;a<e.length;a++)e[a]=arguments[a+1];var o={callback:t,args:e};return i[s]=o,n(s),s++}function u(t){delete i[t]}function m(t){var e=t.callback,n=t.args;switch(n.length){case 0:e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1]);break;case 3:e(n[0],n[1],n[2]);break;default:e.apply(a,n);break}}function d(t){if(o)setTimeout(d,0,t);else{var e=i[t];if(e){o=!0;try{m(e)}finally{u(t),o=!1}}}}function f(){n=function(t){e.nextTick(function(){d(t)})}}function h(){if(t.postMessage&&!t.importScripts){var e=!0,a=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=a,e}}function p(){var e="setImmediate$"+Math.random()+"$",a=function(a){a.source===t&&"string"===typeof a.data&&0===a.data.indexOf(e)&&d(+a.data.slice(e.length))};t.addEventListener?t.addEventListener("message",a,!1):t.attachEvent("onmessage",a),n=function(a){t.postMessage(e+a,"*")}}function v(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;d(e)},n=function(e){t.port2.postMessage(e)}}function g(){var t=r.documentElement;n=function(e){var a=r.createElement("script");a.onreadystatechange=function(){d(e),a.onreadystatechange=null,t.removeChild(a),a=null},t.appendChild(a)}}function x(){n=function(t){setTimeout(d,0,t)}}})("undefined"===typeof self?"undefined"===typeof t?this:t:self)}).call(this,a("c8ba"),a("f28c"))},c7ab:function(t,e,a){}}]);
//# sourceMappingURL=chunk-17bd1513.771891b9.js.map