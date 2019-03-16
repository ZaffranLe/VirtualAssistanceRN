import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import DocumentActions from './document.reducer'

export function * getDocument (api, action) {
  const { documentId } = action
  // make the call to the api
  const apiCall = call(api.getDocument, documentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentActions.documentSuccess(response.data))
  } else {
    yield put(DocumentActions.documentFailure(response.data))
  }
}

export function * getDocuments (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getDocuments, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentActions.documentAllSuccess(response.data))
  } else {
    yield put(DocumentActions.documentAllFailure(response.data))
  }
}

export function * updateDocument (api, action) {
  const { document } = action
  // make the call to the api
  const idIsNotNull = !!document.id
  const apiCall = call(idIsNotNull ? api.updateDocument : api.createDocument, document)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentActions.documentUpdateSuccess(response.data))
  } else {
    yield put(DocumentActions.documentUpdateFailure(response.data))
  }
}

export function * deleteDocument (api, action) {
  const { documentId } = action
  // make the call to the api
  const apiCall = call(api.deleteDocument, documentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentActions.documentDeleteSuccess())
  } else {
    yield put(DocumentActions.documentDeleteFailure(response.data))
  }
}
