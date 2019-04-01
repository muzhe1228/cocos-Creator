import ScrollNumber from "../view/ScrollNumber";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProfitController extends cc.Component {

    @property(ScrollNumber)
    result: ScrollNumber = null;

    @property(cc.Label)
    pkLabel: cc.Label = null;

    private readonly COLOR_WIN = new cc.Color(86, 255, 142);
    private readonly COLOR_LOSS = new cc.Color(255, 72, 72);

    public renderMyselfResult(winBets: number) {
        this.node.active = true;
        if (winBets > 0) {
            this.result.setColor(this.COLOR_WIN);
            this.pkLabel.node.color = this.COLOR_WIN;
        } else {
            this.result.setColor(this.COLOR_LOSS);
            this.pkLabel.node.color = this.COLOR_LOSS;
        }

        this.result.setNumber(winBets);
    }

    public reset() {
        if (this.node.active == false) return;
        this.result.setNumber(0);
        this.node.active = false;
    }
}
