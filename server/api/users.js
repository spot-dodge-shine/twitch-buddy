'use strict'

const router = require('express').Router()
const axios = require('axios')
const { User } = require('../db/models')
const { checkSpotifyAccessToken, refreshSpotifyAccessToken } = require('./spotify-refresh')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/me/token', refreshSpotifyAccessToken)

router.get('/me/playlists', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.get(process.env.SPOTIFY_API_URL + '/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    const playlists = data.items.map(playlist => {
      return {
        name: playlist.name,
        id: playlist.id,
        image: playlist.images.length ? playlist.images[0].url : null,
        externalUrl: playlist.external_urls.spotify,
        uri: playlist.uri,
        trackCount: playlist.tracks.total
      }
    }).reduce((resultObj, playlist) => {
      resultObj[playlist.id] = playlist
      return resultObj
    }, {})
    res.json(playlists)
  } catch (err) {
    console.log('Error when getting playlists')
    next(err)
  }
})

router.get('/me/playlists/:playlistId/tracks/:offset', checkSpotifyAccessToken,
  async (req, res, next) => {
    try {
      const { data } = await axios.get(process.env.SPOTIFY_API_URL +
        `/v1/users/${req.user.spotifyId}/playlists/${req.params.playlistId}/tracks?offset=${req.params.offset}`, {
          headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
        })
      const tracks = data.items.map(item => {
        return {
          name: item.track.name,
          artist: item.track.artists[0].name,
          id: item.track.id,
          uri: item.track.uri
        }
      }).reduce((resultObj, track) => {
        resultObj[track.id] = track
        return resultObj
      }, {})
      res.json(tracks)
    } catch (err) {
      next(err)
    }
})

router.put('/me/playtrack/:trackURI', async (req, res, next) => {
  try {
    const { data } = await axios.put(process.env.SPOTIFY_API_URL + '/v1/me/player/play',
      { uris: [req.params.trackURI] },
      { headers: { Authorization: 'Bearer' + req.user.spotifyAccessToken } })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/active', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        isActiveDash: true
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
