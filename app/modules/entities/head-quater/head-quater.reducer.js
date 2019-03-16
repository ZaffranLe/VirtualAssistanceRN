import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  headQuaterRequest: ['headQuaterId'],
  headQuaterAllRequest: ['options'],
  headQuaterUpdateRequest: ['headQuater'],
  headQuaterDeleteRequest: ['headQuaterId'],

  headQuaterSuccess: ['headQuater'],
  headQuaterAllSuccess: ['headQuaters'],
  headQuaterUpdateSuccess: ['headQuater'],
  headQuaterDeleteSuccess: [],

  headQuaterFailure: ['error'],
  headQuaterAllFailure: ['error'],
  headQuaterUpdateFailure: ['error'],
  headQuaterDeleteFailure: ['error']
})

export const HeadQuaterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  headQuater: null,
  headQuaters: null,
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
    headQuater: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    headQuaters: null
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
  const { headQuater } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    headQuater
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { headQuaters } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    headQuaters
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { headQuater } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    headQuater
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    headQuater: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    headQuater: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    headQuaters: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    headQuater: state.headQuater
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    headQuater: state.headQuater
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HEAD_QUATER_REQUEST]: request,
  [Types.HEAD_QUATER_ALL_REQUEST]: allRequest,
  [Types.HEAD_QUATER_UPDATE_REQUEST]: updateRequest,
  [Types.HEAD_QUATER_DELETE_REQUEST]: deleteRequest,

  [Types.HEAD_QUATER_SUCCESS]: success,
  [Types.HEAD_QUATER_ALL_SUCCESS]: allSuccess,
  [Types.HEAD_QUATER_UPDATE_SUCCESS]: updateSuccess,
  [Types.HEAD_QUATER_DELETE_SUCCESS]: deleteSuccess,

  [Types.HEAD_QUATER_FAILURE]: failure,
  [Types.HEAD_QUATER_ALL_FAILURE]: allFailure,
  [Types.HEAD_QUATER_UPDATE_FAILURE]: updateFailure,
  [Types.HEAD_QUATER_DELETE_FAILURE]: deleteFailure
})
