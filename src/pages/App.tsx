import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { clientStore } from '../store/Store';
import { Home } from './home/Home';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { Routers } from '../routers/Routers';

const App = () => {
  return (
    <Provider store={clientStore()}>
      <Router>
        {renderRoutes(Routers)}
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
