const fs = require('fs');

// Simulated email sending function
const sendBirthdayEmail = (customer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success! sent mail to ' + customer.email);
    }, 2000);
  });
};

//__cron job definition__
//1.read customers json file
fs.readFile(process.argv[2], async (err, data) => {
  if (err) {
    console.log('No customer, no celebration :(');
  }

  if (data) {
    const customers = JSON.parse(data);
    const today = new Date();

    //2. for each customer, check their birthday and today's date. if same send mail to them.
    customers.forEach((customer) => {
      const birthday = new Date(customer.birthday);
      if (
        today.getMonth() === birthday.getMonth() &&
        today.getDate() === birthday.getDate()
      ) {
        sendBirthdayEmail(customer).then((message) => console.log(message));
      }
    });
  }
});
