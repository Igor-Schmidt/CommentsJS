const testeApiModel = require("../models/testeApiModel.js");

// const has = require("has-keys");
const chalk = require('chalk');
const _ = require('lodash');

const logBlue = chalk.blue;
const logGreen = chalk.green;
const logRed = chalk.red;

const logBlueBold = chalk.blue.bold;
const logGreenBold = chalk.green.bold;
const logRedBold = chalk.red.bold;

module.exports = {
    async getUsers(req, res) {
        try {
            console.log('\n------------------------------------');
            var start = new Date().getTime();
            console.log(logBlueBold('[getUsers] - Iniciando...'));

            let data = await testeApiModel.getUsers(req.query)

            if (data.length > 0) {
                res.json({
                    status: true,
                    count: data.length,
                    params: req.query,
                    data
                })
            }
            else {
                res.json({
                    status: false,
                    count: data.length,
                    message: 'Nenhum user encontrado!',
                    params: req.query
                })
            }

            var elapsedTime = new Date().getTime() - start;
            console.log(logGreen('Tempo decorrido: ' + elapsedTime + 'ms'));
            console.log(logBlueBold('[getUsers] - Fim execução!'));
            console.log('------------------------------------');

        } catch (error) {
            console.log(`\n[ERRO - getUsers] \n${error}\n`);
            console.log(`------------------------------\n`);

            res.json({
                status: false,
                terminalERROR: '' + error
            })
        }
    },

    async getComments(req, res) {
        try {
            console.log('\n------------------------------------');
            var start = new Date().getTime();
            console.log(logBlueBold('[getComments] - Iniciando...'));

            let data = await testeApiModel.getComments(req.query)

            if (data.length > 0) {
                res.json({
                    status: true,
                    count: data.length,
                    params: req.query,
                    data
                })
            }
            else {
                res.json({
                    status: false,
                    count: data.length,
                    message: 'Nenhum user encontrado!',
                    params: req.query
                })
            }

            var elapsedTime = new Date().getTime() - start;
            console.log(logGreen('Tempo decorrido: ' + elapsedTime + 'ms'));
            console.log(logBlueBold('[getComments] - Fim execução!'));
            console.log('------------------------------------');

        } catch (error) {
            console.log(`\n[ERRO - getComments] \n${error}\n`);
            console.log(`------------------------------\n`);

            res.json({
                status: false,
                terminalERROR: '' + error
            })
        }
    },
}
