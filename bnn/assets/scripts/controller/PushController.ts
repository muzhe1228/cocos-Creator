import BaseComponent from "../utils/BaseComponent";
import { GameResult } from "../model/GameResult";
import { GameType } from "../model/GameType";

// 全局推送控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class PushController extends BaseComponent {

    @property(cc.Node)
    private result: cc.Node = null;

    @property(cc.Label)
    private resultGame: cc.Label = null;

    @property(cc.Label)
    private resultProfit: cc.Label = null;

    private showCount: number = 0;

    private holdPosX: number = 0;

    onLoad () {
        this.holdPosX = this.result.x;
        this.result.getComponentInChildren(cc.Button).node.on(
            cc.Node.EventType.TOUCH_END, this.hideNode, this);
    }

    public renderResult (resultInfo: GameResult) {
        let gameName: string = null;
        if (resultInfo.getGameType() == GameType.GuessNumber) {
            gameName = '猜尾数';
        } else if (resultInfo.getGameType() == GameType.Treasure) {
            gameName = '夺币';
        } else {
            return;
        }
        this.pushResult(gameName, resultInfo.getWinBets());
    }

    public pushResult (gameName: string, profit: string | number) {
        this.addPushQueue(() => {
            this.resultGame.string = gameName;
            this.resultProfit.string = profit.toString();
        });
    }

    private addPushQueue (showCallback: Function) {
        this.scheduleOnce(() => {
            showCallback();
            this.showNode(this.result);
            }, this.showCount * 3.5);
        this.scheduleOnce(() => {
            this.hideNode(this.result);
            this.showCount--;
            }, this.showCount * 3.5 + 3);
        this.showCount++;
    }

    private showNode (node: cc.Node) {
        let moveTo = cc.sequence(
            cc.show(),
            cc.moveTo(0.2, 0, 0)
        );
        node.runAction(moveTo)
    }

    private hideNode (node: cc.Node) {
        let moveTo = cc.sequence(
            cc.moveTo(0.2, this.holdPosX, 0),
            cc.hide()
        );
        node.runAction(moveTo);
    }

}
