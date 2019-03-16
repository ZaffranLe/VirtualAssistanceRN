import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TeacherDocumentActions from './teacher-document.reducer'

export function * getTeacherDocument (api, action) {
  const { teacherDocumentId } = action
  // make the call to the api
  const apiCall = call(api.getTeacherDocument, teacherDocumentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TeacherDocumentActions.teacherDocumentSuccess(response.data))
  } else {
    yield put(TeacherDocumentActions.teacherDocumentFailure(response.data))
  }
}

export function * getTeacherDocuments (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTeacherDocuments, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TeacherDocumentActions.teacherDocumentAllSuccess(response.data))
  } else {
    yield put(TeacherDocumentActions.teacherDocumentAllFailure(response.data))
  }
}

export function * updateTeacherDocument (api, action) {
  const { teacherDocument } = action
  // make the call to the api
  const idIsNotNull = !!teacherDocument.id
  const apiCall = call(idIsNotNull ? api.updateTeacherDocument : api.createTeacherDocument, teacherDocument)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TeacherDocumentActions.teacherDocumentUpdateSuccess(response.data))
  } else {
    yield put(TeacherDocumentActions.teacherDocumentUpdateFailure(response.data))
  }
}

export function * deleteTeacherDocument (api, action) {
  const { teacherDocumentId } = action
  // make the call to the api
  const apiCall = call(api.deleteTeacherDocument, teacherDocumentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TeacherDocumentActions.teacherDocumentDeleteSuccess())
  } else {
    yield put(TeacherDocumentActions.teacherDocumentDeleteFailure(response.data))
  }
}
