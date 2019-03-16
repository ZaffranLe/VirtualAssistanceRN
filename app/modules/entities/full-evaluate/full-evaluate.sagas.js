import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import FullEvaluateActions from './full-evaluate.reducer'

export function * getFullEvaluate (api, action) {
  const { fullEvaluateId } = action
  // make the call to the api
  const apiCall = call(api.getFullEvaluate, fullEvaluateId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FullEvaluateActions.fullEvaluateSuccess(response.data))
  } else {
    yield put(FullEvaluateActions.fullEvaluateFailure(response.data))
  }
}

export function * getFullEvaluates (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getFullEvaluates, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FullEvaluateActions.fullEvaluateAllSuccess(response.data))
  } else {
    yield put(FullEvaluateActions.fullEvaluateAllFailure(response.data))
  }
}

export function * updateFullEvaluate (api, action) {
  const { fullEvaluate } = action
  // make the call to the api
  const idIsNotNull = !!fullEvaluate.id
  const apiCall = call(idIsNotNull ? api.updateFullEvaluate : api.createFullEvaluate, fullEvaluate)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FullEvaluateActions.fullEvaluateUpdateSuccess(response.data))
  } else {
    yield put(FullEvaluateActions.fullEvaluateUpdateFailure(response.data))
  }
}

export function * deleteFullEvaluate (api, action) {
  const { fullEvaluateId } = action
  // make the call to the api
  const apiCall = call(api.deleteFullEvaluate, fullEvaluateId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FullEvaluateActions.fullEvaluateDeleteSuccess())
  } else {
    yield put(FullEvaluateActions.fullEvaluateDeleteFailure(response.data))
  }
}
