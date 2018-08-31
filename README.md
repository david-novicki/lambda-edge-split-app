# Lambda@Edge Split App
I have created a Proof of Concept for using a split SPA with Lambda@Edge to only deliver full application once authorization is done. This is just an additional level of security for applications posted on the public internet.

Technologies used: Serverless Framework, ReactJS, Webpack, AWS Lambda, AWS Cloudfront, AWS S3.

#### Install
To install this application run the command at the root after cloning this repository:
```
yarn install
```


#### To build split application
When this React app is built, the 'Sign in' and 'Main' logic are decoupled into their own bundles.

To build the split bundles run:
```
yarn build
```
After you will see two folders in the `build` folder. These are our split application bundles.

#### Deploy
In order to allocate resources and deploy our application to AWS you will need to have properly downloaded and set up AWS and [Serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start#pre-requisites)

To deploy our application you will need to run:
```
cd server/ && serverless deploy
```


#### Test
Testing that our deployment works is currently a bit primitive. Start by copying the Cloudfront domain given from the deployment process in AWS and pasting it in your browser. This should prompt you the login page, click 'Sign in' and it should sign you in and push a redirect. Here we are requesting the `private/` domain and our Lambda@edge is doing a simple check for our designated cookie then allowing us to download the application. In a more realistic application we would do more thorough sanity checks with that cookie.  
