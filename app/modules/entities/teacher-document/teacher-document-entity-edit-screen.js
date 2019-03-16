import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TeacherDocumentActions from './teacher-document.reducer'
import TeacherActions from '../teacher/teacher.reducer'
import DocumentActions from '../document/document.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { teacherDocumentEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './teacher-document-entity-edit-screen-style'

let Form = t.form.Form
const Role = t.enums({
  OWNER: 'OWNER',
  SHARED: 'SHARED'
})

class TeacherDocumentEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        role: t.maybe(Role),
        teacherId: this.getTeachers(),
        documentId: this.getDocuments()
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
          documentId: {
            testID: 'documentIdInput',
            label: 'Document'
          },
          role: {
            testID: 'roleInput'
          }
        }
      },
      success: false,
      teacherDocument: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTeacherDocument(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllTeachers()
    this.props.getAllDocuments()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.teacherDocument && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.teacherDocument)
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
        this.props.getAllTeacherDocuments({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.teacherDocument.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: teacherDocumentEntityDetailScreen.bind(this, { entityId })
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
      role: value.role || null,
      teacherId: (value.teacher && value.teacher.id) ? value.teacher.id : null,
      documentId: (value.document && value.document.id) ? value.document.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      role: value.role || null
    }
    if (value.teacherId) {
      entity.teacher = { id: value.teacherId }
    }
    if (value.documentId) {
      entity.document = { id: value.documentId }
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
  getDocuments = () => {
    const documents = {}
    this.props.documents.forEach(document => {
      documents[document.id] = document.id ? document.id.toString() : document.id.toString()
    })
    return t.maybe(t.enums(documents))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const teacherDocument = this.refs.form.getValue()
    if (teacherDocument) { // if validation fails, value will be null
      this.props.updateTeacherDocument(this.formValueToEntity(teacherDocument))
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
    documents: state.documents.documents || [],
    teacherDocument: state.teacherDocuments.teacherDocument,
    fetching: state.teacherDocuments.fetchingOne,
    updating: state.teacherDocuments.updating,
    error: state.teacherDocuments.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTeachers: (options) => dispatch(TeacherActions.teacherAllRequest(options)),
    getAllDocuments: (options) => dispatch(DocumentActions.documentAllRequest(options)),
    getTeacherDocument: (id) => dispatch(TeacherDocumentActions.teacherDocumentRequest(id)),
    getAllTeacherDocuments: (options) => dispatch(TeacherDocumentActions.teacherDocumentAllRequest(options)),
    updateTeacherDocument: (teacherDocument) => dispatch(TeacherDocumentActions.teacherDocumentUpdateRequest(teacherDocument))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDocumentEntityEditScreen)
