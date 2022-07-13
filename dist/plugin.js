(function(h,t,w,c){"use strict";function v(e){if(e&&e.__esModule)return e;var l=Object.create(null);return e&&Object.keys(e).forEach(function(s){if(s!=="default"){var g=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(l,s,g.get?g:{enumerable:!0,get:function(){return e[s]}})}}),l.default=e,Object.freeze(l)}var o=v(h);const b=c.webpack.findByDisplayName("FormItem"),k=c.webpack.findByDisplayName("FormText"),n={...c.webpack.findByProps("marginBottom20"),...c.webpack.findByProps("formText"),...c.webpack.findByDisplayName("Flex")};var E=e=>o.createElement(b,{title:e.title,required:e.required,className:`${n.Direction.VERTICAL} ${n.Justify.START} ${n.Align.STRETCH} ${n.Wrap.NO_WRAP} ${n.marginBottom20}`},e.children,e.note&&o.createElement(k,{className:`${n.description} ${n.marginTop8}`},e.note));const D=c.webpack.findByDisplayName("TextInput");var d=e=>{const l=e.children;return delete e.children,o.createElement(E,{title:l,required:e.required,note:e.note},o.createElement(D,{...e}))};console.log("run code"),typeof t.store.passcode!="string"&&(t.store.passcode=""),typeof t.store.locked!="boolean"&&(t.store.locked=!1);let P=function(e){e===t.store.passcode&&$()};const a=document.createElement("div");a.id="pclwrapper";const T=o.createElement("div",{id:"pclinputwrapper"},o.createElement(d,{id:"pclinput",type:"password",defaultValue:"",onKeyDown:p,onChange:P,onPaste:i},"Passcode"));w.ReactDOM.render(T,a),document.body.appendChild(a),cumcord.patcher.injectCSS(`
#pclwrapper {  
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
}
#pclinputwrapper {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 50px;
}`);let u=function(e){cumcord.patcher.injectCSS(`.notDevTools-1zkgfK {filter: blur(${e?.8:0}rem);}`)},m=function(){t.store.passcode.length!==0&&(u(!0),r("pclinput").maxLength=t.store.passcode.length,a.style.display="block",r("pclinput").focus(),t.store.locked=!0)},$=function(){u(!1),a.style.display="none",pclinput.value="",t.store.locked=!1},f=function(e){e.code=="F12"&&!t.store.locked&&(e.preventDefault(),m())};function r(e){return document.getElementById(e)}function i(e){e.preventDefault()}function p(e){e.key===" "&&e.preventDefault()}function y(e){r("pclpass1").value.length===0&&r("pclpass2").value.length==0?t.store.passcode="":r("pclpass1").value===r("pclpass2").value?t.store.passcode=e:t.store.passcode=""}m();var B={onLoad(){document.addEventListener("keydown",f)},onUnload(){document.removeEventListener("keydown",f),a.remove()},settings:()=>o.createElement("div",null,o.createElement(d,{id:"pclpass1",type:"password",note:"You will have to enter this password to unlock discord (no spaces)",defaultValue:t.store.passcode,onKeyDown:p,onChange:y,onPaste:i},"Passcode"),o.createElement(d,{id:"pclpass2",type:"password",note:"Passwords must match in order for you to be able to lock discord",defaultValue:t.store.passcode,onKeyDown:p,onChange:y,onPaste:i},"Confirm Passcode"))};return B})(cumcord.modules.common.React,cumcord.pluginData.persist,cumcord.modules.common,cumcord.modules);
