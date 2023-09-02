import { Consumer, ConsumerOptions } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";

export const CatalogConsumer = () =>
  Consumer.create({
    queueUrl: String(process.env.AWS_SQS_URL),
    handleMessage: async (message) => {
      console.log("[CONSUMER]",message);
    },
    sqs: new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: String(process.env.AWS_ACESS_KEY),
        secretAccessKey: String(process.env.AWS_SECRET_KEY),
      },
    }),
  });
