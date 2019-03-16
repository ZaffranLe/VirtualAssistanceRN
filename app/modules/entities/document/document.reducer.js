import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  documentRequest: ['documentId'],
  documentAllRequest: ['options'],
  documentUpdateRequest: ['document'],
  documentDeleteRequest: ['documentId'],

  documentSuccess: ['document'],
  documentAllSuccess: ['documents'],
  documentUpdateSuccess: ['document'],
  documentDeleteSuccess: [],

  documentFailure: ['error'],
  documentAllFailure: ['error'],
  documentUpdateFailure: ['error'],
  documentDeleteFailure: ['error']
})

export const DocumentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  document: null,
  documents: null,
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
    document: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    documents: null
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
  const { document } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    document
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { documents } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    documents
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { document } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    document
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    document: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    document: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    documents: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    document: state.document
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    document: state.document
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DOCUMENT_REQUEST]: request,
  [Types.DOCUMENT_ALL_REQUEST]: allRequest,
  [Types.DOCUMENT_UPDATE_REQUEST]: updateRequest,
  [Types.DOCUMENT_DELETE_REQUEST]: deleteRequest,

  [Types.DOCUMENT_SUCCESS]: success,
  [Types.DOCUMENT_ALL_SUCCESS]: allSuccess,
  [Types.DOCUMENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.DOCUMENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.DOCUMENT_FAILURE]: failure,
  [Types.DOCUMENT_ALL_FAILURE]: allFailure,
  [Types.DOCUMENT_UPDATE_FAILURE]: updateFailure,
  [Types.DOCUMENT_DELETE_FAILURE]: deleteFailure
})
