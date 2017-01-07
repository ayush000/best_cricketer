const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const writeLog = require('./commonfunction').writeLog;
const constants = require('./constants');
const parser = require('./parser');
const aggrOperations = require('./aggrOperations');
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

const listener = app.listen(process.env.PORT || 3001, () => {
    writeLog(`Listening on port ${listener.address().port}`);
    // Parse csv
    parser.parseSachinCsv(constants.csvPath).then((csvObj) => {
        app.get('/robot', (req, res) => {
            res.send(csvObj);
        });
        app.get('/api/cards', (req, res) => {
            res.send(aggrOperations.getCardsData(csvObj));
        });
    });
});