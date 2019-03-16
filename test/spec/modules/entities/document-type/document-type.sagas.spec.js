import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getDocumentType, getDocumentTypes, updateDocumentType, deleteDocumentType } from '../../../../../app/modules/entities/document-type/document-type.sagas'
import DocumentTypeActions from '../../../../../app/modules/entities/document-type/document-type.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getDocumentType(1)
  const step = stepper(getDocumentType(FixtureAPI, { documentTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getDocumentType(FixtureAPI, { documentTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getDocumentTypes()
  const step = stepper(getDocumentTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getDocumentTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateDocumentType({id: 1})
  const step = stepper(updateDocumentType(FixtureAPI, { documentType: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateDocumentType(FixtureAPI, { documentType: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteDocumentType({id: 1})
  const step = stepper(deleteDocumentType(FixtureAPI, { documentTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteDocumentType(FixtureAPI, { documentTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DocumentTypeActions.documentTypeDeleteFailure()))
})
