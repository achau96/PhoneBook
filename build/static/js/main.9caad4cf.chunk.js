(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=t(2),l=function(e){return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:e.handleFiltChange}))},s=t(3),i=t.n(s),m="/api/persons",f=function(){return i.a.get(m).then((function(e){return e.data}))},d=function(e){return i.a.post(m,e).then((function(e){return e.data}))},h=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},E=function(e){return r.a.createElement("button",{onClick:e.handleClick}," delete ")},p=function(e){return e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filt.toLowerCase())})).map((function(n){return r.a.createElement("div",{key:n.name},n.name," ",n.number,r.a.createElement(E,{handleClick:function(){return window.confirm("Delete ".concat(n.name,"?"))?b(n.id).then((function(){return e.setPersons(e.persons.filter((function(e){return e.id!==n.id})))})).catch((function(t){alert("the person '".concat(n.name,"' was already removed")),e.setPersons(e.persons.filter((function(e){return e.id!==n.id})))})):null}}))}))},g=function(e){var n=e.setError,t=e.setMessage,u=e.setNewNum,o=e.newName,l=e.newNum,s=e.handleNameChange,i=e.handleNumChange,m=e.setPersons,f=e.persons,b=e.setNewName,E=Object(a.useState)(null),p=Object(c.a)(E,2),g=p[0],v=p[1];Object(a.useEffect)((function(){null!==g?(h(g,w).then((function(e){m(f.map((function(n){return n.name!==o?n:e})))})).catch((function(e){n(!0),t("".concat(w.name," has already been deleted from server")),setTimeout((function(){t(null),n(!1)}),2e3)})),t("Changed ".concat(w.name,"'s number to ").concat(w.number)),v(null),setTimeout((function(){t(null)}),2e3)):console.log("null, do not run")}),[g]);var w={name:o,number:l};return r.a.createElement("form",{onSubmit:function(e){var n=!1;e.preventDefault(),f.forEach((function(e){return e.name===o?n=!0:null})),!1===n?d(w).then((function(e){m(f.concat(e)),b(""),u(""),t("Added ".concat(w.name)),setTimeout((function(){t(null)}),5e3),n=!1})):window.confirm("".concat(o," is already added to phonebook, replace old number with a new one?"))&&(f.forEach((function(e){return e.name===o?v(e.id):null})),console.log(w.name))}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:o,onChange:s})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:l,onChange:i})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.message,t=e.error;return null===n?null:!1===t?r.a.createElement("div",{className:"addName"},n):r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),s=Object(c.a)(o,2),i=s[0],m=s[1],d=Object(a.useState)(""),h=Object(c.a)(d,2),b=h[0],E=h[1],w=Object(a.useState)(""),N=Object(c.a)(w,2),j=N[0],O=N[1],C=Object(a.useState)(null),k=Object(c.a)(C,2),S=k[0],y=k[1],P=Object(a.useState)(!1),T=Object(c.a)(P,2),D=T[0],F=T[1];Object(a.useEffect)((function(){f().then((function(e){return u(e)}))}),[]),console.log("render",t.length,"persons");return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:S,error:D}),r.a.createElement(l,{handleFiltChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(g,{setError:F,setMessage:y,message:S,handleNameChange:function(e){m(e.target.value)},handleNumChange:function(e){E(e.target.value)},newName:i,newNum:b,persons:t,setPersons:u,setNewName:m,setNewNum:E}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(p,{persons:t,filt:j,setPersons:u}))};t(36);o.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.9caad4cf.chunk.js.map