import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/document/document.reducer'

test('attempt retrieving a single document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.document).toBe(null)
})

test('attempt retrieving a list of document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.documents).toBe(null)
})

test('attempt updating a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.document).toEqual({id: 1})
})

test('success retrieving a list of document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.documents).toEqual([{id: 1}, {id: 2}])
})

test('success updating a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.document).toEqual({id: 1})
})
test('success deleting a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.document).toEqual(null)
})

test('failure retrieving a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.document).toEqual(null)
})

test('failure retrieving a list of document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.documents).toEqual(null)
})

test('failure updating a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.document).toEqual(INITIAL_STATE.document)
})
test('failure deleting a document', () => {
  const state = reducer(INITIAL_STATE, Actions.documentDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.document).toEqual(INITIAL_STATE.document)
})
