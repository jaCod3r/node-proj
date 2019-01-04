const request = require('request');
const chalk = require('chalk');


// preforms a get request returns an string object
request(
  'https://interview.adpeai.com/api/v1/get-task',
  (error, response, body) => {
    // String object is parsed into an object
    const object = JSON.parse(body);
    let result;

    // check for the operation needed to be preformed
    switch (object.operation) {
      case 'addition':
        console.log(chalk.cyan(`Performing addition with values of ${object.left} + ${object.right}`));
        result = object.left + object.right;
        console.log(chalk.green(`The result is ${result}`));
        break;

      case 'multiplication':
        console.log(chalk.cyan(`Performing multiplication with values of ${object.left} * ${object.right}`));
        result = object.left * object.right;
        console.log(chalk.green(`The result is ${result}`));
        break;

      case 'division':
        console.log(chalk.cyan(`Performing division with values of ${object.left} / ${object.right}`));
        result = object.left / object.right;
        console.log(chalk.green(`The result is ${result}`));
        break;

      case 'subtraction':
        console.log(chalk.cyan(`Performing  subtraction with values of ${object.left} - ${object.right}`));
        result = object.left - object.right;
        console.log(chalk.green(`The result is ${result}`));
        break;

      case 'remainder':
        console.log(chalk.cyan(`Performing remainder with values of ${object.left} % ${object.right}`));
        result = object.left % object.right;
        console.log(chalk.green(`The result is ${result}`));
        break;

      default:
        break;
    }
    const id = object.id;
    // requent is sent to server to validate result
    request.post(
      {
        uri: 'https://interview.adpeai.com/api/v1/submit-task',
        json: {
          id,
          result,
        },
      },
      (error, response, body) => {
        console.log(body);
      },
    );
  },
);
