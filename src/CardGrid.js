import React from 'react';
import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import { parseJSON } from './commonfunction';
import './CardGrid.css';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }
    fetchData = async () => {
        try {
            const data = await parseJSON(await fetch('http://localhost:3001/api/cards'));
            this.setState({ data });
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    {Object.keys(this.state.data).map((title) => {
                        return (<Col span="6" key={title}>
                            <Card title={title} bodyStyle={{
                                'fontSize': '6em',
                            }}>{this.state.data[title]}</Card>
                        </Col>);
                    })}
                </Row>
            </div>
        );
    }
};
