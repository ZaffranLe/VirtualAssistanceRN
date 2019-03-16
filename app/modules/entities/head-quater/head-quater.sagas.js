import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import HeadQuaterActions from './head-quater.reducer'

export function * getHeadQuater (api, action) {
  const { headQuaterId } = action
  // make the call to the api
  const apiCall = call(api.getHeadQuater, headQuaterId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(HeadQuaterActions.headQuaterSuccess(response.data))
  } else {
    yield put(HeadQuaterActions.headQuaterFailure(response.data))
  }
}

export function * getHeadQuaters (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getHeadQuaters, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(HeadQuaterActions.headQuaterAllSuccess(response.data))
  } else {
    yield put(HeadQuaterActions.headQuaterAllFailure(response.data))
  }
}

export function * updateHeadQuater (api, action) {
  const { headQuater } = action
  // make the call to the api
  const idIsNotNull = !!headQuater.id
  const apiCall = call(idIsNotNull ? api.updateHeadQuater : api.createHeadQuater, headQuater)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(HeadQuaterActions.headQuaterUpdateSuccess(response.data))
  } else {
    yield put(HeadQuaterActions.headQuaterUpdateFailure(response.data))
  }
}

export function * deleteHeadQuater (api, action) {
  const { headQuaterId } = action
  // make the call to the api
  const apiCall = call(api.deleteHeadQuater, headQuaterId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(HeadQuaterActions.headQuaterDeleteSuccess())
  } else {
    yield put(HeadQuaterActions.headQuaterDeleteFailure(response.data))
  }
}
