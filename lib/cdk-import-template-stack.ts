import { aws_s3 as s3, Stack, StackProps } from "aws-cdk-lib";
import * as cfninc from "aws-cdk-lib/cloudformation-include";
import { Construct } from "constructs";

export class CdkImportTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const template = new cfninc.CfnInclude(this, "Template", {
      templateFile: "template.yml",
    });

    const cfnBucket = template.getResource("S3Bucket") as s3.CfnBucket;
    cfnBucket.bucketEncryption = {
      serverSideEncryptionConfiguration: [
        {
          bucketKeyEnabled: false,
          serverSideEncryptionByDefault: {
            sseAlgorithm: "AES256",
          },
        },
      ],
    };
  }
}
