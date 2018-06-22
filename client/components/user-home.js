import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {PlaylistDropdown} from './playlist-dropdown'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import styled from 'styled-components'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer} from '../store/votecycle'

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
    if (!this.props.votecycle) {
      this.props.createActiveVotecycle(this.props.userId)
        .then(() => {
          let choiceArr = []
          for (let i = 0; i < this.props.numChoices; i++) {
            // TODO: pick random songs from playlist, associate songIds with votechoices
            choiceArr.push(this.props.createVotechoice(this.props.votecycle.id) )
          }
          return Promise.all(choiceArr)
        }
      )
    }
  }

  render() {
    const {twitchLogin} = this.props

    return (
      <div>
        <NavBar />
        <h3>Welcome, {twitchLogin}</h3>
        <Wrapper>
          <SpotifyLogin />
          <PlaylistDropdown />
        </Wrapper>
        {
          this.props.twitchLogin
            ? <div>
                <h1>Connect your spotify account</h1>
                <a href="/auth/spotify">Connect</a>
              </div>
            : <div />
        }
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
    twitchLogin: state.user.twitchLogin,
    votecycle: state.votecycle,
    numChoices: 3,
  }
}

const mapDispatch = dispatch => {
  return {
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
    createActiveVotecycle: (userId) => dispatch(createActiveVotecycleServer(userId)),
    createVotechoice: (votecycleId) => dispatch(createVotechoiceServer(votecycleId)),
  }
}

export default connect(mapState, mapDispatch)(UserHome)

