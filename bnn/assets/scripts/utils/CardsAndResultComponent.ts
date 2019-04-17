import BaseComponent from "./BaseComponent";
import CardGroupController from "../controller/CardGroupController";
import CardGroupResult from "../view/CardGroupResult";
import Card from "../view/Card";

// cards & niu result compoents

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardsAndResultComponent extends BaseComponent {

    @property(CardGroupController)
    protected cardGroup: CardGroupController = null;

    @property(CardGroupResult)
    protected cardResult: CardGroupResult = null;

    // 渲染发牌
    public renderSendCard(card: Card, isFast: boolean) {
        this.cardGroup.node.active = true;
        this.cardGroup.obtainCard(card, isFast);
    }

    // 渲染翻牌
    public renderCards(cards: string, callback: Function, isFast: boolean) {
        this.cardGroup.showCards(cards, callback, isFast);
    }

    // 渲染牛牛结果
    public renderCardResult(sprite: cc.Sprite, result: string, isFast: boolean) {
        this.cardResult.node.active = true;
        this.cardResult.obtainResultSprite(sprite, result, isFast);
    }

    // 清空牌和牛牛结果
    public cleanCardsAndResult() {
        this.cardGroup.cleanCards();
        this.cardResult.node.active = false;
    }

}