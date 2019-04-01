
// 阶段提示控制器

const { ccclass, property } = cc._decorator;

@ccclass
export default class TipController extends cc.Component {

    // 下注开始精灵
    @property(cc.Sprite)
    public betStart: cc.Sprite = null;

    // 下注结束精灵
    @property(cc.Sprite)
    public betStop: cc.Sprite = null;

    @property(cc.Sprite)
    public betStartForBanker: cc.Sprite = null;

    // Tip 动画
    public showTip(sprite: cc.Sprite) {
        sprite.node.active = true;
        sprite.node.opacity = 0;
        sprite.node.scale = 0.2;
        // 弹出两秒后收起
        sprite.node.runAction(
            cc.sequence(
                cc.spawn(cc.fadeTo(0.2, 255), cc.scaleTo(0.2, 1.0)),
                cc.delayTime(2),
                cc.spawn(cc.fadeTo(0.2, 0), cc.scaleTo(0.2, 0.2))
            )
        );
    }
}
