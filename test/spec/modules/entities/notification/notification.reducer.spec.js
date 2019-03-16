import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/notification/notification.reducer'

test('attempt retrieving a single notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.notification).toBe(null)
})

test('attempt retrieving a list of notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.notifications).toBe(null)
})

test('attempt updating a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.notification).toEqual({id: 1})
})

test('success retrieving a list of notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.notifications).toEqual([{id: 1}, {id: 2}])
})

test('success updating a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.notification).toEqual({id: 1})
})
test('success deleting a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.notification).toEqual(null)
})

test('failure retrieving a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.notification).toEqual(null)
})

test('failure retrieving a list of notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.notifications).toEqual(null)
})

test('failure updating a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.notification).toEqual(INITIAL_STATE.notification)
})
test('failure deleting a notification', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.notification).toEqual(INITIAL_STATE.notification)
})
