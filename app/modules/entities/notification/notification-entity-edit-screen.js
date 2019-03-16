import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NotificationActions from './notification.reducer'
import HeadQuaterActions from '../head-quater/head-quater.reducer'
import NotificationTypeActions from '../notification-type/notification-type.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { notificationEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './notification-entity-edit-screen-style'

let Form = t.form.Form
const Status = t.enums({
  EXIST: 'EXIST',
  DELETED: 'DELETED'
})

class NotificationEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.maybe(t.String),
        description: t.maybe(t.String),
        uRL: t.maybe(t.String),
        status: t.maybe(Status),
        headQuaterId: this.getHeadQuaters(),
        notificationTypeId: this.getNotificationTypes()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          headQuaterId: {
            testID: 'headQuaterIdInput',
            label: 'HeadQuater'
          },
          notificationTypeId: {
            testID: 'notificationTypeIdInput',
            label: 'NotificationType'
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('description').refs.input.focus(),
            testID: 'nameInput'
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('uRL').refs.input.focus(),
            testID: 'descriptionInput'
          },
          uRL: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'uRLInput'
          },
          status: {
            testID: 'statusInput'
          }
        }
      },
      success: false,
      notification: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getNotification(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllHeadQuaters()
    this.props.getAllNotificationTypes()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.notification && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.notification)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllNotifications({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.notification.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: notificationEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      name: value.name || null,
      description: value.description || null,
      uRL: value.uRL || null,
      status: value.status || null,
      headQuaterId: (value.headQuater && value.headQuater.id) ? value.headQuater.id : null,
      notificationTypeId: (value.notificationType && value.notificationType.id) ? value.notificationType.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      name: value.name || null,
      description: value.description || null,
      uRL: value.uRL || null,
      status: value.status || null
    }
    if (value.headQuaterId) {
      entity.headQuater = { id: value.headQuaterId }
    }
    if (value.notificationTypeId) {
      entity.notificationType = { id: value.notificationTypeId }
    }
    return entity
  }

  getHeadQuaters = () => {
    const headQuaters = {}
    this.props.headQuaters.forEach(headQuater => {
      headQuaters[headQuater.id] = headQuater.id ? headQuater.id.toString() : headQuater.id.toString()
    })
    return t.maybe(t.enums(headQuaters))
  }
  getNotificationTypes = () => {
    const notificationTypes = {}
    this.props.notificationTypes.forEach(notificationType => {
      notificationTypes[notificationType.id] = notificationType.id ? notificationType.id.toString() : notificationType.id.toString()
    })
    return t.maybe(t.enums(notificationTypes))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const notification = this.refs.form.getValue()
    if (notification) { // if validation fails, value will be null
      this.props.updateNotification(this.formValueToEntity(notification))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headQuaters: state.headQuaters.headQuaters || [],
    notificationTypes: state.notificationTypes.notificationTypes || [],
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingOne,
    updating: state.notifications.updating,
    error: state.notifications.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHeadQuaters: (options) => dispatch(HeadQuaterActions.headQuaterAllRequest(options)),
    getAllNotificationTypes: (options) => dispatch(NotificationTypeActions.notificationTypeAllRequest(options)),
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    updateNotification: (notification) => dispatch(NotificationActions.notificationUpdateRequest(notification))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEntityEditScreen)
