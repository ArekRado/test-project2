import React from 'react'
import styled from 'styled-components'
import { NoPhoto } from './icons/NoPhoto'
import { getSmallestThumbnail } from '../utils/getSmallestThumbnail'
import { Thumbnail as ThumbnailType } from '../types/common'

const Thumbnail = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
`

type TileCategoryProps = {
  title: string,
  thumbnails: ThumbnailType[],
}
export const TileCategory: React.FC<TileCategoryProps> = ({ title, thumbnails }) => {
  const thumbnail = getSmallestThumbnail(thumbnails)

  return (
    <>
      {thumbnail ? <Thumbnail src={thumbnail} /> : <NoPhoto />}
      <Title>{title}</Title>
    </>
  )
}
