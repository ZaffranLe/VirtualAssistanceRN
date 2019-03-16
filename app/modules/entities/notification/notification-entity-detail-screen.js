import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { notificationEntityEditScreen } from '../../../navigation/layouts'

import NotificationActions from './notification.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './notification-entity-detail-screen-style'

class NotificationEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      notification: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getNotification(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.notification) {
      this.setState({ notification: newProps.notification })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllNotifications()
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
      'Delete Notification?',
      'Are you sure you want to delete the Notification?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteNotification(this.props.data.entityId)
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
        <Text>ID: {this.state.notification.id}</Text>
        <Text testID='name'>Name: {this.state.notification.name}</Text>
        <Text testID='description'>Description: {this.state.notification.description}</Text>
        <Text testID='uRL'>URL: {this.state.notification.uRL}</Text>
        <Text testID='status'>Status: {this.state.notification.status}</Text>
        <RoundedButton text='Edit' onPress={notificationEntityEditScreen.bind(this, { entityId: this.state.notification.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification,
    deleting: state.notifications.deleting,
    errorDeleting: state.notifications.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    deleteNotification: (id) => dispatch(NotificationActions.notificationDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEntityDetailScreen)
