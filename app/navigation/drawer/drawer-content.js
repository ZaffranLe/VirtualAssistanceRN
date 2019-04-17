import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { loginScreen, registerScreen, forgotPasswordScreen, changePasswordScreen, settingsScreen, entitiesScreen, documentStorage, evaluate, findNotification, members, uploadDocument,home } from '../layouts'
import { connect } from 'react-redux'

import styles from './drawer-content.styles'
import { Images } from '../../shared/themes'
import DrawerButton from './drawer-button'
import LoginActions from '../../modules/login/login.reducer'
import { isLoggedIn } from '../../shared/reducers/account.reducer'

class DrawerContent extends Component {
  constructor (context, props) {
    super(context, props)
    Navigation.events().bindComponent(this)
  }

  hideSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.hideSideMenu()
    })
  }

  handlePressLogin = () => {
    this.hideSideMenu()
    loginScreen()
  }
  handlePressRegister = () => {
    this.hideSideMenu()
    registerScreen()
  }
  handlePressForgotPassword = () => {
    this.hideSideMenu()
    forgotPasswordScreen()
  }
  handlePressSettings = () => {
    this.hideSideMenu()
    settingsScreen()
  }
  handlePressChangePassword = () => {
    this.hideSideMenu()
    changePasswordScreen()
  }
  handlePressEntities = () => {
    this.hideSideMenu()
    entitiesScreen()
  }
  handlePressLogout = () => {
    this.hideSideMenu()
    this.props.logout()
  }
  // handle change page by Tung
    handlePressDocumentStorage = () => {
      this.hideSideMenu()
      documentStorage()
    }
    //home thanh code
    handlePressHome = () => {
      this.hideSideMenu()
      home()
    }
    handlePressEvaluate = () => {
      this.hideSideMenu()
      evaluate()
    }
    handlePressFindNotification = () => {
      this.hideSideMenu()
      findNotification()
    }
    handlePressMembers = () => {
      this.hideSideMenu()
      members()
    }
    handlePressUploadDocument = () => {
      this.hideSideMenu()
      uploadDocument()
    }
    // end
  render () {
    return (
      <ScrollView style={styles.container}>
        <Image testID='drawerLogo' source={Images.logoJhipster} style={styles.logo} />
        {!this.props.loggedIn && (<DrawerButton testID='loginDrawerButton' text='Login' onPress={this.handlePressLogin} />)}
        {!this.props.loggedIn && (<DrawerButton testID='registerDrawerButton' text='Register' onPress={this.handlePressRegister} />)}
        {!this.props.loggedIn && (<DrawerButton testID='forgotPasswordDrawerButton' text='Forgot Password' onPress={this.handlePressForgotPassword} />)}
        {/* {this.props.loggedIn && (<DrawerButton testID='entitiesDrawerButton' text='Entities' onPress={this.handlePressEntities} />)} */}
        {/* create menu sidebar by Tung */}
        {this.props.loggedIn && (<DrawerButton testID='HomeDrawerButton' text='Trang chủ' onPress={this.handlePressHome} />)}
        {this.props.loggedIn && (<DrawerButton testID='documentStorageDrawerButton' text='Tài liệu dạy học' onPress={this.handlePressDocumentStorage} />)}
        {this.props.loggedIn && (<DrawerButton testID='uploadDocumentDrawerButton' text='Hồ sơ giáo viên' onPress={this.handlePressUploadDocument} />)}
        {this.props.loggedIn && (<DrawerButton testID='evaluateDrawerButton' text='Đánh giá giáo viên theo TT20 ' onPress={this.handlePressEvaluate} />)}
        {this.props.loggedIn && (<DrawerButton testID='membersDrawerButton' text='Danh sách giáo viên' onPress={this.handlePressMembers} />)}
        {this.props.loggedIn && (<DrawerButton testID='findNotificationDrawerButton' text='Văn bản' onPress={this.handlePressFindNotification} />)}
        {/* end */}
        {/* {this.props.loggedIn && (<DrawerButton testID='settingsDrawerButton' text='Settings' onPress={this.handlePressSettings} />)} */}
        {/* {this.props.loggedIn && (<DrawerButton testID='changePasswordDrawerButton' text='Change Password' onPress={this.handlePressChangePassword} />)} */}
        {this.props.loggedIn && (<DrawerButton testID='logoutDrawerButton' text='Logout' onPress={this.handlePressLogout} />)}
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
