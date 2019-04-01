import Chip from "../view/Chip";
import BaseComponent from "../utils/BaseComponent";

// 筹码区域控制器

const {ccclass, property} = cc._decorator;

export var SELECTED_CHIP_VALUE: number = 0;

@ccclass
export default class ChipAreaController extends BaseComponent {

    @property(cc.Prefab)
    private chipPrefab: cc.Prefab = null;

    @property(cc.ScrollView)
    private chipScroll: cc.ScrollView = null;

    @property(cc.Node)
    private chipList: cc.Node = null;

    @property(cc.Sprite)
    private flowSprite: cc.Sprite = null;

    // 当前选中的筹码
    private currentChipIndex = 0;

    // 筹码对象
    private chips: Chip[] = [];

    // 事件handler
    private eventHandler: cc.Component.EventHandler = null;

    onLoad () {
        this.initChipList();
    }

    // 初始化筹码列表
    private initChipList() {
        this.requestChipList(() => {
            this.chips = this.chipList.getComponentsInChildren(Chip);
            this.initChips();
            this.showFlowEffect();
        });
    }

    // 请求筹码列表
    private requestChipList(callback: Function) {
        this.httpUtils.post(
            "/hns/niuniu/findBetsList",
            {
                "token": this.getToken(),
                "roomId": this.getRoomId(),
            },
            true,
            (res) => {
                this.renderChips(res);
                callback();
            },
            true
        );
    }

    // 渲染筹码列表
    private renderChips(res) {
        if (res.code != 0) {
            return
        }
        for (let item of res.data) {
            let chipNode = cc.instantiate(this.chipPrefab);
            chipNode.getComponent(Chip).chipValue = item["bets"];
            this.chipList.addChild(chipNode, undefined, "Chip");
        }
        this.chipScroll.scrollToTop(0);

        // 下落进场动画
        this.chipList.y = this.chipList.height;
        let action = cc.sequence(
            cc.delayTime(0.2),
            cc.moveTo(0.5, cc.v2(0, 0)).easing(cc.easeBackOut())
        );
        this.chipList.runAction(action);
    }

    // 流光效果
    private showFlowEffect() {

        let finishOnce = cc.callFunc(function(target) {

            if (target instanceof cc.Node) {
                let flowSpriteNode = target;
                flowSpriteNode.y = flowSpriteNode.height;
            }
        }, this);

        let moveLength = this.node.height + this.flowSprite.node.height;
        this.flowSprite.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(5, 0, -moveLength), finishOnce)));
    }

    // 筹码初始化设置
    private initChips () {
        // 设置默认高亮筹码
        if (this.currentChipIndex >= 0 && this.currentChipIndex < this.chips.length) {
            this.chips[this.currentChipIndex].setSelected(true);
            SELECTED_CHIP_VALUE = this.chips[this.currentChipIndex].getChipValue();
        }

        this.eventHandler = new cc.Component.EventHandler();
        this.eventHandler.target = this.node;
        this.eventHandler.component = "ChipAreaController";
        this.eventHandler.handler = "onEventCallback";

        for (let i = 0; i < this.chips.length; i++) {
            // 设置筹码索引
            this.chips[i].setChipIndex(i);
            // 设置事件监听
            this.chips[i].addEventListener(this.eventHandler);
        }
    }

    // 事件回调函数
    private onEventCallback (chipIndex: number, chipValue: number, customEventData: string) {

        if (chipIndex != this.currentChipIndex) {
            // 之前的筹码设置成未选中
            this.chips[this.currentChipIndex].setSelected(false);
            this.currentChipIndex = chipIndex;
            SELECTED_CHIP_VALUE = chipValue;
        }
    }

    // 分割筹码
    public splitTotalChip(value: number) : number[] {
        let result: number[] = [];
        let totalValue = value;
        // 取出筹码值
        let chipValues = [].concat(this.chips.map(
            chip => chip.getChipValue()));
        // 从大到小排序
        chipValues.sort( (a, b) => b - a );
        for (let chipValue of chipValues) {
            let count = Math.floor(totalValue / chipValue);
            if (count >= 1) {
                totalValue -= count * chipValue;
                while (count-- > 0) {
                    result.push(chipValue);
                }
            }
        }
        return result;
    }

}
