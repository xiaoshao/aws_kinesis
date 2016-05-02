#AWS_Kinesis

![Alt text](/.images/Kinesis.png?raw=true "Kinesis")
#Prerequisite
 Firstly, you need to make sure that the nodejs(upper than 5.7) is available in you laptop.
 
#How to run it
 1. change the app/consumer.properties to set the stream name with your stream.
 2. `npm install` to install all the dependencies.
 3. set comfortable authentication in your laptop.
 4. `npm start` will start to read your stream
 
#comment
 the default authentication order:
  1. > Environment variable (AWS_....) 
  2. > Java System Properties - aws.accessKeyId and aws.secretKey
  3. > Credential profiles file at the default location (~/.aws/credentials) shared by all AWS SDKs and the AWS CLI
  4. > Instance profile credentials delivered through the Amazon EC2 metadata service
