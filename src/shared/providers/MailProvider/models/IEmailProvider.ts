export default interface IEMailProvider {
  sendEmail(to: string, body: string): Promise<void>;
}
