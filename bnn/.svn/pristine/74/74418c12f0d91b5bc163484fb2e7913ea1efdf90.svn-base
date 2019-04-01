import {DeviceType} from "../model/DeviceType"; 
import CommonFunc from "../utils/CommonFunc";

/**
 * APP交互管理类
 * 目前牛牛项目在APP中是已webview的形式跑的，真恶心
 */
export default class AppManager{

    protected static homePageUrl: string;
    private static copyResult: boolean;

    /**
     * 判断是否在APP内部运行
     */ 
    public static isApp(): boolean {
        let isApp: boolean;

        //打包成原生APP运行
        if(cc.sys.isNative){
            isApp = true;
        } else {
            //WEBVIEW形式 在APP运行
            let appType = window.parent.localStorage.getItem("appType");
            if (appType != undefined) {
                isApp = Boolean(parseInt(appType));
            } else {
                let params = CommonFunc.parserUrlParams();
                isApp = Boolean(parseInt(params["appType"]));
            }
        }
        return isApp;
    }

    // 获取设备类型
    public static getDeviceType(): DeviceType{
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isIOS && this.isApp) {
            return DeviceType.IOS;
        } else if (isAndroid && this.isApp) {
            return DeviceType.Android;
        } else {
            return DeviceType.Other;
        }
    }


    /**
     * 返回首页URL
     */
    public static getHomePageUrl(): string {
        if(!AppManager.homePageUrl){
            let url = window.parent.localStorage.getItem("backUrl");
            if(!url){
                let params = CommonFunc.parserUrlParams();
                url = params["backUrl"];
            }

            AppManager.homePageUrl = url;
        }

        return AppManager.homePageUrl || '';
    }

    /**
     * 返回首页
     */
    public static gotoHomePage(){

        let backUrl = this.getHomePageUrl();
        let deviceType = this.getDeviceType();

        if (deviceType == DeviceType.IOS) {
            window['webkit'].messageHandlers.NativeMethod.postMessage("backHome://"+backUrl);
        } else if(deviceType == DeviceType.Android) {
            window['openApp'].backHome(backUrl);
        }else{
            window.location.href = backUrl;
        }
    }

    /**
     * 输入框变更事件 android交互
     */
    public static textChangedForAndroid(text:string){
        if (this.getDeviceType() == DeviceType.Android) {
            window['openApp'].changeInput(text);
        }
    }

    /**
     * 调用原生复制后 原生会回调告知结果
     * @param result 复制结果 1:复制成功 0:复制失败
     */
    public static nativeClipBoardCallback(result: any){
        console.log("原生复制回调：" , result)
        AppManager.copyResult = (result == 1);   
    }

    /**
     * 复制到剪切板
     * @param text 要复制到剪切板的内容
     */
    public static copyToClipBoard(text: string){
        let deviceType = this.getDeviceType();
        
        if(text == undefined || text.trim() == ''){
            return;
        }

        AppManager.copyResult = false;
        //原生复制功能回调
        window['checkCopyResult'] = AppManager.nativeClipBoardCallback.bind(this);
        
        try {
            if (deviceType == DeviceType.IOS){
                // 调用原生复制功能
                window['webkit'].messageHandlers.NativeMethod.postMessage("copyString://" + text);
            } else if(deviceType == DeviceType.Android){
                // 调用原生复制功能
                window['openApp'].copyString(text);
            } else {
                // WEB平台使用JS复制
                AppManager.copyResult = this.jsCopy(text);
            }
        } catch (err) {
            console.log("复制失败：", err);
        }

        return AppManager.copyResult;
    }

    /**
     * WEB浏览器中使用 JS复制
     * @param text 要复制的内容
     */
    public static jsCopy(text: string): boolean{
        
        const el = document.createElement('textarea');

        el.value = text;

        // Prevent keyboard from showing on mobile
        el.setAttribute('readonly', '');

        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '12pt'; // Prevent zooming on iOS

        const selection = getSelection();
        let originalRange: Range;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }

        document.body.appendChild(el);
        el.select();

        // Explicit selection workaround for iOS
        el.selectionStart = 0;
        el.selectionEnd = text.length;

        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {}

        document.body.removeChild(el);

        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }
        cc.log("jsCopy: " + success);

        return success;
    }
} 