import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash.throttle';
import reportWebVitals from 'reportWebVitals';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
// Tailwind's Compiled output
import 'styles/output.css';
// Ant Design
import 'antd/dist/antd.css';
// My Custom Css
import 'assets/css/style.css';

// App component
import App from 'App';
// Local Storage Utility
import { saveState } from 'utils/localStorage';
// Redux Store
import { store } from 'store/';

// Subscribe to the store
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

Sentry.init({
  dsn: 'https://b42383b9bcff41d98cbf36e61d0b246e@o1139329.ingest.sentry.io/6194766',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
