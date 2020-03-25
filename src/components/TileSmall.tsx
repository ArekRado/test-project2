import React from 'react'
import styled from 'styled-components'
import { NoPhoto } from './icons/NoPhoto'
import { getSmallestThumbnail } from '../utils/getSmallestThumbnail'
import { Thumbnail as ThumbnailType } from '../types/common'

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;
`

const Thumbnail = styled.img`
  width: 65px;
  height: 65px;
`

const Title = styled.div`
  margin-left: 20px;
`
type TileSmallProps = {
  title: string,
  thumbnails: ThumbnailType[],
}
export const TileSmall: React.FC<TileSmallProps> = ({ title, thumbnails }) => {
  const thumbnail = getSmallestThumbnail(thumbnails)

  return (
    <Wrapper>
      {thumbnail ? <Thumbnail src={thumbnail} /> : <NoPhoto />}
      <Title>{title}</Title>
    </Wrapper>
  )
}
