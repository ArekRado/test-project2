import React, { Dispatch, Reducer } from 'react'

type User = {
  isLoaded: boolean,
  userName: string,
  image: string,
}

type State = {
  isAuthorized: boolean,
  accessToken: string,
  expiresIn: string,
  tokenType: string,
  user: User,
  dispatch: Dispatch<Action<any>>,
}

type Action<Payload> = {
  payload: Payload,
  type: string,
}

export const initialState = {
  isAuthorized: false,
  accessToken: '',
  expiresIn: '',
  tokenType: '',
  user: {
    isLoaded: false,
    userName: '',
    image: '',
  },
  dispatch: () => { }
}

export const MainContext = React.createContext<State>(initialState)

export const reducer: Reducer<State, Action<any>> = (state, action) => {
  switch (action.type) {
    case 'authorize':
      return {
        ...state,
        isAuthorized: true,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
        tokenType: action.payload.tokenType,
      }

    case 'setUser':
      return {
        ...state,
        user: {
          ...state.user,
          isLoaded: true,
          userName: action.payload.userName,
          image: action.payload.image,
        },
      }

    default:
      return state
  }
}
