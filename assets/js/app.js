import '../sass/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Header from "./template/header";
import Footer from "./template/footer";
import PageContent from "./pages/homepage";

ReactDOM.render(<Header />, document.querySelector('.header'));
ReactDOM.render(<Footer />, document.querySelector('.footer'));
ReactDOM.render(<PageContent />, document.querySelector('.main-content'));