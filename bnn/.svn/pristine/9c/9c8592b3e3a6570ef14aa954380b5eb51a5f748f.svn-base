import PlayerOther from "../view/PlayerOther";
import ScrollNumber from "../view/ScrollNumber";
import PlayerHeader from "../model/PlayerHeader";
import BaseComponent from "../utils/BaseComponent";

/**
 * 其他用户头像区域
 * todo: 目前实现没有使用重用机制，后期实现，当删除一个node的时候可放入回收池，下次增加的时候先从回收池中获取，没有的话再从原始prefab克隆
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayersController extends BaseComponent {

    @property(ScrollNumber)
    private scrollNumber: ScrollNumber = null;
    
    @property(cc.Node)
    private headersNode: cc.Node = null;

    @property(cc.Prefab)
    private playerOther: cc.Prefab = null;

    private headerNodeList: cc.Node[] = [];
    private headerRadius: number = 32;
    private _maxHeaderCount: number = 6;

    public get maxHeaderCount () {
        return this._maxHeaderCount;
    }

    public set maxHeaderCount (value: number) {
        let sub = this._maxHeaderCount - value;
        while (sub-- > 0) {
            this.removeUserWithAction()
        }
        this._maxHeaderCount = value;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerReuseableNode("PlayerOther", this.playerOther);
    }

    start () {

    }

    // update (dt) {}

    public render(playerHeader: PlayerHeader) {
        this.scrollNumber.setNumber(playerHeader.getPlayerNum());

        if (playerHeader.GetType() == 0) {
            // first render head list
            this.renderListWithAction(playerHeader);
        } else if (playerHeader.GetType() == 1) {
            // add head
            this.addUserWithAction(playerHeader);
        } else if (playerHeader.GetType() == 2) {
            // remove head
            // this.removeUserWithAction();
        }
    }

    // 获取最新的玩家位置并转化成世界坐标
    public getLatestPlayerWorldPosition() : cc.Vec2 {
        var pos;
        if (this.headersNode.childrenCount == 0) {
            pos = new cc.Vec2(0, 0);   
        } else {
            pos = this.headersNode.children[this.headersNode.childrenCount - 1].position;
        }
        return this.headersNode.convertToWorldSpaceAR(pos);
    }

    private renderListWithAction(data: PlayerHeader) {
        // step1. remove old data
        this.headersNode.removeAllChildren();
        this.node.runAction(cc.fadeTo(0.2, 255));

        // step2. add headers
        for (var i = 0; i < data.getPlayerHeadList().length; i++) {
            let headItem = data.getPlayerHeadList()[i];
            
            // get node from node pool
            let playerHeader = this.getReusableNode("PlayerOther");

            playerHeader.getComponent(PlayerOther)
                .setHeaderWithImageUrl(headItem.getHeadUrlPath());

            // 如果已经超过最大值, 则同时删除第一个
            if (this.headerNodeList.length >= this.maxHeaderCount) {
                this.removeUserWithAction();
            }

            playerHeader.active = true;
            // 设定head 动画的起始位置
            playerHeader.setPosition(-(this.headerNodeList.length + 2) * this.headerRadius, 0);
            playerHeader.opacity = 0;

            playerHeader.runAction(cc.spawn(cc.moveBy(0.5, cc.v2(this.headerRadius, 0)), cc.fadeTo(0.5, 255)));

            this.headerNodeList.push(playerHeader);
            this.headersNode.addChild(playerHeader);
        }
    }

    private addUserWithAction(data: PlayerHeader) {

        let playerHeader = this.getReusableNode("PlayerOther");
        // 加载头像后回调动画
        playerHeader.getComponent(PlayerOther).setHeaderWithImageUrl(data.getHeadUrlPath(), () => {
            // 如果已经超过最大值, 则同时删除第一个
            if (this.headerNodeList.length >= this.maxHeaderCount) {
                this.removeUserWithAction();
            }

            playerHeader.active = true;
            // 设定head 动画的起始位置
            playerHeader.setPosition(-(this.headerNodeList.length + 2) * this.headerRadius, 0);
            playerHeader.opacity = 0;

            playerHeader.runAction(cc.spawn(cc.moveBy(0.5, cc.v2(this.headerRadius, 0)), cc.fadeTo(0.5, 255)));

            this.headerNodeList.push(playerHeader);
            this.headersNode.addChild(playerHeader);
        });
    }

    private removeUserWithAction() {

        var self = this;
        let finish = cc.callFunc(function(target) {

            if (target instanceof cc.Node) {
                // 动画执行完再移除子节点
                //self.headersNode.removeChild(self.headersNode.children[0], true);
                // 回收池
                self.releaseNode("PlayerOther", self.headersNode.children[0]);
            }
        }, this);

        for (var i = 0; i < this.headerNodeList.length; i++) {
            if (i == 0) {
                var action = cc.sequence(cc.spawn(cc.moveBy(0.5, cc.v2(this.headerRadius, 0)), cc.fadeTo(0.5, 0)), finish);
                this.headerNodeList[i].runAction(action);
            } else {
                this.headerNodeList[i].runAction(cc.moveBy(0.5, cc.v2(this.headerRadius, 0)));
            }
        }

        // 列表及时清除数据
        this.headerNodeList.shift();
    }
}
