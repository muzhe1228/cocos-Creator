// 房间

export class Room {

    public roomId: number;

    public roomType: string;

    public roomOdd: string;

    public constructor(roomId: number, roomType: string, roomOdd: string) {
        this.roomId = roomId;
        this.roomType = roomType;
        this.roomOdd = roomOdd;
    }

}
