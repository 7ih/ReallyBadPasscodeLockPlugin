<<<<<<< HEAD
import { store as st } from '@cumcord/pluginData/persist';
import { ReactDOM } from '@cumcord/modules/common';
import TextInput from './Components/TextInput';         // components taken from ugly-patootie's plugins

// check if variables are set
if (typeof st.passcode !== "string")    st.passcode = "";
if (typeof st.locked !== "boolean")     st.locked = false;

=======
console.log("run code")

import { store as st } from '@cumcord/pluginData/persist';
import { ReactDOM } from '@cumcord/modules/common';
import TextInput from './Components/TextInput';         // components taken from ugly-patootie's plugins

//st.locked = false

// check if variables are set
if (typeof st.passcode !== "string")    st.passcode = "";
if (typeof st.locked !== "boolean")     st.locked = false;

>>>>>>> c8c57b57531529eae48bdf919839c4caae867449
//
// create password input
//

let passwordHandler = function(val) {
    if (val === st.passcode) {
        unlock();
    }
}

// #pclwrapper is neccessary for blocking inputs while locked
// also it has to be added with appenChild as to not replace every single other element

const pclwrapper = document.createElement("div");
pclwrapper.id = "pclwrapper";

// #pclinputwrapper is so the textinput is displayed properly

const passcodeEntry = (
    <div id="pclinputwrapper">
        <TextInput
            id="pclinput"
            type="password"
            defaultValue=""
            onKeyDown={supressSpaces}
            onChange={passwordHandler}
            onPaste={preventAction}
        >
            Passcode
        </TextInput>
    </div>
)

ReactDOM.render(passcodeEntry, pclwrapper)
document.body.appendChild(pclwrapper);      // if wrapper isnt under body it will sometimes break input focusing

cumcord.patcher.injectCSS(`
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
}`);

//
// end of password input
//

let blurScreen = function(blur) {
    cumcord.patcher.injectCSS(`.notDevTools-1zkgfK {filter: blur(${blur ? .8 : 0}rem);}`);
}

let lock = function() {
    if (st.passcode.length === 0) return;

    blurScreen(true);
    $("pclinput").maxLength = st.passcode.length;
    pclwrapper.style.display = "block";
    $("pclinput").focus();
    st.locked = true;
}
let unlock = function() {
    blurScreen(false);
    pclwrapper.style.display = "none";
    pclinput.value = "";
    st.locked = false;
}

let lockKey = function(e) { 
    if  (e.code == "F12" && !st.locked) {
        e.preventDefault();
        lock();
    } 
} 

function $(id) {
    return document.getElementById(id);
}

function preventAction(e) {
    e.preventDefault();
};
function supressSpaces(e) {
    if (e.key === " ") e.preventDefault();
}

function checkIfPasscodesMatch(val) {
    if (($("pclpass1").value.length === 0) && ($("pclpass2").value.length == 0))    st.passcode = "";
    else if ($("pclpass1").value === $("pclpass2").value)                           st.passcode = val;
    else                                                                            st.passcode = "";
}

// lock discord when opened (if it was already locked)
lock();

export default {
    onLoad() { 
        document.addEventListener("keydown", lockKey);
    }, 
    onUnload() { 
        document.removeEventListener("keydown", lockKey);
        pclwrapper.remove();
    },

    settings: () => (
        <div>
            <TextInput
                id="pclpass1"
                type="password"
                note='You will have to enter this password to unlock discord (no spaces)'
                defaultValue={st.passcode}
                onKeyDown={supressSpaces}
                onChange={checkIfPasscodesMatch}
                onPaste={preventAction}
            >
                Passcode
            </TextInput>
            <TextInput
                id="pclpass2"
                type="password"
                note='Passwords must match in order for you to be able to lock discord'
                defaultValue={st.passcode}
                onKeyDown={supressSpaces}
                onChange={checkIfPasscodesMatch}
                onPaste={preventAction}
            >
                Confirm Passcode
            </TextInput>
        </div>
    )
}