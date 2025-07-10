import React from 'react'
import '@unistyles/unistyles'
import Navigation from '@navigation/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persister,store } from '@state/store.tsx'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Navigation/>
      </PersistGate>
    </Provider>
  )
}

export default App  