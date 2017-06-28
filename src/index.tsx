import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'

const render = App =>
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )

//
// declare var module: { hot: any };
// declare var require: any;
//
// if (process.env.NODE_ENV === 'development') {
//     if (module['hot']) {
//         module.hot.accept('./components/App', () => {
//             const App = require('./components/App').default
//             render(App)
//         })
//     }
// }

render(App)