import { useKeepAwake } from 'expo-keep-awake';
import React from 'react';

import Router from './src/routes'

export default function App() {
  useKeepAwake()
  return (
    <Router />
  );
}

