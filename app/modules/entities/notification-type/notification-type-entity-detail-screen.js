import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { notificationTypeEntityEditScreen } from '../../../navigation/layouts'

import NotificationTypeActions from './notification-type.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './notification-type-entity-detail-screen-style'

class NotificationTypeEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      notificationType: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getNotificationType(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.notificationType) {
      this.setState({ notificationType: newProps.notificationType })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllNotificationTypes()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete NotificationType?',
      'Are you sure you want to delete the NotificationType?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteNotificationType(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.notificationType.id}</Text>
        <Text testID='content'>Content: {this.state.notificationType.content}</Text>
        <RoundedButton text='Edit' onPress={notificationTypeEntityEditScreen.bind(this, { entityId: this.state.notificationType.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notificationType: state.notificationTypes.notificationType,
    deleting: state.notificationTypes.deleting,
    errorDeleting: state.notificationTypes.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationType: (id) => dispatch(NotificationTypeActions.notificationTypeRequest(id)),
    getAllNotificationTypes: (options) => dispatch(NotificationTypeActions.notificationTypeAllRequest(options)),
    deleteNotificationType: (id) => dispatch(NotificationTypeActions.notificationTypeDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTypeEntityDetailScreen)
