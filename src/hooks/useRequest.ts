import { useState, useEffect, useContext, useRef, useMemo } from 'react'
import { MainContext } from '../context'
import cookies from 'js-cookie'

type Options<Response> = {
  callOnMount?: boolean
  defaultResponse: Response
}

type Request = <Response = unknown>(url: string, options: Options<Response>, tokenType: string, accessToken: string) => Promise<Response>
type UseRequest = <Response>(url: string, options: Options<Response>) => {
  response: Response
  error: unknown
  isLoading: boolean,
  request: (newUrl: string) => Promise<Response>
}


const request: Request = async (url, options, tokenType, accessToken) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  })
  return await res.json()
}

const cleanCookies = () => {
  cookies.remove('accessToken')
  cookies.remove('tokenType')
  cookies.remove('expiresIn')
}

export const useRequest: UseRequest = (url, options) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedOptions = useMemo(() => options, [])
  const callOnMount = memoizedOptions.callOnMount || true
  const isInitialMount = useRef(true)
  const [response, setResponse] = useState(memoizedOptions.defaultResponse)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { accessToken, tokenType } = useContext(MainContext)

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const json = await request<any>(
            url,
            memoizedOptions,
            tokenType,
            accessToken,
          )

          if (json.error && json.error.status === 401) {
            cleanCookies()
            // @ts-ignore
            window.location = '/'
          }

          setResponse(json)
        } catch (error) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }

      if (isInitialMount.current) {
        isInitialMount.current = false
        callOnMount && fetchData()
      } else {
        fetchData()
      }
    }
  }, [url, accessToken, tokenType, callOnMount, memoizedOptions])

  return {
    response,
    error,
    isLoading,
    request: (newUrl: string) => request<any>(newUrl || url, options, tokenType, accessToken),
  }
}
