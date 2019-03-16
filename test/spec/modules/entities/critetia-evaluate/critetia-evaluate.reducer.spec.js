import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/critetia-evaluate/critetia-evaluate.reducer'

test('attempt retrieving a single critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.critetiaEvaluate).toBe(null)
})

test('attempt retrieving a list of critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.critetiaEvaluates).toBe(null)
})

test('attempt updating a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.critetiaEvaluate).toEqual({id: 1})
})

test('success retrieving a list of critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.critetiaEvaluates).toEqual([{id: 1}, {id: 2}])
})

test('success updating a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.critetiaEvaluate).toEqual({id: 1})
})
test('success deleting a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.critetiaEvaluate).toEqual(null)
})

test('failure retrieving a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.critetiaEvaluate).toEqual(null)
})

test('failure retrieving a list of critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.critetiaEvaluates).toEqual(null)
})

test('failure updating a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.critetiaEvaluate).toEqual(INITIAL_STATE.critetiaEvaluate)
})
test('failure deleting a critetiaEvaluate', () => {
  const state = reducer(INITIAL_STATE, Actions.critetiaEvaluateDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.critetiaEvaluate).toEqual(INITIAL_STATE.critetiaEvaluate)
})
