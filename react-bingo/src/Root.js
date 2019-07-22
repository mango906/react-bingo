import React from 'react';

import { Provider } from 'mobx-react';

import App from './App';

const Root = () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};

export default Root;
