import { useEffect, useContext } from 'react'
import qs from 'qs'
import { useLocation, useHistory } from 'react-router-dom'
import { MainContext } from '../context'
import cookies from 'js-cookie'

export const Auth = () => {
  const { dispatch } = useContext(MainContext)
  const { hash } = useLocation()
  const hashParams = qs.parse(hash)
  const accessToken = hashParams['#access_token'] || cookies.get('accessToken')
  const tokenType = hashParams.token_type || cookies.get('tokenType')
  const expiresIn = hashParams.expires_in || cookies.get('expiresIn')
  const { push } = useHistory()

  useEffect(() => {
    if (accessToken && expiresIn) {
      cookies.set('accessToken', accessToken, {
        'max-age': `${expiresIn / 2}`,
      })
      cookies.set('tokenType', tokenType, { 'max-age': `${expiresIn / 2}` })
      cookies.set('expiresIn', expiresIn, { 'max-age': `${expiresIn / 2}` })

      dispatch({
        type: 'authorize',
        payload: {
          accessToken: accessToken,
          expiresIn: expiresIn,
          tokenType: tokenType,
        }
      })

      if (hash) {
        push('/')
      }
    }
  }, [accessToken, dispatch, expiresIn, tokenType, push, hash])

  return null
}
