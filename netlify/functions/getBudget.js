const api = require('@actual-app/api');

exports.handler = async () => {
  try {
    const password = process.env.ACTUAL_PASSWORD;

    if (!password) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'ACTUAL_PASSWORD is not defined' }),
      };
    }

    // Initialize the Actual Budget API
    await api.init({
      serverURL: "https://actualgrin.pikapod.net",
      password: password,
      dataDir: '/tmp', // temporary storage for serverless functions
    });

    // Download the full budget
    await api.downloadBudget('1bc93ff2-c30a-4f25-9c36-8572ba72df56');

    // Download a specific month
    const budget = await api.getBudgetMonth('2025-09'); // use api.getBudgetMonth
    console.log(budget);

    return {
      statusCode: 200,
      body: budget,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};