import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {Services} from './components/Services';
import {AuthUser} from './components/Application/AuthUser';
import {AppDental} from './components/Application/AppDental';
import {Talons} from './components/Application/Talons';
import {Contacts} from './components/Application/Contacts';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/services' Component={Services}/>
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/authUser' component={AuthUser} />
        <Route path='/appdental' component={AppDental} />
        <Route path='/appdental/talons' component={Talons} />
        <Route path='/contacts' component={Contacts} />
      </Layout>
    );
  }
}
