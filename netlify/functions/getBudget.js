const api = require('@actual-app/api');

exports.handler = async () => {
  try {
    await api.init({
      serverURL: "https://actualgrin.pikapod.net",
      password: process.env.ACTUAL_PASSWORD, // store password in env variables
      dataDir: '/tmp', // temporary storage for serverless functions
    });

    const budget = await api.downloadBudget('1bc93ff2-c30a-4f25-9c36-8572ba72df56');

    return {
      statusCode: 200,
      body: JSON.stringify(budget),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};