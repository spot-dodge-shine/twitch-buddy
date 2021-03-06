import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TwitchLogin from './twitch-login'
import store from '../../store'
import { Card } from 'semantic-ui-react'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('TwitchLogin', () => {
  let twitchLogin

  beforeEach(() => {
    twitchLogin = shallow(<TwitchLogin store={store} />).dive()
  })

  it('renders a single card', () => {
    expect(twitchLogin.find('Card').length).to.equal(1)
  })
  xit('renders the correct text in that card', () => {
    expect(twitchLogin.find(Card.Header).children().at(1).text()).to.be.equal('Welcome to twitch dash')
  })


})
