import Card from "../view/Card";
import BaseComponent from "../utils/BaseComponent";

// 扑克发牌器

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardDealerController extends BaseComponent {

    @property(cc.Prefab)
    private cardPrefab: cc.Prefab = null;

    onLoad () {
        this.registerReuseableNode("Card", this.cardPrefab);
    }

    // 从牌库中取出一张牌
    public drawCard(): cc.Node {
        let card = this.getReusableNode("Card");
        this.node.addChild(card, undefined, "Card");
        card.position = this.node.position;
        return card
    }

    // 收牌
    public recoveryCards() {
       this.releaseAllChildren("Card", this.node);
    }
}
