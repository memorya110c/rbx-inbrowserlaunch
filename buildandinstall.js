const exe = require('@angablue/exe');
const reg = require("rage-edit")
const fs = require("fs")
async function getPath() {
    let filepath = await reg.Registry.get("HKCR\\roblox\\shell\\open\\command", '')
    console.log(filepath)
    if (filepath.search("RobloxPlayerLauncher2.exe") !== -1) {
        filepath = filepath.replace("RobloxPlayerLauncher2.exe", "").replace("%1", "").replace('"', "").replace('"', "").replace(" ", "")
        return filepath
    }
    filepath = filepath.replace("RobloxPlayerLauncher.exe", "").replace("%1", "").replace('"', "").replace('"', "").replace(" ", "")
    return filepath
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}

console.log("Building application, please wait.")
const build = exe({
    entry: './src/RobloxPlayerLauncher.js',
    out: './build/RobloxPlayerLauncher.exe',
    pkg: [ '--public'],
    version: '1.6.0.45557',
    target: 'node16-win-x64',
    icon: './icon/rbx.ico'
});

build.then(async function() {
    console.log('Build completed! Installing to Roblox directory')
    const path = await getPath()
    const compiledsize = getFilesizeInBytes("./build/RobloxPlayerLauncher.exe")
    if (getFilesizeInBytes(path+"\\RobloxPlayerLauncher.exe") == compiledsize) {
        console.log("Installation cancelled, another up-to-date installation was detected.")
        return
    }
    reg.Registry.set("HKCR\\roblox-player\\shell\\open\\command", "", '"'+path+'RobloxPlayerLauncher2.exe" %1')
    fs.rename("./build/RobloxPlayerLauncher.exe", path+"RobloxPlayerLauncher2.exe", function() {})
    console.log("Done! You will no longer on InApp. (you will have to rerun this after every update)")
})