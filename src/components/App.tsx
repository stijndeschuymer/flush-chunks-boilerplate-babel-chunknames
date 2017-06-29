declare var __dirname;
declare var require;

import * as path from 'path';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import universal from 'react-universal-component';
import { LazyRoute1 } from './LazyRoute1';
import styles from '../../css/App.css';

const UniversalExample = universal(() => import(/* webpackChunkName: 'Example' */ './Example'), {
  path: path.resolve(__dirname, './Example'),
  resolve: () => require.resolveWeak('./Example'),
  chunkName: 'Example',
  minDelay: 500
})

const UniversalExample3 = universal(() => import(/* webpackChunkName: 'Example3' */ './Example3'), {
  path: path.resolve(__dirname, './Example3'),
  resolve: () => require.resolveWeak('./Example3'),
  chunkName: 'Example3',
  minDelay: 500
})

export default class App extends React.Component<any, any> {
  // set `show` to `true` to see dynamic chunks served by initial request
  // set `show` to `false` to test how asynchronously loaded chunks behave,
  // specifically how css injection is embedded in chunks + corresponding HMR
  state = {
    show: true
  }

  componentDidMount() {
    if (this.state.show) return

    setTimeout(() => {
      console.log('now showing <Example />')
      this.setState({ show: true })
    }, 1000)
  }

  render() {
    return (
      <div>
        <h1 className={styles.title}>Hello World!</h1>
        <Link to="/">Example1</Link>
        <Link to="/example2">Example2</Link>
        <Link to="/example3">Example3</Link>
        <UniversalExample/>
        <Switch>
          <Route exact path="/" component={UniversalExample}/>
          <Route path="/example2" component={LazyRoute1}/>
          <Route path="/example3" component={UniversalExample3}/>
        </Switch>
      </div>
    )
  }
}
