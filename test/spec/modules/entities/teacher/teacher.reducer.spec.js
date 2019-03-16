import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/teacher/teacher.reducer'

test('attempt retrieving a single teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.teacher).toBe(null)
})

test('attempt retrieving a list of teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.teachers).toBe(null)
})

test('attempt updating a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.teacher).toEqual({id: 1})
})

test('success retrieving a list of teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.teachers).toEqual([{id: 1}, {id: 2}])
})

test('success updating a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.teacher).toEqual({id: 1})
})
test('success deleting a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.teacher).toEqual(null)
})

test('failure retrieving a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.teacher).toEqual(null)
})

test('failure retrieving a list of teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.teachers).toEqual(null)
})

test('failure updating a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.teacher).toEqual(INITIAL_STATE.teacher)
})
test('failure deleting a teacher', () => {
  const state = reducer(INITIAL_STATE, Actions.teacherDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.teacher).toEqual(INITIAL_STATE.teacher)
})
