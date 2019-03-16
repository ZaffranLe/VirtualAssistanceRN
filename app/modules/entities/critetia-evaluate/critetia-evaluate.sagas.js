import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CritetiaEvaluateActions from './critetia-evaluate.reducer'

export function * getCritetiaEvaluate (api, action) {
  const { critetiaEvaluateId } = action
  // make the call to the api
  const apiCall = call(api.getCritetiaEvaluate, critetiaEvaluateId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CritetiaEvaluateActions.critetiaEvaluateSuccess(response.data))
  } else {
    yield put(CritetiaEvaluateActions.critetiaEvaluateFailure(response.data))
  }
}

export function * getCritetiaEvaluates (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCritetiaEvaluates, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CritetiaEvaluateActions.critetiaEvaluateAllSuccess(response.data))
  } else {
    yield put(CritetiaEvaluateActions.critetiaEvaluateAllFailure(response.data))
  }
}

export function * updateCritetiaEvaluate (api, action) {
  const { critetiaEvaluate } = action
  // make the call to the api
  const idIsNotNull = !!critetiaEvaluate.id
  const apiCall = call(idIsNotNull ? api.updateCritetiaEvaluate : api.createCritetiaEvaluate, critetiaEvaluate)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CritetiaEvaluateActions.critetiaEvaluateUpdateSuccess(response.data))
  } else {
    yield put(CritetiaEvaluateActions.critetiaEvaluateUpdateFailure(response.data))
  }
}

export function * deleteCritetiaEvaluate (api, action) {
  const { critetiaEvaluateId } = action
  // make the call to the api
  const apiCall = call(api.deleteCritetiaEvaluate, critetiaEvaluateId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CritetiaEvaluateActions.critetiaEvaluateDeleteSuccess())
  } else {
    yield put(CritetiaEvaluateActions.critetiaEvaluateDeleteFailure(response.data))
  }
}
