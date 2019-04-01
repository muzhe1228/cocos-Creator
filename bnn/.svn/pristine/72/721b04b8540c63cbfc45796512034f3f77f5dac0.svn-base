import WebsocketUtils from "../network/WebsocketUtils";
import IWebSocketDelegate from "../network/IWebSocketDelegate";
import { CommonConsts } from "../utils/CommonConsts";
import PlayersController from "./PlayersController";
import BankerController from "./BankerController";
import ClockController from "./ClockController";
import BetAreaController from "./BetAreaController";
import PlayerMySelfController from "./PlayerMyselfController";
import ChatMessageController from "./ChatMessageController";
import NoticeController from "./NoticeController";
import CardDealerController from "./CardDealerController";
import BidBankerController from "./BidBankerController";
import Card from "../view/Card";
import { GameType } from "../model/GameType";
import CardResultDealerController from "./CardResultDealerController";
import BaseComponent from "../utils/BaseComponent";
import ProfitController from "./ProfitController";
import ChipAreaController from "./ChipAreaController";
import WayController from "./WayController";
import PushController from "./PushController";
import WaitResultController from "./WaitResultController";
import UserBetInfo from "../model/UserBetInfo";
import BankerInfo from "../model/BankerInfo";
import UserPkInfo from "../model/UserPkInfo";
import { GameResult } from "../model/GameResult";
import PlayerHeader from "../model/PlayerHeader";
import GameState, { EnumGameState } from "../model/GameState";
import BidBankerInfo from "../model/BidBankerInfo";
import ChatInfo from "../model/ChatInfo";
import NoticeInfo from "../model/NoticeInfo";
import SceneManager from "../manager/SceneManager";
import TipController from "./TipController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends BaseComponent implements IWebSocketDelegate {

    // 房间倍数标签
    @property(cc.Label)
    private oddLabel: cc.Label = null;

    // 房间等级标签
    @property(cc.Label)
    private levelLabel: cc.Label = null;

    // 玩家列表
    private players: PlayersController = null;
    // 庄家信息
    private bankerInfo: BankerController = null;
    // 倒计时控件
    private clock: ClockController = null;
    // 下注区域信息
    private betAreaList: BetAreaController[] = [];
    // 玩家自己信息
    private playerMyself: PlayerMySelfController = null;
    // 路子
    private way: WayController = null;
    // 竞庄
    private bidBanker: BidBankerController = null;
    // 聊天消息
    private chatMsg: ChatMessageController = null;
    // 公告
    private notice: NoticeController = null;
    // 发牌
    private cardDealer: CardDealerController = null;
    // 发牌结果
    private cardResultDealer: CardResultDealerController = null;
    // 个人输赢结果
    private profit: ProfitController = null;
    // 筹码区
    private chipArea: ChipAreaController = null;
    // 全局推送
    private push: PushController = null;
    // 等待开奖界面
    private waitResult: WaitResultController = null;
    // Tips
    private tips: TipController = null;

    private websocket: WebsocketUtils = null;

    // 是否已经发完牌
    private isSendCardFinished: boolean = false;
    private sendCardCallback: Function = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 设置切换到后台自动重载
        SceneManager.setInvisibleReload(true, 0);

        this.prepareWebsocket();

        this.requestBankerInfo();
        this.requestBetAreaInfo();
    }

    start() {
        this.initComponents();

        // test-code
        // let gameResult = {"gameType":"0","oddBanker":0,"cardLand":"7ba96","niuBanker":"没牛","oddLand":1,"oddMysterious":-5,"niuLand":"没牛","oddSky":-7,"cardBanker":"261ef","userId":213,"roomId":"1","blockId":7470405,"socketType":3,"niuMysterious":"牛5","niuSky":"牛7","cardSky":"f52fa","cardMysterious":"8bb7e","hash":"0xe213d81d99f4e01b52ae26ae3d70dd0f328ba842e557261eff52fa7ba968bb7e"}
        // let niuniuResult = new GameResult(gameResult);
        // this.onSocketResult(niuniuResult);
    }

    onDestroy() {
        super.onDestroy();
        this.websocket.close();
    }

    /**
     * 解析url参数并且连接websocket
     */
    private prepareWebsocket(): boolean {
        this.websocket = new WebsocketUtils(CommonConsts.socketBaseUrl, this);

        let b = this.websocket.open();
        if (!b) {
            console.log("连接游戏服务器失败!");
            //todo...
        }

        return b;
    }

    /**
     * 初始化组件
     */
    private initComponents() {
        this.players = this.getComponentInChildren(PlayersController);
        this.bankerInfo = this.getComponentInChildren(BankerController);
        this.clock = this.getComponentInChildren(ClockController);
        this.betAreaList = this.getComponentsInChildren(BetAreaController);
        this.playerMyself = this.getComponentInChildren(PlayerMySelfController);
        this.cardDealer = this.getComponentInChildren(CardDealerController);
        this.way = cc
            .find("Canvas/SideBar/Buttons/Way")
            .getComponent(WayController);
        this.chatMsg = cc
            .find("Canvas/Chat/ChatMessage")
            .getComponent(ChatMessageController);
        this.notice = cc
            .find("Canvas/Notice/Message")
            .getComponent(NoticeController);
        this.bidBanker = cc
            .find("Canvas/BidBanker")
            .getComponent(BidBankerController);
        this.push = cc.find("Canvas/Push").getComponent(PushController);
        this.cardResultDealer = this.getComponentInChildren(
            CardResultDealerController
        );
        this.profit = this.getComponentInChildren(ProfitController);
        this.chipArea = this.getComponentInChildren(ChipAreaController);
        this.waitResult = this.getComponentInChildren(WaitResultController);
        this.tips = this.getComponentInChildren(TipController);

        // 下注区的背景数字 (壹 贰 叁)
        for (let i = 0; i < this.betAreaList.length; i++) {
            this.betAreaList[i].setAreaNumber(i + 1);
        }

        // 注册事件
        this.playerMyself.setBetRequestListener(() => {
            // 请求下注
            let position: number[] = [];
            let currencyNumber: number[] = [];
            for (let i = 0; i < this.betAreaList.length; i++) {
                let betAreaController = this.betAreaList[i];
                let number = betAreaController.getMyWantedBetPkValue();
                if (number > 0) {
                    position.push(i + 1);
                    currencyNumber.push(number);
                }
            }
            if (!position.length) {
                this.alert("您还没有放置筹码");
                return;
            }
            this.requestBet(position, currencyNumber);
        });

        // 聊天 点击事件 传递
        this.chatMsg.setTouchEventCallback(event => {
            let betArea = this.betAreaList[0];
            if (betArea.getCanBet() && betArea.cleanMyBet.node.getBoundingBoxToWorld().contains(event.getLocation())) {
                betArea.cleanWantedBetPkValue();
                return;
            }
            if (betArea.getCanBet() && betArea.chipArea.getBoundingBoxToWorld().contains(event.getLocation())) {
                betArea.onTouchEnd(event);
                return;
            }
            this.chatMsg.show(3, true);
        });

        this.initRoomLabel();
    }

    // 初始化左上角房间标签
    private initRoomLabel() {
        if (! BaseComponent.roomInfo)
            return;
        this.oddLabel.string = BaseComponent.roomInfo.roomOdd;
        this.levelLabel.string = BaseComponent.roomInfo.roomType;
        this.oddLabel.node.parent.active = true;
    }

    // 设置是否可下注，同时控制下注区和下注按钮
    private setCanBet (b: boolean) {
        for (let betArea of this.betAreaList) {
            betArea.setCanBet(b);
        }
        this.playerMyself.setBetClickable(b);
    }

    //#region 接口请求及回调

    // 请求下注
    public requestBet(positionId: number[], currencyNumber: number[]) {
        this.playerMyself.setBetClickable(false);
        this.httpUtils.post(
            "/hns/niuniu/bottomPour",
            {
                token: this.getToken(),
                roomId: this.getRoomId(),
                positionId: positionId.join(","),
                currencyNumber: currencyNumber.join(",")
            },
            true,
            this.requestBetCallback.bind(this),
            true
        );
    }

    public requestBetCallback(res) {
        this.playerMyself.setBetClickable(true);
    }

    // 获取庄信息
    public requestBankerInfo() {
        this.httpUtils.post(
            "/hns/niuniu/selectBanker",
            { roomId: this.getRoomId(), token: this.getToken() },
            true,
            this.requestBankerInfoCallback.bind(this)
        );
    }

    public requestBankerInfoCallback(res) {
        let bankInfo = new BankerInfo(res.data);
        this.onSocketBankerInfo(bankInfo);
    }

    // 获取下注区域信息
    public requestBetAreaInfo() {
        this.httpUtils.post(
            "/hns/niuniu/selectRoomByRoomId",
            { token: this.getToken(), roomId: this.getRoomId() },
            true,
            this.requestBetAreaInfoCallback.bind(this)
        );
    }

    public requestBetAreaInfoCallback(res) {
        let betInfo = new UserBetInfo(res.data);
        this.onInitBetInfo(betInfo);
    }

    // 初始化下注信息
    private onInitBetInfo(betInfo: UserBetInfo) {
        let betListInfo = betInfo.getBetPositionList();
        // 更新自己的pk
        this.playerMyself.renderPkChange(betInfo);

        for (let i = 0; i < betListInfo.length; i++) {
            let position = betListInfo[i].getPositionType();
    
            // 渲染下注
            if (position - 1 >= 0) {
                // 渲染下注
                let bets = betListInfo[i].getPositionAssets();
                let myBets = betListInfo[i].getMyBets();

                if (bets > 0) {

                    if (myBets > 0) {
                        // 渲染我的
                        let mySelfPosition = this.playerMyself.getHeaderWorldPosition();
                        let chips = this.chipArea.splitTotalChip(myBets);
                        this.betAreaList[position - 1].renderBet(
                            betListInfo[i],
                            mySelfPosition,
                            true,
                            chips
                        );

                        bets = bets - myBets;
                    }

                    // 当前筹码在世界坐标系中
                    let worldPosition = this.players.getLatestPlayerWorldPosition();
                    let chips = this.chipArea.splitTotalChip(bets);
                    this.betAreaList[position - 1].renderBet(
                        betListInfo[i],
                        worldPosition,
                        false,
                        chips
                    );
                }
            }
        }
    }

    //#endregion

    //#region IWebSocketDelegate

    onSocketOpen?(socket: WebSocket, event: Event): void {
        let json = {
            userId: this.getUserId(),
            gameType: 0,
            roomId: this.getRoomId(),
            type: 0
        };
        //请求 WebSocket 房间信息
        this.websocket.sendRawData(JSON.stringify(json));
    }

    onSocketError(socket: WebSocket, event: Event): void {
        this.alert("网络异常");
        // TODO 重连弹窗
    }

    onSocketMessage?(socket: WebSocket, event: MessageEvent): void {
        if (event.data[0] != "{") return;
        let msgJson = JSON.parse(event.data);
        // console.log(msgJson);
        let socketType = msgJson.socketType;
        // console.log("socketType:" + socketType);
        switch (socketType) {
            case 2: // 用户资产
                let pkInfo = new UserPkInfo(msgJson);
                this.onSocketMyselfPkInfo(pkInfo);
                break;
            case 3: // 结算
                let niuniuResult = new GameResult(msgJson);
                this.onSocketResult(niuniuResult);
                break;
            case 7: // 玩家列表
                let playerHeader = new PlayerHeader(msgJson);
                this.onSocketPlayers(playerHeader);
                break;
            case 11: // 庄家信息
                let bankInfo = new BankerInfo(msgJson);
                this.onSocketBankerInfo(bankInfo);
                break;
            case 9: // 游戏状态
                let gameState = new GameState(msgJson);
                this.onSocketGameStatus(gameState);
                break;
            case 8: // 下注信息
                let userBetInfo = new UserBetInfo(msgJson);
                this.onSocketBetInfo(userBetInfo);
                break;
            case 12: // 竞庄
                let bidBankerInfo = new BidBankerInfo(msgJson);
                this.onSocketBidBanker(bidBankerInfo);
                break;
            case 4: // 聊天
                let chatInfo = new ChatInfo(msgJson);
                this.onSocketChatMsg(chatInfo);
                break;
            case 1: // 公告
                let noticeInfo = new NoticeInfo(msgJson);
                this.onSocketNotice(noticeInfo);
                break;
        }
    }

    //#endregion

    //#region socket推送消息

    // 个人资产信息
    private onSocketMyselfPkInfo(info: UserPkInfo) {
        this.setUserBalance(info.getAvailableBalance());
        this.playerMyself.renderPkInfo(info);
    }

    // 玩家头像列表
    private onSocketPlayers(playerHeader: PlayerHeader) {
        this.players.render(playerHeader);
    }

    // 庄家信息
    private onSocketBankerInfo(bankerInfo: BankerInfo) {
        let userId = bankerInfo.getUserId();
        if (userId == this.getUserId()) {
            this.players.maxHeaderCount = 18;
            this.playerMyself.renderWithBanker(true, bankerInfo);
            this.bankerInfo.close();
            this.bidBanker.renderBankerInfo(true, bankerInfo);
            this.setCanBet(false)
        } else {
            this.players.maxHeaderCount = 6;
            this.playerMyself.renderWithBanker(false, null);

            if (bankerInfo.getUserId() != 0) this.bankerInfo.render(bankerInfo);
            this.bidBanker.renderBankerInfo(false, bankerInfo);
            this.setCanBet(true)
        }
    }

    // 竞庄信息
    private onSocketBidBanker(bidBankerInfo: BidBankerInfo) {
        this.bidBanker.renderBidInfo(bidBankerInfo);
    }

    // 聊天消息
    private onSocketChatMsg(chatInfo: ChatInfo) {
        this.chatMsg.render(chatInfo, chatInfo.getUserId() == this.getUserId());
    }

    // 公告
    private onSocketNotice(noticeInfo: NoticeInfo) {
        this.notice.render(noticeInfo);
    }

    // 下注信息
    private onSocketBetInfo(betInfo: UserBetInfo) {
        let userId = betInfo.getUserId();
        if (userId == this.getUserId()) {
            // 更新自己的pk
            this.playerMyself.renderPkChange(betInfo);
            this.playAudioClip("sounds/下注成功");
        }
        let betListInfo = betInfo.getBetPositionList();
        for (let i = 0; i < betListInfo.length; i++) {
            let position = betListInfo[i].getPositionType();

            // 当前筹码在世界坐标系中
            let worldPosition;
            //  获取筹码动作的起始位置
            if (userId == this.getUserId()) {
                // 如果是自己
                worldPosition = this.playerMyself.getHeaderWorldPosition();
                // 渲染下注
                this.betAreaList[position - 1].renderBet(
                    betListInfo[i],
                    worldPosition,
                    true
                );
            } else {
                // 从玩家列表获取
                worldPosition = this.players.getLatestPlayerWorldPosition();
                // 渲染下注
                let bets = betListInfo[i].getBets();
                if (bets != null) {
                    let chips = this.chipArea.splitTotalChip(bets);
                    this.betAreaList[position - 1].renderBet(
                        betListInfo[i],
                        worldPosition,
                        false,
                        chips
                    );
                }
            }
        }
    }

    // 游戏状态
    private onSocketGameStatus(gameStatus: GameState) {
        let state = gameStatus.getStatus();

        switch (state) {
            case EnumGameState.StartBet:     // 下注
                let finishTime = gameStatus.getFinishTime();
                let serverCurrTime = gameStatus.getServerTime();
                let remainTime = (finishTime - serverCurrTime) / 1000;
                this.onGameStartBet(remainTime);
                break;
            case EnumGameState.StopBet:     // 封盘
                this.onGameStopBet(gameStatus.getFinishTime());
                break;
            case EnumGameState.Result:     // 开奖
                this.onGameResult();
                break;
            case EnumGameState.FightForBanker:     // 竞庄
                let time = (gameStatus.getFinishTime() - gameStatus.getServerTime()) / 1000;
                this.onGameBidBanker(time);
                break;
            case EnumGameState.BecomeBanker:     // 上庄
                this.onGameChangeBanker();
                break;
            case EnumGameState.CreatePosition:     // 生成位置
                this.onGamePrepare();
                break;
        }
    }

    private onSocketResult(gameResult: GameResult) {
        console.log(gameResult);
        let roomId = gameResult.getRoomId();
        let gameType = gameResult.getGameType();
        if (roomId != this.getRoomId()) {
            return;
        }

        if (gameType != GameType.NiuNiu) {
            if (gameResult.getWinBets() && gameResult.getWinBets() > 0) {
                this.push.renderResult(gameResult);
            }
            return;
        }

        // 关闭等待开奖
        this.waitResult.hide();

        // 用于动画延时的计算
        let delay;

        if (!this.isSendCardFinished) {
            // 如果还没有发牌, 则立即完成发牌、翻牌和显示结果动画

            // step1. 停止发牌
            if (this.sendCardCallback != null) {
                this.unschedule(this.sendCardCallback);
                this.sendCardCallback = null;
            }

            // step2.清空牌和结果
            for (let i = 0; i < this.betAreaList.length; i++) {
                this.betAreaList[i].cleanCardsAndResult();
            }
            if (this.playerMyself.isBanker()) {
                this.playerMyself.cleanCardsAndResult();
            } else {
                this.bankerInfo.cleanCardsAndResult();
                this.playerMyself.clearBetAndFrozen();
            }

            // step3. 立即重新发牌和显示结果
            this.sendCards(true);

            delay = 1.2;
            delay = this.flopCardsAndShowNiuResult(gameResult, delay, true);
            delay += 0.1;

        } else {
            delay = 0.5;
            // render card actions
            delay = this.flopCardsAndShowNiuResult(gameResult, delay);
            delay += 1;
        }

        // render bet actions
        delay = this.flyChips(gameResult, delay);

        // render game result
        let userId = gameResult.getUserId();
        if (userId == this.getUserId() || this.playerMyself.isBanker()) {
            let winBets = gameResult.getWinBets();
            if (winBets != undefined) {
                // 有输赢, 显示输赢结果
                this.scheduleOnce(
                    this.profit.renderMyselfResult.bind(this.profit, winBets), delay);
                this.scheduleOnce(this.profit.reset.bind(this.profit), delay + 5);
            }
        }
    }

    //#endregion

    //#region 游戏状态切换

    private onGameStartBet(countdown: number) {
        this.clock.setTime(countdown);

        let isBanker = this.playerMyself.isBanker();

        // 剩余时间大于10秒才提示下注
        if (countdown > 10) {
            if (isBanker) {
                this.tips.showTip(this.tips.betStartForBanker);
            } else {
                this.playAudioClip("sounds/已开局请下注");
                this.tips.showTip(this.tips.betStart);
            }
        }

        this.setCanBet(! isBanker)
    }

    private onGameStopBet(time: number) {
        this.playAudioClip("sounds/停止下注");

        this.setCanBet(false);

        // 显示等待开奖界面
        this.waitResult.show(time);

        // send cards
        this.sendCards();
    }

    private onGameResult() {
        this.setCanBet(false);
    }

    private onGameBidBanker(time: number) {
        // 开启竞庄弹窗，并强制不能取消
        this.setCanBet(false);
        this.bidBanker.openFocus(time);
    }

    private onGameChangeBanker() {
        // 关闭竞庄弹窗
        this.bidBanker.closeFocus();
    }

    // 开始下注初始化
    private onGamePrepare() {
        this.unscheduleAllCallbacks();

        for (let i = 0; i < this.betAreaList.length; i++) {
            //重置下注数据，清空发牌，去除牌结果
            this.betAreaList[i].resetBet();
            this.betAreaList[i].cleanCardsAndResult();
        }

        if (this.playerMyself.isBanker()) {
            this.playerMyself.cleanCardsAndResult();
        } else {
            this.bankerInfo.cleanCardsAndResult();
            this.playerMyself.clearBetAndFrozen();
        }

        // 路子预存储数据
        this.way.preStorage();

        // reset cards
        this.cardDealer.recoveryCards();

        // reset result
        this.cardResultDealer.recoveryCardResult();

        // reset profit
        this.profit.reset();

        this.setCanBet(false);

        this.isSendCardFinished = false;
    }

    //#endregion

    //#region 动画执行部分

    // 结算飞筹码动画
    private flyChips(gameResult: GameResult, delay: number): number {
        let interval = 1.0;
        let repeat = 1;
        let index = 0;

        this.schedule(
            () => {
                switch (index++) {
                    case 0: // 先执行庄家赢的动画
                        let position;
                        let bankerIsSelf = this.playerMyself.isBanker();
                        if (bankerIsSelf) {
                            position = this.playerMyself.getHeaderWorldPosition();
                        } else {
                            position = this.bankerInfo.getHeaderWorldPosition();
                        }
                        // 赔率是正数时，庄家赢
                        if (gameResult.getSkyOdd() > 0) {
                            this.betAreaList[0].renderBetToOnePosition(position);
                        }
                        if (gameResult.getLandOdd() > 0) {
                            this.betAreaList[1].renderBetToOnePosition(position);
                        }
                        if (gameResult.getMysteriousOdd() > 0) {
                            this.betAreaList[2].renderBetToOnePosition(position);
                        }
                        break;
                    case 1: // 再执行庄家赔的动画
                        let myselfPosition = this.playerMyself.getHeaderWorldPosition();
                        let playersPosition = this.players.getLatestPlayerWorldPosition();
                        // 赔率是负数时，闲家赢
                        if (gameResult.getSkyOdd() < 0) {
                            this.betAreaList[0].renderBetToTwoPosition(
                                playersPosition,
                                myselfPosition
                            );
                        }
                        if (gameResult.getLandOdd() < 0) {
                            this.betAreaList[1].renderBetToTwoPosition(
                                playersPosition,
                                myselfPosition
                            );
                        }
                        if (gameResult.getMysteriousOdd() < 0) {
                            this.betAreaList[2].renderBetToTwoPosition(
                                playersPosition,
                                myselfPosition
                            );
                        }
                        break;
                }
            },
            interval,
            repeat,
            delay
        );

        return interval * (repeat + 1) + delay;
    }

    // 翻盘和显示牛几动画
    private flopCardsAndShowNiuResult(gameResult: GameResult, delay: number, isFast: boolean = false): number {
        let interval = isFast ? 0 : 7;
        let repeat = 3;
        let index = 0;

        this.schedule(
            () => {
                switch (index++) {
                    case 0:
                        if (! isFast)
                            this.playAudioClip('sounds/闲1');
                        this.betAreaList[0].renderCards(gameResult.getSkyCards(), () => {
                            this.betAreaList[0].renderCardResult(
                                this.cardResultDealer.drawCardResult(),
                                gameResult.getSkyNiu(),
                                isFast
                            );
                        }, isFast);
                        break;
                    case 1:
                        if (! isFast)
                            this.playAudioClip('sounds/闲2');
                        this.betAreaList[1].renderCards(gameResult.getLandCards(), () => {
                            this.betAreaList[1].renderCardResult(
                                this.cardResultDealer.drawCardResult(),
                                gameResult.getLandNiu(),
                                isFast
                            );
                        }, isFast);
                        break;
                    case 2:
                        if (! isFast)
                            this.playAudioClip('sounds/闲3');
                        this.betAreaList[2].renderCards(gameResult.getMysteriousCards(), () => {
                            this.betAreaList[2].renderCardResult(
                                this.cardResultDealer.drawCardResult(),
                                gameResult.getMysteriousNiu(),
                                isFast
                            );
                        }, isFast);
                        break;
                    case 3:
                        if (! isFast)
                            this.playAudioClip('sounds/庄家');
                        if (this.playerMyself.isBanker()) {
                            this.playerMyself.renderCards(gameResult.getBankerCards(), () => {
                                this.playerMyself.renderCardResult(
                                    this.cardResultDealer.drawCardResult(),
                                    gameResult.getBankerNiu(),
                                    isFast
                                );
                            }, isFast);
                        } else {
                            this.bankerInfo.renderCards(gameResult.getBankerCards(), () => {
                                this.bankerInfo.renderCardResult(
                                    this.cardResultDealer.drawCardResult(),
                                    gameResult.getBankerNiu(),
                                    isFast
                                );
                            }, isFast);
                        }
                        break;
                }
            },
            interval,
            repeat,
            delay
        );

        return interval * (repeat + 1) + delay;
    }

    // 发牌动画
    private sendCards(isFast: boolean = false) {
        let interval = isFast ? 0 : 0.1;
        let repeat = 19;
        let delay = isFast ? 0 : 0.5;
        let count = 0;

        this.sendCardCallback = () => {
            count++;
            let card = this.cardDealer.drawCard().getComponent(Card);
            if (count <= 5) {
                if (this.playerMyself.isBanker()) {
                    this.playerMyself.renderSendCard(card, isFast);
                } else {
                    this.bankerInfo.renderSendCard(card, isFast);
                }
            } else if (count <= 10) {
                this.betAreaList[0].renderSendCard(card, isFast);
            } else if (count <= 15) {
                this.betAreaList[1].renderSendCard(card, isFast);
            } else {
                this.betAreaList[2].renderSendCard(card, isFast);
            }

            if (count == 20) {
                // 是否已发完牌
                this.isSendCardFinished = true;
            }
        };

        this.schedule(
            this.sendCardCallback,
            interval,
            repeat,
            delay
        );
    }

    //#endregion

}
