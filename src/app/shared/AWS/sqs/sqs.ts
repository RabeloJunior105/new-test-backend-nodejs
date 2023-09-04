import AppError from "@shared/Error/error.interceptor";
import { Logger } from "@shared/Logger/logger.helper";
import { SQS } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
export class QueueService {
  private readonly sqs: SQS;
  constructor() {
    this.sqs = new SQS({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: String(process.env.AWS_ACESS_KEY),
        secretAccessKey: String(process.env.AWS_SECRET_KEY),
      },
    });
  }

  async addMessageQueue(MessageQueue: any) {
    try {
      const messageQueue = await this.sqs.sendMessage({
        MessageBody: MessageQueue,
        QueueUrl: String(process.env.AWS_SQS_URL),
      });

      Logger().info(`Message add to queue ${messageQueue.MessageId}`);
      return messageQueue;
    } catch (error: any) {
      throw new AppError(error.message, 400);
    }
  }

  async receiveMessageQueue() {
    const app = Consumer.create({
      queueUrl: String(process.env.AWS_SQS_URL),
      handleMessage: async (message) => {
        console.log(message);
      },
      sqs: this.sqs,
    });

    app.start()
  }
}
