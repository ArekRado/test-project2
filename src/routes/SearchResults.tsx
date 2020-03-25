import React from 'react'
import { useRequest } from '../hooks/useRequest'
import { TileSmall } from '../components/TileSmall'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GetSearchResponse } from '../types/api'

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    width: 50%;
  }
`

const CategoryTitle = styled.h3`
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0;
`

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 100%;
`

export const SearchResultLink = styled(props => <Link {...props} />)`
  color: #fff;
  text-decoration: none;
`

const Track = styled.button`
  background: none;
  border-width: 0;
  padding: 0;
  color: #fff;
`

type SearchResultsProps = {
  searchText: string
}
export const SearchResults: React.FC<SearchResultsProps> = ({ searchText }) => {
  const { response } = useRequest<GetSearchResponse>(
    searchText
      ? `https://api.spotify.com/v1/search?q=${searchText}&type=track,artist,album,playlist`
      : '',
    {
      defaultResponse: {
        albums: { items: [] },
        artists: { items: [] },
        playlists: { items: [] },
        tracks: { items: [] },
      },
    },
  )

  return searchText ? (
    <div>
      <CategoryTitle>Songs</CategoryTitle>
      <Grid>
        {response.tracks.items.map(track => (
          <Track key={track.id}>
            <TileSmall
              title={track.name}
              thumbnails={track.album.images}
            />
          </Track>
        ))}
      </Grid>

      <CategoryTitle>Albums</CategoryTitle>
      <Grid>
        {response.albums.items.map(album => (
          <SearchResultLink to={`/album/${album.id}`} key={album.id}>
            <TileSmall
              title={album.name}
              thumbnails={album.images}
            />
          </SearchResultLink>
        ))}
      </Grid>

      <CategoryTitle>Playlists</CategoryTitle>
      <Grid>
        {response.playlists.items.map(playlist => (
          <SearchResultLink to={`/playlist/${playlist.id}`} key={playlist.id}>
            <TileSmall
              title={playlist.name}
              thumbnails={playlist.images}
            />
          </SearchResultLink>
        ))}
      </Grid>

      <CategoryTitle>Artists</CategoryTitle>
      <Grid>
        {response.artists.items.map(artist => (
          <TileSmall
            key={artist.id}
            title={artist.name}
            thumbnails={artist.images}
          />
        ))}
      </Grid>
    </div>
  ) : (
      <NoResults>
        <h3>Search Spotify</h3>
        <p>
          Find your favorite songs, artists, albums, podcasts & videos, playlists
          and friends
      </p>
      </NoResults>
    )
}

export default SearchResults
