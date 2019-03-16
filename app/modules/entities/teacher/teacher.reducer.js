import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  teacherRequest: ['teacherId'],
  teacherAllRequest: ['options'],
  teacherUpdateRequest: ['teacher'],
  teacherDeleteRequest: ['teacherId'],

  teacherSuccess: ['teacher'],
  teacherAllSuccess: ['teachers'],
  teacherUpdateSuccess: ['teacher'],
  teacherDeleteSuccess: [],

  teacherFailure: ['error'],
  teacherAllFailure: ['error'],
  teacherUpdateFailure: ['error'],
  teacherDeleteFailure: ['error']
})

export const TeacherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  teacher: null,
  teachers: null,
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
    teacher: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    teachers: null
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
  const { teacher } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    teacher
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { teachers } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    teachers
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { teacher } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    teacher
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    teacher: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    teacher: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    teachers: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    teacher: state.teacher
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    teacher: state.teacher
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEACHER_REQUEST]: request,
  [Types.TEACHER_ALL_REQUEST]: allRequest,
  [Types.TEACHER_UPDATE_REQUEST]: updateRequest,
  [Types.TEACHER_DELETE_REQUEST]: deleteRequest,

  [Types.TEACHER_SUCCESS]: success,
  [Types.TEACHER_ALL_SUCCESS]: allSuccess,
  [Types.TEACHER_UPDATE_SUCCESS]: updateSuccess,
  [Types.TEACHER_DELETE_SUCCESS]: deleteSuccess,

  [Types.TEACHER_FAILURE]: failure,
  [Types.TEACHER_ALL_FAILURE]: allFailure,
  [Types.TEACHER_UPDATE_FAILURE]: updateFailure,
  [Types.TEACHER_DELETE_FAILURE]: deleteFailure
})
