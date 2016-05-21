/* eslint-disable no-console */

import dotenv from 'dotenv';
import chalk from 'chalk';
import s3client from 's3';

dotenv.config();

const client = s3client.createClient({
  s3Options: {
    region: process.env.AWS_S3_REGION,
  },
});

const params = {
  localDir: 'build/prod',
  deleteRemoved: false,
  s3Params: {
    Bucket: process.env.AWS_S3_BUCKET,
  },
};

const uploader = client.uploadDir(params);

uploader.on('error', (err) => {
  console.error(chalk.red.bold(`unable to sync: ${err.stack}`));
});

uploader.on('end', () => {
  console.log(chalk.green.bold('done uploading'));
});
