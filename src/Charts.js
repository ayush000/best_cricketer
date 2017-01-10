import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { Radio } from 'antd';
import 'antd/dist/antd.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { parseJSON } from './commonfunction';
import { colors } from './constants';
async function fetchData(params) {
    let url = `http://localhost:3001/api/graph/${params.graph_key}`;
    if (params.group) {
        url += `?group=${params.group}`;
    }
    try {
        const data = await parseJSON(await fetch(url));
        this.setState({ data });
    } catch (e) {
        console.log(e);
    }
}

class BarGraphToggle extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: 'byYear',
        });
    }
    onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: e.target.value,
        });
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div height={250}>Loading</div>
            );
        }
        const rows = this.state.data.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title;
        const keys = Object.keys(rows[0]);
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <RadioGroup style={{ float: 'right' }}
                        onChange={this.onChange} defaultValue="byYear">
                        <RadioButton value="byYear">Year</RadioButton>
                        <RadioButton value="byOpposition">Opposition</RadioButton>
                    </RadioGroup>
                </div>
                <ResponsiveContainer aspect={4.0 / 1.5} width='100%'>
                    <BarChart data={rows}
                        margin={{ top: 25, right: 75, left: 20, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={keys[keys.length - 1]} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        {keys.map((key, i) =>
                            <Bar dataKey={key} key={key} fill={colors[i % colors.length]} />
                        ).slice(0, keys.length - 1)}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );

    }
}

export { BarGraphToggle };
