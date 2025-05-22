const { KinesisClient, PutRecordCommand } = require('@aws-sdk/client-kinesis')

//connect Kinesis

const kinesis = new KinesisClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
})

const sendLogToKinesis = async (streamName, logData) => {
    const input = {
        StreamName: streamName,
        PartitionKey: logData.email || 'anonymous',
        Data: Buffer.from(JSON.stringify(logData))
    }

    try {
        const command = new PutRecordCommand(input)
        const response = await kinesis.send(command)

        console.log('✅ Log sent to Kinesis:', response)

        return response

    } catch (error) {

        console.error('❌ Failed to send log to Kinesis:', error);
        throw error;
    }

}

module.exports = {sendLogToKinesis} 