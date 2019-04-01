import DataOwner from "./DataOwner";

// 聊天信息

export default class RechargeInfo extends DataOwner {

    public getAddress() : string {
        return this._data.rechargeAddress;
    }

    public getLimit(): number {
        return parseFloat(this._data.rechargeLimit);
    }
}