import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getFullEvaluate, getFullEvaluates, updateFullEvaluate, deleteFullEvaluate } from '../../../../../app/modules/entities/full-evaluate/full-evaluate.sagas'
import FullEvaluateActions from '../../../../../app/modules/entities/full-evaluate/full-evaluate.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getFullEvaluate(1)
  const step = stepper(getFullEvaluate(FixtureAPI, { fullEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getFullEvaluate(FixtureAPI, { fullEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getFullEvaluates()
  const step = stepper(getFullEvaluates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getFullEvaluates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateFullEvaluate({id: 1})
  const step = stepper(updateFullEvaluate(FixtureAPI, { fullEvaluate: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateFullEvaluate(FixtureAPI, { fullEvaluate: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteFullEvaluate({id: 1})
  const step = stepper(deleteFullEvaluate(FixtureAPI, { fullEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteFullEvaluate(FixtureAPI, { fullEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FullEvaluateActions.fullEvaluateDeleteFailure()))
})
