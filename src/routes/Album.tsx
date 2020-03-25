import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useRequest } from '../hooks/useRequest'
import { getSmallestThumbnail } from '../utils/getSmallestThumbnail'
import { JustifyContentProperty } from 'csstype'
import { formatMiliseconds } from '../utils/formatMiliseconds'
import { GetAlbumResponse } from '../types/api'

const AlbumWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const AlbumTitle = styled.h2`
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

export const Album = () => {
  const { albumId } = useParams()

  const { response } = useRequest<GetAlbumResponse>(
    `https://api.spotify.com/v1/albums/${albumId}`,
    {
      defaultResponse: {
        name: '',
        description: '',
        tracks: { items: [] }, images: []
      },
    },
  )

  return (
    <AlbumWrapper>
      <Header>
        <HeaderImage src={getSmallestThumbnail(response.images)} />
        <div>
          <AlbumTitle>{response.name}</AlbumTitle>
          <p>{response.description}</p>
        </div>
      </Header>

      <TracksList>
        {response.tracks.items.map(track => (
          <Track key={track.id}>
            <Cell>{track.name}</Cell>
            <Cell justifyContent='flex-end'>
              {formatMiliseconds(track.duration_ms)}
            </Cell>
          </Track>
        ))}
      </TracksList>
    </AlbumWrapper>
  )
}

export default Album
