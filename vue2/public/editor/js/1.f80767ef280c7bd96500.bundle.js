(window.adminTemplateEditor=window.adminTemplateEditor||[]).push([[1],{836:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return c}));var r=n(83);function a(e){return Object(r.a)({url:"/vue-element-admin/article/list",method:"get",params:e})}function o(e){return Object(r.a)({url:"/vue-element-admin/article/detail",method:"get",params:{id:e}})}function c(e){return Object(r.a)({url:"/vue-element-admin/article/create",method:"post",data:e})}},842:function(e,t,n){"use strict";n.r(t),n.d(t,"TableComplex",(function(){return E})),n.d(t,"TableDrag",(function(){return x})),n.d(t,"TableDynamic",(function(){return P})),n.d(t,"TableInlineEdit",(function(){return V}));var r=n(0),a=n.n(r),o=n(32),c=n(217),i=n(10),u=n(326),l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},s=function(e,t){t=t||{};var n=function(n){return a.a.createElement(i.FormLayout,l({},e.form),a.a.createElement(c.b,{schema:e.schema,components:t.components,scope:l(l({},u),t.scope)}),t.footer?t.footer():null)};return function(e){return a.a.createElement(n,{form:e})}},f=n(214),p=n(215),m=n(1),b=n(835),d=n(3),h=n(836),v=function(){return(v=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},y=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function c(e){try{u(r.next(e))}catch(e){o(e)}}function i(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}u((r=r.apply(e,t||[])).next())}))},g=function(e,t){var n,r,a,o,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,r=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(a=c.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){c.label=o[1];break}if(6===o[0]&&c.label<a[1]){c.label=a[1],a=o;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(o);break}a[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},w=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},E=function(){var e={schema:b.a.TableComplexTable,components:{RankCount:f.a,StatusTag:p.a,Container:"div",LinkCell:"span",Tag:d.Tag},scope:{PAGE:{fetchList:function(e,t){var n=this,r=t.query(".table").take();t.query(".pagination").take((function(t){return y(n,void 0,void 0,(function(){var n,a,o,c;return g(this,(function(i){switch(i.label){case 0:return n=t.value,a=n.size,o=n.current,[4,Object(h.c)(v({limit:a,page:o},e))];case 1:return c=i.sent().data,r.value=c.items,t.setComponentProps({total:c.total}),t.hidden=c.total<=0,[2]}}))}))}))},onSearch:function(e,t){return function(){var n=e.query(".filter").value(),r=(n.reviewer,w(n,["reviewer"]));t(r,e)}},useTablePaginationData:function(e,t){var n=Object(m.p)((function(){return Object(m.m)(e.query(".filter").value())})),r=(n.reviewer,w(n,["reviewer"]));return function(e){t(r,e.form)}},onOpenAddFormDialog:function(e){var t={scope:r,components:n};return function(){var e=this;Object(i.FormDialog)("Add",s(b.a.TableComplexTableAdd,t)).forOpen((function(e,t){t({initialValues:{importance:1,status:"published",timestamp:new Date}})})).forConfirm((function(t,n){return y(e,void 0,void 0,(function(){return g(this,(function(e){switch(e.label){case 0:return[4,Object(h.a)(v(v({},t.values),{id:parseInt((100*Math.random()).toString())+1024,author:"formily-element-admin"}))];case 1:return e.sent(),n(),[2]}}))}))})).forCancel((function(e,t){t()})).open().then((function(){d.notification.success({message:"Created Successfully",type:"success",duration:2})})).catch(d.message.warning)}},onOpenEditFormDialog:function(e){var t={scope:r,components:n};return function(){var n=this,r=e.query("..").value()[e.index];Object(i.FormDialog)("Edit",s(b.a.TableComplexTableEdit,t)).forOpen((function(e,t){t({initialValues:v(v({},r),{timestamp:new Date(r.timestamp)})})})).forConfirm((function(e,t){return y(n,void 0,void 0,(function(){return g(this,(function(n){switch(n.label){case 0:return[4,Object(h.a)(v(v({},e.values),{id:parseInt((100*Math.random()).toString())+1024,author:"formily-element-admin"}))];case 1:return n.sent(),t(),[2]}}))}))})).forCancel((function(e,t){t()})).open().then((function(){d.notification.success({message:"Update Successfully",type:"success",duration:2})})).catch(d.message.warning)}},onPublishClick:function(e){return function(){d.message.success("操作Success"),e.query(".status").take((function(e){return e.setValue("published")}))}},onDraftClick:function(e){return function(){d.message.success("操作Success"),e.query(".status").take((function(e){return e.setValue("draft")}))}},onDeleteClick:function(e){return function(){d.notification.success({message:"Delete Successfully",type:"success",duration:2}),e.query("..").take().remove(e.index)}}}}},t=e.schema,n=e.components,r=e.scope;return a.a.createElement("div",{className:"app-container"},a.a.createElement(o.e,{schema:t,components:n,scope:r,schemaKey:"TableComplexTable"}))},O=n(4),T=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function c(e){try{u(r.next(e))}catch(e){o(e)}}function i(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}u((r=r.apply(e,t||[])).next())}))},k=function(e,t){var n,r,a,o,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,r=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(a=c.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){c.label=o[1];break}if(6===o[0]&&c.label<a[1]){c.label=a[1],a=o;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(o);break}a[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},j=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),c=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)c.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return c},x=function(){var e=j(Object(r.useState)([]),2),t=(e[0],e[1],{schema:b.a.TableDragTable,components:{RankCount:f.a,StatusTag:p.a},scope:{PAGE:{useTableData:function(){var e=this;return function(t){return T(e,void 0,void 0,(function(){var e,n;return k(this,(function(r){switch(r.label){case 0:return[4,Object(h.c)({page:1,limit:10})];case 1:return e=r.sent().data,t.value=e.items,n=e.items.map((function(e){return e.id})).join(","),t.form.setValuesIn("oldList",n),[2]}}))}))}}}}}),n=t.schema,c=t.components,i=t.scope;return a.a.createElement("div",{className:"app-container"},a.a.createElement(o.e,{schema:n,components:c,scope:i,schemaKey:"TableDragTable"},a.a.createElement(O.b,{name:"oldList",component:[d.Input,{placeholder:"Please Input",style:{display:"none"}}]}),a.a.createElement(O.c,null,(function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"show-d"},a.a.createElement(d.Tag,null,"The default order :")," ",e.values.oldList),a.a.createElement("div",{className:"show-d"},a.a.createElement(d.Tag,null,"The after dragging order :")," ",e.values.table.map((function(e){return e.id})).join(",")))}))))},P=function(){var e={schema:b.a.TableDynamicTable,components:{Container:"div"},scope:{PAGE:{useColumnVisible:function(e){return function(t){var n=t.query(e).value();t.visible=n.includes(t.props.name)}},useColumnVisibleSort:function(e){return function(t){var n=t.query(e).value().indexOf(t.props.name);n>=0?(t.setComponentProps({index:n+1}),t.visible=!0):t.visible=!1}},useTableData:function(){return function(e){e.value=[{name:"fruit-1",apple:"apple-10",banana:"banana-10",orange:"orange-10"},{name:"fruit-2",apple:"apple-20",banana:"banana-20",orange:"orange-20"}]}}}}},t=e.schema,n=e.components,r=e.scope;return a.a.createElement("div",{className:"app-container"},a.a.createElement(o.e,{schema:t,components:n,scope:r,schemaKey:"TableDynamicTable"}))},C=n(16),S=n(35),D=function(){return(D=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},q=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function c(e){try{u(r.next(e))}catch(e){o(e)}}function i(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}u((r=r.apply(e,t||[])).next())}))},I=function(e,t){var n,r,a,o,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,r=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(a=c.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){c.label=o[1];break}if(6===o[0]&&c.label<a[1]){c.label=a[1],a=o;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(o);break}a[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},A=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),c=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)c.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return c},G=Object(C.b)((function(e){var t=Object(O.r)(),n=m.k.computed((function(){var n=!1;return e.fields.forEach((function(e){var r=t.query("."+e).take();n=n||"editable"===r.selfPattern})),n})),r=n.value?{type:"success",size:"small",icon:"el-icon-circle-check-outline"}:{type:"primary",size:"small",icon:"el-icon-edit"},o=n.value?function(){e.fields.forEach((function(e){t.query("."+e).take().setPattern("readPretty")}))}:function(){e.fields.forEach((function(e){t.query("."+e).take().setPattern("editable")}))};return a.a.createElement(S.Button,D({},e,r,{onClick:o}),n.value?e.ok||"Ok":e.edit||"Edit")})),V=function(){var e,t={schema:b.a.TableInlineEditTable,components:{RankCount:f.a,StatusTag:p.a,PAGE:{EditButton:G,InputWithCancel:Object(O.m)((e=i.Input,function(t){var n=Object(O.r)(),o=A(Object(r.useState)(n.value),2),c=o[0],i=o[1];return Object(r.useEffect)((function(){"editable"==n.selfPattern&&i(n.value)}),[n.selfPattern]),a.a.createElement(a.a.Fragment,null,a.a.createElement(e,D(D({},t),{style:{width:"calc(100% - 100px)"}})),a.a.createElement(S.Button,{className:"cancel-btn",size:"small",icon:"el-icon-refresh",type:"warning",onClick:function(){n.setValue(c),n.setPattern("readPretty"),d.message.warning("The title has been restored to the original value")},style:{position:"absolute",right:"15px",top:"10px"}},t.cancel||"cancel"))}),Object(O.p)(i.PreviewText.Input))}},scope:{PAGE:{useTableData:function(){var e=this;return function(t){return q(e,void 0,void 0,(function(){var e;return I(this,(function(n){switch(n.label){case 0:return[4,Object(h.c)({page:1,limit:10})];case 1:return e=n.sent().data,t.value=e.items,[2]}}))}))}}}}},n=t.schema,c=t.components,u=t.scope;return a.a.createElement("div",{className:"app-container"},a.a.createElement(o.e,{schema:n,components:c,scope:u,schemaKey:"TableInlineEditTable"}))}}}]);