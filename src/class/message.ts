export default class Message {
    public message: string = '';
    public extraInfo: string | undefined = undefined;
    constructor(message: string, extraInfo?: string) {
        this.message = message;
        if(extraInfo)
            this.extraInfo = extraInfo;
    }
}