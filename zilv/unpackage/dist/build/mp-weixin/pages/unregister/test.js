(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/unregister/test"],{"68bc":function(t,n,e){"use strict";e.r(n);var a=e("f625"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},"6c2a":function(t,n,e){},"8a06":function(t,n,e){"use strict";e.r(n);var a=e("a841"),i=e("68bc");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("8a2e");var r,u=e("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=c.exports},"8a2e":function(t,n,e){"use strict";var a=e("6c2a"),i=e.n(a);i.a},a841:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.delShow=!0})},o=[]},ae15:function(t,n,e){"use strict";(function(t){e("8c7a");a(e("66fd"));var n=a(e("8a06"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},f625:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e,a,i=t.getRecorderManager(),o=t.createInnerAudioContext(),r={data:function(){return{count:null,longPress:"1",delShow:!1,time:0,duration:6e4,tempFilePath:"",playStatus:0}},methods:{countdown:function(t){var n=this;n.count=Number(t),a=setInterval((function(){n.count>0?n.count--:(n.longPress="1",clearInterval(a))}),1e3)},longpressBtn:function(){var t=this;this.longPress="2",this.countdown(60),clearInterval(e),i.onStop((function(n){t.tempFilePath=n.tempFilePath,t.recordingTimer(t.time)}));var n={duration:this.duration,sampleRate:16e3,numberOfChannels:1,encodeBitRate:96e3,format:"mp3",frameSize:10};this.recordingTimer(),i.start(n),i.onStart((function(t){console.log(t)}))},touchendBtn:function(){var t=this;this.longPress="1",i.onStop((function(n){t.tempFilePath=n.tempFilePath})),this.recordingTimer(this.time),i.stop()},recordingTimer:function(t){var n=this;void 0==t?e=setInterval((function(){n.time++}),1e3):clearInterval(e)},delBtn:function(){this.delShow=!1,this.time=0,this.tempFilePath="",this.playStatus=0,o.stop()},playBtn:function(){var t=this;o.src=this.tempFilePath,0==this.playStatus?(this.playStatus=1,o.play(),this.countdown(this.time)):(this.playStatus=0,o.pause()),o.onEnded((function(){t.playStatus=0,o.stop()}))}}};n.default=r}).call(this,e("543d")["default"])}},[["ae15","common/runtime","common/vendor"]]]);