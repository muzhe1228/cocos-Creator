// 通用弹窗控制器

import BaseComponent from "../utils/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WindowController extends BaseComponent {

    // 背部遮罩的不透明度
    @property(Number)
    protected maskOpacity: number = 0;

    // 淡入淡出的动画时间
    @property(Number)
    protected fadeTime: number = 0.1;

    public backMaskNode: cc.Node = null;

    onLoad () {
        this.initBackMask();
        this.node.addComponent(cc.BlockInputEvents);
        // 点击遮罩则回调关闭弹窗
        this.setListenBackTouch(true);
        this.node.dispatchEvent(
            new cc.Event.EventCustom('window-init', true))
    }

    onDestroy () {
        super.onDestroy();
        this.setListenBackTouch(false);
    }

    public switch () {
        this.node.active ? this.close() : this.open();
    }

    // 开启弹窗
    public open () {
        if (this.node.active) return;
        this.node.opacity = 0;
        this.node.scale = 0.7;
        this.node.active = true;
        this.backMaskNode.active = true;
        let fadeIn = cc.fadeIn(this.fadeTime);
        let scale = cc.scaleTo(this.fadeTime, 1, 1);
        this.node.runAction(cc.sequence(
            cc.delayTime(0.01),
            cc.spawn(fadeIn, scale)
        ));
        this.node.dispatchEvent(
            new cc.Event.EventCustom('window-open', true))
    }

    // 关闭弹窗
    public close () {
        if (! this.node.active) return;
        this.backMaskNode.active = false;
        let fadeOut = cc.fadeOut(this.fadeTime);
        let scale = cc.scaleTo(this.fadeTime, 0.7, 0.7);
        this.node.runAction(cc.sequence(
            cc.spawn(fadeOut, scale),
            cc.callFunc(() => { this.node.active = false })
        ));
        this.node.dispatchEvent(
            new cc.Event.EventCustom('window-close', true))
    }

    public setListenBackTouch (on: boolean) {
        on ? this.backMaskNode.on(cc.Node.EventType.TOUCH_END, this.onTouchBackMask, this)
            : this.backMaskNode.off(cc.Node.EventType.TOUCH_END);
    }

    protected onTouchBackMask () {
        this.close();
    }

    // 生成背部遮罩层
    protected initBackMask () {
        let node = new cc.Node();
        this.backMaskNode = node;
        node.active = false;
        // 将遮罩增加到层级中，位置是当前节点同级的下层
        let zIndex = this.node.zIndex - 1;
        this.node.parent.addChild(node, zIndex);
        // 设置遮罩的尺寸与整个场景相同
        let canvas = cc.find('Canvas');
        node.width = canvas.width;
        node.height = canvas.height;
        node.anchorX = 0;
        node.anchorY = 0;
        node.position = node.convertToNodeSpace(cc.v2(0, 0));
        // 绘制黑色遮罩图层，并设置透明度
        let ctx = node.addComponent(cc.Graphics);
        ctx.strokeColor = cc.Color.BLACK;
        ctx.strokeColor.setA(this.maskOpacity);
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillColor = cc.Color.BLACK;
        ctx.fillColor.setA(this.maskOpacity);
        ctx.fill();
        ctx.stroke();
    }

}
