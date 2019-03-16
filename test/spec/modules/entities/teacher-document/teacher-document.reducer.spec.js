import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/teacher-document/teacher-document.reducer'

test('attempt retrieving a single teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.teacherDocument).toBe(null)
})

test('attempt retrieving a list of teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.teacherDocuments).toBe(null)
})

test('attempt updating a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.teacherDocument).toEqual({id: 1})
})

test('success retrieving a list of teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.teacherDocuments).toEqual([{id: 1}, {id: 2}])
})

test('success updating a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.teacherDocument).toEqual({id: 1})
})
test('success deleting a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.teacherDocument).toEqual(null)
})

test('failure retrieving a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.teacherDocument).toEqual(null)
})

test('failure retrieving a list of teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.teacherDocuments).toEqual(null)
})

test('failure updating a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.teacherDocument).toEqual(INITIAL_STATE.teacherDocument)
})
test('failure deleting a teacherDocument', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDocumentDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.teacherDocument).toEqual(INITIAL_STATE.teacherDocument)
})
