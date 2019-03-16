import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCritetiaEvaluate, getCritetiaEvaluates, updateCritetiaEvaluate, deleteCritetiaEvaluate } from '../../../../../app/modules/entities/critetia-evaluate/critetia-evaluate.sagas'
import CritetiaEvaluateActions from '../../../../../app/modules/entities/critetia-evaluate/critetia-evaluate.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCritetiaEvaluate(1)
  const step = stepper(getCritetiaEvaluate(FixtureAPI, { critetiaEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCritetiaEvaluate(FixtureAPI, { critetiaEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCritetiaEvaluates()
  const step = stepper(getCritetiaEvaluates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCritetiaEvaluates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCritetiaEvaluate({id: 1})
  const step = stepper(updateCritetiaEvaluate(FixtureAPI, { critetiaEvaluate: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCritetiaEvaluate(FixtureAPI, { critetiaEvaluate: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCritetiaEvaluate({id: 1})
  const step = stepper(deleteCritetiaEvaluate(FixtureAPI, { critetiaEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCritetiaEvaluate(FixtureAPI, { critetiaEvaluateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CritetiaEvaluateActions.critetiaEvaluateDeleteFailure()))
})
