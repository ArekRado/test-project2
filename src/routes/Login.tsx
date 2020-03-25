import React from 'react'
import qs from 'qs'
import styled from 'styled-components'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const jssdkscopes: string[] = [
  // 'streaming',
  // 'user-read-email',
  // 'user-read-private',
  // 'user-modify-playback-state',
]
const redirectUriParameters = {
  client_id: CLIENT_ID,
  response_type: 'token',
  scope: jssdkscopes.join(' '),
  redirect_uri: encodeURI('http://localhost:3000'),
  show_dialog: true,
}

const authUrl = `https://accounts.spotify.com/authorize?${qs.stringify(
  redirectUriParameters,
)}`

const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.a`
  color: #fff;
  background-color: #1db954;
  text-decoration: none;
  border-radius: 500px;
  padding: 11px 32px 9px;
  font-weight: bold;

  transition: 0.3s background-color;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  max-height: 42px;

  &:hover {
    background-color: #1ed760;
  }
`

export const Login = () => (
  <LoginWrapper>
    <Button href={authUrl}>Log In With Spotify</Button>
  </LoginWrapper>
)

export default Login
