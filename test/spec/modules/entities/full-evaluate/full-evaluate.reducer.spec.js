import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/full-evaluate/full-evaluate.reducer'

test('attempt retrieving a single fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.fullEvaluate).toBe(null)
})

test('attempt retrieving a list of fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.fullEvaluates).toBe(null)
})

test('attempt updating a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.fullEvaluate).toEqual({id: 1})
})

test('success retrieving a list of fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.fullEvaluates).toEqual([{id: 1}, {id: 2}])
})

test('success updating a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.fullEvaluate).toEqual({id: 1})
})
test('success deleting a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.fullEvaluate).toEqual(null)
})

test('failure retrieving a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.fullEvaluate).toEqual(null)
})

test('failure retrieving a list of fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.fullEvaluates).toEqual(null)
})

test('failure updating a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.fullEvaluate).toEqual(INITIAL_STATE.fullEvaluate)
})
test('failure deleting a fullEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.fullEvaluateDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.fullEvaluate).toEqual(INITIAL_STATE.fullEvaluate)
})
