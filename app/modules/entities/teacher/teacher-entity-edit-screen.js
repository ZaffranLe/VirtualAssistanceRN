import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TeacherActions from './teacher.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { teacherEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './teacher-entity-edit-screen-style'

let Form = t.form.Form
const TeacherLevel = t.enums({
  TEACHER: 'TEACHER',
  DEAN: 'DEAN',
  HIGHLEVEL: 'HIGHLEVEL'
})
const Status = t.enums({
  EXIST: 'EXIST',
  DELETED: 'DELETED'
})

class TeacherEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        identityNumber: t.maybe(t.String),
        fullName: t.maybe(t.String),
        phone: t.maybe(t.String),
       
        address: t.maybe(t.String),
        email: t.maybe(t.String),
        password: t.maybe(t.String),
        dataStorage: t.maybe(t.Number),
        usedStorage: t.maybe(t.Number),
        level: t.maybe(TeacherLevel),
        status: t.maybe(Status),
        avatar: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          identityNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('fullName').refs.input.focus(),
            testID: 'identityNumberInput'
          },
          fullName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('phone').refs.input.focus(),
            testID: 'fullNameInput'
          },
          phone: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('doB').refs.input.focus(),
            testID: 'phoneInput'
          },
          doB: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('address').refs.input.focus(),
            testID: 'doBInput'
          },
          address: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus(),
            testID: 'addressInput'
          },
          email: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus(),
            testID: 'emailInput'
          },
          password: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('dataStorage').refs.input.focus(),
            testID: 'passwordInput'
          },
          dataStorage: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('usedStorage').refs.input.focus(),
            testID: 'dataStorageInput'
          },
          usedStorage: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('level').refs.input.focus(),
            testID: 'usedStorageInput'
          },
          level: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'levelInput'
          },
          status: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('avatar').refs.input.focus(),
            testID: 'statusInput'
          },
          avatar: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'avatarInput'
          }
        }
      },
      success: false,
      teacher: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTeacher(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.teacher && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.teacher)
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
        this.props.getAllTeachers({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.teacher.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: teacherEntityDetailScreen.bind(this, { entityId })
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
      identityNumber: value.identityNumber || null,
      fullName: value.fullName || null,
      phone: value.phone || null,
     
      address: value.address || null,
      email: value.email || null,
      password: value.password || null,
      dataStorage: value.dataStorage || null,
      usedStorage: value.usedStorage || null,
      level: value.level || null,
      status: value.status || null,
      avatar: value.avatar || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      identityNumber: value.identityNumber || null,
      fullName: value.fullName || null,
      phone: value.phone || null,
     
      address: value.address || null,
      email: value.email || null,
      password: value.password || null,
      dataStorage: value.dataStorage || null,
      usedStorage: value.usedStorage || null,
      level: value.level || null,
      status: value.status || null,
      avatar: value.avatar || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const teacher = this.refs.form.getValue()
    if (teacher) { // if validation fails, value will be null
      this.props.updateTeacher(this.formValueToEntity(teacher))
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
    teacher: state.teachers.teacher,
    fetching: state.teachers.fetchingOne,
    updating: state.teachers.updating,
    error: state.teachers.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacher: (id) => dispatch(TeacherActions.teacherRequest(id)),
    getAllTeachers: (options) => dispatch(TeacherActions.teacherAllRequest(options)),
    updateTeacher: (teacher) => dispatch(TeacherActions.teacherUpdateRequest(teacher))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherEntityEditScreen)
