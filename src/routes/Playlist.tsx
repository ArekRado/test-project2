import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useRequest } from '../hooks/useRequest'
import { getSmallestThumbnail } from '../utils/getSmallestThumbnail'
import { JustifyContentProperty } from 'csstype'
import { formatMiliseconds } from '../utils/formatMiliseconds'
import { GetPlaylistsResponse } from '../types/api'

const PlaylistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PlaylistTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
`

const Header = styled.h2`
  margin-bottom: 50px;
  display: flex;
`

const HeaderImage = styled.img`
  max-height: 200px;
  max-width: 200px;
  margin: 0 20px;
`

const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`

const Track = styled.button`
  height: 65px;
  display: flex;
  background: none;
  border-width: 0;
  color: #b3b3b3;

  &:hover {
    background-color: #2a2a2a;
  }
`
const Cell = styled.div<{ justifyContent?: JustifyContentProperty }>`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: pre;
  margin-right: 20px;
  justify-content: ${props => props.justifyContent};
`
type Artist = { name: string }
const getArtistsNames = (artists: Artist[]) => artists.map(artist => artist.name).join(',')

export const Playlist = () => {
  const { playlistId } = useParams()

  const { response } = useRequest<GetPlaylistsResponse>(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      defaultResponse: {
        name: '',
        description: '',
        tracks: { items: [] },
        images: []
      },
    },
  )

  const tracks = response.tracks.items.filter(item => item.track)

  return (
    <PlaylistWrapper>
      <Header>
        <HeaderImage src={getSmallestThumbnail(response.images)} />
        <div>
          <PlaylistTitle>{response.name}</PlaylistTitle>
          <p>{response.description}</p>
        </div>
      </Header>

      <TracksList>
        {tracks.map(track => (
          <Track key={track.track.id} >
            <Cell>{track.track.name}</Cell>
            <Cell>{track.track.album.name}</Cell>
            <Cell>{getArtistsNames(track.track.artists)}</Cell>
            <Cell justifyContent='flex-end'>
              {formatMiliseconds(track.track.duration_ms)}
            </Cell>
          </Track>
        ))}
      </TracksList>
    </PlaylistWrapper>
  )
}

export default Playlist
