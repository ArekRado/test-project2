import React, { Suspense, lazy, useReducer } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Auth } from './components/Auth'
import { MainContext, reducer, initialState } from './context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'minireset.css/minireset.min.css'

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    font-family: 'Roboto', sans-serif;
    display: flex;
    height: 100%;
    width: 100%;
    background: #000;
    color: #b3b3b3;
  }

  &::-webkit-scrollbar {
    width:16px;
  }

  &::-webkit-scrollbar-thumb {
    background-color:hsla(0,0%,100%,.3);
  }
`

const Home = lazy(() => import('./routes/Home'))
const Login = lazy(() => import('./routes/Login'))

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <GlobalStyles />
      <MainContext.Provider
        value={{
          ...state,
          dispatch,
        }}
      >
        <Router>
          <Suspense fallback={null}>
            <Auth />

            {state.isAuthorized ? (
              <Switch>
                <Route path='*'>
                  <Home />
                </Route>
              </Switch>
            ) : (
                <Login />
              )}
          </Suspense>
        </Router>
      </MainContext.Provider>
    </>
  )
}
