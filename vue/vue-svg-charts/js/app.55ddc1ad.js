(function(t){function e(e){for(var n,i,s=e[0],u=e[1],c=e[2],f=0,p=[];f<s.length;f++)i=s[f],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],n=!0,s=1;s<r.length;s++){var u=r[s];0!==a[u]&&(n=!1)}n&&(o.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},a={app:0},o=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=u;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"21dc":function(t,e,r){},"35cd":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page",attrs:{id:"app"}},[r("div",{staticClass:"sub_page"},[r("h5",[t._v(" Test Vue.js + vue-svg-charts.js")]),t._m(0),r("div",{staticClass:"rowrow"},[r("div",{staticClass:"dash",on:{drop:function(e){return e.preventDefault(),t.parseFile(e)},dragover:function(t){t.preventDefault()}}},[r("ul"),r("div",{staticClass:"upload"},[t._v(" Drop or "),r("button",{staticClass:"upload-btn-wrapper"},[t._v(" Select files "),r("div",[r("input",{attrs:{type:"file"},on:{change:t.parseFile}})])])]),r("ul")]),r("ul")]),t.histogram[0]?r("div",t._l(100,(function(e){return r("div",{key:e},[r("div",{staticClass:"rowrow"},[r("hr"),r("h6",[t._v(" CNT_CHILDREN Distribution ")]),r("bar-graph",{attrs:{title:"Test Bar Graph",showValues:!0,easeIn:!0,points:t.histogram,height:200}})],1)])})),0):t._e()])])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rowrow"},[n("img",{attrs:{alt:"Vue logo",src:r("9f3a")}})])}],i=(r("cb29"),r("d81d"),r("f9bc"));function s(t,e){if(e<=0)throw Error("Wrong number of bins");for(var r=t[0],n=t[1],a=t.length,o=2;o<a;o++){var i=t[o];i<r&&(r=i),i>n&&(n=i)}for(var s=Array(e).fill(0),u=(n-r)/e,c=0;c<a;c++)t[c]==n?s[e-1]++:s[Math.floor((t[c]-r)/u)]++;return s}r("21dc"),r("35cd"),r("a347"),r("d940");var u={name:"App",data:function(){return{csvData:[],nbins:20}},components:{BarGraph:i["a"]},computed:{histogram:{get:function(){console.log("here");var t=this.nbins,e=this.csvData;return s(e.map((function(t){return+t["CNT_CHILDREN"]})),t)}},labels:{get:function(){var t=this.nbins;return Array(t).fill(0).map((function(t,e){return e}))}}},methods:{parseFile:function(t){var e=this,n=r("369b");n.parse(t.target.files[0],{header:!0,download:!0,skipEmptyLines:!0,complete:function(t){console.log(t),e.csvData=t.data}})}}},c=u,l=(r("da72"),r("2877")),f=Object(l["a"])(c,a,o,!1,null,null,null),p=f.exports;n["a"].config.productionTip=!1,r("21dc"),r("35cd"),r("a347"),r("d940"),new n["a"]({render:function(t){return t(p)}}).$mount("#app")},"9f3a":function(t,e,r){t.exports=r.p+"img/Valeriy.c8f31b57.png"},a347:function(t,e,r){},a7f8:function(t,e,r){},d940:function(t,e,r){},da72:function(t,e,r){"use strict";var n=r("a7f8"),a=r.n(n);a.a}});
//# sourceMappingURL=app.55ddc1ad.js.map