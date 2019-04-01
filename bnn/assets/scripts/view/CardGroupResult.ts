import BaseComponent from "../utils/BaseComponent";

//牛牛显示结果
const {ccclass, property} = cc._decorator;

@ccclass
export default class CardGroupResult extends BaseComponent {

    @property(cc.Sprite)
    resultSprite: cc.Sprite = null;

    private resultNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.resultNode = this.resultSprite.node;
        this.node.removeAllChildren();    
    }

    public obtainResultSprite(sprite: cc.Sprite, result: string, isFast: boolean) {
        let dstPosition = this.resultNode.position;
        let dstScale = this.resultNode.scale;
        // step1. 本地坐标先转化成世界坐标
        let worldPosition = this.node.convertToWorldSpaceAR(dstPosition);
        // step2. 再将此世界坐标转化成牛牛结果的局部空间坐标
        let localPosition = sprite.node.parent.convertToNodeSpaceAR(worldPosition);
        // step3. 在牛牛结果的局部空间坐标执行动画
        sprite.node.opacity = 0;

        let spritePath = "2x/niu/" + result;
        this.loadResSprite(spritePath, sprite, () => {
            sprite.node.runAction(cc.sequence(
                cc.delayTime(0.01),
                cc.moveTo(0.0, localPosition),
                cc.scaleTo(0.0, dstScale),
                cc.fadeTo(0.3, 255)
            ));
        });

        if (!isFast) {
           let audioPath = "sounds/" + result;
            this.playAudioClip(audioPath);
        }
    }
}
