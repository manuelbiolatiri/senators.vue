(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc2299fc"],{5865:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._m(0),r("b-form",{on:{submit:e.onSubmit,reset:e.onReset}},[r("b-form-group",{attrs:{id:"input-group-1",label:"Email address:","label-for":"input-1",description:"We'll never share your email with anyone else."}},[r("b-form-input",{attrs:{id:"input-1",type:"email",placeholder:"Enter email",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),r("b-form-group",{attrs:{id:"input-group-2",label:"Your Password:","label-for":"input-2"}},[r("b-form-input",{attrs:{id:"input-2",placeholder:"Enter name",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("b-form-group",{attrs:{id:"input-group-3",label:"Your firstname:","label-for":"input-2"}},[r("b-form-input",{attrs:{id:"input-3",placeholder:"Enter firstname",required:""},model:{value:e.firstName,callback:function(t){e.firstName=t},expression:"firstName"}})],1),r("b-form-group",{attrs:{id:"input-group-4",label:"Your lastname:","label-for":"input-4"}},[r("b-form-input",{attrs:{id:"input-4",placeholder:"Enter lastname",required:""},model:{value:e.lastName,callback:function(t){e.lastName=t},expression:"lastName"}})],1),r("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")]),r("b-button",{attrs:{type:"reset",variant:"danger"}},[e._v("Reset")])],1)],1)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mb-4"},[r("h1",[e._v("Add a Senator")])])}],i=r("1da1"),s=(r("b0c0"),r("96cf"),r("5e3b")),o={data:function(){return{email:"",password:"",firstName:"",lastName:""}},methods:{onSubmit:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.preventDefault(),t.email&&t.password){r.next=4;break}return alert("Please fill in your ".concat(t.email||t.password)),r.abrupt("return");case 4:return a={email:t.email,password:t.password,firstName:t.firstName,lastName:t.lastName},t.responseAvailable=!1,r.next=8,s["a"].create(a);case 8:n=r.sent,console.log("userLogin",n);case 10:case"end":return r.stop()}}),r)})))()},onReset:function(e){var t=this;e.preventDefault(),this.form.email="",this.form.name="",this.form.food=null,this.form.checked=[],this.show=!1,this.$nextTick((function(){t.show=!0}))}}},l=o,u=r("2877"),c=Object(u["a"])(l,a,n,!1,null,null,null);t["default"]=c.exports},b0c0:function(e,t,r){var a=r("83ab"),n=r("9bf2").f,i=Function.prototype,s=i.toString,o=/^\s*function ([^ (]*)/,l="name";a&&!(l in i)&&n(i,l,{configurable:!0,get:function(){try{return s.call(this).match(o)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-dc2299fc.56e6948d.js.map