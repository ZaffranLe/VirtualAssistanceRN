import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NotificationTypeActions from './notification-type.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { notificationTypeEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './notification-type-entity-edit-screen-style'

let Form = t.form.Form

class NotificationTypeEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        content: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          content: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'contentInput'
          }
        }
      },
      success: false,
      notificationType: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getNotificationType(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.notificationType && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.notificationType)
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
        this.props.getAllNotificationTypes({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.notificationType.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: notificationTypeEntityDetailScreen.bind(this, { entityId })
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
      content: value.content || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      content: value.content || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const notificationType = this.refs.form.getValue()
    if (notificationType) { // if validation fails, value will be null
      this.props.updateNotificationType(this.formValueToEntity(notificationType))
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
    notificationType: state.notificationTypes.notificationType,
    fetching: state.notificationTypes.fetchingOne,
    updating: state.notificationTypes.updating,
    error: state.notificationTypes.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationType: (id) => dispatch(NotificationTypeActions.notificationTypeRequest(id)),
    getAllNotificationTypes: (options) => dispatch(NotificationTypeActions.notificationTypeAllRequest(options)),
    updateNotificationType: (notificationType) => dispatch(NotificationTypeActions.notificationTypeUpdateRequest(notificationType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTypeEntityEditScreen)
