import Card from "../view/Card";
import BaseComponent from "../utils/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardGroupController extends BaseComponent {

    @property(cc.Node)
    private cardContainer: cc.Node = null;

    // 牌对象
    private cards: Card[] = [];
    private cardsNode: cc.Node[] = [];

    private readonly MAX_CARD_COUNT = 5;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 主要是为了计算每个牌的位置
        let imme_cards = this.cardContainer.getComponentsInChildren(Card);
        for (let i = 0; i < imme_cards.length; i++) {
            this.cardsNode[i] = imme_cards[i].node;
        }
        this.cardContainer.removeAllChildren();
    }

    start () {

    }

    // update (dt) {}

    // 收到扑克
    public obtainCard(card: Card, isFast: boolean) {

        if (this.cards.length >= this.MAX_CARD_COUNT) {
            return;
        }

        let dstCard = this.cardsNode[this.cards.length];

        let dstPosition = dstCard.position;
        let dstScale = dstCard.scale;
        // step1. 本地坐标先转化成世界坐标
        let worldPosition = this.cardContainer.convertToWorldSpaceAR(dstPosition);
        // step2. 再将此世界坐标转化成牌的局部空间坐标
        let localPosition = card.node.parent.convertToNodeSpaceAR(worldPosition);
        // step3. 在牌的局部空间坐标执行动画
        let duration = isFast ? 0 : 0.5;
        card.node.runAction(
            cc.spawn(
                cc.callFunc(card.reset.bind(card)),
                cc.moveTo(duration, localPosition).easing(cc.easeOut(1.0)),
                cc.scaleTo(duration, dstScale)
            )
        );

        // add to list
        this.cards.push(card);
    }

    // 翻牌
    public showCards(cardsValue: string, callback: Function, isFast: boolean) {

        if (this.cards.length < this.MAX_CARD_COUNT || cardsValue.length < this.MAX_CARD_COUNT) {
            return;
        }

        let interval = isFast ? 0 : 1;
        let repeat = 4;
        let delay = 0;
        let index = 0;
        this.schedule( () => {
            this.cards[index].flop(cardsValue.charAt(index));
            index++;

            if (index == 5) {
                this.scheduleOnce(callback, isFast ? 0 : 1);
            }

        }, interval, repeat, delay);
    }

    // 清除牌数据
    public cleanCards() {
        this.unscheduleAllCallbacks();
        this.cards = [];
    }
}
