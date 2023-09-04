import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export class StorageBucket {
  private readonly S3Bucket: S3Client;
  constructor() {
    this.S3Bucket = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: String(process.env.AWS_ACESS_KEY),
        secretAccessKey: String(process.env.AWS_SECRET_KEY),
      },
    });
  }

  async uploadFile(filename: string, data: any) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `catalog-${filename}.json`,
      Body: JSON.stringify(data),
    });

    return await this.S3Bucket.send(command);
  }

  async findFiles(filename: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `catalog-${filename}.json`,
      ResponseContentType: "application/json",
    });

    const getFile = await this.S3Bucket.send(command);
    const transformFile = await getFile.Body?.transformToString();

    return JSON.parse(String(transformFile));
  }
}
