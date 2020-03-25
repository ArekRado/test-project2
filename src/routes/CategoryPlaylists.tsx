import React from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../hooks/useRequest'
import { PlaylistLink } from '../components/PlaylistLink'
import { TilePlaylist } from '../components/TilePlaylist'
import { Flex } from '../components/Flex'
import { GetCategoriesPlaylistsResponse } from '../types/api'

export const CategoryPlaylists = () => {
  const { categoryId } = useParams()

  const {
    response,
  } = useRequest<GetCategoriesPlaylistsResponse>(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
    { defaultResponse: { playlists: { items: [] } } },
  )

  return (
    <Flex flexWrap='wrap'>
      {response.playlists.items.map(playlist => (
        <PlaylistLink key={playlist.id} to={`/playlist/${playlist.id}`}>
          <TilePlaylist
            title={playlist.name}
            thumbnails={playlist.images}
          />
        </PlaylistLink>
      ))}
    </Flex>
  )
}

export default CategoryPlaylists
