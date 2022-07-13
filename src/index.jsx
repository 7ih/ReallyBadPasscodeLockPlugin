import { store as st } from '@cumcord/pluginData/persist';
import { ReactDOM } from '@cumcord/modules/common';
import { webpack } from '@cumcord/modules';
import TextInput from './Components/TextInput';         // components taken from ugly-patootie's plugins
import applystyles from "./styles.css";
applystyles();

// check if variables are set
if (typeof st.passcode !== "string")    st.passcode = "";
if (typeof st.locked !== "boolean")     st.locked = false;

//
// create password input
//

let passwordHandler = function(val) {
    if (val === st.passcode) {
        unlock();
    }
}


// #pclwrapper is neccessary for blocking inputs while locked
// also it has to be added with appendChild as to not replace every single other element

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

//
// end of password input
//

const blurElement = webpack.findByProps("notDevTools").notDevTools;
let blurScreen = function(blur) {
    cumcord.patcher.injectCSS(`.${blurElement} {filter: blur(${blur ? .8 : 0}rem);}`);
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

// 2 password boxes for confirming password
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