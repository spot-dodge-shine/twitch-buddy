import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACTIVE_VOTECYCLE = 'GET_ACTIVE_VOTECYCLE'

/**
 * ACTION CREATORS
 */
const getActiveVotecycle = votecycle => ({type: GET_ACTIVE_VOTECYCLE, votecycle})

/**
 * THUNK CREATORS
 */
export const getActiveVotecycleServer = (userId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/votecycles/active/${userId}`)
    dispatch(getActiveVotecycle(data))
  }
}

const defaultVotecycle = {
  votechoices: []
}

export default function(state = defaultVotecycle, action) {
  switch(action.type) {
    case GET_ACTIVE_VOTECYCLE:
      return action.votecycle
    default:
      return state
  }
}