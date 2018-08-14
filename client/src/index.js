import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './style/index.css';
import './style/main.css';
import './style/pytutor.css';
import './style/markdown.css';
import './style/codemirror.css';
import './style/hint-message.css';
import 'jquery-ui-bundle/jquery-ui.js';
import 'codemirror/lib/codemirror.css';
import 'semantic-ui-css/semantic.min.css';
import 'highlight.js/styles/tomorrow.css';

import configureStore from './redux/store';
import { Provider } from 'react-redux';

let initialStore = {
    items: [],
    id: 0,
    studentId: 0,
    description: '',
    code: '',
    before: '',
    after: '',
    beforeCode: '',
    afterCode: '',
    traces: [],
    beforeTraces: [],
    afterTraces: [],
    diffs: [],
    added: [],
    removed: [],
    addedLine: [],
    removedLine: [],
    test: '',
    expected: '',
    result: '',
    rule: '',
    log: '',
    currentCode: '',
    step: 0,
    stop: false,
    relatedItems: [],
    beforeHistory: {},
    afterHistory: {},
    beforeEvents: [],
    afterEvents: [],
    beforeAst: [],
    afterAst: [],
    beforeTicks: {},
    afterTicks: {},
    commonKeys: [],
    focusKeys: [],
}

let store = configureStore(initialStore)

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
