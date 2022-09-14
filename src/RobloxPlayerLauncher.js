const {execSync} = require("child_process")
const reg = require("rage-edit")
const clc = require("cli-color");
console.log(clc.green('██╗███╗░░██╗██████╗░██████╗░░█████╗░░██╗░░░░░░░██╗░██████╗███████╗██████╗░\n██║████╗░██║██╔══██╗██╔══██╗██╔══██╗░██║░░██╗░░██║██╔════╝██╔════╝██╔══██╗\n██║██╔██╗██║██████╦╝██████╔╝██║░░██║░╚██╗████╗██╔╝╚█████╗░█████╗░░██████╔╝\n██║██║╚████║██╔══██╗██╔══██╗██║░░██║░░████╔═████║░░╚═══██╗██╔══╝░░██╔══██╗\n██║██║░╚███║██████╦╝██║░░██║╚█████╔╝░░╚██╔╝░╚██╔╝░██████╔╝███████╗██║░░██║\n╚═╝╚═╝░░╚══╝╚═════╝░╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░╚═╝░░╚═════╝░╚══════╝╚═╝░░╚═╝'))
async function getPath() {
    let filepath = await reg.Registry.get("HKCR\\roblox\\shell\\open\\command", '')
    if (filepath.search("RobloxPlayerLauncher2.exe") !== -1) {
        filepath = filepath.replace("RobloxPlayerLauncher2.exe", "").replace("%1", "").replace('"', "").replace('"', "").replace(" ", "")
        return filepath
    }
    filepath = filepath.replace("RobloxPlayerLauncher.exe", "").replace("%1", "").replace('"', "").replace('"', "").replace(" ", "")
    return filepath
}

process.argv.forEach(async function (val, index, array) {
    const path = await getPath()
    if (val.search("LaunchExp") !== -1) {
        const newval = val.replace("InApp", "InBrowser")
        console.log(clc.green("Replaced InApp with InBrowser, enjoy!"))
        reg.Registry.set("HKCR\\roblox-player\\shell\\open\\command", "", '"'+path+'RobloxPlayerLauncher.exe" %1')
        execSync(path+'RobloxPlayerLauncher.exe ' +newval, {detached: true})
        reg.Registry.set("HKCR\\roblox-player\\shell\\open\\command", "", '"'+path+'RobloxPlayerLauncher2.exe" %1')
    }
});
