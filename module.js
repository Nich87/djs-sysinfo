const readlineSync = require('readline-sync');
const si = require('systeminformation');
const child = require('child_process');

exports.getinfos = async function sysinfo(Discord, discord) {
    const cpu = await si.cpu();
    const disk = (await si.diskLayout())[0];
    const os = await si.osInfo();
    const versions = await si.versions();
    const ram = await si.mem();
    const user = await si.users();
    totalRam = Math.round(ram.total / 1024 / 1024 / 1024);
    const size = Math.round(disk.size / 1024 / 1024 / 1024);
    const args = process.argv.slice(5);

    console.info(`[INFO] OS:${os.distro} ${os.codename} (${os.platform})`)
    console.info(`[INFO] CPU:${cpu.manufacturer} ${cpu.brand} ${cpu.speed}GHz`)
    console.info(`[INFO] Cores:${cpu.cores} (${cpu.physicalCores}Physical Cores)`)
    console.info(`[INFO] RAM:${totalRam} GB`)
    console.info(`[INFO] Disk:${disk.vendor} ${disk.name} ${size} GB ${disk.type} (${disk.interfaceType})`)
    console.info(`[INFO] Kernel:${os.kernel} ${os.arch}`)
    if (discord && discord !== undefined) console.info(`[INFO] discord.js:${discord.version}`)
    else if (Discord && Discord !== undefined) console.info(`[INFO] discord.js:${Discord.version}`)
    console.info(`[INFO] Node: v${versions.node}`)
    console.info(`[INFO] V8: ${versions.v8}`)
    console.info(`[INFO] Run Dir:${process.argv[1]}`)
    console.info(`[INFO] Run cmds:${process.argv}`)

    if (readlineSync.keyInYN('[TREE]Continue?')) {
        console.log('[TREE]')
        let wincmd = "tree ./ /f";
        child.exec(wincmd, (err, res) => {
            if (err) console.error(err);
            console.log(res.slice(0, 200));
        });
    } else {
        console.log(console.warn('[WARN]Canceled.'))
        process.exit()
    }
}
