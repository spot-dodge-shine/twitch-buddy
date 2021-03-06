'use strict'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Segment, Header, Button, Icon } from 'semantic-ui-react'

class SpotifyPlayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPlayingBool: this.props.playerStatus.isPlaying
    }
  }

  handlePause = () => {
    this.setState({ isPlayingBool: false })
    return axios.put('/api/users/me/player/pause', {})
  }

  handleResume = () => {
    this.setState({ isPlayingBool: true })
    return axios.put(`/api/users/me/player/resume`, {})
  }

  handleNext = () => {
    return axios.put(`/api/users/me/player/next`, {})
  }

  render () {
    const { currentlyPlaying } = this.props.playerStatus

    return (
      <Segment
        attached
        style={{ display: 'flex' }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              marginRight: '1rem',
              textAlign: 'left',
            }}
          >
            <Header as='h3'>
              <Header.Content>
                Currently Playing:
                <Header.Subheader>
                  {currentlyPlaying
                    ? `${currentlyPlaying.name} - ${currentlyPlaying.artist}`
                    : 'None'
                  }
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
          {
            this.state.isPlayingBool
              ? <Button
                  icon
                  onClick={this.handlePause}
                >
                  <Icon
                    name='pause'
                    size='large'
                  />
                </Button>
              : <Button
                  icon
                  onClick={this.handleResume}
                >
                  <Icon
                    name='play'
                    size='large'
                  />
                </Button>
          }
          <Button
            icon
            onClick={this.handleNext}
          >
            <Icon
              name='forward'
              size='large'
            />
          </Button>
          </div>
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    playerStatus: state.playerStatus
  }
}

export default connect(mapStateToProps)(SpotifyPlayer)
