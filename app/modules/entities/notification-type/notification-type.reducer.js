import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationTypeRequest: ['notificationTypeId'],
  notificationTypeAllRequest: ['options'],
  notificationTypeUpdateRequest: ['notificationType'],
  notificationTypeDeleteRequest: ['notificationTypeId'],

  notificationTypeSuccess: ['notificationType'],
  notificationTypeAllSuccess: ['notificationTypes'],
  notificationTypeUpdateSuccess: ['notificationType'],
  notificationTypeDeleteSuccess: [],

  notificationTypeFailure: ['error'],
  notificationTypeAllFailure: ['error'],
  notificationTypeUpdateFailure: ['error'],
  notificationTypeDeleteFailure: ['error']
})

export const NotificationTypeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  notificationType: null,
  notificationTypes: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    notificationType: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    notificationTypes: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { notificationType } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    notificationType
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { notificationTypes } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    notificationTypes
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { notificationType } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    notificationType
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    notificationType: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    notificationType: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    notificationTypes: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    notificationType: state.notificationType
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    notificationType: state.notificationType
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_TYPE_REQUEST]: request,
  [Types.NOTIFICATION_TYPE_ALL_REQUEST]: allRequest,
  [Types.NOTIFICATION_TYPE_UPDATE_REQUEST]: updateRequest,
  [Types.NOTIFICATION_TYPE_DELETE_REQUEST]: deleteRequest,

  [Types.NOTIFICATION_TYPE_SUCCESS]: success,
  [Types.NOTIFICATION_TYPE_ALL_SUCCESS]: allSuccess,
  [Types.NOTIFICATION_TYPE_UPDATE_SUCCESS]: updateSuccess,
  [Types.NOTIFICATION_TYPE_DELETE_SUCCESS]: deleteSuccess,

  [Types.NOTIFICATION_TYPE_FAILURE]: failure,
  [Types.NOTIFICATION_TYPE_ALL_FAILURE]: allFailure,
  [Types.NOTIFICATION_TYPE_UPDATE_FAILURE]: updateFailure,
  [Types.NOTIFICATION_TYPE_DELETE_FAILURE]: deleteFailure
})
