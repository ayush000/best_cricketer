import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './AppLayout';
import './index.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

ReactDOM.render(
  <LocaleProvider locale={enUS}><AppLayout /></LocaleProvider>,
  document.getElementById('root')
);
