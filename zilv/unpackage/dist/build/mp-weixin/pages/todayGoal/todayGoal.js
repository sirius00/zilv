(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/todayGoal/todayGoal"],{"0986":function(t,e,n){"use strict";n.r(e);var r=n("379f"),a=n("d811");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("4c0b");var o,c=n("f0c5"),u=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=u.exports},"220c":function(t,e,n){"use strict";n.r(e);var r=n("d440"),a=n("5f92");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("ed83");var o,c=n("f0c5"),u=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=u.exports},"379f":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"4c0b":function(t,e,n){"use strict";var r=n("6dc0"),a=n.n(r);a.a},"5f92":function(t,e,n){"use strict";n.r(e);var r=n("a2e5"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},"6dc0":function(t,e,n){},"9a8e":function(t,e,n){},"9fbc":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{currentPage:{type:Number,default:0}},data:function(){return{currentItem:0,tabbarList:[{id:0,path:"/pages/todayGoal/todayGoal",icon:"/static/img/message_active.png",selectIcon:"/static/img/message_active.png",centerItem:!1},{id:1,path:"/pages/home/home",icon:"/static/img/dubbing.png",selectIcon:"/static/img/dubbing.png",centerItem:!0},{id:2,path:"/pages/profile/profile",icon:"/static/img/profile_active.png",selectIcon:"/static/img/profile_active.png",centerItem:!1}]}},mounted:function(){this.currentItem=this.currentPage,t.hideTabBar()},methods:{changeItem:function(e){var n=this;n.currentItem=e.id,t.switchTab({url:e.path})}}};e.default=n}).call(this,n("543d")["default"])},a2e5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("0986")),a=n("26cb"),i=o(n("cac9"));function o(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=i.default.base2,d=t.getRecorderManager(),l=t.createInnerAudioContext(),p={components:{midBox:r.default},data:function(){return{voicePath:"",prompt:!1,show:!1}},computed:u({},(0,a.mapState)(["userinfo"])),methods:{startRecord:function(){var t=this;d.onStop((function(e){t.voicePath=e.tempFilePath}));var e={duration:this.duration,sampleRate:16e3,numberOfChannels:1,encodeBitRate:96e3,format:"mp3",frameSize:10};d.start(e),this.show=!0},endRecord:function(){var t=this;this.pic="play",d.onStop((function(e){t.voicePath=e.tempFilePath})),d.stop(),this.show=!1,this.prompt=!0,console.log(this.voicePath)},playVoice:function(){var t=this;l.src=this.voicePath,l.play(),this.show=!0,this.pic="pause",l.onEnded((function(){t.show=!1,l.stop()}))},delVoice:function(){this.voicePath="",this.prompt=!1,this.show=!1,l.stop()},addVoice_task:function(){var e=this;t.uploadFile({url:f+"/task/add/mp3",filePath:this.voicePath,name:"file",formData:{uid:this.userinfo.memberId,content:""},header:{"content-type":"multipart/form-data"},success:function(n){e.voicePath="",e.prompt=!1,t.$emit("add_voice_task")},fail:function(t){console.log(t)}})}}};e.default=p}).call(this,n("543d")["default"])},d440:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,r=(t._self._c,n("7fbb")),a=n("0e3e");t.$mp.data=Object.assign({},{$root:{m0:r,m1:a}})},i=[]},d811:function(t,e,n){"use strict";n.r(e);var r=n("9fbc"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},ebe1:function(t,e,n){"use strict";(function(t){n("8c7a");r(n("66fd"));var e=r(n("220c"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},ed83:function(t,e,n){"use strict";var r=n("9a8e"),a=n.n(r);a.a}},[["ebe1","common/runtime","common/vendor"]]]);