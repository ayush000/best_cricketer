const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const writeLog = require('./commonfunction').writeLog;
const constants = require('./constants');
const parser = require('./parser');
const aggrOperations = require('./aggrOperations');

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
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
        app.get('/api/graph/:graph_key', (req, res) => {
            if (!req.params.graph_key)
                return res.status(404).send({ status: 404, message: 'Not found' });
            const params = {
                'graph_key': req.params.graph_key,
                'group': req.query.group,
            };
            res.send(aggrOperations.getGraphsData(params, csvObj));
        });
    });
});