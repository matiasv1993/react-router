import { createSelector } from 'reselect'

const getUsers = (state) => state.users
const getSelectedUserId = (state, userId) => parseInt(userId)

const getUserSelector = createSelector(
  getUsers, getSelectedUserId,
  (users, userId) => {
    console.log('entro al selector de user')
    const selectedUser = users.find(user => user.id === userId)
    console.log('selectedUser: ', selectedUser);

    return selectedUser
  }
)

export default getUserSelector;