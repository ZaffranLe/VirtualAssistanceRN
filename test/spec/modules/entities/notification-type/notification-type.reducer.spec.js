import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/notification-type/notification-type.reducer'

test('attempt retrieving a single notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.notificationType).toBe(null)
})

test('attempt retrieving a list of notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.notificationTypes).toBe(null)
})

test('attempt updating a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.notificationType).toEqual({id: 1})
})

test('success retrieving a list of notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.notificationTypes).toEqual([{id: 1}, {id: 2}])
})

test('success updating a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.notificationType).toEqual({id: 1})
})
test('success deleting a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.notificationType).toEqual(null)
})

test('failure retrieving a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.notificationType).toEqual(null)
})

test('failure retrieving a list of notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.notificationTypes).toEqual(null)
})

test('failure updating a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.notificationType).toEqual(INITIAL_STATE.notificationType)
})
test('failure deleting a notificationType', () => {
  const state = reducer(INITIAL_STATE, Actions.notificationTypeDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.notificationType).toEqual(INITIAL_STATE.notificationType)
})
