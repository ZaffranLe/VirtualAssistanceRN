import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getHeadQuater, getHeadQuaters, updateHeadQuater, deleteHeadQuater } from '../../../../../app/modules/entities/head-quater/head-quater.sagas'
import HeadQuaterActions from '../../../../../app/modules/entities/head-quater/head-quater.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getHeadQuater(1)
  const step = stepper(getHeadQuater(FixtureAPI, { headQuaterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getHeadQuater(FixtureAPI, { headQuaterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getHeadQuaters()
  const step = stepper(getHeadQuaters(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getHeadQuaters(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateHeadQuater({id: 1})
  const step = stepper(updateHeadQuater(FixtureAPI, { headQuater: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateHeadQuater(FixtureAPI, { headQuater: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteHeadQuater({id: 1})
  const step = stepper(deleteHeadQuater(FixtureAPI, { headQuaterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteHeadQuater(FixtureAPI, { headQuaterId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(HeadQuaterActions.headQuaterDeleteFailure()))
})
