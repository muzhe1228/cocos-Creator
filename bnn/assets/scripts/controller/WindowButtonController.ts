import WindowController from "./WindowController";
import BaseComponent from "../utils/BaseComponent";

// 通用弹窗按钮控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class WindowButtonController extends BaseComponent {

    @property(cc.Button)
    protected button: cc.Button = null;

    @property(WindowController)
    protected windowController: WindowController = null;

    // 手动指定弹框节点路径，用于当弹窗节点在预制体之外时使用
    @property(cc.String)
    protected windowPath: string = '';

    onLoad() {
        // 查找弹窗节点
        if (! this.windowController) this.windowController =
            cc.find(this.windowPath).getComponent(WindowController);
        this.button.node.on(cc.Node.EventType.TOUCH_END, this.onTouchCallback, this);
    }

    // 点击按钮的回调，打开或关闭弹窗，需要弹窗脚本有switch方法来实现开关
    protected onTouchCallback (button) {
        this.playAudioClip("sounds/界面交互点击");
        this.windowController.switch();
    }

}
