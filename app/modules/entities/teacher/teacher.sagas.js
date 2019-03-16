import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TeacherActions from './teacher.reducer'

export function * getTeacher (api, action) {
  const { teacherId } = action
  // make the call to the api
  const apiCall = call(api.getTeacher, teacherId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(TeacherActions.teacherSuccess(response.data))
  } else {
    yield put(TeacherActions.teacherFailure(response.data))
  }
}

export function * getTeachers (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTeachers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TeacherActions.teacherAllSuccess(response.data))
  } else {
    yield put(TeacherActions.teacherAllFailure(response.data))
  }
}

export function * updateTeacher (api, action) {
  const { teacher } = action
  // make the call to the api
  const idIsNotNull = !!teacher.id
  const apiCall = call(idIsNotNull ? api.updateTeacher : api.createTeacher, teacher)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(TeacherActions.teacherUpdateSuccess(response.data))
  } else {
    yield put(TeacherActions.teacherUpdateFailure(response.data))
  }
}

export function * deleteTeacher (api, action) {
  const { teacherId } = action
  // make the call to the api
  const apiCall = call(api.deleteTeacher, teacherId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TeacherActions.teacherDeleteSuccess())
  } else {
    yield put(TeacherActions.teacherDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.doB) {
    data.doB = new Date(data.doB)
  }
  return data
}
