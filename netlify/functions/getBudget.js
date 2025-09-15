const api = require('@actual-app/api');

exports.handler = async () => {
  try {
    await api.init({
      serverURL: 'http://your-actual-budget-server:5006',
      password: process.env.ACTUAL_PASSWORD, // store password in env variables
      dataDir: '/tmp', // temporary storage for serverless functions
    });

    const budget = await api.downloadBudget('your_budget_id');

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