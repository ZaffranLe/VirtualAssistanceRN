import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/document-type/document-type.reducer'

test('attempt retrieving a single documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.documentType).toBe(null)
})

test('attempt retrieving a list of documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.documentTypes).toBe(null)
})

test('attempt updating a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.documentType).toEqual({id: 1})
})

test('success retrieving a list of documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.documentTypes).toEqual([{id: 1}, {id: 2}])
})

test('success updating a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.documentType).toEqual({id: 1})
})
test('success deleting a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.documentType).toEqual(null)
})

test('failure retrieving a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.documentType).toEqual(null)
})

test('failure retrieving a list of documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.documentTypes).toEqual(null)
})

test('failure updating a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.documentType).toEqual(INITIAL_STATE.documentType)
})
test('failure deleting a documentType', () => {
  const state = reducer(INITIAL_STATE, Actions.documentTypeDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.documentType).toEqual(INITIAL_STATE.documentType)
})
