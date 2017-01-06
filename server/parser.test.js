const parser = require('./parser');
it('parses csv into array of jsons', async () => {
    const csv = await parser.parseSachinCsv();
    expect(csv.length).toEqual(463);
    expect(csv[0]).toEqual({
        'batting_score': 0,
        'wickets': null,
        'runs_conceded': null,
        'catches': 0,
        'stumps': 0,
        'opposition': 'Pakistan',
        'ground': 'Gujranwala',
        'date': '12/18/1989',
        'match_result': 'lost',
        'result_margin': '7 runs',
        'toss': 'won',
        'batting_innings': '2nd',
        'balls_faced': 2,
        'strike_rate': 0,
        '4s': 0,
        '6s': 0,
        'notOut': false
    });
});