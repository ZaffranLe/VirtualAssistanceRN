import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  critetiaEvaluateRequest: ['critetiaEvaluateId'],
  critetiaEvaluateAllRequest: ['options'],
  critetiaEvaluateUpdateRequest: ['critetiaEvaluate'],
  critetiaEvaluateDeleteRequest: ['critetiaEvaluateId'],

  critetiaEvaluateSuccess: ['critetiaEvaluate'],
  critetiaEvaluateAllSuccess: ['critetiaEvaluates'],
  critetiaEvaluateUpdateSuccess: ['critetiaEvaluate'],
  critetiaEvaluateDeleteSuccess: [],

  critetiaEvaluateFailure: ['error'],
  critetiaEvaluateAllFailure: ['error'],
  critetiaEvaluateUpdateFailure: ['error'],
  critetiaEvaluateDeleteFailure: ['error']
})

export const CritetiaEvaluateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  critetiaEvaluate: null,
  critetiaEvaluates: null,
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
    critetiaEvaluate: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    critetiaEvaluates: null
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
  const { critetiaEvaluate } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    critetiaEvaluate
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { critetiaEvaluates } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    critetiaEvaluates
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { critetiaEvaluate } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    critetiaEvaluate
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    critetiaEvaluate: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    critetiaEvaluate: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    critetiaEvaluates: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    critetiaEvaluate: state.critetiaEvaluate
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    critetiaEvaluate: state.critetiaEvaluate
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CRITETIA_EVALUATE_REQUEST]: request,
  [Types.CRITETIA_EVALUATE_ALL_REQUEST]: allRequest,
  [Types.CRITETIA_EVALUATE_UPDATE_REQUEST]: updateRequest,
  [Types.CRITETIA_EVALUATE_DELETE_REQUEST]: deleteRequest,

  [Types.CRITETIA_EVALUATE_SUCCESS]: success,
  [Types.CRITETIA_EVALUATE_ALL_SUCCESS]: allSuccess,
  [Types.CRITETIA_EVALUATE_UPDATE_SUCCESS]: updateSuccess,
  [Types.CRITETIA_EVALUATE_DELETE_SUCCESS]: deleteSuccess,

  [Types.CRITETIA_EVALUATE_FAILURE]: failure,
  [Types.CRITETIA_EVALUATE_ALL_FAILURE]: allFailure,
  [Types.CRITETIA_EVALUATE_UPDATE_FAILURE]: updateFailure,
  [Types.CRITETIA_EVALUATE_DELETE_FAILURE]: deleteFailure
})
