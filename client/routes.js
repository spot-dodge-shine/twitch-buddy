'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserHome, TwitchLogin, Dashboard, OverlayModule } from './components'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/" component={TwitchLogin} />
        <Route exact path="/overlay/:userId/:moduleId" component={OverlayModule} />
        {isLoggedIn && (
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        <Route component={TwitchLogin} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
