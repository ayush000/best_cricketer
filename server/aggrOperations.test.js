const aggrOperations = require('./aggrOperations');

it('returns cumulative score, balls faced and match count', () => {
    const csvObj = [
        {
            batting_score: 12,
            balls_faced: 14,
        }, {
            batting_score: 5,
            balls_faced: 11,
        }, {
            batting_score: 3,
            balls_faced: 4,
        }];
    const rows = aggrOperations.getCumulativeScore(csvObj).rows;
    expect(rows.length).toEqual(3);
    expect(rows[0]).toEqual({
        match: 1,
        'Cumulative runs': 12,
        'Balls faced': 14,
    });
    expect(rows[2]).toEqual({
        match: 3,
        'Cumulative runs': 20,
        'Balls faced': 29,
    });
});

it('returns sum of all data points for cards', () => {
    const csvObj = [
        {
            'batting_score': 2, 'wickets': null, 'runs_conceded': null, 'catches': 0,
            'stumps': 0, 'opposition': 'Pakistan', 'ground': 'Gujranwala', 'date': '1989-12-18',
            'match_result': 'lost', 'result_margin': '7 runs', 'toss': 'won', 'batting_innings': '2nd',
            'balls_faced': 2, 'strike_rate': 0, '4s': 0, '6s': 0, 'notOut': false,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }];
    const res = aggrOperations.getCardsData(csvObj);
    expect(Object.keys(res).length).toEqual(10);
    expect(res['Runs scored']).toEqual(6);
    expect(res['Matches played']).toEqual(2);
    expect(res['Not outs']).toEqual(1);
});

it('fetches total runs grouped by opposition', () => {
    const csvObj = [
        {
            'batting_score': 2, 'wickets': null, 'runs_conceded': null, 'catches': 0,
            'stumps': 0, 'opposition': 'Pakistan', 'ground': 'Gujranwala', 'date': '1989-12-18',
            'match_result': 'lost', 'result_margin': '7 runs', 'toss': 'won', 'batting_innings': '2nd',
            'balls_faced': 2, 'strike_rate': 0, '4s': 0, '6s': 0, 'notOut': false,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }, {
            'batting_score': 4, 'wickets': null, 'runs_conceded': null, 'catches': 0, 'stumps': 0,
            'opposition': 'New Zealand', 'ground': 'Dunedin', 'date': '1990-03-01',
            'match_result': 'lost', 'result_margin': '108 runs', 'toss': 'won',
            'batting_innings': '2nd', 'balls_faced': 2, 'strike_rate': 0,
            '4s': 0, '6s': 0, 'notOut': true,
        }];
    const params = {
        graph_key: 'totalRuns',
        group: 'byOpposition',
    };
    const res = aggrOperations.getGraphsData(params, csvObj);
    expect(res.graphParams).toEqual({
        title: 'Total runs scored',
        xAxisLabel: 'Opp.',
        yAxisLabel: 'Runs',
        xAxisKey: 'opposition',
        legends: ['Runs scored'],
    });

    expect(res.rows.length).toEqual(1);
    expect(res.rows[0]).toEqual({
        'Runs scored': 24,
        opposition: 'New Zealand',
    });

});