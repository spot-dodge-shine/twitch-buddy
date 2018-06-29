'use strict'

import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import events from './whiteboard-dashboard'

class WhiteboardOverlay extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.ctx = null
    this.setRef = elem => {
      this.canvas = elem
    }
  }

  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')
  }

  draw = (start, end, strokeColor='black', lineWidth, shouldBroadcast=true) => {
    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeColor
    this.ctx.lineWidth = lineWidth
    this.ctx.moveTo(...start)
    this.ctx.lineTo(...end)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Header as='h3'>
          {this.props.twitchLogin}'s Whiteboard
          <Header.Subheader>
            Draw something to be displayed on stream!
          </Header.Subheader>
        </Header>
        <canvas
          ref={this.setRef}
          id='canvas'
          width='750px'
          height='500px'
          className='canvas-display'
        />
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    twitchLogin: state.user.twitchLogin
  }
}

export default connect(mapStateToProps)(WhiteboardOverlay)
