import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Admin from './admin'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import User from './pages/User'
import History from './pages/History'
import Custom from './pages/Custom'
export default class router extends Component {
  render() {
    return (
      <BrowserRouter>
         <App>
          <Switch>
            <Route path="/" render={()=>
                <Admin>
                    <Switch>
                      <Route path='/home' component={Home} />
                      <Route path='/history' component={History}/>
                      <Route path='/custom' component={Custom}/>
                      <Route path="/log/login" component={Login}/>
                      <Route path="/log/reg" component={Reg} />
                      <Route component={NoMatch} />
                    </Switch>
                  </Admin>
              } />
              <Route path="/login" component={Login}/>
            </Switch>
         </App>
      </BrowserRouter>
    )
  }
}
