import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.REACT_APP_PUBLIC_DEMO === 'true') {
  const PublicDemo = require('./Demo/PublicDemo').default;
  root.render(<PublicDemo />);
} else {
  const { Provider } = require('react-redux');
  const App = require('./App').default;
  const store = require('./Redux/store').default;
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

