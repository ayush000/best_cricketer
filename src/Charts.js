import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, Brush } from 'recharts';
import { Radio, Select } from 'antd';
import 'antd/dist/antd.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const moment = require('moment');

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
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends;
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
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Brush dataKey={xAxisKey} height={30} stroke="#334961" />
                        {legends.map((legend, i) =>
                            <Bar dataKey={legend} key={legend} fill={colors[i % colors.length]} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const Option = Select.Option;
class BarGraphSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            origData: {},
            data: {},
            selectOptions: ['All'],
        };
    }
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
        }).then(() => {
            const rows = this.state.data.rows,
                filterBy = this.state.data.graphParams.filter;
            this.setState({
                origData: this.state.data,
                selectOptions: ['All', ...new Set(rows.map(row => row[filterBy]))], // Array of unique options of filter value
            });
        });
    }

    tickFormatDate = (timestamp) => {
        return moment(timestamp).format('YYYY-MM-DD');
    }
    handleSelect = (filterVal) => {
        if (filterVal === 'All') {
            this.setState({ data: this.state.origData });
            return;
        }
        const newData = Object.assign({}, this.state.origData);
        newData.rows = newData.rows.filter(row => {
            const filterBy = newData.graphParams.filter;
            return row[filterBy] === filterVal;
        });

        this.setState({ data: newData });
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
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends,
            selectOptions = this.state.selectOptions;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <Select
                        style={{ float: 'right', width: 200 }}
                        placeholder="Opposition"
                        showSearch
                        optionFilterProp="children"
                        onChange={this.handleSelect}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {
                            selectOptions.map(option =>
                                <Option key={option} value={option}>{option}</Option>)
                        }
                    </Select>
                </div>
                <ResponsiveContainer aspect={4.0 / 1.5} width='100%'>
                    <BarChart data={rows}
                        margin={{ top: 25, right: 75, left: 20, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} minTickGap={20} tickFormatter={this.tickFormatDate} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Brush dataKey={xAxisKey} height={30} stroke="#334961" tickFormatter={this.tickFormatDate} />
                        {legends.map((legend, i) =>
                            <Bar dataKey={legend} key={legend} fill={colors[i % colors.length]} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export { BarGraphToggle, BarGraphSelect };
