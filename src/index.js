import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './AppLayout';
import './index.css';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';

ReactDOM.render(
  <ConfigProvider locale={enUS}><AppLayout /></ConfigProvider>,
  document.getElementById('root'),
);
