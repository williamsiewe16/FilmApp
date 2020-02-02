 import React from 'react';
import Search from './Components/Search';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import Navigation from './Navigation/Navigation'

 import { Provider } from 'react-redux'
  import Store from './Store/configureStore'

 //Persister le store
 import { persistStore } from 'redux-persist'
 import { PersistGate } from 'redux-persist/es/integration/react'


export default function App() {
    let persistor = persistStore(Store)
  return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
