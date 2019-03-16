import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/head-quater/head-quater.reducer'

test('attempt retrieving a single headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.headQuater).toBe(null)
})

test('attempt retrieving a list of headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.headQuaters).toBe(null)
})

test('attempt updating a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.headQuater).toEqual({id: 1})
})

test('success retrieving a list of headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.headQuaters).toEqual([{id: 1}, {id: 2}])
})

test('success updating a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.headQuater).toEqual({id: 1})
})
test('success deleting a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.headQuater).toEqual(null)
})

test('failure retrieving a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.headQuater).toEqual(null)
})

test('failure retrieving a list of headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.headQuaters).toEqual(null)
})

test('failure updating a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.headQuater).toEqual(INITIAL_STATE.headQuater)
})
test('failure deleting a headQuater', () => {
  const state = reducer(INITIAL_STATE, Actions.headQuaterDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.headQuater).toEqual(INITIAL_STATE.headQuater)
})
