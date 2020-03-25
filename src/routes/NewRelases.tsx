import React from 'react'
import { useRequest } from '../hooks/useRequest'
import { Flex } from '../components/Flex'
import { PlaylistLink } from '../components/PlaylistLink'
import { TilePlaylist } from '../components/TilePlaylist'
import { GetNewRelasesResponse } from '../types/api'

export const NewRelases = () => {
  const { response } = useRequest<GetNewRelasesResponse>(
    'https://api.spotify.com/v1/browse/new-releases',
    {
      defaultResponse: { albums: { items: [] } },
    },
  )

  return (
    <Flex flexWrap='wrap'>
      {response.albums.items.map(album => (
        <PlaylistLink key={album.id} to={`/album/${album.id}`}>
          <TilePlaylist
            title={album.name}
            thumbnails={album.images}
          />
        </PlaylistLink>
      ))}
    </Flex>
  )
}

export default NewRelases
