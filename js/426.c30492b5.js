"use strict";(self["webpackChunkvue3_project"]=self["webpackChunkvue3_project"]||[]).push([[426],{8426:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var i=n(3396),l=n(7139),o=n(9242);const d=t=>((0,i.dD)("data-v-19470571"),t=t(),(0,i.Cn)(),t),r={class:"dialog",ref:"dialog"},c={class:"dialog__wrapper"},a={class:"dialog__header"},u=d((()=>(0,i._)("label",{class:"dialog__input-error hidden",id:"input-error-title",for:"input-title"},"Введите название",-1))),s={class:"dialog__footer"};function p(t,e,n,d,p,m){const _=(0,i.up)("BaseButtonOut"),g=(0,i.up)("BaseButton");return(0,i.wg)(),(0,i.j4)(i.lR,{to:"#teleport-target"},[(0,i._)("div",r,[(0,i._)("div",c,[(0,i._)("div",a,[(0,i._)("span",null,(0,l.zw)(t.title),1),(0,i._)("span",{class:"dialog__header-close",title:"Закрыть",onClick:e[0]||(e[0]=(...e)=>t.cancel&&t.cancel(...e))})]),(0,i._)("form",{class:"dialog__content",onSubmit:e[7]||(e[7]=(...e)=>t.submit&&t.submit(...e))},[(0,i.wy)((0,i._)("input",{type:"text",id:"input-title",name:"card-title",class:"dialog__input dialog__input--title input-title",placeholder:"Название","onUpdate:modelValue":e[1]||(e[1]=e=>t.newProduct.title=e),required:"",onInput:e[2]||(e[2]=(...e)=>t.onTitleInput&&t.onTitleInput(...e))},null,544),[[o.nr,t.newProduct.title]]),u,(0,i.wy)((0,i._)("input",{type:"text",name:"card-category",class:"dialog__input input-category",placeholder:"Категория","onUpdate:modelValue":e[3]||(e[3]=e=>t.newProduct.category=e),required:""},null,512),[[o.nr,t.newProduct.category]]),(0,i.wy)((0,i._)("textarea",{name:"card-descr",class:"dialog__input dialog__input--descr input-descr",placeholder:"Описание","onUpdate:modelValue":e[4]||(e[4]=e=>t.newProduct.description=e)},null,512),[[o.nr,t.newProduct.description]]),(0,i.wy)((0,i._)("input",{name:"card-price",type:"number",class:"dialog__input input-price",placeholder:"Цена","onUpdate:modelValue":e[5]||(e[5]=e=>t.newProduct.price=e)},null,512),[[o.nr,t.newProduct.price]]),(0,i.wy)((0,i._)("input",{type:"url",class:"dialog__input input-image",placeholder:"URL изображения","onUpdate:modelValue":e[6]||(e[6]=e=>t.newProduct.image=e)},null,512),[[o.nr,t.newProduct.image]]),(0,i._)("div",s,[(0,i.Wm)(_,{class:"button button--second dialog__btn dialog__btn--close",caption:"Закрыть",onClick:t.cancel},null,8,["onClick"]),(0,i.Wm)(g,{class:"button button--primery dialog__btn dialog__btn--submit",caption:t.submitBtnTitle,type:"submit",onClick:t.submit},null,8,["caption","onClick"])])],32)])],512)])}var m=(0,i.aZ)({name:"ProductDialog",components:{},props:{product:Object},data(){return{newProduct:{}}},computed:{title(){return this.product?"Изменить текущий продукт":"Добавить новый продукт"},submitBtnTitle(){return this.product?"Обновить":"Добавить"}},emits:["submit","cancel"],methods:{stopScrolling(){document.body.style.paddingRight=window.innerWidth-document.documentElement.clientWidth+"px",document.body.style.overflow="hidden"},startScrolling(){document.body.style.overflow="auto",document.body.style.paddingRight="null"},cancel(){this.startScrolling(),this.$emit("cancel")},submit(t){t.preventDefault(),this.checkFormData()&&(this.startScrolling(),this.$emit("submit",this.newProduct))},clearInputErrors(){document.getElementById("input-error-title")?.classList.add("hidden")},checkFormData(){return this.newProduct.title?(document.getElementById("input-error-title")?.classList.add("hidden"),!0):(document.getElementById("input-error-title")?.classList.remove("hidden"),!1)},onTitleInput(){document.getElementById("input-error-title")?.classList.add("hidden")}},created(){this.product&&(this.newProduct={...this.product})},mounted(){this.stopScrolling(),document.addEventListener("click",(t=>{t.target===this.$refs["dialog"]&&this.cancel()}))}}),_=n(89);const g=(0,_.Z)(m,[["render",p],["__scopeId","data-v-19470571"]]);var h=g}}]);
//# sourceMappingURL=426.c30492b5.js.map