import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  answerRequest: ['answerId'],
  answerAllRequest: ['options'],
  answerUpdateRequest: ['answer'],
  answerDeleteRequest: ['answerId'],

  answerSuccess: ['answer'],
  answerAllSuccess: ['answers'],
  answerUpdateSuccess: ['answer'],
  answerDeleteSuccess: [],

  answerFailure: ['error'],
  answerAllFailure: ['error'],
  answerUpdateFailure: ['error'],
  answerDeleteFailure: ['error']
})

export const AnswerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  answer: null,
  answers: null,
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
    answer: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    answers: null
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
  const { answer } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    answer
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { answers } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    answers
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { answer } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    answer
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    answer: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    answer: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    answers: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    answer: state.answer
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    answer: state.answer
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ANSWER_REQUEST]: request,
  [Types.ANSWER_ALL_REQUEST]: allRequest,
  [Types.ANSWER_UPDATE_REQUEST]: updateRequest,
  [Types.ANSWER_DELETE_REQUEST]: deleteRequest,

  [Types.ANSWER_SUCCESS]: success,
  [Types.ANSWER_ALL_SUCCESS]: allSuccess,
  [Types.ANSWER_UPDATE_SUCCESS]: updateSuccess,
  [Types.ANSWER_DELETE_SUCCESS]: deleteSuccess,

  [Types.ANSWER_FAILURE]: failure,
  [Types.ANSWER_ALL_FAILURE]: allFailure,
  [Types.ANSWER_UPDATE_FAILURE]: updateFailure,
  [Types.ANSWER_DELETE_FAILURE]: deleteFailure
})
