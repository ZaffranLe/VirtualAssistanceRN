import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  documentTypeRequest: ['documentTypeId'],
  documentTypeAllRequest: ['options'],
  documentTypeUpdateRequest: ['documentType'],
  documentTypeDeleteRequest: ['documentTypeId'],

  documentTypeSuccess: ['documentType'],
  documentTypeAllSuccess: ['documentTypes'],
  documentTypeUpdateSuccess: ['documentType'],
  documentTypeDeleteSuccess: [],

  documentTypeFailure: ['error'],
  documentTypeAllFailure: ['error'],
  documentTypeUpdateFailure: ['error'],
  documentTypeDeleteFailure: ['error']
})

export const DocumentTypeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  documentType: null,
  documentTypes: null,
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
    documentType: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    documentTypes: null
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
  const { documentType } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    documentType
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { documentTypes } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    documentTypes
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { documentType } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    documentType
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    documentType: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    documentType: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    documentTypes: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    documentType: state.documentType
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    documentType: state.documentType
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DOCUMENT_TYPE_REQUEST]: request,
  [Types.DOCUMENT_TYPE_ALL_REQUEST]: allRequest,
  [Types.DOCUMENT_TYPE_UPDATE_REQUEST]: updateRequest,
  [Types.DOCUMENT_TYPE_DELETE_REQUEST]: deleteRequest,

  [Types.DOCUMENT_TYPE_SUCCESS]: success,
  [Types.DOCUMENT_TYPE_ALL_SUCCESS]: allSuccess,
  [Types.DOCUMENT_TYPE_UPDATE_SUCCESS]: updateSuccess,
  [Types.DOCUMENT_TYPE_DELETE_SUCCESS]: deleteSuccess,

  [Types.DOCUMENT_TYPE_FAILURE]: failure,
  [Types.DOCUMENT_TYPE_ALL_FAILURE]: allFailure,
  [Types.DOCUMENT_TYPE_UPDATE_FAILURE]: updateFailure,
  [Types.DOCUMENT_TYPE_DELETE_FAILURE]: deleteFailure
})
