// Import the AWS SDK
import AWS from "aws-sdk";
import Auth from "./Auth";

// IMPORTANT: PLEASE DO NOT SHARE THE FOLLOWING ACCESS AND SECRET KEY! It's confidential!!
const AWS_ACCESS_KEY= 'AKIAZBCHWQCDCJJLCT7K';
const AWS_SECRET_KEY= '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';
const bucketRegion = "ap-southeast-1";

const ImageUploaderCloud = {
 // for animal listings images
  uploadImgToCloud(data) {
    // Set AWS credentials
    AWS.config.update({
      region: bucketRegion,
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
    });


    // Create an S3 instance
    const s3 = new AWS.S3();

    const params = {
      Bucket: "pawfect",
      Key: `animalListings/${Auth.getUser().email}_${new Date().toISOString()}_${data.name}`,
      Body: data,
    };

    var upload = s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data.Location); // S3 URL
        // return data.Location;
      }
    });

    var promise = upload.promise();

    return promise;
  },
};

export default ImageUploaderCloud;
