import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Image, Divider, Button, Icon, Menu} from 'semantic-ui-react'
import styled from 'styled-components'

const LogoStyle = styled.div`
  max-width: 250px;
  margin-right: 10px;
  margin-bottom: 1px;
`

const NavbarBottomMargin = styled.div`
  margin-bottom: 0%;
`



const Navbar = ({handleClick, isLoggedIn}) => (
  <NavbarBottomMargin>
    <Menu>
      <Menu.Menu>
        <LogoStyle>
          <Link to="/home"><Image src='/images/navbarlogo.png' /></Link>
        </LogoStyle>
      </Menu.Menu>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Menu.Menu position='right'>
              <Menu.Item>
                  <Button primary animated onClick={handleClick}>
                      <Button.Content hidden>Logout</Button.Content>
                      <Button.Content visible>
                        <Icon name='log out' />
                      </Button.Content>
                  </Button>
              </Menu.Item>
            </Menu.Menu>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
          </div>
        )}
      </nav>
      <Divider />
    </Menu>
  </NavbarBottomMargin>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
