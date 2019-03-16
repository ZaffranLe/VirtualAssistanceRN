import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import NotificationTypeActions from './notification-type.reducer'

export function * getNotificationType (api, action) {
  const { notificationTypeId } = action
  // make the call to the api
  const apiCall = call(api.getNotificationType, notificationTypeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationTypeActions.notificationTypeSuccess(response.data))
  } else {
    yield put(NotificationTypeActions.notificationTypeFailure(response.data))
  }
}

export function * getNotificationTypes (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getNotificationTypes, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationTypeActions.notificationTypeAllSuccess(response.data))
  } else {
    yield put(NotificationTypeActions.notificationTypeAllFailure(response.data))
  }
}

export function * updateNotificationType (api, action) {
  const { notificationType } = action
  // make the call to the api
  const idIsNotNull = !!notificationType.id
  const apiCall = call(idIsNotNull ? api.updateNotificationType : api.createNotificationType, notificationType)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationTypeActions.notificationTypeUpdateSuccess(response.data))
  } else {
    yield put(NotificationTypeActions.notificationTypeUpdateFailure(response.data))
  }
}

export function * deleteNotificationType (api, action) {
  const { notificationTypeId } = action
  // make the call to the api
  const apiCall = call(api.deleteNotificationType, notificationTypeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationTypeActions.notificationTypeDeleteSuccess())
  } else {
    yield put(NotificationTypeActions.notificationTypeDeleteFailure(response.data))
  }
}
