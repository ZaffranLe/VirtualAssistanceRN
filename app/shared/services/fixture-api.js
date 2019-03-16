export default {
  // Functions return fixtures

  // entity fixtures

  updateTeacher: (teacher) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTeacher.json')
    }
  },
  getTeachers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTeachers.json')
    }
  },
  getTeacher: (teacherId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTeacher.json')
    }
  },
  deleteTeacher: (teacherId) => {
    return {
      ok: true
    }
  },

  updateTeacherDocument: (teacherDocument) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTeacherDocument.json')
    }
  },
  getTeacherDocuments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTeacherDocuments.json')
    }
  },
  getTeacherDocument: (teacherDocumentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTeacherDocument.json')
    }
  },
  deleteTeacherDocument: (teacherDocumentId) => {
    return {
      ok: true
    }
  },

  updateDocument: (document) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateDocument.json')
    }
  },
  getDocuments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getDocuments.json')
    }
  },
  getDocument: (documentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getDocument.json')
    }
  },
  deleteDocument: (documentId) => {
    return {
      ok: true
    }
  },

  updateDocumentType: (documentType) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateDocumentType.json')
    }
  },
  getDocumentTypes: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getDocumentTypes.json')
    }
  },
  getDocumentType: (documentTypeId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getDocumentType.json')
    }
  },
  deleteDocumentType: (documentTypeId) => {
    return {
      ok: true
    }
  },

  updateNotification: (notification) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateNotification.json')
    }
  },
  getNotifications: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getNotifications.json')
    }
  },
  getNotification: (notificationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getNotification.json')
    }
  },
  deleteNotification: (notificationId) => {
    return {
      ok: true
    }
  },

  updateNotificationType: (notificationType) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateNotificationType.json')
    }
  },
  getNotificationTypes: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getNotificationTypes.json')
    }
  },
  getNotificationType: (notificationTypeId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getNotificationType.json')
    }
  },
  deleteNotificationType: (notificationTypeId) => {
    return {
      ok: true
    }
  },

  updateHeadQuater: (headQuater) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateHeadQuater.json')
    }
  },
  getHeadQuaters: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getHeadQuaters.json')
    }
  },
  getHeadQuater: (headQuaterId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getHeadQuater.json')
    }
  },
  deleteHeadQuater: (headQuaterId) => {
    return {
      ok: true
    }
  },

  updateCriteriaType: (criteriaType) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCriteriaType.json')
    }
  },
  getCriteriaTypes: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCriteriaTypes.json')
    }
  },
  getCriteriaType: (criteriaTypeId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCriteriaType.json')
    }
  },
  deleteCriteriaType: (criteriaTypeId) => {
    return {
      ok: true
    }
  },

  updateAnswer: (answer) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateAnswer.json')
    }
  },
  getAnswers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getAnswers.json')
    }
  },
  getAnswer: (answerId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getAnswer.json')
    }
  },
  deleteAnswer: (answerId) => {
    return {
      ok: true
    }
  },

  updateCritetiaEvaluate: (critetiaEvaluate) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCritetiaEvaluate.json')
    }
  },
  getCritetiaEvaluates: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCritetiaEvaluates.json')
    }
  },
  getCritetiaEvaluate: (critetiaEvaluateId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCritetiaEvaluate.json')
    }
  },
  deleteCritetiaEvaluate: (critetiaEvaluateId) => {
    return {
      ok: true
    }
  },

  updateFullEvaluate: (fullEvaluate) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateFullEvaluate.json')
    }
  },
  getFullEvaluates: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getFullEvaluates.json')
    }
  },
  getFullEvaluate: (fullEvaluateId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getFullEvaluate.json')
    }
  },
  deleteFullEvaluate: (fullEvaluateId) => {
    return {
      ok: true
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
