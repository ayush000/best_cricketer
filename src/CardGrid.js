import React from 'react';
import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import { baseURL } from './constants';
import { parseJSON } from './commonfunction';
import './CardGrid.css';
/**
 * A grid of counters displaying overall statistics
 */
export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }
    /**
     * Makes a cross origin http GET request to the API
     */
    fetchData = async () => {
        try {
            const data = await parseJSON(await fetch(`${baseURL}/api/cards`));
            this.setState({ data });
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    /**
     * For large screens, 4 cards are rendered in a row,
     * for medium screens, 2 cards are rendered in a row,
     * for small screens, 1 card is rendered in a row.
     * Also, font size changes according to the size of viewport
     */
    render() {
        return (
            <Row gutter={16}>
                {Object.keys(this.state.data).map((title) => {
                    return (<Col lg={6} sm={12} xs={24} key={title}>
                        <Card title={title}
                            bodyStyle={{
                                'fontSize': '5vw',
                            }}>{this.state.data[title]}</Card>
                    </Col>);
                })}
            </Row>
        );
    }
};
