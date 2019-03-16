import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/answer/answer.reducer'

test('attempt retrieving a single answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.answer).toBe(null)
})

test('attempt retrieving a list of answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.answers).toBe(null)
})

test('attempt updating a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.answer).toEqual({id: 1})
})

test('success retrieving a list of answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.answers).toEqual([{id: 1}, {id: 2}])
})

test('success updating a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.answer).toEqual({id: 1})
})
test('success deleting a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.answer).toEqual(null)
})

test('failure retrieving a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.answer).toEqual(null)
})

test('failure retrieving a list of answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.answers).toEqual(null)
})

test('failure updating a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.answer).toEqual(INITIAL_STATE.answer)
})
test('failure deleting a answer', () => {
  const state = reducer(INITIAL_STATE, Actions.answerDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.answer).toEqual(INITIAL_STATE.answer)
})
