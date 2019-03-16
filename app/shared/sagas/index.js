import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { TeacherTypes } from '../../modules/entities/teacher/teacher.reducer'
import { TeacherDocumentTypes } from '../../modules/entities/teacher-document/teacher-document.reducer'
import { DocumentTypes } from '../../modules/entities/document/document.reducer'
import { DocumentTypeTypes } from '../../modules/entities/document-type/document-type.reducer'
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer'
import { NotificationTypeTypes } from '../../modules/entities/notification-type/notification-type.reducer'
import { HeadQuaterTypes } from '../../modules/entities/head-quater/head-quater.reducer'
import { CriteriaTypeTypes } from '../../modules/entities/criteria-type/criteria-type.reducer'
import { AnswerTypes } from '../../modules/entities/answer/answer.reducer'
import { CritetiaEvaluateTypes } from '../../modules/entities/critetia-evaluate/critetia-evaluate.reducer'
import { FullEvaluateTypes } from '../../modules/entities/full-evaluate/full-evaluate.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getTeacher, getTeachers, updateTeacher, deleteTeacher } from '../../modules/entities/teacher/teacher.sagas'
import { getTeacherDocument, getTeacherDocuments, updateTeacherDocument, deleteTeacherDocument } from '../../modules/entities/teacher-document/teacher-document.sagas'
import { getDocument, getDocuments, updateDocument, deleteDocument } from '../../modules/entities/document/document.sagas'
import { getDocumentType, getDocumentTypes, updateDocumentType, deleteDocumentType } from '../../modules/entities/document-type/document-type.sagas'
import { getNotification, getNotifications, updateNotification, deleteNotification } from '../../modules/entities/notification/notification.sagas'
import { getNotificationType, getNotificationTypes, updateNotificationType, deleteNotificationType } from '../../modules/entities/notification-type/notification-type.sagas'
import { getHeadQuater, getHeadQuaters, updateHeadQuater, deleteHeadQuater } from '../../modules/entities/head-quater/head-quater.sagas'
import { getCriteriaType, getCriteriaTypes, updateCriteriaType, deleteCriteriaType } from '../../modules/entities/criteria-type/criteria-type.sagas'
import { getAnswer, getAnswers, updateAnswer, deleteAnswer } from '../../modules/entities/answer/answer.sagas'
import { getCritetiaEvaluate, getCritetiaEvaluates, updateCritetiaEvaluate, deleteCritetiaEvaluate } from '../../modules/entities/critetia-evaluate/critetia-evaluate.sagas'
import { getFullEvaluate, getFullEvaluates, updateFullEvaluate, deleteFullEvaluate } from '../../modules/entities/full-evaluate/full-evaluate.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(TeacherTypes.TEACHER_REQUEST, getTeacher, api),
    takeLatest(TeacherTypes.TEACHER_ALL_REQUEST, getTeachers, api),
    takeLatest(TeacherTypes.TEACHER_UPDATE_REQUEST, updateTeacher, api),
    takeLatest(TeacherTypes.TEACHER_DELETE_REQUEST, deleteTeacher, api),

    takeLatest(TeacherDocumentTypes.TEACHER_DOCUMENT_REQUEST, getTeacherDocument, api),
    takeLatest(TeacherDocumentTypes.TEACHER_DOCUMENT_ALL_REQUEST, getTeacherDocuments, api),
    takeLatest(TeacherDocumentTypes.TEACHER_DOCUMENT_UPDATE_REQUEST, updateTeacherDocument, api),
    takeLatest(TeacherDocumentTypes.TEACHER_DOCUMENT_DELETE_REQUEST, deleteTeacherDocument, api),

    takeLatest(DocumentTypes.DOCUMENT_REQUEST, getDocument, api),
    takeLatest(DocumentTypes.DOCUMENT_ALL_REQUEST, getDocuments, api),
    takeLatest(DocumentTypes.DOCUMENT_UPDATE_REQUEST, updateDocument, api),
    takeLatest(DocumentTypes.DOCUMENT_DELETE_REQUEST, deleteDocument, api),

    takeLatest(DocumentTypeTypes.DOCUMENT_TYPE_REQUEST, getDocumentType, api),
    takeLatest(DocumentTypeTypes.DOCUMENT_TYPE_ALL_REQUEST, getDocumentTypes, api),
    takeLatest(DocumentTypeTypes.DOCUMENT_TYPE_UPDATE_REQUEST, updateDocumentType, api),
    takeLatest(DocumentTypeTypes.DOCUMENT_TYPE_DELETE_REQUEST, deleteDocumentType, api),

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, getNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, deleteNotification, api),

    takeLatest(NotificationTypeTypes.NOTIFICATION_TYPE_REQUEST, getNotificationType, api),
    takeLatest(NotificationTypeTypes.NOTIFICATION_TYPE_ALL_REQUEST, getNotificationTypes, api),
    takeLatest(NotificationTypeTypes.NOTIFICATION_TYPE_UPDATE_REQUEST, updateNotificationType, api),
    takeLatest(NotificationTypeTypes.NOTIFICATION_TYPE_DELETE_REQUEST, deleteNotificationType, api),

    takeLatest(HeadQuaterTypes.HEAD_QUATER_REQUEST, getHeadQuater, api),
    takeLatest(HeadQuaterTypes.HEAD_QUATER_ALL_REQUEST, getHeadQuaters, api),
    takeLatest(HeadQuaterTypes.HEAD_QUATER_UPDATE_REQUEST, updateHeadQuater, api),
    takeLatest(HeadQuaterTypes.HEAD_QUATER_DELETE_REQUEST, deleteHeadQuater, api),

    takeLatest(CriteriaTypeTypes.CRITERIA_TYPE_REQUEST, getCriteriaType, api),
    takeLatest(CriteriaTypeTypes.CRITERIA_TYPE_ALL_REQUEST, getCriteriaTypes, api),
    takeLatest(CriteriaTypeTypes.CRITERIA_TYPE_UPDATE_REQUEST, updateCriteriaType, api),
    takeLatest(CriteriaTypeTypes.CRITERIA_TYPE_DELETE_REQUEST, deleteCriteriaType, api),

    takeLatest(AnswerTypes.ANSWER_REQUEST, getAnswer, api),
    takeLatest(AnswerTypes.ANSWER_ALL_REQUEST, getAnswers, api),
    takeLatest(AnswerTypes.ANSWER_UPDATE_REQUEST, updateAnswer, api),
    takeLatest(AnswerTypes.ANSWER_DELETE_REQUEST, deleteAnswer, api),

    takeLatest(CritetiaEvaluateTypes.CRITETIA_EVALUATE_REQUEST, getCritetiaEvaluate, api),
    takeLatest(CritetiaEvaluateTypes.CRITETIA_EVALUATE_ALL_REQUEST, getCritetiaEvaluates, api),
    takeLatest(CritetiaEvaluateTypes.CRITETIA_EVALUATE_UPDATE_REQUEST, updateCritetiaEvaluate, api),
    takeLatest(CritetiaEvaluateTypes.CRITETIA_EVALUATE_DELETE_REQUEST, deleteCritetiaEvaluate, api),

    takeLatest(FullEvaluateTypes.FULL_EVALUATE_REQUEST, getFullEvaluate, api),
    takeLatest(FullEvaluateTypes.FULL_EVALUATE_ALL_REQUEST, getFullEvaluates, api),
    takeLatest(FullEvaluateTypes.FULL_EVALUATE_UPDATE_REQUEST, updateFullEvaluate, api),
    takeLatest(FullEvaluateTypes.FULL_EVALUATE_DELETE_REQUEST, deleteFullEvaluate, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
