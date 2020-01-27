import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { clientStore } from '../redux/Store';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { Routers } from '../routers/Routers';
import { GlobalStyle } from '../assets/Reset';
import { AppStyled, NormalTheme } from '../assets/AppCss';
import { ThemeProvider } from 'styled-px2vw';


const App = () => {
  return (
    <Provider store={clientStore()}>
      <Fragment>
        <GlobalStyle />
        <AppStyled />
        <ThemeProvider theme={NormalTheme}>
          <Router>
            {renderRoutes(Routers)}
          </Router>
        </ThemeProvider>
      </Fragment>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
