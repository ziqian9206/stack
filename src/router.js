import React, { Component } from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Buttons from './pages/Button'
import Admin from './admin'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch';
export default class router extends Component {
  render() {
    return (
      <HashRouter>
         <App>
          <Switch>
            <Route path="/" render={()=>
                <Admin>
                    <Switch>
                      <Route path='/home' component={Home} />
                      <Route path='/ui/buttons' component={Buttons} />
                      <Route component={NoMatch} />
                    </Switch>
                  </Admin>
              } />
              <Route path="/login" component={Login}/>
            </Switch>
         </App>
      </HashRouter>
    )
  }
}
