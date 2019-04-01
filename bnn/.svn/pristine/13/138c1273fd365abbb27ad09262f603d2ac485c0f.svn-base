const { ccclass, property } = cc._decorator;
import { roomType } from "../model/roomType";

@ccclass
export default class RoomBlock extends cc.Component {

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property(cc.Label)
    PKNum: cc.Label = null;

    @property(cc.Label)
    peopleNum: cc.Label = null;

    @property(cc.Label)
    maxPk: cc.Label = null;
    private readonly YELLOW = cc.color(255, 254, 245, 176);
    // onLoad () {}

    start() {}

    public renderRoom(data: any) {
        let index = data.roomType;
        let resultSprite = "2x/roomList/room_" + index.toString();
        let self = this;
        cc.loader.loadRes(resultSprite, cc.SpriteFrame, function(err, spriteFrame) {
            if (err) {
                console.log(err);
            } else {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                self.titleLabel.string = roomType[index];
                self.PKNum.string = self.numRes(data.bottomBets) + "Pk";
                self.peopleNum.string = data.peopleNumber + "人";
                self.maxPk.string = "≥" + self.numRes(data.minBets) + "Pk";
            }
        });
    }
    public setData(data: any) {
        this.PKNum.string = this.numRes(data.bottomBets) + "Pk";
        this.peopleNum.string = data.peopleNumber + "人";
        this.maxPk.string = "≥" + this.numRes(data.minBets) + "Pk";
    }
    public setPeople(data: any) {
        this.peopleNum.string = data.peopleNumber + "人";
    }
    // update (dt) {}

    //牛牛房间Pk格式化
    private numRes(number) {
        if (number >= 9999999) {
            return this.toThousands(number / 1000000) + "m";
        } else if (number >= 9999) {
            return this.toThousands(number / 1000) + "k";
        } else {
            return this.toThousands(number);
        }
    }
    //千分符
    private toThousands(num) {
        var re = /\d{1,3}(?=(\d{3})+$)/g;
        var n1 = num.toString().replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
            return s1.replace(re, "$&,") + s2;
        });
        return n1;
    }
}
