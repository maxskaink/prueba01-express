export default class Message {
  constructor(message, extraInfo='') {
    this.message = message;
    if( extraInfo ) 
      this.extraInfo = extraInfo;
  }
}