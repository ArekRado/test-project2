import React from 'react'
import styled from 'styled-components'
import { NoPhoto } from './icons/NoPhoto'
import { getSmallestThumbnail } from '../utils/getSmallestThumbnail'
import { Flex } from './Flex'
import { Thumbnail as ThumbnailType } from '../types/common'

const Thumbnail = styled.img`
  flex: 1;
`

const Title = styled.div`
  margin-top: 10px;
`

type TilePlaylistProps = {
  title: string,
  thumbnails: ThumbnailType[],
}
export const TilePlaylist: React.FC<TilePlaylistProps> = ({ title, thumbnails }) => {
  const thumbnail = getSmallestThumbnail(thumbnails)

  return (
    <Flex flexDirection='column' flex='1'>
      {thumbnail ? <Thumbnail src={thumbnail} /> : <NoPhoto />}
      <Title>{title}</Title>
    </Flex>
  )
}
