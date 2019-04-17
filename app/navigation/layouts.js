import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'
// import { StorybookUIRoot } from '../../storybook'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import TeacherEntityScreen from '../modules/entities/teacher/teacher-entity-screen'
import TeacherEntityDetailScreen from '../modules/entities/teacher/teacher-entity-detail-screen'
import TeacherEntityEditScreen from '../modules/entities/teacher/teacher-entity-edit-screen'
import TeacherDocumentEntityScreen from '../modules/entities/teacher-document/teacher-document-entity-screen'
import TeacherDocumentEntityDetailScreen from '../modules/entities/teacher-document/teacher-document-entity-detail-screen'
import TeacherDocumentEntityEditScreen from '../modules/entities/teacher-document/teacher-document-entity-edit-screen'
import DocumentEntityScreen from '../modules/entities/document/document-entity-screen'
import DocumentEntityDetailScreen from '../modules/entities/document/document-entity-detail-screen'
import DocumentEntityEditScreen from '../modules/entities/document/document-entity-edit-screen'
import DocumentTypeEntityScreen from '../modules/entities/document-type/document-type-entity-screen'
import DocumentTypeEntityDetailScreen from '../modules/entities/document-type/document-type-entity-detail-screen'
import DocumentTypeEntityEditScreen from '../modules/entities/document-type/document-type-entity-edit-screen'
import NotificationEntityScreen from '../modules/entities/notification/notification-entity-screen'
import NotificationEntityDetailScreen from '../modules/entities/notification/notification-entity-detail-screen'
import NotificationEntityEditScreen from '../modules/entities/notification/notification-entity-edit-screen'
import NotificationTypeEntityScreen from '../modules/entities/notification-type/notification-type-entity-screen'
import NotificationTypeEntityDetailScreen from '../modules/entities/notification-type/notification-type-entity-detail-screen'
import NotificationTypeEntityEditScreen from '../modules/entities/notification-type/notification-type-entity-edit-screen'
import HeadQuaterEntityScreen from '../modules/entities/head-quater/head-quater-entity-screen'
import HeadQuaterEntityDetailScreen from '../modules/entities/head-quater/head-quater-entity-detail-screen'
import HeadQuaterEntityEditScreen from '../modules/entities/head-quater/head-quater-entity-edit-screen'
import CriteriaTypeEntityScreen from '../modules/entities/criteria-type/criteria-type-entity-screen'
import CriteriaTypeEntityDetailScreen from '../modules/entities/criteria-type/criteria-type-entity-detail-screen'
import CriteriaTypeEntityEditScreen from '../modules/entities/criteria-type/criteria-type-entity-edit-screen'
import AnswerEntityScreen from '../modules/entities/answer/answer-entity-screen'
import AnswerEntityDetailScreen from '../modules/entities/answer/answer-entity-detail-screen'
import AnswerEntityEditScreen from '../modules/entities/answer/answer-entity-edit-screen'
import CritetiaEvaluateEntityScreen from '../modules/entities/critetia-evaluate/critetia-evaluate-entity-screen'
import CritetiaEvaluateEntityDetailScreen from '../modules/entities/critetia-evaluate/critetia-evaluate-entity-detail-screen'
import CritetiaEvaluateEntityEditScreen from '../modules/entities/critetia-evaluate/critetia-evaluate-entity-edit-screen'
import FullEvaluateEntityScreen from '../modules/entities/full-evaluate/full-evaluate-entity-screen'
import FullEvaluateEntityDetailScreen from '../modules/entities/full-evaluate/full-evaluate-entity-detail-screen'
import FullEvaluateEntityEditScreen from '../modules/entities/full-evaluate/full-evaluate-entity-edit-screen'

// import by Tung
import Home from '../modules/trangChu/trangChu'
import DocumentStorage from '../modules/DocumentStorage/documentStorage'
import FindNotification from '../modules/FindNotification/findNotification'
import Evaluate from '../modules/Evaluate/evaluate'
import Members from '../modules/Members/members'
import UploadDocument from '../modules/UploadDocument/uploadDocument'
// end

// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const TEACHER_ENTITY_SCREEN = 'Nav.TeacherEntityScreen'
export const TEACHER_ENTITY_DETAIL_SCREEN = 'Nav.TeacherEntityDetailScreen'
export const TEACHER_ENTITY_EDIT_SCREEN = 'Nav.TeacherEntityEditScreen'
export const TEACHER_DOCUMENT_ENTITY_SCREEN = 'Nav.TeacherDocumentEntityScreen'
export const TEACHER_DOCUMENT_ENTITY_DETAIL_SCREEN = 'Nav.TeacherDocumentEntityDetailScreen'
export const TEACHER_DOCUMENT_ENTITY_EDIT_SCREEN = 'Nav.TeacherDocumentEntityEditScreen'
export const DOCUMENT_ENTITY_SCREEN = 'Nav.DocumentEntityScreen'
export const DOCUMENT_ENTITY_DETAIL_SCREEN = 'Nav.DocumentEntityDetailScreen'
export const DOCUMENT_ENTITY_EDIT_SCREEN = 'Nav.DocumentEntityEditScreen'
export const DOCUMENT_TYPE_ENTITY_SCREEN = 'Nav.DocumentTypeEntityScreen'
export const DOCUMENT_TYPE_ENTITY_DETAIL_SCREEN = 'Nav.DocumentTypeEntityDetailScreen'
export const DOCUMENT_TYPE_ENTITY_EDIT_SCREEN = 'Nav.DocumentTypeEntityEditScreen'
export const NOTIFICATION_ENTITY_SCREEN = 'Nav.NotificationEntityScreen'
export const NOTIFICATION_ENTITY_DETAIL_SCREEN = 'Nav.NotificationEntityDetailScreen'
export const NOTIFICATION_ENTITY_EDIT_SCREEN = 'Nav.NotificationEntityEditScreen'
export const NOTIFICATION_TYPE_ENTITY_SCREEN = 'Nav.NotificationTypeEntityScreen'
export const NOTIFICATION_TYPE_ENTITY_DETAIL_SCREEN = 'Nav.NotificationTypeEntityDetailScreen'
export const NOTIFICATION_TYPE_ENTITY_EDIT_SCREEN = 'Nav.NotificationTypeEntityEditScreen'
export const HEAD_QUATER_ENTITY_SCREEN = 'Nav.HeadQuaterEntityScreen'
export const HEAD_QUATER_ENTITY_DETAIL_SCREEN = 'Nav.HeadQuaterEntityDetailScreen'
export const HEAD_QUATER_ENTITY_EDIT_SCREEN = 'Nav.HeadQuaterEntityEditScreen'
export const CRITERIA_TYPE_ENTITY_SCREEN = 'Nav.CriteriaTypeEntityScreen'
export const CRITERIA_TYPE_ENTITY_DETAIL_SCREEN = 'Nav.CriteriaTypeEntityDetailScreen'
export const CRITERIA_TYPE_ENTITY_EDIT_SCREEN = 'Nav.CriteriaTypeEntityEditScreen'
export const ANSWER_ENTITY_SCREEN = 'Nav.AnswerEntityScreen'
export const ANSWER_ENTITY_DETAIL_SCREEN = 'Nav.AnswerEntityDetailScreen'
export const ANSWER_ENTITY_EDIT_SCREEN = 'Nav.AnswerEntityEditScreen'
export const CRITETIA_EVALUATE_ENTITY_SCREEN = 'Nav.CritetiaEvaluateEntityScreen'
export const CRITETIA_EVALUATE_ENTITY_DETAIL_SCREEN = 'Nav.CritetiaEvaluateEntityDetailScreen'
export const CRITETIA_EVALUATE_ENTITY_EDIT_SCREEN = 'Nav.CritetiaEvaluateEntityEditScreen'
export const FULL_EVALUATE_ENTITY_SCREEN = 'Nav.FullEvaluateEntityScreen'
export const FULL_EVALUATE_ENTITY_DETAIL_SCREEN = 'Nav.FullEvaluateEntityDetailScreen'
export const FULL_EVALUATE_ENTITY_EDIT_SCREEN = 'Nav.FullEvaluateEntityEditScreen'

// export by Tung
export const DOCUMENT_STORAGE = 'Nav.DocumentStorage'
export const HOME = 'Nav.trangChu'
export const FIND_NOTIFICATION = 'Nav.FindNotification'
export const EVALUATE = 'Nav.Evaluate'
export const MEMBERS = 'Nav.Members'
export const UPLOAD_DOCUMENT = 'Nav.UploadDocument'
// end

// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Welcome!',
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      testID: 'menuButton'
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/')             // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3)    // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponentWithRedux(TEACHER_ENTITY_SCREEN, () => TeacherEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TEACHER_ENTITY_DETAIL_SCREEN, () => TeacherEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TEACHER_ENTITY_EDIT_SCREEN, () => TeacherEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(TEACHER_DOCUMENT_ENTITY_SCREEN, () => TeacherDocumentEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TEACHER_DOCUMENT_ENTITY_DETAIL_SCREEN, () => TeacherDocumentEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TEACHER_DOCUMENT_ENTITY_EDIT_SCREEN, () => TeacherDocumentEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(DOCUMENT_ENTITY_SCREEN, () => DocumentEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(DOCUMENT_ENTITY_DETAIL_SCREEN, () => DocumentEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(DOCUMENT_ENTITY_EDIT_SCREEN, () => DocumentEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(DOCUMENT_TYPE_ENTITY_SCREEN, () => DocumentTypeEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(DOCUMENT_TYPE_ENTITY_DETAIL_SCREEN, () => DocumentTypeEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(DOCUMENT_TYPE_ENTITY_EDIT_SCREEN, () => DocumentTypeEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_ENTITY_SCREEN, () => NotificationEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_ENTITY_DETAIL_SCREEN, () => NotificationEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_ENTITY_EDIT_SCREEN, () => NotificationEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_TYPE_ENTITY_SCREEN, () => NotificationTypeEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_TYPE_ENTITY_DETAIL_SCREEN, () => NotificationTypeEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_TYPE_ENTITY_EDIT_SCREEN, () => NotificationTypeEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(HEAD_QUATER_ENTITY_SCREEN, () => HeadQuaterEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(HEAD_QUATER_ENTITY_DETAIL_SCREEN, () => HeadQuaterEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(HEAD_QUATER_ENTITY_EDIT_SCREEN, () => HeadQuaterEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CRITERIA_TYPE_ENTITY_SCREEN, () => CriteriaTypeEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CRITERIA_TYPE_ENTITY_DETAIL_SCREEN, () => CriteriaTypeEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CRITERIA_TYPE_ENTITY_EDIT_SCREEN, () => CriteriaTypeEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(ANSWER_ENTITY_SCREEN, () => AnswerEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(ANSWER_ENTITY_DETAIL_SCREEN, () => AnswerEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(ANSWER_ENTITY_EDIT_SCREEN, () => AnswerEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CRITETIA_EVALUATE_ENTITY_SCREEN, () => CritetiaEvaluateEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CRITETIA_EVALUATE_ENTITY_DETAIL_SCREEN, () => CritetiaEvaluateEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CRITETIA_EVALUATE_ENTITY_EDIT_SCREEN, () => CritetiaEvaluateEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(FULL_EVALUATE_ENTITY_SCREEN, () => FullEvaluateEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(FULL_EVALUATE_ENTITY_DETAIL_SCREEN, () => FullEvaluateEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(FULL_EVALUATE_ENTITY_EDIT_SCREEN, () => FullEvaluateEntityEditScreen, Provider, store)

  // Navigation by Tung
  Navigation.registerComponentWithRedux(DOCUMENT_STORAGE, () => DocumentStorage, Provider, store)
  Navigation.registerComponentWithRedux(HOME, () => Home, Provider, store)
  Navigation.registerComponentWithRedux(FIND_NOTIFICATION, () => FindNotification, Provider, store)
  Navigation.registerComponentWithRedux(EVALUATE, () => Evaluate, Provider, store)
  Navigation.registerComponentWithRedux(MEMBERS, () => Members, Provider, store)
  Navigation.registerComponentWithRedux(UPLOAD_DOCUMENT, () => UploadDocument, Provider, store)
  // end

  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Sign Up',
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Forgot Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Change Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Settings',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})

export const teacherEntityScreen = () => Navigation.push('center', {
  component: {
    name: TEACHER_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Teachers',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const teacherEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: TEACHER_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Teachers',
          color: Colors.snow
        }
      }
    }
  }
})

export const teacherEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: TEACHER_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Teachers',
          color: Colors.snow
        }
      }
    }
  }
})

export const teacherDocumentEntityScreen = () => Navigation.push('center', {
  component: {
    name: TEACHER_DOCUMENT_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TeacherDocuments',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const teacherDocumentEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: TEACHER_DOCUMENT_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TeacherDocuments',
          color: Colors.snow
        }
      }
    }
  }
})

export const teacherDocumentEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: TEACHER_DOCUMENT_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TeacherDocuments',
          color: Colors.snow
        }
      }
    }
  }
})

export const documentEntityScreen = () => Navigation.push('center', {
  component: {
    name: DOCUMENT_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Documents',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const documentEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: DOCUMENT_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Documents',
          color: Colors.snow
        }
      }
    }
  }
})

export const documentEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: DOCUMENT_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Documents',
          color: Colors.snow
        }
      }
    }
  }
})

export const documentTypeEntityScreen = () => Navigation.push('center', {
  component: {
    name: DOCUMENT_TYPE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'DocumentTypes',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const documentTypeEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: DOCUMENT_TYPE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'DocumentTypes',
          color: Colors.snow
        }
      }
    }
  }
})

export const documentTypeEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: DOCUMENT_TYPE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'DocumentTypes',
          color: Colors.snow
        }
      }
    }
  }
})

export const notificationEntityScreen = () => Navigation.push('center', {
  component: {
    name: NOTIFICATION_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Notifications',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const notificationEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: NOTIFICATION_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Notifications',
          color: Colors.snow
        }
      }
    }
  }
})

export const notificationEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: NOTIFICATION_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Notifications',
          color: Colors.snow
        }
      }
    }
  }
})

export const notificationTypeEntityScreen = () => Navigation.push('center', {
  component: {
    name: NOTIFICATION_TYPE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'NotificationTypes',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const notificationTypeEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: NOTIFICATION_TYPE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'NotificationTypes',
          color: Colors.snow
        }
      }
    }
  }
})

export const notificationTypeEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: NOTIFICATION_TYPE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'NotificationTypes',
          color: Colors.snow
        }
      }
    }
  }
})

export const headQuaterEntityScreen = () => Navigation.push('center', {
  component: {
    name: HEAD_QUATER_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'HeadQuaters',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const headQuaterEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: HEAD_QUATER_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'HeadQuaters',
          color: Colors.snow
        }
      }
    }
  }
})

export const headQuaterEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: HEAD_QUATER_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'HeadQuaters',
          color: Colors.snow
        }
      }
    }
  }
})

export const criteriaTypeEntityScreen = () => Navigation.push('center', {
  component: {
    name: CRITERIA_TYPE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'CriteriaTypes',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const criteriaTypeEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CRITERIA_TYPE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CriteriaTypes',
          color: Colors.snow
        }
      }
    }
  }
})

export const criteriaTypeEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CRITERIA_TYPE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CriteriaTypes',
          color: Colors.snow
        }
      }
    }
  }
})

export const answerEntityScreen = () => Navigation.push('center', {
  component: {
    name: ANSWER_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Answers',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const answerEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: ANSWER_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Answers',
          color: Colors.snow
        }
      }
    }
  }
})

export const answerEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: ANSWER_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Answers',
          color: Colors.snow
        }
      }
    }
  }
})

export const critetiaEvaluateEntityScreen = () => Navigation.push('center', {
  component: {
    name: CRITETIA_EVALUATE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'CritetiaEvaluates',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const critetiaEvaluateEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CRITETIA_EVALUATE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CritetiaEvaluates',
          color: Colors.snow
        }
      }
    }
  }
})

export const critetiaEvaluateEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CRITETIA_EVALUATE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CritetiaEvaluates',
          color: Colors.snow
        }
      }
    }
  }
})

export const fullEvaluateEntityScreen = () => Navigation.push('center', {
  component: {
    name: FULL_EVALUATE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'FullEvaluates',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const fullEvaluateEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: FULL_EVALUATE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'FullEvaluates',
          color: Colors.snow
        }
      }
    }
  }
})

export const fullEvaluateEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: FULL_EVALUATE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'FullEvaluates',
          color: Colors.snow
        }
      }
    }
  }
})

//export by Tung

export const documentStorage = (data) => Navigation.push('center', {
  component: {
    name: DOCUMENT_STORAGE,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Tài liệu dạy học',
          color: Colors.snow
        }
      }
    }
  }
})
export const home = (data) => Navigation.push('center', {
  component: {
    name: HOME,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Trang chủ',
          color: Colors.snow
        }
      }
    }
  }
})

export const findNotification = (data) => Navigation.push('center', {
  component: {
    name: FIND_NOTIFICATION,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Văn bản',
          color: Colors.snow
        }
      }
    }
  }
})

export const evaluate = (data) => Navigation.push('center', {
  component: {
    name: EVALUATE,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Đánh giá theo thông tư 20',
          color: Colors.snow
        }
      }
    }
  }
})

export const members = (data) => Navigation.push('center', {
  component: {
    name: MEMBERS,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Giáo viên',
          color: Colors.snow
        }
      }
    }
  }
})

export const uploadDocument = (data) => Navigation.push('center', {
  component: {
    name: UPLOAD_DOCUMENT,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Upload document',
          color: Colors.snow
        }
      }
    }
  }
})

//end

// ignite-jhipster-navigation-method-needle
