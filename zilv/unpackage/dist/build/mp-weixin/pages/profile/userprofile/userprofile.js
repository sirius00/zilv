(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/profile/userprofile/userprofile"],{"0fb0":function(e,t,n){},"114e":function(e,t,n){"use strict";(function(e){n("8c7a");r(n("66fd"));var t=r(n("853c"));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},2327:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("26cb"),o=u(n("cac9"));function u(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=o.default.base1,f={components:{},data:function(){return{toux:[],name:"",haschangetoux:!1}},computed:a({},(0,r.mapState)(["userinfo"])),created:function(){this.toux=this.userinfo.img,this.name=this.userinfo.userName},methods:a(a({},(0,r.mapMutations)(["xtoux","xprofile","updateprofile"])),{},{changeImage:function(){var t=this;e.chooseImage({count:1,success:function(e){t.toux=e.tempFilePaths,t.haschangetoux=!0,console.log(t.toux)}})},upLoadImage:function(){var t=(new Date).getTime(),n={memberId:this.userinfo.memberId,timestamp:t,isFirst:1},r=JSON.stringify(n),o=this.AES.encrypt(r,"GuGuAPP$*@AesKey","0000000000000000"),u=this.AES.encrypt("2","GuGuAPP$*@AesKey","0000000000000000");e.uploadFile({url:"http://test.gugu2019.com/v1/user/UploadImg?args="+o+"&er="+u,fileType:"image",filePath:this.toux[0],name:"img",success:function(e){console.log("成功")},fail:function(e){console.log(e)}})},changename:function(){var t=this,n=(new Date).getTime(),r={memberId:this.userinfo.memberId,timestamp:n,userName:this.name,sex:this.userinfo.sex,born:this.userinfo.born},o=JSON.stringify(r),u=this.AES.encrypt(o,"GuGuAPP$*@AesKey","0000000000000000"),i=this.AES.encrypt("2","GuGuAPP$*@AesKey","0000000000000000");e.$http.post(s+"/v1/user/Register?args="+u+"&er="+i).then((function(n){if("400"==n.data.code)return e.showToast({title:"年龄未满18",icon:"none"}),!1;var r=n.data.data.user;t.xprofile(r)})).catch((function(e){console.log(e)}))},save:function(){this.changename(),this.haschangetoux&&this.upLoadImage();var t={newname:this.name,newimg:this.toux};this.updateprofile(t),e.reLaunch({url:"/pages/profile/profile"})}})};t.default=f}).call(this,n("543d")["default"])},"2a5c":function(e,t,n){"use strict";var r=n("0fb0"),o=n.n(r);o.a},"4eba":function(e,t,n){"use strict";n.r(t);var r=n("2327"),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=o.a},"5f4d":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},u=[]},"853c":function(e,t,n){"use strict";n.r(t);var r=n("5f4d"),o=n("4eba");for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n("2a5c");var i,a=n("f0c5"),c=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=c.exports}},[["114e","common/runtime","common/vendor"]]]);