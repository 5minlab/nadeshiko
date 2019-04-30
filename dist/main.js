!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.nadeshiko=t():e.nadeshiko=t()}(global,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("mz/fs")},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(17)),r(n(18)),r(n(19)),r(n(4)),r(n(20)),r(n(21)),r(n(7))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(10))},function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Integer=0]="Integer",e[e.Float=1]="Float",e[e.String=2]="String",e[e.Boolean=3]="Boolean",e[e.Date=4]="Date",e[e.Raw=5]="Raw"}(r=t.AttributeType||(t.AttributeType={}));var i=[{ty:r.Integer,prefix:"i_"},{ty:r.Float,prefix:"f_"},{ty:r.String,prefix:"s_"},{ty:r.Boolean,prefix:"b_"},{ty:r.Date,prefix:"d_"},{ty:r.Raw,prefix:"r_"}],a=function(){function e(e,t){this.ty=e,this.name=t}return e.make=function(t){if(!t.length)throw new Error("blank attribute name");var n=i.filter(function(e){return t.startsWith(e.prefix)});if(n.length>0){var a=n[0];return new e(a.ty,t.replace(a.prefix,""))}return new e(r.Raw,t)},e.prototype.cast=function(e){switch(this.ty){case r.Integer:return o(e);case r.Float:return u(e);case r.Boolean:return s(e);case r.Date:return c(e);case r.String:return f(e);case r.Raw:return l(e);default:return e}},e}();t.Attribute=a;var o=function(e){return e?parseInt(e,10):0},u=function(e){return e?parseFloat(e):0},s=function(e){return void 0!==e&&(!!["TRUE","1"].includes(e)||(["FALSE","0"].includes(e),!1))},c=function(e){return e?h(e):null},l=function(e){return e},f=function(e){return e||""},h=function(e){var t=e.replace(/ /g,"").match(/(\d{4}).(\d{1,2}).(\d{1,2}).+(\d{2}):(\d{2}):(\d{2})/);if(t){var n=e.includes("오후")?12:0,r=parseInt(t[1],10),i=parseInt(t[2],10),a=parseInt(t[3],10),o=parseInt(t[4],10)+n,u=parseInt(t[5],10),s=parseInt(t[6],10);return new Date(r,i-1,a,o,u,s)}return null};t.makeAttributes=function(e){return e.map(function(e){return a.make(e)})}},function(e,t){e.exports=require("js-yaml")},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=n(4),a=r(n(6)),o=n(22);t.INVALID_NUM_ID=-987654321,t.INVALID_STR_ID="ABCDEFGHIJKLMNOPQRSTUVWXYZ";var u=function(){function e(e){this.cells=e,this.idcell=e.filter(function(e){return"id"===e.key})[0]}return Object.defineProperty(e.prototype,"value",{get:function(){var e={};return this.cells.filter(function(e){return"id"!==e.key}).forEach(function(t){e[t.key]=t.value}),void 0===typeof this.idcell.raw||""===this.idcell.raw?e.id=this.getInvalidId():e.id=this.idcell.value,e},enumerable:!0,configurable:!0}),e.prototype.getInvalidId=function(){var e=this.idcell;if(e)switch(e.ty){case i.AttributeType.Integer:case i.AttributeType.Float:return t.INVALID_NUM_ID;case i.AttributeType.String:return t.INVALID_STR_ID}return t.INVALID_NUM_ID},e}();t.Record=u,t.makeRecord=function(e,t){var n=a.zip(e,t).map(function(e){return{attr:e[0],data:e[1]}}).map(function(e){return new o.Cell(e.attr,e.data)});return new u(n)}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},u=this,s=a(n(9)),c=n(3),l=o(n(12)),f=o(n(14)),h=n(24),d=n(25);e.exports=function(e){var t,n=s.default.Router(),a=e.metadataSheetId,o=e.redis,p=e.dataPath,v=e.serviceKey,b=e.prefix,y=new h.TableCache(o,b||"nadeshiko"),m=function(){return r(u,void 0,void 0,function(){var e;return i(this,function(n){switch(n.label){case 0:return[4,r(u,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return t?[3,2]:[4,d.getJWTClient(v)];case 1:t=e.sent(),e.label=2;case 2:return[2,t]}})})];case 1:return e=n.sent(),[2,new d.GSheetDataSource(e,a)]}})})},w=function(e){return r(u,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=e.body?e.body:{},(n=t.version)?(r=n,[3,3]):[3,1];case 1:return[4,c.findLatestVersion(p)];case 2:r=i.sent(),i.label=3;case 3:return[2,r]}})})};return n.post("/tables/:table/sync",function(e,t){return r(u,void 0,void 0,function(){var n,r,a;return i(this,function(i){switch(i.label){case 0:return[4,l.tableSchema.validate(e.params)];case 1:return n=i.sent().table,[4,m()];case 2:return r=i.sent(),[4,f.syncTable(y,r,n)];case 3:return a=i.sent(),t.json({ok:a}),[2]}})})}),n.get("/tables/:table",function(e,t){return r(u,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return[4,l.tableSchema.validate(e.params)];case 1:return n=i.sent().table,[4,f.getTable(y,n)];case 2:return r=i.sent(),t.json(r),[2]}})})}),n.delete("/tables/:table",function(e,t){return r(u,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return[4,l.tableSchema.validate(e.params)];case 1:return n=i.sent().table,[4,f.delTable(y,n)];case 2:return r=i.sent(),t.json({ok:r}),[2]}})})}),n.get("/tables/:table/:id",function(e,t){return r(u,void 0,void 0,function(){var n,r,a,o;return i(this,function(i){switch(i.label){case 0:return[4,l.itemSchema.validate(e.params)];case 1:return n=i.sent(),r=n.table,a=n.id,[4,f.getRecord(y,r,a)];case 2:return o=i.sent(),t.json(o),[2]}})})}),n.get("/metadata",function(e,t){return r(u,void 0,void 0,function(){var e;return i(this,function(n){switch(n.label){case 0:return[4,f.getMetadata(y)];case 1:return e=n.sent(),t.json(e),[2]}})})}),n.get("/versions/",function(e,t){return r(u,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:if(n=parseInt(e.query.limit||"20",10),isNaN(n))throw new Error("invalid limit: "+e.query.limit);return[4,f.getVersions(p,n)];case 1:return r=i.sent(),t.json(r),[2]}})})}),n.get("/versions/:version",function(e,t){return r(u,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return n=e.params.version,[4,f.getVersionInfo(p,n)];case 1:return r=i.sent(),t.json({version:n,metadata:r.metadata,contents:r.contents}),[2]}})})}),n.post("/commands/fetch",function(e,t){return r(u,void 0,void 0,function(){var e,n,r,a;return i(this,function(i){switch(i.label){case 0:return[4,m()];case 1:return e=i.sent(),[4,f.fetchAll(e,p)];case 2:return n=i.sent(),r=n.version,a=n.metadata,t.json({version:r,metadata:a}),[2]}})})}),n.post("/commands/load",function(e,t){return r(u,void 0,void 0,function(){var n,r,a,o;return i(this,function(i){switch(i.label){case 0:return[4,w(e)];case 1:return n=i.sent(),[4,f.loadAll(y,p,n)];case 2:return r=i.sent(),a=r.tables,o=r.metadata,t.json({version:n,tables:a,metadata:o}),[2]}})})}),n}},function(e,t){e.exports=require("express")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},o=this;Object.defineProperty(t,"__esModule",{value:!0});var u=a(n(0)),s=a(n(11)),c=a(n(1)),l=/(\d){8}-(\d){6}/;t.makeVersion=function(e){return s.default(e).format("YYYYMMDD-HHmmss")},t.findLatestVersion=function(e){return r(o,void 0,void 0,function(){var n;return i(this,function(r){switch(r.label){case 0:return[4,t.findVersions(e)];case 1:return n=r.sent(),[2,n[0]]}})})},t.findVersions=function(e){return r(o,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,h(e)];case 1:return[2,t.sent().filter(function(e){return l.test(e)})]}})})},t.filterVersions=function(e){return e.filter(function(e){return l.test(e)})};var f=function(e){return e.startsWith("metadata-")},h=function(e){return r(o,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,c.default.readdir(e)];case 1:return[2,t.sent().sort().reverse()]}})})};t.findVersionInfo=function(e,n){return r(o,void 0,void 0,function(){var r,a;return i(this,function(i){switch(i.label){case 0:return r=u.default.resolve(e,n),[4,h(r)];case 1:return a=i.sent(),[2,t.makeVersionInfo(a)]}})})},t.makeVersionInfo=function(e){var t=e.map(function(e){return e.replace(".yaml","")});return{metadata:t.filter(function(e){return f(e)}),contents:t.filter(function(e){return!f(e)})}}},function(e,t){e.exports=require("dayjs")},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(13));t.tableSchema=i.object().shape({table:i.string().required()}),t.itemSchema=i.object().shape({table:i.string().required(),id:i.number().min(0).required()})},function(e,t){e.exports=require("yup")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},o=this;Object.defineProperty(t,"__esModule",{value:!0});var u=n(15),s=a(n(23)),c=n(2),l=n(3);t.getMetadata=function(e){return r(o,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,e.loadMetadata()];case 1:return[2,t.sent()]}})})},t.getTable=function(e,t){return r(o,void 0,void 0,function(){var n;return i(this,function(r){switch(r.label){case 0:return[4,e.loadTable(t)];case 1:if((n=r.sent()).length)return[2,n];throw new Error("table not found")}})})},t.delTable=function(e,t){return r(o,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return[4,e.dropTable(t)];case 1:if(n.sent())return[2,!0];throw new Error("no table deleted")}})})},t.getRecord=function(e,t,n){return r(o,void 0,void 0,function(){var r;return i(this,function(i){switch(i.label){case 0:return[4,e.get(t,n)];case 1:if(r=i.sent())return[2,r];throw new Error("record not found")}})})},t.syncTable=function(e,t,n){return r(o,void 0,void 0,function(){var r,a,o,u,s;return i(this,function(i){switch(i.label){case 0:return[4,e.loadMetadata()];case 1:if(r=i.sent(),!(a=r.findReference(n)))throw new Error("reference not found");return[4,t.fetchSheets([a])];case 2:if(0===(o=i.sent()).length)throw new Error("sheet not found");return u=o[0],s=c.makeTable(u.name,u.values),[4,e.saveTable(s)];case 3:return i.sent(),[4,e.touchVersion()];case 4:return i.sent(),[2,!0]}})})},t.fetchAll=function(e,t){return r(o,void 0,void 0,function(){var n,r,a;return i(this,function(i){switch(i.label){case 0:return[4,u.fetch(e,t)];case 1:return n=i.sent(),r=n.version,a=n.metadata,[2,{version:r,metadata:a}]}})})},t.loadAll=function(e,t,n){return r(o,void 0,void 0,function(){var a,o,u,c=this;return i(this,function(l){switch(l.label){case 0:return[4,s.findSheetNames(t,n)];case 1:return a=l.sent(),o=a.map(function(a){return r(c,void 0,void 0,function(){var r;return i(this,function(i){switch(i.label){case 0:return[4,s.loadTable(t,n,a)];case 1:return r=i.sent(),[4,e.saveTable(r)];case 2:return i.sent(),[2]}})})}),[4,Promise.all(o)];case 2:return l.sent(),[4,s.loadMetadata(t,n)];case 3:return u=l.sent(),[4,e.saveMetadata(u)];case 4:return l.sent(),[2,{tables:a,metadata:u}]}})})},t.getVersions=function(e,t){return r(o,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return[4,l.findVersions(e)];case 1:return[2,n.sent().slice(0,t)]}})})},t.getVersionInfo=function(e,t){return r(o,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return[4,l.findVersionInfo(e,t)];case 1:return[2,n.sent()]}})})}},function(e,t,n){"use strict";(function(e){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},o=this;Object.defineProperty(t,"__esModule",{value:!0});var u=a(n(1)),s=a(n(0)),c=n(3),l=n(2);t.fetch=function(e,t){return r(o,void 0,void 0,function(){var n,r,a,o,f,h,d,p,v;return i(this,function(i){switch(i.label){case 0:return n=c.makeVersion(new Date),[4,Promise.all([e.fetchReferences(),e.fetchConstraints()])];case 1:return r=i.sent(),a=l.makeReferences(r[0]),o=l.makeConstraints(r[1]),f=new l.Metadata(n,a,o),[4,e.fetchSheets(a)];case 2:return h=i.sent(),d=h.map(function(e){return l.makeTable(e.name,e.values)}),p=s.default.resolve(t,n),[4,u.default.mkdir(p)];case 3:return i.sent(),[4,f.save(p)];case 4:return i.sent(),v=d.map(function(e){e.save(p)}),[4,Promise.all(v)];case 5:return i.sent(),[2,{version:n,metadata:f}]}})})};n.c[n.s]===e&&r(o,void 0,void 0,function(){return i(this,function(e){return[2]})})}).call(this,n(16)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getTableName=function(e){return e.split("!")[0]},t.sanitizeRange=function(e){return e.replace(/'/g,"")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toDataRange=function(e){return e.table+"!"+e.range},t.makeReference=function(e){return{table:e[0],range:e[1],sheet:e[2]}},t.makeReferences=function(e){return e.map(function(e){return t.makeReference(e)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.ForeignKey="fk",e.Unique="unique"}(t.ConstraintType||(t.ConstraintType={})),t.makeConstraint=function(e){return{type:e[0],firstTable:e[1],firstAttribute:e[2],secondTable:e[3],secondAttribute:e[4]}},t.makeConstraints=function(e){return void 0===e?[]:e.map(function(e){return t.makeConstraint(e)})};var r=function(){return function(e){this.constraints=e}}();t.ConstraintTable=r},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=a(n(1)),u=a(n(0)),s=a(n(5)),c=function(){function e(e,t,n){this.version=e,this.references=t,this.constraints=n}return e.prototype.save=function(e){return r(this,void 0,void 0,function(){return i(this,function(t){return[2,Promise.all([this.saveItems(e,"metadata-references.yaml",this.references),this.saveItems(e,"metadata-constraints.yaml",this.constraints)])]})})},e.prototype.saveItems=function(e,t,n){return r(this,void 0,void 0,function(){var r,a;return i(this,function(i){switch(i.label){case 0:return r=s.default.dump(n),a=u.default.resolve(e,t),[4,o.default.writeFile(a,r)];case 1:return i.sent(),[2]}})})},e.prototype.findReference=function(e){var t=this.references.filter(function(t){return t.table===e});return t.length?t[0]:void 0},e}();t.Metadata=c},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=a(n(1)),u=a(n(0)),s=a(n(5)),c=n(7),l=n(4),f=function(){function e(e,t){this.name=e,this.items=t}return e.prototype.save=function(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=s.default.dump(this.items),n=this.name+".yaml",r=u.default.resolve(e,n),[4,o.default.writeFile(r,t)];case 1:return i.sent(),[2]}})})},Object.defineProperty(e.prototype,"length",{get:function(){return this.items.length},enumerable:!0,configurable:!0}),e}();t.Table=f,t.makeTable=function(e,t){var n=t[0],r=l.makeAttributes(n),i=[];if(r.find(function(e){return"id"===e.name}))i=t.slice(1).map(function(e){return c.makeRecord(r,e)});else{var a=[new l.Attribute(l.AttributeType.Integer,"id")].concat(r);i=t.slice(1).map(function(e,t){var n=[(t+1).toString()].concat(e);return c.makeRecord(a,n)})}var o=i.map(function(e){return e.value});return new f(e,o)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){this.attr=e,this.data=t}return Object.defineProperty(e.prototype,"value",{get:function(){return this.attr.cast(this.data)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"key",{get:function(){return this.attr.name},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ty",{get:function(){return this.attr.ty},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"raw",{get:function(){return this.data},enumerable:!0,configurable:!0}),e}();t.Cell=r},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},o=this;Object.defineProperty(t,"__esModule",{value:!0});var u=a(n(1)),s=a(n(0)),c=a(n(5)),l=n(2),f=function(e,t,n){return r(o,void 0,void 0,function(){var r,a,o;return i(this,function(i){switch(i.label){case 0:return r=function(e,t,n){var r=s.default.resolve(e,t);return s.default.resolve(r,n)}(e,t,n),[4,u.default.readFile(r)];case 1:return a=i.sent(),o=a.toString("utf8"),[2,c.default.load(o)]}})})};t.findSheetNames=function(e,t){return r(o,void 0,void 0,function(){var n;return i(this,function(r){switch(r.label){case 0:return n=s.default.resolve(e,t),[4,u.default.readdir(n)];case 1:return[2,r.sent().sort().filter(function(e){return e.includes(".yaml")}).filter(function(e){return!e.startsWith("metadata-")}).map(function(e){return e.replace(".yaml","")})]}})})},t.loadTable=function(e,t,n){return r(o,void 0,void 0,function(){var r,a;return i(this,function(i){switch(i.label){case 0:if(n.startsWith("metadata-"))return[2,new l.Table(n,[])];i.label=1;case 1:return i.trys.push([1,3,,4]),[4,f(e,t,n+".yaml")];case 2:return r=i.sent(),[2,new l.Table(n,r)];case 3:return a=i.sent(),console.error(a),[2,new l.Table(n,[])];case 4:return[2]}})})},t.loadMetadata=function(e,t){return r(o,void 0,void 0,function(){var n,a,o,u,s,c,h=this;return i(this,function(d){switch(d.label){case 0:return n=function(){return r(h,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return"metadata-constraints.yaml",[4,f(e,t,"metadata-constraints.yaml")];case 1:return[2,n.sent()]}})})},a=function(){return r(h,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return"metadata-references.yaml",[4,f(e,t,"metadata-references.yaml")];case 1:return[2,n.sent()]}})})},s=(u=Promise).all,[4,a()];case 1:return c=[d.sent()],[4,n()];case 2:return[4,s.apply(u,[c.concat([d.sent()])])];case 3:return o=d.sent(),[2,new(l.Metadata.bind.apply(l.Metadata,[void 0,t].concat(o)))]}})})}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),u=a(n(6)),s=function(e,t){return e+":"+t},c=function(e){return e+":constraints"},l=function(e){return e+":references"},f=function(e){return e+":version"},h=function(){function e(e,t){var n=this;this.makeTableKey=function(e){return s(n.prefix,e)},this.makeConstraintsKey=function(){return c(n.prefix)},this.makeReferencesKey=function(){return l(n.prefix)},this.makeVersionKey=function(){return f(n.prefix)},this.redis=e,this.prefix=t}return e.prototype.mset=function(e,t){return r(this,void 0,void 0,function(){var n,r,a;return i(this,function(i){switch(i.label){case 0:return 0===t.length?[2]:(r=this.makeTableKey(e),a=u.flatten(t.map(function(e){return[e.id.toString(),JSON.stringify(e)]})),[4,(n=this.redis).hmset.apply(n,[r].concat(a))]);case 1:return i.sent(),[2]}})})},e.prototype.mget=function(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=this.makeTableKey(e),[4,this.redis.hgetall(t)];case 1:return n=i.sent(),r=u.values(n),[2,r.map(function(e){return{val:JSON.parse(e)}}).sort(function(e,t){return function(e,t){if("number"==typeof e.id&&"number"==typeof t.id)return e.id-t.id;if("string"==typeof e.id&&"string"==typeof t.id)return e.id.localeCompare(t.id);throw new Error("invalid format: compare "+typeof e.id+" and "+typeof t.id)}(e.val,t.val)}).map(function(e){return e.val})]}})})},e.prototype.get=function(e,t){return r(this,void 0,void 0,function(){var n,r,a;return i(this,function(i){switch(i.label){case 0:return n=this.makeTableKey(e),r=t.toString(),[4,this.redis.hget(n,r)];case 1:return[2,(a=i.sent())?JSON.parse(a):void 0]}})})},e.prototype.saveTable=function(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=e.name,n=e.items,r=this.makeTableKey(t),[4,this.redis.del(r)];case 1:return i.sent(),[4,this.mset(t,n)];case 2:return i.sent(),[2]}})})},e.prototype.loadTable=function(e){return r(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return[4,this.mget(e)];case 1:return t=n.sent(),[2,new o.Table(e,t)]}})})},e.prototype.dropTable=function(e){return r(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return t=this.makeTableKey(e),[4,this.redis.del(t)];case 1:return[2,!!n.sent()]}})})},e.prototype.saveMetadata=function(e){return r(this,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,this.redis.mset(this.makeVersionKey(),e.version,this.makeReferencesKey(),JSON.stringify(e.references),this.makeConstraintsKey(),JSON.stringify(e.constraints))];case 1:return t.sent(),[2]}})})},e.prototype.touchVersion=function(){return r(this,void 0,void 0,function(){var e,t,n;return i(this,function(r){switch(r.label){case 0:return e=this.makeVersionKey(),[4,this.redis.get(e)];case 1:return(t=r.sent())?t.endsWith("-dirty")?[3,3]:(n=t+"-dirty",[4,this.redis.set(e,n)]):[3,3];case 2:r.sent(),r.label=3;case 3:return[2]}})})},e.prototype.loadMetadata=function(){return r(this,void 0,void 0,function(){var e,t,n,r,a;return i(this,function(i){switch(i.label){case 0:return[4,this.redis.get(this.makeVersionKey())];case 1:return e=i.sent(),[4,this.redis.get(this.makeReferencesKey())];case 2:return t=i.sent(),[4,this.redis.get(this.makeConstraintsKey())];case 3:return n=i.sent(),e&&t&&n?(r=JSON.parse(t),a=JSON.parse(n),[2,new o.Metadata(e,r,a)]):[2,new o.Metadata("NULL",[],[])]}})})},e.prototype.dropMetadata=function(){return r(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this.redis.del(this.makeVersionKey(),this.makeReferencesKey(),this.makeConstraintsKey())];case 1:return e.sent(),[2]}})})},e}();t.TableCache=h},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,a){function o(e){try{s(r.next(e))}catch(e){a(e)}}function u(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,u)}s((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},o=this;Object.defineProperty(t,"__esModule",{value:!0});var u=n(26),s=n(2),c=a(n(6)),l=function(){function e(e,t){this.auth=e,this.metadataSheetId=t}return e.prototype.fetchReferences=function(){return r(this,void 0,void 0,function(){var e;return i(this,function(t){switch(t.label){case 0:return e={table:"metadata-references",range:"A2:C",sheet:this.metadataSheetId},[4,this.fetchSheets([e])];case 1:return[2,t.sent()[0].values]}})})},e.prototype.fetchConstraints=function(){return r(this,void 0,void 0,function(){var e;return i(this,function(t){switch(t.label){case 0:return e={table:"metadata-constraints",range:"A2:E",sheet:this.metadataSheetId},[4,this.fetchSheets([e])];case 1:return[2,t.sent()[0].values]}})})},e.prototype.fetchSheets=function(e){return r(this,void 0,void 0,function(){var t,n,a,o,u,s=this;return i(this,function(l){switch(l.label){case 0:return t=c.groupBy(e,function(e){return e.table}),n=c.keys(t),a=n.map(function(e){return r(s,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return n=t[e],r=n[0].sheet,[4,this.fetch(r,n)];case 1:return[2,i.sent()]}})})}),u=(o=c).flatten,[4,Promise.all(a)];case 1:return[2,u.apply(o,[l.sent()])]}})})},e.prototype.fetch=function(e,t){return r(this,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return n=t.map(function(e){return s.toDataRange(e)}),[4,u.google.sheets({version:"v4",auth:this.auth}).spreadsheets.values.batchGet({spreadsheetId:e,ranges:n})];case 1:if(200!==(r=i.sent()).status)throw new Error("batchGet failed: "+r.statusText);if(!r.data.valueRanges)throw new Error("no values found");return[2,r.data.valueRanges.map(function(e){var t=s.sanitizeRange(e.range);return{name:s.getTableName(t),values:e.values}})]}})})},e}();t.GSheetDataSource=l,t.getJWTClient=function(e){return r(o,void 0,void 0,function(){var t;return i(this,function(n){return t=new u.google.auth.JWT(e.client_email,void 0,e.private_key,["https://www.googleapis.com/auth/spreadsheets"]),[2,new Promise(function(e,n){t.authorize(function(r,i){r?n(r):e(t)})})]})})}},function(e,t){e.exports=require("googleapis")}])});
//# sourceMappingURL=main.js.map