type Thumbnail = {
  url: string
}

export const getSmallestThumbnail = (thumbnails: Thumbnail[]) =>
  thumbnails.length > 0 ? thumbnails[0]?.url || '' : ''
