import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash.throttle';

// Tailwind's Compiled output
import 'styles/output.css'
// Ant Design
import "antd/dist/antd.css";
// My Custom Css
import "assets/css/style.css";

// App component
import App from 'App';
// Local Storage Utility
import { saveState } from 'utils/localStorage'
// Redux Store
import { store } from 'store/';

// Subscribe to the store
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();