import DataOwner from "./DataOwner";

export default class BankerInfo extends DataOwner {

    public getUserId() : number {
        return parseInt(this._data.userId);
    }

    public getNickname() : string {
        return this._data.nick;
    }

    public getHeadUrlPath() : string {
        return this._data.head;
    }

    // 获取当前局数
    public getRemainRound() : number {
        return this._data.remain;
    }

    // 获取最大局数
    public getMaxRound() : number {
        return this._data.maxRemain;
    }

    // 获取冻结金额
    public getFrozenBalance() : number {
        return this._data.lockBets;
    }
}
