import BaseComponent from "../utils/BaseComponent";

// 牛几结果派发器

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardResultDealerController extends BaseComponent {

    @property(cc.Prefab)
    private sprite: cc.Prefab = null;

    onLoad () {
        this.registerReuseableNode("CardResult", this.sprite);
    }

    public drawCardResult(): cc.Sprite {
        let sprite = this.getReusableNode("CardResult");
        this.node.addChild(sprite, undefined, "CardResult");
        sprite.position = this.node.position;
        sprite.position = this.node.position;
        return sprite.getComponent(cc.Sprite);
    }

    public recoveryCardResult() {
       this.releaseAllChildren("CardResult", this.node);
    }
}
