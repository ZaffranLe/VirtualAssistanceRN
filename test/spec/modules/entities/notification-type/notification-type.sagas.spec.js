import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getNotificationType, getNotificationTypes, updateNotificationType, deleteNotificationType } from '../../../../../app/modules/entities/notification-type/notification-type.sagas'
import NotificationTypeActions from '../../../../../app/modules/entities/notification-type/notification-type.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getNotificationType(1)
  const step = stepper(getNotificationType(FixtureAPI, { notificationTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getNotificationType(FixtureAPI, { notificationTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getNotificationTypes()
  const step = stepper(getNotificationTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getNotificationTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateNotificationType({id: 1})
  const step = stepper(updateNotificationType(FixtureAPI, { notificationType: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateNotificationType(FixtureAPI, { notificationType: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteNotificationType({id: 1})
  const step = stepper(deleteNotificationType(FixtureAPI, { notificationTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteNotificationType(FixtureAPI, { notificationTypeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationTypeActions.notificationTypeDeleteFailure()))
})
