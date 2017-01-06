const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');

const writeLog = require('./commonfunction').writeLog;
const constants = require('./constants');
const parser = require('./parser');

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
    parser.parseSachinCsv().then((csv) => {
        app.get('/robot', (req, res) => {
            res.send(csv);
        });
    });
});