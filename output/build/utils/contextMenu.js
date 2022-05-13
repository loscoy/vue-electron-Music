"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onContextMenu = void 0;
const electron_1 = require("electron");
/**
 * @desc: 渲染进程点击自定义菜单项后,通过进程通讯调用主进程方法,实现渲染进程右键菜单
 * @param {string } key 如'fullScreen' 传参为methods中键名,
 */
function onContextMenu() {
    electron_1.ipcMain.on("contentMenu", (event, key) => {
        methods[key] && methods[key](event);
    });
}
exports.onContextMenu = onContextMenu;
// 打开控制台
const openDevTool = (e) => e.sender.openDevTools();
const fullScreen = async (e) => {
    const window = electron_1.BrowserWindow.fromWebContents(e.sender); // 获取窗口实例
    const isMac = process.platform == "darwin"; // 判断是否是mac
    if (isMac) {
        // mac进入/退出简单全屏模式
        const isSimpleFS = window.isSimpleFullScreen();
        window.setSimpleFullScreen(!isSimpleFS);
    }
    else {
        // win进入/退出全屏模式
        window.isMax ? window.setFullScreen(false) : window.setFullScreen(true);
        window.isMax = !window.isMax;
    }
};
const methods = {
    openDevTool,
    fullScreen,
};
