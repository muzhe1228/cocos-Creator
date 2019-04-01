import WindowController from "./WindowController";

// 等待开奖界面控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class WaitResultController extends cc.Component {

    @property(WindowController)
    private window: WindowController = null;

    @property(cc.Label)
    private hour: cc.Label = null;

    @property(cc.Label)
    private minute: cc.Label = null;

    @property(cc.Label)
    private second: cc.Label = null;

    @property(cc.Label)
    private millisecond: cc.Label = null;

    onLoad () {
        this.window.node.on('window-init', this.onWindowInit, this)
    }

    public show (tm: number) {
        this.window.open();
        this.setTime(tm);
    }

    public hide () {
        this.window.close();
    }

    private setTime (tm: number) {
        let date = new Date(tm);
        this.hour.string = ('00' + date.getHours()).slice(-2);
        this.minute.string = ('00' + date.getMinutes()).slice(-2);
        this.second.string = ('00' + date.getSeconds()).slice(-2);
        this.millisecond.string = ('000' + date.getMilliseconds()).slice(-3);
    }

    private onWindowInit () {
        this.window.setListenBackTouch(false);
        this.window.backMaskNode.addComponent(cc.BlockInputEvents);
    }

}
