import { GameType } from "./GameType";
import DataOwner from "./DataOwner";

/**
 * 牛牛开奖结果
 */
//@Model("SocketType=3")
export class GameResult extends DataOwner {
    
    public getRoomId() : number {
        return parseInt(this._data.roomId);
    }

    public getGameType() : GameType {
        return parseInt(this._data.gameType);
    }

    //中奖金额（无该字段则表示未参与游戏）
    public getWinBets() : number {
        return this._data.winBets;
    }

    public getUserId() : number {
        return parseInt(this._data.userId);
    }

    // 每个位置的牌，示例：'ae42c'
    public getBankerCards() : string {
        return this._data.cardBanker;
    }

    public getSkyCards() : string {
        return this._data.cardSky;
    }

    public getLandCards() : string {
        return this._data.cardLand;
    }

    public getMysteriousCards() : string {
        return this._data.cardMysterious;
    }

    // 每个位置的牛几结果
    public getBankerNiu() : string {
        return this._data.niuBanker;
    }

    public getSkyNiu() : string {
        return this._data.niuSky;
    }

    public getLandNiu() : string {
        return this._data.niuLand;
    }

    public getMysteriousNiu() : string {
        return this._data.niuMysterious;
    }

    // 如果自己有下注，这三个字段返回在每个闲家的收益，不下注没有字段
    public getSkyWin() : number {
        return this._data.winSky;
    }

    public getLandWin() : number {
        return this._data.winLand;
    }

    public getMysteriousWin() : number {
        return this._data.winMysterious;
    }

    // 三个闲家的赔率，正是闲输，负是闲赢，数字代表赢输几倍（平倍房间也是几倍）
    public getSkyOdd() : number {
        return this._data.oddSky;
    }

    public getLandOdd() : number {
        return this._data.oddLand;
    }

    public getMysteriousOdd () {
        return this._data.oddMysterious;
    }

}

