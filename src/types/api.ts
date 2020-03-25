import { Thumbnail } from "./common"

export type GetAlbumResponse = {
  name: string,
  description: string,
  tracks: {
    items: {
      id: string,
      name: string,
      preview_url: string
      duration_ms: number,
    }[]
  },
  images: Thumbnail[]
}

export type GetCategoriesResponse = {
  categories: {
    items: {
      id: string,
      name: string,
      icons: Thumbnail[],
    }[]
  }
}

export type GetCategoriesPlaylistsResponse = {
  playlists: {
    items: {
      id: string,
      name: string,
      images: Thumbnail[],
    }[]
  }
}

export type GetMeResponse = {
  display_name: string,
  images: Thumbnail[]
}

export type GetNewRelasesResponse = {
  albums: {
    items: {
      id: string,
      name: string,
      images: Thumbnail[],
    }[]
  }
}

export type GetPlaylistsResponse = {
  name: string,
  description: string,
  tracks: {
    items: {
      track: {
        id: string,
        preview_url: string,
        name: string,
        album: {
          name: string,
          images: Thumbnail[],
        },
        artists: {
          name: string,
        }[],
        duration_ms: number,
      }
    }[]
  },
  images: Thumbnail[]
}

export type GetSearchResponse = {
  albums: {
    items: Array<{
      id: string,
      name: string,
      images: Thumbnail[],
    }>
  },
  artists: {
    items: Array<{
      id: string,
      name: string,
      images: Thumbnail[],
    }>
  },
  playlists: {
    items: Array<{
      id: string,
      name: string,
      images: Thumbnail[],
    }>
  },
  tracks: {
    items: Array<{
      id: string,
      preview_url: string,
      name: string,
      album: {
        images: Thumbnail[]
      },
    }>
  },
}