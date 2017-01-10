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
    let query = queries[params.graph_key];
    if (params.group) {
        query = queries[params.graph_key][params.group];
    }
    console.log(query);
    const data = alasql(query, [csvObj]);
    if (data && data.length >= 1)
        return data;
    else throw new Error('empty string');
}

exports.getCardsData = getCardsData;
exports.getGraphsData = getGraphsData;