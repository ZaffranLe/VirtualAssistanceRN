import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getDocument, getDocuments, updateDocument, deleteDocument } from '../../../../../app/modules/entities/document/document.sagas'
import DocumentActions from '../../../../../app/modules/entities/document/document.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getDocument(1)
  const step = stepper(getDocument(FixtureAPI, { documentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentActions.documentSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getDocument(FixtureAPI, { documentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentActions.documentFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getDocuments()
  const step = stepper(getDocuments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentActions.documentAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getDocuments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentActions.documentAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateDocument({id: 1})
  const step = stepper(updateDocument(FixtureAPI, { document: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentActions.documentUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateDocument(FixtureAPI, { document: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentActions.documentUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteDocument({id: 1})
  const step = stepper(deleteDocument(FixtureAPI, { documentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentActions.documentDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteDocument(FixtureAPI, { documentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentActions.documentDeleteFailure()))
})
