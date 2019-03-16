import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  teachers: require('../../modules/entities/teacher/teacher.reducer').reducer,
  teacherDocuments: require('../../modules/entities/teacher-document/teacher-document.reducer').reducer,
  documents: require('../../modules/entities/document/document.reducer').reducer,
  documentTypes: require('../../modules/entities/document-type/document-type.reducer').reducer,
  notifications: require('../../modules/entities/notification/notification.reducer').reducer,
  notificationTypes: require('../../modules/entities/notification-type/notification-type.reducer').reducer,
  headQuaters: require('../../modules/entities/head-quater/head-quater.reducer').reducer,
  criteriaTypes: require('../../modules/entities/criteria-type/criteria-type.reducer').reducer,
  answers: require('../../modules/entities/answer/answer.reducer').reducer,
  critetiaEvaluates: require('../../modules/entities/critetia-evaluate/critetia-evaluate.reducer').reducer,
  fullEvaluates: require('../../modules/entities/full-evaluate/full-evaluate.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
