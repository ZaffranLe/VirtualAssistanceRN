import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import DocumentActions from './document.reducer'
import DocumentTypeActions from '../document-type/document-type.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { documentEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './document-entity-edit-screen-style'

let Form = t.form.Form
const Status = t.enums({
  EXIST: 'EXIST',
  DELETED: 'DELETED'
})

class DocumentEntityEditScreen extends React.Component {
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
        size: t.maybe(t.Number),
        tag: t.maybe(t.String),
        status: t.maybe(Status),
        documentTypes: t.list(this.getDocumentTypes())
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          documentTypeId: {
            testID: 'documentTypeIdInput',
            label: 'DocumentType'
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
            onSubmitEditing: () => this.refs.form.getComponent('size').refs.input.focus(),
            testID: 'uRLInput'
          },
          size: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tag').refs.input.focus(),
            testID: 'sizeInput'
          },
          tag: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'tagInput'
          },
          status: {
            testID: 'statusInput'
          }
        }
      },
      success: false,
      document: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getDocument(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllDocumentTypes()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.document && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.document)
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
        this.props.getAllDocuments({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.document.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: documentEntityDetailScreen.bind(this, { entityId })
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
      size: value.size || null,
      tag: value.tag || null,
      status: value.status || null,
      documentTypes: [].concat(value.documentTypes.map((documentType) => { return documentType.id }))
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      name: value.name || null,
      description: value.description || null,
      uRL: value.uRL || null,
      size: value.size || null,
      tag: value.tag || null,
      status: value.status || null
    }
    entity.documentTypes = [].concat(value.documentTypes.map((documentType) => { return {id: documentType} }))
    return entity
  }

  getDocumentTypes = () => {
    const documentTypes = {}
    this.props.documentTypes.forEach(documentType => {
      documentTypes[documentType.id] = documentType.id ? documentType.id.toString() : documentType.id.toString()
    })
    return t.maybe(t.enums(documentTypes))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const document = this.refs.form.getValue()
    if (document) { // if validation fails, value will be null
      this.props.updateDocument(this.formValueToEntity(document))
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
    documentTypes: state.documentTypes.documentTypes || [],
    document: state.documents.document,
    fetching: state.documents.fetchingOne,
    updating: state.documents.updating,
    error: state.documents.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDocumentTypes: (options) => dispatch(DocumentTypeActions.documentTypeAllRequest(options)),
    getDocument: (id) => dispatch(DocumentActions.documentRequest(id)),
    getAllDocuments: (options) => dispatch(DocumentActions.documentAllRequest(options)),
    updateDocument: (document) => dispatch(DocumentActions.documentUpdateRequest(document))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEntityEditScreen)
