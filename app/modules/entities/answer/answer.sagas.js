import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import AnswerActions from './answer.reducer'

export function * getAnswer (api, action) {
  const { answerId } = action
  // make the call to the api
  const apiCall = call(api.getAnswer, answerId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AnswerActions.answerSuccess(response.data))
  } else {
    yield put(AnswerActions.answerFailure(response.data))
  }
}

export function * getAnswers (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getAnswers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AnswerActions.answerAllSuccess(response.data))
  } else {
    yield put(AnswerActions.answerAllFailure(response.data))
  }
}

export function * updateAnswer (api, action) {
  const { answer } = action
  // make the call to the api
  const idIsNotNull = !!answer.id
  const apiCall = call(idIsNotNull ? api.updateAnswer : api.createAnswer, answer)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AnswerActions.answerUpdateSuccess(response.data))
  } else {
    yield put(AnswerActions.answerUpdateFailure(response.data))
  }
}

export function * deleteAnswer (api, action) {
  const { answerId } = action
  // make the call to the api
  const apiCall = call(api.deleteAnswer, answerId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AnswerActions.answerDeleteSuccess())
  } else {
    yield put(AnswerActions.answerDeleteFailure(response.data))
  }
}
