import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PlaylistDropdown from './playlist-dropdown'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer, getVotesServer, deactivateVotecycleServer} from '../store/votecycle'
import styled from 'styled-components'
import { playTrack } from '../store/spotify-tracks'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
margin-top: 10%;
`

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.timer = setInterval(this.tick, 10000)
    this.counter = 0
    this.props.activeVotecycle(this.props.userId)
      .then(() => {
        this.tick()
      })
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 10000) // 10 seconds for testing purposes
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.counter += 1
    if (!this.props.votecycle || !this.props.votecycle.active) {
      this.props.createActiveVotecycle(this.props.userId)
        .then(() => {
          let choiceArr = []
          for (let i = 0; i < this.props.numChoices; i++) {
            // TODO: pick random songs from playlist, associate songIds with votechoices
            choiceArr.push(this.props.createVotechoice(this.props.votecycle.id, i + 1) )
          }
          return Promise.all(choiceArr)
        }
      )
    } else {
      this.props.getVotes(this.props.votecycle)
    }
  }

  render() {
    const {twitchLogin} = this.props
    const fakeTrack = {
      name: "To My Soul",
      artist: "Jerry Folk",
      id: "76xNAVwiQccBXImICK5zUP",
      uri: "spotify:track:76xNAVwiQccBXImICK5zUP"
    }

    return (
      <div>
        <NavBar />
        <h3>Welcome, {twitchLogin}</h3>
        <Wrapper>
          {
            this.props.spotifyId
            ? <PlaylistDropdown />
            : <SpotifyLogin />
          }
        </Wrapper>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    spotifyId: state.user.spotifyId,
    twitchLogin: state.user.twitchLogin,
    votecycle: state.votecycle,
    numChoices: 3,
  }
}

const mapDispatch = dispatch => {
  return {
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
    createActiveVotecycle: (userId) => dispatch(createActiveVotecycleServer(userId)),
    createVotechoice: (votecycleId, enumId) => dispatch(createVotechoiceServer(votecycleId, enumId)),
    playTrack: (track) => dispatch(playTrack(track)),
    getVotes: (votecycle) => dispatch(getVotesServer(votecycle)),
    deactivateVotecycle: (votecycleId) => dispatch(deactivateVotecycleServer(votecycleId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

