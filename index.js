(()=>{var pt=Object.defineProperty,ft=Object.defineProperties;var mt=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var $t=Object.prototype.hasOwnProperty,kt=Object.prototype.propertyIsEnumerable;var R=(s,i,l)=>i in s?pt(s,i,{enumerable:!0,configurable:!0,writable:!0,value:l}):s[i]=l,_=(s,i)=>{for(var l in i||(i={}))$t.call(i,l)&&R(s,l,i[l]);if(S)for(var l of S(i))kt.call(i,l)&&R(s,l,i[l]);return s},g=(s,i)=>ft(s,mt(i));(function(){"use strict";const s="SAVE",i="CHANGE",l="REVERT",p="LANGUAGES_UPDATE",h="TRANSLATIONS_UPDATE",f="TRANSLATION_GROUP_ADD",m="TRANSLATION_GROUP_REMOVE",$="TRANSLATION_ADD",k="TRANSLATION_EDIT",T="TRANSLATION_REMOVE";var x={[p]({commit:t},a){t("updateLanguages",a)},[h]({commit:t},a){t("udpateTranslations",a)},[f]({commit:t},a){t("addTranslationGroup",a)},[m]({commit:t},a){t("removeTranslationGroup",a)},[$]({commit:t},a){t("addTranslation",a)},[T]({commit:t},a){t("removeTranslation",a)},[k]({commit:t},a){t("editTranslation",a)},[s]({state:t}){localStorage.setItem("$localizer$",JSON.stringify(t.translations))},[i]({commit:t,state:a}){var o;const e=(o=localStorage.getItem("$localizer$"))!=null?o:"",n=JSON.stringify(a.translations);t("dirty",e!==n)},[l]({state:t}){const a=JSON.parse(localStorage.getItem("$localizer$"));a&&(t.translations=a)}},N={languages(t){const a=t.translations.map(({language:e})=>e.id);return t.languages.map(e=>g(_({},e),{disabled:a.includes(e.id)}))},getTranslationsForLanguage:t=>a=>t.translations.filter(({language:e})=>e.id===a).map(({translations:e})=>e.map(n=>n.key)).flat()},O=()=>({languages:[],translations:[],dirty:!1}),I={updateLanguages(t,a){t.languages=a},udpateTranslations(t,a){t.translations=a},addTranslationGroup(t,a){t.translations.push({language:a,translations:[]})},removeTranslationGroup(t,a){t.translations=t.translations.filter(e=>e.language.id!==a)},addTranslation(t,a){const e=t.translations.findIndex(({language:n})=>n.id===a.id);e!==-1&&t.translations[e].translations.push(a.item)},removeTranslation(t,a){const e=t.translations.findIndex(({language:n})=>n.id===a.id);e!==-1&&(t.translations[e].translations=[...t.translations[e].translations.filter(n=>n.key!==a.key)])},editTranslation(t,a){const e=t.translations.findIndex(({language:n})=>n.id===a.id);e!==-1&&(t.translations[e].translations=[...t.translations[e].translations.map(n=>n.key===a.key?g(_({},n),{override:a.override}):n)])},dirty(t,a){t.dirty=a}},w={actions:x,getters:N,state:O,mutations:I},G=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("k-button-group",[e("k-button",{attrs:{icon:"add"},on:{click:function(n){return t.$refs.dialog.open()}}},[t._v("Add Language")]),e("k-dialog",{ref:"dialog"},[e("header",[e("k-headline",[t._v("Select language")]),e("k-text",{attrs:{size:"small",theme:"help"}},[t._v(" Please pick one of all available languages you want to customize... ")])],1),e("k-items",{staticClass:"k-panel-localizer-translations"},t._l(t.languages,function(n){return e("k-item",{key:n.id,class:{disabled:n.disabled},attrs:{text:n.name,info:n.id},on:{click:function(o){return t.selectLanguage(n)}}})}),1),e("template",{slot:"footer"},[e("k-button-group",[e("k-button",{attrs:{icon:"cancel"},on:{click:t.cancel}},[t._v("Cancel")]),e("k-button",{attrs:{icon:"check"},on:{click:t.addTranslationGroup}},[t._v("Add")])],1)],1)],2)],1)},P=[],Tt="";function u(t,a,e,n,o,v,A,gt){var r=typeof t=="function"?t.options:t;a&&(r.render=a,r.staticRenderFns=e,r._compiled=!0),n&&(r.functional=!0),v&&(r._scopeId="data-v-"+v);var c;if(A?(c=function(d){d=d||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!d&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(d=__VUE_SSR_CONTEXT__),o&&o.call(this,d),d&&d._registeredComponents&&d._registeredComponents.add(A)},r._ssrRegister=c):o&&(c=gt?function(){o.call(this,(r.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(r.functional){r._injectStyles=c;var ht=r.render;r.render=function(vt,E){return c.call(E),ht(vt,E)}}else{var C=r.beforeCreate;r.beforeCreate=C?[].concat(C,c):[c]}return{exports:t,options:r}}const F={name:"LocalizerLanguageDialog",props:{openDialog:{type:Function,default:null}},data(){return{language:{}}},computed:{languages(){return this.$store.getters.languages}},methods:{selectLanguage(t){this.language=t},addTranslationGroup(){this.$store.dispatch(f,this.language),this.$refs.dialog.close(),this.language={}},cancel(){this.$refs.dialog.close()}}},L={};var M=u(F,G,P,!1,U,"30625634",null,null);function U(t){for(let a in L)this[a]=L[a]}var V=function(){return M.exports}(),j=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.entry.translations.length>0?e("table",[t._m(0),t._l(t.entry.translations,function(n,o){return e("tr",{key:n.key},[e("td",[e("code",[t._v(t._s(n.key))])]),e("td",[t._v(t._s(n.text))]),n.override?e("td",[e("b",[t._v(t._s(n.override))])]):t._e(),n.override?t._e():e("td",[t._v("\u2013")]),e("td",[e("k-dropdown",[e("k-button",{attrs:{icon:"dots"},on:{click:function(v){return t.$refs.dropdown[o].toggle()}}}),e("k-dropdown-content",{ref:"dropdown",refInFor:!0,attrs:{align:"right",options:[{icon:"edit",text:"Edit",click:function(){return t.$emit("edit",{id:t.entry.language.id,key:n.key,text:n.text,override:n.override})}},{icon:"trash",text:"Delete",click:function(){return t.$emit("remove",{id:t.entry.language.id,key:n.key})}}]}})],1)],1)])})],2):e("k-empty",{attrs:{layout:"cards"},on:{click:function(n){return t.$emit("add",t.entry.language.id)}}},[t._v(" Add your first translation. ")])},H=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",[e("th",[t._v("Key")]),e("th",[t._v("Text")]),e("th",[t._v("Override")]),e("th")])}],Lt="";const J={name:"LocalizerTranslationListEntry",props:{entry:{type:Object,default:null}}},y={};var K=u(J,j,H,!1,X,null,null,null);function X(t){for(let a in y)this[a]=y[a]}var B=function(){return K.exports}(),W=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.pagedTranslationDataList.length?e("article",[e("k-items",{staticClass:"k-panel-localizer-translations"},t._l(t.pagedTranslationDataList,function(n){return e("k-item",{key:n.key,class:{disabled:n.disabled},attrs:{text:n.text,info:n.key,layout:"cards"},on:{click:function(o){return t.$emit("select",n)}}})}),1),e("k-pagination",{ref:"pagination",attrs:{align:"center",details:!0,limit:t.pagination.limit,total:t.paginationTotal},on:{paginate:t.updatePagination}})],1):e("k-loader")},Y=[],yt="";const q={name:"LocalizerTranslations",props:{code:{type:String,default:""}},data(){return{translations:[],pagination:{limit:10,total:0,page:1}}},computed:{paginationTotal(){return this.translationDataList.length},translationDataList(){return Object.keys(this.translations).length===0?[]:Object.entries(this.translations).map(t=>({key:t[0],text:t[1],disabled:this.selectedTranslations.includes(t[0])}))},pagedTranslationDataList(){return this.translationDataList.length===0?[]:this.translationDataList.slice(this.pagination.offset).slice(0,this.pagination.limit)},selectedTranslations(){return this.$store.getters.getTranslationsForLanguage(this.code)}},mounted(){this.fetchTranslations()},methods:{async fetchTranslations(){const{data:t}=await this.$api.get(`translations/${this.code}`);this.translations=t},updatePagination(t){this.pagination=t}}},D={};var Q=u(q,W,Y,!1,Z,"4c4b853e",null,null);function Z(t){for(let a in D)this[a]=D[a]}var tt=function(){return Q.exports}(),et=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t.translationList.length?e("div",t._l(t.translationList,function(n){return e("section",{key:n.language.id,staticClass:"k-localizer-section"},[e("header",{staticClass:"k-section-header"},[e("k-headline",[t._v(" "+t._s(n.language.name)+" "),e("abbr",[t._v(t._s(n.language.id))])]),e("k-button-group",{attrs:{buttons:[{text:t.$t("add"),icon:"add",click:function(){return t.openTranslationDialog(n.language.id)}},{text:t.$t("delete"),icon:"trash",click:function(){return t.openDeleteDialog(n)}}]}})],1),e("LocalizerTranslationListEntry",{attrs:{entry:n},on:{add:function(o){return t.openTranslationDialog(o)},remove:t.removeFromGroup,edit:t.openTranslationEditDialog}})],1)}),0):e("k-empty",[t._v("Start by adding a language which you want to adapt.")]),e("k-dialog",{ref:"deleteDialog",attrs:{"submit-button":"Delete",theme:"negative",icon:"trash"},on:{submit:t.removeTranslationGroup}},[e("header",[e("k-headline",[t._v("Delete \xBB"+t._s(t.dialogContent.language.name)+"\xAB")]),e("k-text",{attrs:{size:"small",theme:"help"}},[t._v(" Do you really want to delete all custom translations for this language? ")])],1)]),e("k-dialog",{ref:"addDialog",attrs:{"submit-button":"Add",theme:"positive",icon:"add",size:"medium"},on:{submit:t.addSelectedTranslation}},[e("header",[e("k-headline",[t._v("Add translation")]),e("k-text",{attrs:{size:"small",theme:"help"}},[t._v(" Select the translation you want to override.")])],1),e("LocalizerTranslations",{attrs:{code:t.code},on:{select:t.select}})],1),e("k-dialog",{ref:"editDialog",attrs:{"submit-button":"Save",theme:"positive",icon:"add",size:"medium"},on:{submit:t.saveEditedTranslation}},[e("header",{staticClass:"edit-dialog-header"},[e("k-headline",[e("code",[t._v(t._s(t.editDialogContent.key))]),e("abbr",[t._v(t._s(t.editDialogContent.id))])]),e("k-text",{attrs:{size:"small",theme:"help"}},[t._v("Define your custom translation override.")])],1),e("k-form",{attrs:{fields:{override:{label:!1,counter:!1,buttons:!1,help:t.editDialogContent.text,type:"textarea"}}},model:{value:t.editDialogContent,callback:function(n){t.editDialogContent=n},expression:"editDialogContent"}})],1)],1)},at=[],Dt="";const nt={name:"LocalizerTranslationList",components:{LocalizerTranslationListEntry:B,LocalizerTranslations:tt},data(){return{code:null,selected:{},dialogContent:{language:{},translations:[]},editDialogContent:{},translationCollection:[]}},computed:{translationList(){return this.$store.state.localizer.translations}},methods:{removeTranslationGroup(){this.$store.dispatch(m,this.dialogContent.language.id),this.$refs.deleteDialog.close()},openDeleteDialog(t){this.dialogContent=t,this.$refs.deleteDialog.open()},openTranslationDialog(t){this.code=t,this.$refs.addDialog.open()},openTranslationEditDialog(t){this.editDialogContent=g(_({},t),{override:t.override||t.text}),this.$refs.editDialog.open()},select(t){this.selected=t},addSelectedTranslation(){this.$store.dispatch($,{id:this.code,item:this.selected}),this.$refs.addDialog.close()},removeFromGroup(t){this.$store.dispatch(T,t)},saveEditedTranslation(){this.$store.dispatch(k,this.editDialogContent),this.$refs.editDialog.close(),this.editDialogContent={}}}},b={};var it=u(nt,et,at,!1,st,null,null,null);function st(t){for(let a in b)this[a]=b[a]}var ot=function(){return it.exports}(),rt=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("k-inside",[e("k-view",{staticClass:"k-localizer"},[e("k-header",{staticClass:"k-localizer-header"},[e("div",{staticClass:"headline-wrap"},[t._v("Localizer "),e("span",{staticClass:"beta-badge"},[t._v("BETA")])]),e("k-text",{attrs:{slot:"right"},slot:"right"},[e("span",{staticClass:"k-localizer-header-desc"},[t._v("Override Panel and Plugin translations.")])]),e("LocalizerLanguageDialog",{attrs:{slot:"left"},slot:"left"})],1),e("LocalizerTranslationList"),t.isDirty?e("k-button-group",[e("nav",{staticClass:"k-form-buttons",attrs:{"data-theme":"notice"}},[e("k-view",[e("k-button",{staticClass:"k-form-button",attrs:{text:t.$t("revert"),icon:"undo",disabled:t.isLoading},on:{click:t.revert}}),e("k-button",{staticClass:"k-form-button",attrs:{text:t.$t("save"),icon:"check",disabled:t.isLoading},on:{click:t.save}})],1),e("k-dialog",{ref:"revert",attrs:{"submit-button":t.$t("revert"),icon:"undo",theme:"negative"},on:{submit:t.revert}},[e("k-text",{domProps:{innerHTML:t._s(t.$t("revert.confirm"))}})],1)],1)]):t._e(),e("k-dialog",{ref:"reloadDialog",attrs:{"submit-button":"Reload",theme:"positive",icon:"undo"},on:{submit:t.reload}},[e("header",[e("k-headline",[t._v("Reload Panel?")]),e("k-text",{attrs:{size:"small",theme:"help"}},[t._v(" In order to apply your changes, you need to reload the panel manually. ")])],1)])],1)],1)},lt=[],bt="";const dt={name:"TranslationOverride",components:{LocalizerTranslationList:ot,LocalizerLanguageDialog:V},data(){return{initiallyLoaded:!1}},computed:{isLoading(){return this.$store.state.isLoading},translations(){return this.$store.state.localizer.translations},isDirty(){return this.$store.state.localizer.dirty}},created(){this.$store.registerModule("localizer",w),this.$store.watch(t=>t.localizer.translations,()=>{this.initiallyLoaded&&this.$store.dispatch(i),this.initiallyLoaded=!0},{deep:!0})},mounted(){this.loadLanguages(),this.loadTranslations()},methods:{async loadLanguages(){const{data:t}=await this.$api.get("/translations");this.$store.dispatch(p,t)},async loadTranslations(){const t=await this.$api.get("/localizer/translations");this.$store.dispatch(h,t),this.$store.dispatch(s)},async save(){await this.$api.post("/localizer/translations",this.translations),this.$store.dispatch(h,this.translations),this.$store.dispatch(s),this.$store.dispatch(i),this.$refs.reloadDialog.open()},revert(){this.$store.dispatch(l),this.$store.dispatch(s),this.$store.dispatch(i)},reload(){window.location.reload()}}},z={};var ct=u(dt,rt,lt,!1,ut,"4a40de7e",null,null);function ut(t){for(let a in z)this[a]=z[a]}var _t=function(){return ct.exports}();window.panel.plugin("gearsdigital/localizer-for-kirby",{components:{"k-panel-localizer-area":_t}})})();})();
