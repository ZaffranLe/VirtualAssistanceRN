// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}})

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', {currentPassword, newPassword}, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}})

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getTeacher = (teacherId) => api.get('api/teachers/' + teacherId)
  const getTeachers = (options) => api.get('api/teachers', options)
  const createTeacher = (teacher) => api.post('api/teachers', teacher)
  const updateTeacher = (teacher) => api.put('api/teachers', teacher)
  const deleteTeacher = (teacherId) => api.delete('api/teachers/' + teacherId)

  const getTeacherDocument = (teacherDocumentId) => api.get('api/teacher-documents/' + teacherDocumentId)
  const getTeacherDocuments = (options) => api.get('api/teacher-documents', options)
  const createTeacherDocument = (teacherDocument) => api.post('api/teacher-documents', teacherDocument)
  const updateTeacherDocument = (teacherDocument) => api.put('api/teacher-documents', teacherDocument)
  const deleteTeacherDocument = (teacherDocumentId) => api.delete('api/teacher-documents/' + teacherDocumentId)

  const getDocument = (documentId) => api.get('api/documents/' + documentId)
  const getDocuments = (options) => api.get('api/documents', options)
  const createDocument = (document) => api.post('api/documents', document)
  const updateDocument = (document) => api.put('api/documents', document)
  const deleteDocument = (documentId) => api.delete('api/documents/' + documentId)

  const getDocumentType = (documentTypeId) => api.get('api/document-types/' + documentTypeId)
  const getDocumentTypes = (options) => api.get('api/document-types', options)
  const createDocumentType = (documentType) => api.post('api/document-types', documentType)
  const updateDocumentType = (documentType) => api.put('api/document-types', documentType)
  const deleteDocumentType = (documentTypeId) => api.delete('api/document-types/' + documentTypeId)

  const getNotification = (notificationId) => api.get('api/notifications/' + notificationId)
  const getNotifications = (options) => api.get('api/notifications', options)
  const createNotification = (notification) => api.post('api/notifications', notification)
  const updateNotification = (notification) => api.put('api/notifications', notification)
  const deleteNotification = (notificationId) => api.delete('api/notifications/' + notificationId)

  const getNotificationType = (notificationTypeId) => api.get('api/notification-types/' + notificationTypeId)
  const getNotificationTypes = (options) => api.get('api/notification-types', options)
  const createNotificationType = (notificationType) => api.post('api/notification-types', notificationType)
  const updateNotificationType = (notificationType) => api.put('api/notification-types', notificationType)
  const deleteNotificationType = (notificationTypeId) => api.delete('api/notification-types/' + notificationTypeId)

  const getHeadQuater = (headQuaterId) => api.get('api/head-quaters/' + headQuaterId)
  const getHeadQuaters = (options) => api.get('api/head-quaters', options)
  const createHeadQuater = (headQuater) => api.post('api/head-quaters', headQuater)
  const updateHeadQuater = (headQuater) => api.put('api/head-quaters', headQuater)
  const deleteHeadQuater = (headQuaterId) => api.delete('api/head-quaters/' + headQuaterId)

  const getCriteriaType = (criteriaTypeId) => api.get('api/criteria-types/' + criteriaTypeId)
  const getCriteriaTypes = (options) => api.get('api/criteria-types', options)
  const createCriteriaType = (criteriaType) => api.post('api/criteria-types', criteriaType)
  const updateCriteriaType = (criteriaType) => api.put('api/criteria-types', criteriaType)
  const deleteCriteriaType = (criteriaTypeId) => api.delete('api/criteria-types/' + criteriaTypeId)

  const getAnswer = (answerId) => api.get('api/answers/' + answerId)
  const getAnswers = (options) => api.get('api/answers', options)
  const createAnswer = (answer) => api.post('api/answers', answer)
  const updateAnswer = (answer) => api.put('api/answers', answer)
  const deleteAnswer = (answerId) => api.delete('api/answers/' + answerId)

  const getCritetiaEvaluate = (critetiaEvaluateId) => api.get('api/critetia-evaluates/' + critetiaEvaluateId)
  const getCritetiaEvaluates = (options) => api.get('api/critetia-evaluates', options)
  const createCritetiaEvaluate = (critetiaEvaluate) => api.post('api/critetia-evaluates', critetiaEvaluate)
  const updateCritetiaEvaluate = (critetiaEvaluate) => api.put('api/critetia-evaluates', critetiaEvaluate)
  const deleteCritetiaEvaluate = (critetiaEvaluateId) => api.delete('api/critetia-evaluates/' + critetiaEvaluateId)

  const getFullEvaluate = (fullEvaluateId) => api.get('api/full-evaluates/' + fullEvaluateId)
  const getFullEvaluates = (options) => api.get('api/full-evaluates', options)
  const createFullEvaluate = (fullEvaluate) => api.post('api/full-evaluates', fullEvaluate)
  const updateFullEvaluate = (fullEvaluate) => api.put('api/full-evaluates', fullEvaluate)
  const deleteFullEvaluate = (fullEvaluateId) => api.delete('api/full-evaluates/' + fullEvaluateId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createTeacher,
    updateTeacher,
    getTeachers,
    getTeacher,
    deleteTeacher,

    createTeacherDocument,
    updateTeacherDocument,
    getTeacherDocuments,
    getTeacherDocument,
    deleteTeacherDocument,

    createDocument,
    updateDocument,
    getDocuments,
    getDocument,
    deleteDocument,

    createDocumentType,
    updateDocumentType,
    getDocumentTypes,
    getDocumentType,
    deleteDocumentType,

    createNotification,
    updateNotification,
    getNotifications,
    getNotification,
    deleteNotification,

    createNotificationType,
    updateNotificationType,
    getNotificationTypes,
    getNotificationType,
    deleteNotificationType,

    createHeadQuater,
    updateHeadQuater,
    getHeadQuaters,
    getHeadQuater,
    deleteHeadQuater,

    createCriteriaType,
    updateCriteriaType,
    getCriteriaTypes,
    getCriteriaType,
    deleteCriteriaType,

    createAnswer,
    updateAnswer,
    getAnswers,
    getAnswer,
    deleteAnswer,

    createCritetiaEvaluate,
    updateCritetiaEvaluate,
    getCritetiaEvaluates,
    getCritetiaEvaluate,
    deleteCritetiaEvaluate,

    createFullEvaluate,
    updateFullEvaluate,
    getFullEvaluates,
    getFullEvaluate,
    deleteFullEvaluate,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
