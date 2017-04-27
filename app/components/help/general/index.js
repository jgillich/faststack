import React from 'react'
import {Route, Link} from 'react-router-dom'
import Web from './Web'
import Cli from './Cli'
import Overview from './Overview'

const Menu = () =>
  <div>
    <p className="menu-label">
      General
    </p>
    <ul className="menu-list">
      <li><Link to="/help/general/overview">Overview</Link></li>
      <li><Link to="/help/general/web">Web interface</Link></li>
      <li><Link to="/help/general/cli">Command line interface</Link></li>
    </ul>
  </div>


const Routes = [
  <Route exact path="/help/general/overview" component={Overview}/>,
  <Route exact path="/help/general/web" component={Web}/>,
  <Route exact path="/help/general/cli" component={Cli}/>,
]

export default {Menu, Routes}
