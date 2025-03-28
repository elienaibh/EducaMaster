import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  (region: process.env.AWS_REGION ?? (() => { throw new Error('Valor não pode ser nulo') })()),
  credentials: {
    (accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? (() => { throw new Error('Valor não pode ser nulo') })()),
    (secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? (() => { throw new Error('Valor não pode ser nulo') })()),
  },
});

export async function uploadFile(file: File, key: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  await s3Client.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

export async function getSignedUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return signedUrl;
}

export function getPublicUrl(key: string) {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}