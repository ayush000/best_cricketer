import React from 'react';
import { Layout } from 'antd';
import MediaQuery from 'react-responsive';
// import moment from 'moment';
import App from './App';
const { Header, Content, Footer } = Layout;

// const RangePicker = DatePicker.RangePicker;
// const Option = Select.Option;

/**
 * Create overall layout, header and footer for the content
 */
class AppLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <DefaultHeader />
                <Content>
                    <div><App /></div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Made by Ayush Sachdeva
                </Footer>
            </Layout>
        );
    }
}

/**
 * Header Component for the layout
 */
class DefaultHeader extends React.Component {
    /**
     * Truncates header text for small screen displays
     */
    render() {
        return (
            <Header style={{ backgroundColor: '#334961' }}>
                <div style={{ color: 'white', fontSize: '16px', textAlign: 'left' }}>
                    <MediaQuery query='(min-width: 500px)'>
                        Sachin Tendulkar - Data display for the greatest batsman
                            </MediaQuery>
                    <MediaQuery query='(max-width: 500px)'>
                        Sachin Tendulkar
                        </MediaQuery>
                </div>
            </Header>
        );
    }
}
export default AppLayout;
