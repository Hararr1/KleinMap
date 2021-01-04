export interface ISubscriber {
    id: number;
    isVerify: number;
    stationId: number;
    isSendVerifyCode: number;
    lastDailyMail: number;
    mailAddress: string;
}
