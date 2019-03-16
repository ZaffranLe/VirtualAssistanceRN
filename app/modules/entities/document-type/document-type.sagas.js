import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import DocumentTypeActions from './document-type.reducer'

export function * getDocumentType (api, action) {
  const { documentTypeId } = action
  // make the call to the api
  const apiCall = call(api.getDocumentType, documentTypeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentTypeActions.documentTypeSuccess(response.data))
  } else {
    yield put(DocumentTypeActions.documentTypeFailure(response.data))
  }
}

export function * getDocumentTypes (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getDocumentTypes, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentTypeActions.documentTypeAllSuccess(response.data))
  } else {
    yield put(DocumentTypeActions.documentTypeAllFailure(response.data))
  }
}

export function * updateDocumentType (api, action) {
  const { documentType } = action
  // make the call to the api
  const idIsNotNull = !!documentType.id
  const apiCall = call(idIsNotNull ? api.updateDocumentType : api.createDocumentType, documentType)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentTypeActions.documentTypeUpdateSuccess(response.data))
  } else {
    yield put(DocumentTypeActions.documentTypeUpdateFailure(response.data))
  }
}

export function * deleteDocumentType (api, action) {
  const { documentTypeId } = action
  // make the call to the api
  const apiCall = call(api.deleteDocumentType, documentTypeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DocumentTypeActions.documentTypeDeleteSuccess())
  } else {
    yield put(DocumentTypeActions.documentTypeDeleteFailure(response.data))
  }
}
