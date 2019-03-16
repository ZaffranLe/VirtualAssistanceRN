import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCriteriaType, getCriteriaTypes, updateCriteriaType, deleteCriteriaType } from '../../../../../app/modules/entities/criteria-type/criteria-type.sagas'
import CriteriaTypeActions from '../../../../../app/modules/entities/criteria-type/criteria-type.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCriteriaType(1)
  const step = stepper(getCriteriaType(FixtureAPI, { criteriaTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCriteriaType(FixtureAPI, { criteriaTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCriteriaTypes()
  const step = stepper(getCriteriaTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCriteriaTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCriteriaType({id: 1})
  const step = stepper(updateCriteriaType(FixtureAPI, { criteriaType: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCriteriaType(FixtureAPI, { criteriaType: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCriteriaType({id: 1})
  const step = stepper(deleteCriteriaType(FixtureAPI, { criteriaTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCriteriaType(FixtureAPI, { criteriaTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CriteriaTypeActions.criteriaTypeDeleteFailure()))
})
