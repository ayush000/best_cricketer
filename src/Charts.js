import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, Brush, LineChart, Line } from 'recharts';
import { Radio, Select } from 'antd';
import 'antd/dist/antd.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { parseJSON } from './commonfunction';
import { colors, baseURL } from './constants';

/**
 * Fetches data from graphs api and sets the state of the caller component
 * Sets data to the entire JSON returned by API, rows to the array of objects that will be visualized
 * @param {object} params The parameters to select a graph
 * @param {string} graph_key Key pertaining to a graph, defined in server/graphLookup.js
 * @param {string} group Aggregation for the graph
 */
async function fetchData(params) {
    let url = `${baseURL}/api/graph/${params.graph_key}`;
    if (params.group) {
        url += `?group=${params.group}`;
    }
    try {
        const data = await parseJSON(await fetch(url));
        this.setState({ data, rows: data.rows });
    } catch (e) {
        console.log(e);
    }
}

/**
 * Bar graph with a toggle for x Axis: By year and by opposite side
 */
class BarGraphToggle extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            rows: [],
        };
    }

    /**
     * Fetch data and set the initial state variables
     */
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: 'byYear',
        });
    }

    /**
     * This function is called when x axis is toggled. It again calls the API
     * @param {object} e Object returned by radio button
     */
    onChange = (e) => {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: e.target.value,
        });
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div></div>
            );
        }
        const rows = this.state.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <RadioGroup style={{ float: 'right', paddingRight: 35 }}
                        onChange={this.onChange} defaultValue="byYear">
                        <RadioButton value="byYear">Year</RadioButton>
                        <RadioButton value="byOpposition">Opposition</RadioButton>
                    </RadioGroup>
                </div>
                <ResponsiveContainer aspect={this.props.aspect} width='100%'>
                    <BarChart data={rows}
                        margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
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

/**
 * Line graph with a toggle for x Axis: By year and by opposite side
 */
class LineGraphToggle extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            rows: [],
        };
    }

    /**
     * Fetch data and set the initial state variables
     */
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: 'byYear',
        });
    }

    /**
     * This function is called when x axis is toggled. It again calls the API
     * @param {object} e Object returned by radio button
     */
    onChange = (e) => {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: e.target.value,
        });
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div></div>
            );
        }
        const rows = this.state.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <RadioGroup style={{ float: 'right', paddingRight: 35 }}
                        onChange={this.onChange} defaultValue="byYear">
                        <RadioButton value="byYear">Year</RadioButton>
                        <RadioButton value="byOpposition">Opposition</RadioButton>
                    </RadioGroup>
                </div>
                <ResponsiveContainer aspect={this.props.aspect} width='100%'>
                    <LineChart data={rows}
                        margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Brush dataKey={xAxisKey} height={30} stroke="#334961" />
                        {legends.map((legend, i) =>
                            <Line dataKey={legend} key={legend} stroke={colors[i % colors.length]} />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

/**
 * A generic bar graph with selector to filter using filterBy param
 */
const Option = Select.Option;
class BarGraphSelect extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {},
            rows: [],
            selectOptions: ['All'],
        };
    }

    /**
     * After the initial data is received from the API,
     * unique values of filterBy key are set as options of selector in addition to default 'All' option
     */
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
        }).then(() => {
            const rows = this.state.rows,
                filterBy = this.state.data.graphParams.filter;
            this.setState({
                selectOptions: ['All', ...new Set(rows.map(row => row[filterBy]))], // Array of unique options of filter value
            });
        });
    }

    /**
     * Handles trigger of filtering. Calls filter operation on original data array
     * and sets it as new state of rows
     * @param {string} filterVal Value selected from select drop down
     */
    handleSelect = (filterVal) => {
        const data = this.state.data;
        if (filterVal === 'All') {
            this.setState({ rows: data.rows });
            return;
        }
        const newRows = data.rows.filter(row => {
            const filterBy = data.graphParams.filter;
            return row[filterBy] === filterVal;
        });

        this.setState({ rows: newRows });
    }

    /**
     * Renders all data in payload and displays it as Tooltip
     */
    renderTooltip = (x) => {
        if (x.active)
            return (
                <div style={{ backgroundColor: 'white', borderStyle: 'solid', borderColor: '#f5f5f5', borderWidth: 2 }}>
                    {Object.keys(x.payload[0].payload).map((key, i) =>
                        <p style={{ color: colors[i % colors.length] }} key={key}>{`${key} : ${x.payload[0].payload[key]}`}</p>
                    )}
                </div>
            );
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div></div>
            );
        }
        const rows = this.state.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends,
            filterBy = this.state.data.graphParams.filter,
            selectOptions = this.state.selectOptions;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <Select
                        style={{ float: 'right', width: 200, paddingRight: 35 }}
                        placeholder={filterBy}
                        showSearch
                        optionFilterProp="children"
                        onChange={this.handleSelect}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {selectOptions.map(option =>
                            <Option key={option} value={option}>{option}</Option>)}
                    </Select>
                </div>
                <ResponsiveContainer aspect={this.props.aspect} width='100%'>
                    <BarChart data={rows}
                        margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} minTickGap={20} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={this.renderTooltip} />
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


/**
 * A line graph with selector to filter using filterBy param,
 * specifically written for score timeline graph,
 * as timeline bar graph was unable to render in small screens
 */
class LineGraphSelectScoreTimeline extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            rows: [],
            selectOptions: ['All'],
        };
    }

    /**
     * After the initial data is received from the API,
     * unique values of filterBy key are set as options of selector in addition to default 'All' option
     */
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
        }).then(() => {
            const rows = this.state.rows,
                filterBy = this.state.data.graphParams.filter;
            this.setState({
                selectOptions: ['All', ...new Set(rows.map(row => row[filterBy]))], // Array of unique options of filter value
            });
        });
    }

    /**
     * Handles trigger of filtering. Calls filter operation on original data array
     * and sets it as new state of rows
     * @param {string} filterVal Value selected from select drop down
     */
    handleSelect = (filterVal) => {
        const data = this.state.data;
        if (filterVal === 'All') {
            this.setState({ rows: data.rows });
            return;
        }
        const newRows = data.rows.filter(row => {
            const filterBy = data.graphParams.filter;
            return row[filterBy] === filterVal;
        });

        this.setState({ rows: newRows });
    }

    /**
     * Renders all data in payload and displays it as Tooltip
     */
    renderTooltip = (x) => {
        if (x.active) {
            const payload = x.payload[0].payload;
            return (
                <div style={{ backgroundColor: 'white', borderStyle: 'solid', borderColor: '#f5f5f5', borderWidth: 2 }}>
                    {Object.keys(payload).map((key, i) =>
                        <p style={{ color: colors[i % colors.length] }} key={key}>{`${key} : ${x.payload[0].payload[key]}`}</p>
                    )}
                </div>
            );
        }
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div></div>
            );
        }
        const rows = this.state.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends,
            filterBy = this.state.data.graphParams.filter,
            selectOptions = this.state.selectOptions;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <Select
                        style={{ float: 'right', width: 200, paddingRight: 35 }}
                        placeholder={filterBy}
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
                <ResponsiveContainer aspect={this.props.aspect} width='100%'>
                    <LineChart data={rows}
                        margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} minTickGap={20} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={this.renderTooltip} />
                        <Legend verticalAlign="top" height={36} />
                        <Brush dataKey={xAxisKey} height={30} stroke="#334961" />
                        {legends.map((legend, i) =>
                            <Line dot={false} dataKey={legend} key={legend} fill={colors[i % colors.length]} />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

/**
 * Stacked Bar graph with a toggle for x Axis: By year and by opposite side
 */
class StackBarGraphToggle extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            rows: [],
        };
    }

    /**
     * Fetch data and set the initial state variables
     */
    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: 'byYear',
        });
    }

    /**
     * This function is called when x axis is toggled. It again calls the API
     * @param {object} e Object returned by radio button
     */
    onChange = (e) => {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
            group: e.target.value,
        });
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div></div>
            );
        }
        const rows = this.state.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <div style={{ overflow: 'hidden' }}>
                    <RadioGroup style={{ float: 'right', paddingRight: 35 }}
                        onChange={this.onChange} defaultValue="byYear">
                        <RadioButton value="byYear">Year</RadioButton>
                        <RadioButton value="byOpposition">Opposition</RadioButton>
                    </RadioGroup>
                </div>
                <ResponsiveContainer aspect={this.props.aspect} width='100%'>
                    <BarChart data={rows}
                        margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Brush dataKey={xAxisKey} height={30} stroke="#334961" />
                        {legends.map((legend, i) =>
                            <Bar stackId="a" dataKey={legend} key={legend} fill={colors[i % colors.length]} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

/**
 * Line graph specifically for displaying cumulative runs scored,
 * it displays an extra legend strike rate,
 * which equals `Runs scored` / `Balls faced`
 */
class LineGraphCumulativeRuns extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            rows: [],
        };
    }

    componentDidMount() {
        fetchData.call(this, {
            graph_key: this.props.graph_key,
        });
    }

    renderTooltip = (x) => {
        if (x.active) {
            const payload = x.payload[0].payload;
            return (
                <div style={{ backgroundColor: 'white', borderStyle: 'solid', borderColor: '#f5f5f5', borderWidth: 2 }}>
                    <p>{x.label}</p>
                    {Object.keys(payload).slice(1).map((key, i) =>
                        <p style={{ color: colors[i % colors.length] }} key={key}>{`${key} : ${x.payload[0].payload[key]}`}</p>
                    )}
                    <p style={{ color: colors[4] }}>Strike rate: {(payload['Cumulative runs'] * 100 / payload['Balls faced']).toFixed(2)}</p>
                </div>
            );
        }
    }

    render() {
        if (!this.state.data || Object.keys(this.state.data).length === 0) {
            return (
                <div></div>
            );
        }
        const rows = this.state.rows,
            xAxisLabel = this.state.data.graphParams.xAxisLabel,
            yAxisLabel = this.state.data.graphParams.yAxisLabel,
            title = this.state.data.graphParams.title,
            xAxisKey = this.state.data.graphParams.xAxisKey,
            legends = this.state.data.graphParams.legends;
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: 10 }}>{title}</h1>
                <ResponsiveContainer aspect={this.props.aspect} width='100%'>
                    <LineChart data={rows}
                        margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
                        <XAxis label={xAxisLabel} dataKey={xAxisKey} />
                        <YAxis label={yAxisLabel} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={this.renderTooltip} />
                        <Legend verticalAlign="top" height={36} />
                        <Brush dataKey={xAxisKey} height={30} stroke="#334961" />
                        {legends.map((legend, i) =>
                            <Line dot={false} dataKey={legend} key={legend} stroke={colors[i % colors.length]} />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export { BarGraphToggle, BarGraphSelect, StackBarGraphToggle, LineGraphToggle, LineGraphSelectScoreTimeline, LineGraphCumulativeRuns };
