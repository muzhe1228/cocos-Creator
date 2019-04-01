import Grid from "../view/Grid";
import WindowButtonController from "./WindowButtonController";
import WayWindowController from "./WayWindowController";

// 路子左侧面板控制器

const {ccclass, property} = cc._decorator;

@ccclass
export default class WayController extends WindowButtonController {

    @property(Grid)
    private grid: Grid = null;

    @property(WayWindowController)
    private window: WayWindowController = null;

    private gridInited: boolean = false;

    private wayTemp: any = null;

    private winTemp: any = null;

    onLoad () {
        super.onLoad();
        this.windowController.node.on(
            cc.Node.EventType.TOUCH_END, this.onTouchBoardCallback, this);
        if (! this.wayTemp) this.preStorage();
    }

    // 请求并预存储首页数据
    public preStorage () {
        this.wayTemp = this.winTemp = null;
        this.window.requestWayInfo(1,
            (wayInfo) => { this.wayTemp = wayInfo });
        this.window.requestWayWins(
            (data) => { this.winTemp = data })
    }

    // 刷新单元格，重新填充数据
    public refreshCells () {
        if (! this.gridInited) return;
        this.resetCells();
        if (this.wayTemp && this.winTemp) {
            this.renderCells(this.wayTemp, this.winTemp);
        } else if (! this.wayTemp && ! this.winTemp) {
            this.window.requestWayInfo(1, (wayInfo) => {
                this.window.requestWayWins((winInfo) => {
                    this.renderCells(wayInfo, winInfo);
                })
            });
        } else if (! this.wayTemp) {
            this.window.requestWayInfo(1, (wayInfo) => {
                this.renderCells(wayInfo, this.winTemp);
            });
        } else if (! this.winTemp) {
            this.window.requestWayWins((winInfo) => {
                this.renderCells(this.wayTemp, winInfo);
            })
        }
    }

    // 初始化单元格的样式
    private initCells () {
        for (let x = 0; x < this.grid.columns; x++) {
            for (let y = 0; y < this.grid.rows; y++) {
                let cell = this.grid.cellMatrix[x][y];

                // 绘制边框线
                let ctx = cell.getComponent(cc.Graphics);
                ctx = cell.addComponent(cc.Graphics);
                ctx.strokeColor.fromHEX('#374D75');
                ctx.rect(0, -cell.height, cell.width, cell.height);
                ctx.stroke();

                // 第一列角标
                if (x === 0) {
                    let leftNode = cell.getChildByName('LeftLabel');
                    let leftLabel = leftNode.getComponent(cc.Label);
                    y === 0 ? leftLabel.string = '总' : leftLabel.string = '赢';
                    leftNode.active = true;
                }
                // 第一行 庄的字体颜色与其他不同
                let centerNode = cell.getChildByName('CenterLabel');
                (x >= 1 && y === 0) ? centerNode.color = new cc.Color().fromHEX('#DDBE6B') :
                    centerNode.color = new cc.Color().fromHEX('#85A0E4');
            }
        }
    }

    // 重置所有单元格
    private resetCells () {
        for (let x = 0; x < this.grid.columns; x++) {
            for (let y = 0; y < this.grid.rows; y++) {
                let cell = this.grid.cellMatrix[x][y];
                cell.getChildByName('CenterLabel').getComponent(cc.Label).string = '';
                cell.getChildByName('WinLabel').active = false;
            }
        }
    }

    // 填充表格内容
    public renderCells (wayInfo: any, winInfo: any) {
        console.log(winInfo);
        let wayList = wayInfo.data.list;

        enum EnumNiuIndex {
            niuBanker = 0,
            niuSky = 1,
            niuLand = 2,
            niuMysterious = 3
        }

        enum EnumOddIndex {
            niuOddSky = 1,
            niuOddLand = 2,
            niuOddMysterious = 3
        }

        enum EnumWinIndex {
            allNumber = 0,
            skyNumber = 1,
            landNumber = 2,
            mysteriousNumber = 3
        }

        for (let x = 0; x < Math.min(this.grid.columns, wayList.length+2); x++) {

            for (let y = 0; y < this.grid.rows; y++) {

                let cell = this.grid.cellMatrix[x][y];
                let centerNode = cell.getChildByName('CenterLabel');
                let centerLabel = centerNode.getComponent(cc.Label);

                // 填充数据
                switch (x) {
                    case 0:
                        centerLabel.string = winInfo.data[EnumWinIndex[y]] || 0;
                        break;
                    case 1:
                        y === 0 ? centerLabel.string = '庄' : centerLabel.string = '闲' + y.toString();
                        break;
                    default:
                        centerLabel.string = wayList[5 - (x-2)][EnumNiuIndex[y]];
                        if (y >= 1) {
                            let winNode = cell.getChildByName('WinLabel');
                            winNode.active = wayList[5 - (x-2)][EnumOddIndex[y]] < 0;
                        }
                }
            }
        }
    }

    protected onTouchCallback(button) {
        super.onTouchCallback(button);
        if (! this.gridInited) {
            this.gridInited = true;
            this.initCells();
        }
        this.refreshCells();
    }

    protected onTouchBoardCallback () {
        this.playAudioClip("sounds/界面交互点击");
        this.windowController.close();
        this.window.open();
        this.window.init(this.wayTemp);
    }

}
