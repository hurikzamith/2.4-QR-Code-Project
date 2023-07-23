/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import qr from 'qr-image';
import inquirer from 'inquirer';
import fs from 'fs';


// Qual link você quer transformar em QR Code?
// R: https://www.google.com.br/
// Armazenar reposta em uma var
// Criar QR Code baseado nesta url fornecida
// Retornar QR Code para o usuário e salvar em um arquivo txt

console.log('Hi, welcome to QR code generator!');


const questions = [
  {
    type: 'confirm',
    name: 'proceed?',
    message: 'Do you wish to generate a QR code?',
    default: false,
    transformer: (answer) => (answer ? '👍' : '👎'),
  },
  {
    type: 'input',
    name: 'url',
    message: "What's the url for the QR code?"
  }
];

inquirer.prompt(questions).then((answers) => {
  console.log('\nAnswers:');
  console.log(JSON.stringify(answers, null, '  '));

  var urlValue = answers['url'];
  var qr_svg = qr.image(urlValue);
  qr_svg.pipe(fs.createWriteStream(`${urlValue}.png`));

  fs.writeFile("URL.txt", urlValue, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

});
