// 扑克牌

const {ccclass, property} = cc._decorator;

@ccclass
export default class Card extends cc.Component {

    // 当前可见牌的精灵
    @property(cc.Sprite)
    private cardSprite: cc.Sprite = null;

    // 点数
    @property(cc.Label)
    private cardPoint: cc.Label = null;

    // 各种颜色的牌面和对应色值
    @property(cc.SpriteFrame)
    private cardBack: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private cardRed: cc.SpriteFrame = null;

    private readonly RED = 'CF3728';

    @property(cc.SpriteFrame)
    private cardBlack: cc.SpriteFrame = null;

    private readonly BLACK= '463E58';

    @property(cc.SpriteFrame)
    private cardGold: cc.SpriteFrame = null;

    private readonly GOLD= 'C6A95C';

    // 翻牌，动态加载指定点数的牌面，并回调翻牌动画
    public flop(point: string | number) {
        point = point.toString();
        if (point.length > 1 || point.search('[0-9A-Fa-f]') === -1) {
            throw Error('参数字符串只允许0-9或A-F')
        }
        let spriteFrame = null;
        let pointColor = null;
        // 字母使用金色牌面
        if (point.search('[A-Fa-f]') === 0) {
            spriteFrame = this.cardGold;
            pointColor = this.GOLD;
        } else {
            let num = parseInt(point);
            // 偶数使用红色，奇数使用黑色
            if (num % 2 === 0) {
                spriteFrame = this.cardRed;
                pointColor = this.RED;
            } else {
                spriteFrame = this.cardBlack;
                pointColor = this.BLACK;
            }
        }
        this.cardPoint.string = point.toLowerCase();
        this.cardPoint.node.color = new cc.Color().fromHEX(pointColor);
        this.flopActions(spriteFrame);
    }

    // 还原牌
    public reset() {
        this.cardSprite.spriteFrame = this.cardBack;
        this.cardPoint.node.active = false;
        this.node.position = this.node.parent.position;
    }

    // 翻牌动画
    private flopActions(spriteFrame: cc.SpriteFrame) {
        let scaleX = this.node.scaleX;
        let scaleY = this.node.scaleY;

        let run =  cc.callFunc(() => {
            this.cardSprite.spriteFrame = spriteFrame;
            this.cardPoint.node.active = true;
            this.node.runAction(cc.sequence(
                cc.flipX(true),
                cc.scaleTo(0.15, scaleX, scaleY)
            ));
        }, this);
        this.node.runAction((cc.spawn(
            cc.scaleTo(0.3, -scaleX, scaleY),
            cc.sequence(cc.delayTime(0.15), run))
        ));
    }

}
