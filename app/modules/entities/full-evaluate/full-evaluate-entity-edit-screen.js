import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import FullEvaluateActions from './full-evaluate.reducer'
import TeacherActions from '../teacher/teacher.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { fullEvaluateEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './full-evaluate-entity-edit-screen-style'

let Form = t.form.Form

class FullEvaluateEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        description: t.maybe(t.String),
        teacherId: this.getTeachers()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          teacherId: {
            testID: 'teacherIdInput',
            label: 'Teacher'
          },
          description: {
            testID: 'descriptionInput'
          }
        }
      },
      success: false,
      fullEvaluate: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getFullEvaluate(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllTeachers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fullEvaluate && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.fullEvaluate)
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
        this.props.getAllFullEvaluates({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.fullEvaluate.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: fullEvaluateEntityDetailScreen.bind(this, { entityId })
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
      description: value.description || null,
      teacherId: (value.teacher && value.teacher.id) ? value.teacher.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      description: value.description || null
    }
    if (value.teacherId) {
      entity.teacher = { id: value.teacherId }
    }
    return entity
  }

  getTeachers = () => {
    const teachers = {}
    this.props.teachers.forEach(teacher => {
      teachers[teacher.id] = teacher.id ? teacher.id.toString() : teacher.id.toString()
    })
    return t.maybe(t.enums(teachers))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const fullEvaluate = this.refs.form.getValue()
    if (fullEvaluate) { // if validation fails, value will be null
      this.props.updateFullEvaluate(this.formValueToEntity(fullEvaluate))
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
    teachers: state.teachers.teachers || [],
    fullEvaluate: state.fullEvaluates.fullEvaluate,
    fetching: state.fullEvaluates.fetchingOne,
    updating: state.fullEvaluates.updating,
    error: state.fullEvaluates.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTeachers: (options) => dispatch(TeacherActions.teacherAllRequest(options)),
    getFullEvaluate: (id) => dispatch(FullEvaluateActions.fullEvaluateRequest(id)),
    getAllFullEvaluates: (options) => dispatch(FullEvaluateActions.fullEvaluateAllRequest(options)),
    updateFullEvaluate: (fullEvaluate) => dispatch(FullEvaluateActions.fullEvaluateUpdateRequest(fullEvaluate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullEvaluateEntityEditScreen)
