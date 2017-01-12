const alasql = require('alasql');
const queries = require('./graphLookup');
function getCardsData(csvObj) {
    const query = 'SELECT Sum(batting_score)                          `Runs scored`, ' +
        '       Count(1)                                              `Matches played`, ' +
        '       Count(IF(notOut = true, 1, NULL))                     `Not outs`, ' +
        '       Sum(catches)                                          `Catches taken`, ' +
        '       Count(IF(batting_score >= 50 ' +
        '                AND batting_score < 100, 1, NULL))           `Half centuries`, ' +
        '       Count(IF(batting_score > 100, 1, NULL))               `Centuries`, ' +
        '       Max(batting_score)                                    `Highest score`, ' +
        '       Round(Sum(batting_score) * 100 / Sum(balls_faced), 2) `Strike rate`, ' +
        '       Sum(`4s`)                                             `4s`, ' +
        '       Sum(`6s`)                                             `6s` ' +
        'FROM   ?';
    const data = alasql(query, [csvObj]);
    if (data && data.length === 1)
        return data[0];
    else throw new Error('empty string');
}

function getGraphsData(params, csvObj) {
    let obj = queries[params.graph_key];
    if (params.graph_key === 'cumulative_score') {
        return getCumulativeScore(csvObj);
    }
    if (params.group) {
        obj = queries[params.graph_key][params.group];
    }
    const query = obj.query;
    const rows = alasql(query, [csvObj]);
    if (rows && rows.length >= 1) {
        const clone = Object.assign({}, obj);
        delete clone.query;
        return {
            graphParams: clone,
            rows,
        };
    }
    else throw new Error('empty string');
}

function getCumulativeScore(csvObj) {
    let newObj = [];
    csvObj.reduce((a, b, i) => {
        return newObj[i] = {
            match: i + 1,
            batting_score: a.batting_score + b.batting_score,
            balls_faced: a.balls_faced + b.balls_faced,
        };
    }, { batting_score: 0, balls_faced: 0 });
    newObj = newObj.map(row => {
        return {
            match: row.match,
            'Cumulative runs': row.batting_score,
            'Balls faced': row.balls_faced,
        };
    });

    return {
        graphParams: {
            title: 'Cumulative runs scored',
            xAxisLabel: 'Matches',
            yAxisLabel: 'Number',
            xAxisKey: 'match',
            legends: ['Cumulative runs', 'Balls faced'],
        },
        rows: newObj,
    };
}

exports.getCardsData = getCardsData;
exports.getGraphsData = getGraphsData;