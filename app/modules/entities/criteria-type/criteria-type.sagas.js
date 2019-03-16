import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CriteriaTypeActions from './criteria-type.reducer'

export function * getCriteriaType (api, action) {
  const { criteriaTypeId } = action
  // make the call to the api
  const apiCall = call(api.getCriteriaType, criteriaTypeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CriteriaTypeActions.criteriaTypeSuccess(response.data))
  } else {
    yield put(CriteriaTypeActions.criteriaTypeFailure(response.data))
  }
}

export function * getCriteriaTypes (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCriteriaTypes, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CriteriaTypeActions.criteriaTypeAllSuccess(response.data))
  } else {
    yield put(CriteriaTypeActions.criteriaTypeAllFailure(response.data))
  }
}

export function * updateCriteriaType (api, action) {
  const { criteriaType } = action
  // make the call to the api
  const idIsNotNull = !!criteriaType.id
  const apiCall = call(idIsNotNull ? api.updateCriteriaType : api.createCriteriaType, criteriaType)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CriteriaTypeActions.criteriaTypeUpdateSuccess(response.data))
  } else {
    yield put(CriteriaTypeActions.criteriaTypeUpdateFailure(response.data))
  }
}

export function * deleteCriteriaType (api, action) {
  const { criteriaTypeId } = action
  // make the call to the api
  const apiCall = call(api.deleteCriteriaType, criteriaTypeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CriteriaTypeActions.criteriaTypeDeleteSuccess())
  } else {
    yield put(CriteriaTypeActions.criteriaTypeDeleteFailure(response.data))
  }
}
