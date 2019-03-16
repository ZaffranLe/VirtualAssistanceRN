import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getAnswer, getAnswers, updateAnswer, deleteAnswer } from '../../../../../app/modules/entities/answer/answer.sagas'
import AnswerActions from '../../../../../app/modules/entities/answer/answer.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getAnswer(1)
  const step = stepper(getAnswer(FixtureAPI, { answerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AnswerActions.answerSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getAnswer(FixtureAPI, { answerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AnswerActions.answerFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getAnswers()
  const step = stepper(getAnswers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AnswerActions.answerAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getAnswers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AnswerActions.answerAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateAnswer({id: 1})
  const step = stepper(updateAnswer(FixtureAPI, { answer: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AnswerActions.answerUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateAnswer(FixtureAPI, { answer: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AnswerActions.answerUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteAnswer({id: 1})
  const step = stepper(deleteAnswer(FixtureAPI, { answerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AnswerActions.answerDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteAnswer(FixtureAPI, { answerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AnswerActions.answerDeleteFailure()))
})
