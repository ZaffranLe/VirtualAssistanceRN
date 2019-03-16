import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  criteriaTypeRequest: ['criteriaTypeId'],
  criteriaTypeAllRequest: ['options'],
  criteriaTypeUpdateRequest: ['criteriaType'],
  criteriaTypeDeleteRequest: ['criteriaTypeId'],

  criteriaTypeSuccess: ['criteriaType'],
  criteriaTypeAllSuccess: ['criteriaTypes'],
  criteriaTypeUpdateSuccess: ['criteriaType'],
  criteriaTypeDeleteSuccess: [],

  criteriaTypeFailure: ['error'],
  criteriaTypeAllFailure: ['error'],
  criteriaTypeUpdateFailure: ['error'],
  criteriaTypeDeleteFailure: ['error']
})

export const CriteriaTypeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  criteriaType: null,
  criteriaTypes: null,
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
    criteriaType: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    criteriaTypes: null
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
  const { criteriaType } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    criteriaType
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { criteriaTypes } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    criteriaTypes
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { criteriaType } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    criteriaType
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    criteriaType: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    criteriaType: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    criteriaTypes: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    criteriaType: state.criteriaType
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    criteriaType: state.criteriaType
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CRITERIA_TYPE_REQUEST]: request,
  [Types.CRITERIA_TYPE_ALL_REQUEST]: allRequest,
  [Types.CRITERIA_TYPE_UPDATE_REQUEST]: updateRequest,
  [Types.CRITERIA_TYPE_DELETE_REQUEST]: deleteRequest,

  [Types.CRITERIA_TYPE_SUCCESS]: success,
  [Types.CRITERIA_TYPE_ALL_SUCCESS]: allSuccess,
  [Types.CRITERIA_TYPE_UPDATE_SUCCESS]: updateSuccess,
  [Types.CRITERIA_TYPE_DELETE_SUCCESS]: deleteSuccess,

  [Types.CRITERIA_TYPE_FAILURE]: failure,
  [Types.CRITERIA_TYPE_ALL_FAILURE]: allFailure,
  [Types.CRITERIA_TYPE_UPDATE_FAILURE]: updateFailure,
  [Types.CRITERIA_TYPE_DELETE_FAILURE]: deleteFailure
})
