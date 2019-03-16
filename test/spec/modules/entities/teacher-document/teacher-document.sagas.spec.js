import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTeacherDocument, getTeacherDocuments, updateTeacherDocument, deleteTeacherDocument } from '../../../../../app/modules/entities/teacher-document/teacher-document.sagas'
import TeacherDocumentActions from '../../../../../app/modules/entities/teacher-document/teacher-document.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTeacherDocument(1)
  const step = stepper(getTeacherDocument(FixtureAPI, { teacherDocumentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTeacherDocument(FixtureAPI, { teacherDocumentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTeacherDocuments()
  const step = stepper(getTeacherDocuments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTeacherDocuments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTeacherDocument({id: 1})
  const step = stepper(updateTeacherDocument(FixtureAPI, { teacherDocument: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTeacherDocument(FixtureAPI, { teacherDocument: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteTeacherDocument({id: 1})
  const step = stepper(deleteTeacherDocument(FixtureAPI, { teacherDocumentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTeacherDocument(FixtureAPI, { teacherDocumentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TeacherDocumentActions.teacherDocumentDeleteFailure()))
})
