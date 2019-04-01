// 用户

export class User {

    public userId: number;

    public token: string;

    public constructor(userId: number, token: string) {
        this.userId = userId;
        this.token = token;
    }
}