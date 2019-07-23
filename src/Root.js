import React from 'react';

import { Provider } from 'mobx-react';

import stores from './stores';

import App from './App';

const Root = () => {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  );
};

export default Root;
