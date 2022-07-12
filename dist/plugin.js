(function(s,t,d){"use strict";function u(e){if(e&&e.__esModule)return e;var o=Object.create(null);return e&&Object.keys(e).forEach(function(r){if(r!=="default"){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(o,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}}),o.default=e,Object.freeze(o)}var a=u(s);d.useNest(t.persist),cumcord.pluginData.showSettings(),t.persist.store.locked=!1,cumcord.patcher.injectCSS(`
#pclwrapper {  
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}`);let i=function(){t.persist.store.locked=!0,cumcord.patcher.injectCSS(".app-2CXKsg {filter: blur(.8rem);}");const e=document.createElement("div");e.id="pclwrapper",document.getElementsByClassName("app-3xd6d0")[0].appendChild(e)},c=async e=>{e.code=="F12"&&!t.persist.store.locked&&(e.preventDefault(),i())};var l={onLoad(){document.addEventListener("keydown",c)},onUnload(){document.removeEventListener("keydown",c)},settings:()=>a.createElement(TextInput,{note:"You will have to enter this sequence to unlock discord",defaultValue:"",onChange:e=>t.persist.store.passcode=e},"Passcode")};return l})(cumcord.modules.common.React,cumcord.pluginData,cumcord.utils);
