import useSWR from 'swr'
import { useState } from 'react'

// 安全なfetcher関数を定義
const fetcher = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Fetching error:', error)
    return [] // エラー時に空の配列を返す
  }
}

export function useSongSuggestions(initialSong = '') {
  const [song, setSong] = useState(initialSong)

  const { data, error } = useSWR<Song[]>(
    song.trim().length > 0
      ? `https://itunes.apple.com/search?term=${encodeURIComponent(song)}&entity=song&limit=5`
      : null,
    fetcher,
  )

  return {
    song,
    setSong,
    songSuggestions: data || [],
    isLoading: !error && !data,
    isError: error,
  }
}

interface Song {
  wrapperType: string
  kind: string
  artistId: number
  collectionId: number
  trackId: number
  artistName: string
  collectionName: string
  trackName: string
  collectionCensoredName: string
  trackCensoredName: string
  artistViewUrl: string
  collectionViewUrl: string
  trackViewUrl: string
  previewUrl: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  collectionPrice: number
  trackPrice: number
  releaseDate: string
  collectionExplicitness: string
  trackExplicitness: string
  discCount: number
  discNumber: number
  trackCount: number
  trackNumber: number
  trackTimeMillis: number
  country: string
  currency: string
  primaryGenreName: string
  isStreamable: boolean
}
