import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTeacher, getTeachers, updateTeacher, deleteTeacher } from '../../../../../app/modules/entities/teacher/teacher.sagas'
import TeacherActions from '../../../../../app/modules/entities/teacher/teacher.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTeacher(1)
  const step = stepper(getTeacher(FixtureAPI, { teacherId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherActions.teacherSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTeacher(FixtureAPI, { teacherId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherActions.teacherFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTeachers()
  const step = stepper(getTeachers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherActions.teacherAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTeachers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherActions.teacherAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTeacher({id: 1})
  const step = stepper(updateTeacher(FixtureAPI, { teacher: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherActions.teacherUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTeacher(FixtureAPI, { teacher: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherActions.teacherUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteTeacher({id: 1})
  const step = stepper(deleteTeacher(FixtureAPI, { teacherId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherActions.teacherDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTeacher(FixtureAPI, { teacherId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherActions.teacherDeleteFailure()))
})
