import WindowButtonController from "./WindowButtonController";
import BidWindowController from "./BidWindowController";
import ScrollNumber from "../view/ScrollNumber";
import BankerInfo from "../model/BankerInfo";
import BidBankerInfo from "../model/BidBankerInfo";

// 竞庄控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class BidBankerController extends WindowButtonController {

    @property({override: true})
    protected windowController: BidWindowController = null;

    @property(ScrollNumber)
    private priceScroll: ScrollNumber = null;

    private blockInput: cc.BlockInputEvents = null;

    private price: number;

    private isFocus: boolean = false;

    onLoad () {
        super.onLoad();
        this.button.node.parent.opacity = 0;
    }

    public showButton () {
        if (! this.isFocus)
            this.button.node.parent.opacity = 255;
    }

    public renderBidInfo (bidInfo: BidBankerInfo) {
        if (! this.button.node.parent.opacity)
            this.showButton();
        this.price = bidInfo.getBidPrice();
        this.priceScroll.setNumber(this.price);
        this.windowController.setPrice(this.price);
        this.windowController.setCandidate(
            bidInfo.getBidderNick(), bidInfo.getBidderHeadUrl());
    }

    public renderBankerInfo (bankerIsSelf: boolean, bankerInfo: BankerInfo) {
        this.switchPosition(bankerIsSelf);
        if (! this.isFocus) {
            this.windowController.switchHeader(false);
            this.windowController.setRound(
                bankerInfo.getMaxRound() - bankerInfo.getRemainRound() + 1);
        }
    }

    // 开启竞庄弹窗，隐藏按钮，并强制不能取消
    public openFocus (time: number) {
        this.isFocus = true;
        this.windowController.open();
        this.windowController.setListenBackTouch(false);
        this.windowController.switchHeader(true);
        this.blockInput = this.windowController.backMaskNode.addComponent(cc.BlockInputEvents);
        this.button.node.parent.opacity = 0;
        this.windowController.setTime(time);
    }

    // 关闭竞庄弹窗，显示按钮
    public closeFocus () {
        if (this.blockInput) {
            this.windowController.setListenBackTouch(true);
            this.windowController.backMaskNode.removeComponent(this.blockInput);
        }
        this.windowController.close();
        this.button.node.parent.opacity = 255;
        this.isFocus = false;
    }

    private switchPosition (bankerIsSelf: boolean) {
        let posX = bankerIsSelf ? -450: 135;
        let buttonParent = this.button.node.parent;
        let moveTo = cc.moveTo(0.5, posX, buttonParent.y).easing(cc.easeIn(3));
        buttonParent.runAction(moveTo);
    }

    protected onTouchCallback (button) {
        this.playAudioClip("sounds/界面交互点击");
        this.windowController.switch();
        this.windowController.setPrice(this.price)
    }

}
