require('dotenv').config();
const LambdaTunnel = require('@lambdatest/node-tunnel');

const tunnelInstance = new LambdaTunnel();

if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
  console.error('Please set LT_USERNAME and LT_ACCESS_KEY environment variables');
  process.exit(1);
}

const tunnelArguments = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  tunnelName: 'playwright-tunnel'
};

tunnelInstance.start(tunnelArguments, (error, tunnelInfo) => {
  if (error) {
    console.log('Tunnel failed to start:', error);
    process.exit(1);
  }
  console.log('Tunnel started successfully');
  console.log('Tunnel Info:', tunnelInfo);

  // Keep the tunnel running until the process is terminated
  process.on('SIGINT', () => {
    console.log('Stopping tunnel...');
    tunnelInstance.stop(() => {
      console.log('Tunnel stopped');
      process.exit();
    });
  });
});
