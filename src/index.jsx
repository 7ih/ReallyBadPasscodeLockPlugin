import { persist } from '@cumcord/pluginData';
import { useNest } from '@cumcord/utils';

useNest(persist);
cumcord.pluginData.showSettings();

persist.store.locked = false

cumcord.patcher.injectCSS(`
#pclwrapper {  
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}`);

let lock = function() {
    persist.store.locked = true
    cumcord.patcher.injectCSS(`.app-2CXKsg {filter: blur(.8rem);}`);
    const node = document.createElement("div");
    node.id = "pclwrapper";
    document.getElementsByClassName("app-3xd6d0")[0].appendChild(node);
}

let lockKey = async r => { 
    if (r.code == "F12" && !persist.store.locked) {
        r.preventDefault()
        lock()
    } 
} 

export default {
    onLoad() { 
        document.addEventListener("keydown", lockKey) ;
    }, 

    onUnload() { 
        document.removeEventListener("keydown", lockKey) ;
    },

    settings: () => (
        <TextInput
            note='You will have to enter this sequence to unlock discord'
            defaultValue=""
            onChange={val => (persist.store.passcode = val)}
        >
            Passcode
        </TextInput>
      ),
}