import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';

import ConsistencyPanel from './ConsistencyPanel';


class Panels extends React.Component {
    render() {
        return (
            <Card style={{ 'marginTop': '20px' }}>
                <ConsistencyPanel />
            </Card>
        );
    }
}
export default Panels;