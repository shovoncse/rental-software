import React from 'react';
import ReactDOM from 'react-dom';

// Tailwind's Compiled output
import 'styles/output.css'
// Ant Design
import "antd/dist/antd.css";
// My Custom Css
import "assets/css/style.css";

// App component
import App from 'App';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();