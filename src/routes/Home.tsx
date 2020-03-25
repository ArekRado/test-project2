import React, { useContext, Suspense, useState, useEffect, lazy } from 'react'
import { TopBar } from '../components/TopBar'
import { Sidebar } from '../components/Sidebar'
import { Switch, Route } from 'react-router-dom'
import { MainContext } from '../context'
import { useRequest } from '../hooks/useRequest'
import { getSmallestThumbnail } from '../utils/getSmallestThumbnail'

import styled from 'styled-components'
import { GridAreaProperty, PaddingProperty, BackgroundColorProperty } from 'csstype'
import { GetMeResponse } from '../types/api'

const HomeGrid = styled.div`
  display: grid;
  grid-template: 50px 1fr/200px 1fr;
  width: 100%;
`

type Cell = {
  gridArea?: GridAreaProperty,
  padding?: PaddingProperty<string>,
  backgroundColor?: BackgroundColorProperty,
  scrollable?: boolean,
}
const Cell = styled.div<Cell>`
  grid-area: ${props => props.gridArea};
  padding: ${props => props.padding};
  background-color: ${props => props.backgroundColor};
  overflow: ${props => (props.scrollable ? 'auto' : 'none')};
`

const Playlist = lazy(() => import('./Playlist'))
const Album = lazy(() => import('./Album'))
const Categories = lazy(() => import('./Categories'))
const CategoryPlaylists = lazy(() => import('./CategoryPlaylists'))
const NewRelases = lazy(() => import('./NewRelases'))
const SearchResults = lazy(() => import('./SearchResults'))

export const Home = () => {
  const [search, setSearch] = useState('')
  const { user, isAuthorized, dispatch } = useContext(MainContext)

  const { response, isLoading } = useRequest<GetMeResponse>(
    isAuthorized && !user.isLoaded ? 'https://api.spotify.com/v1/me' : '',
    {
      defaultResponse: { display_name: '', images: [] },
      callOnMount: false,
    },
  )

  useEffect(() => {
    if (!user.isLoaded && response.display_name) {
      dispatch({
        type: 'setUser',
        payload: {
          userName: response.display_name,
          image: getSmallestThumbnail(response.images),
        },
      })
    }
  }, [
    user.isLoaded,
    response.display_name,
    response.images,
    isAuthorized,
    isLoading,
    dispatch,
  ])

  return (
    <HomeGrid>
      <Cell gridArea='1/1/3/1'>
        <Sidebar userName={user.userName} userAvatar={user.image} />
      </Cell>

      <Cell padding='15px' backgroundColor='#121212'>
        <TopBar onChange={setSearch} searchText={search} />
      </Cell>

      <Cell backgroundColor='#121212' scrollable>
        <Suspense fallback={null}>
          <Switch>
            <Route path='/playlist/:playlistId'>
              <Playlist />
            </Route>

            <Route path='/album/:albumId'>
              <Album />
            </Route>

            <Route path='/categories' exact>
              <Categories />
            </Route>

            <Route path='/categories/:categoryId'>
              <CategoryPlaylists />
            </Route>

            <Route path='/new-relases'>
              <NewRelases />
            </Route>

            <Route path='*'>
              <SearchResults searchText={search} />
            </Route>
          </Switch>
        </Suspense>
      </Cell>

      {/* <Cell gridArea='3/1/3/3' backgroundColor='#282828'>
        Player
      </Cell> */}
    </HomeGrid>
  )
}

export default Home
