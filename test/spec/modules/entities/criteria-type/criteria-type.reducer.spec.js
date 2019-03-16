import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/criteria-type/criteria-type.reducer'

test('attempt retrieving a single criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.criteriaType).toBe(null)
})

test('attempt retrieving a list of criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.criteriaTypes).toBe(null)
})

test('attempt updating a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.criteriaType).toEqual({id: 1})
})

test('success retrieving a list of criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.criteriaTypes).toEqual([{id: 1}, {id: 2}])
})

test('success updating a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.criteriaType).toEqual({id: 1})
})
test('success deleting a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.criteriaType).toEqual(null)
})

test('failure retrieving a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.criteriaType).toEqual(null)
})

test('failure retrieving a list of criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.criteriaTypes).toEqual(null)
})

test('failure updating a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.criteriaType).toEqual(INITIAL_STATE.criteriaType)
})
test('failure deleting a criteriaType', () => {
  const state = reducer(INITIAL_STATE, Actions.criteriaTypeDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.criteriaType).toEqual(INITIAL_STATE.criteriaType)
})
