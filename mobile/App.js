import 'intl'
import 'intl/locale-data/jsonp/pt-BR'


import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React from 'react';

import Router from './src/routes'




export default class App extends React.Component {
  render() {
    return (
      <Router />
    );
  }

  _activate = () => {
    activateKeepAwake();
    };

  _deactivate = () => {
    deactivateKeepAwake();
    };
}


