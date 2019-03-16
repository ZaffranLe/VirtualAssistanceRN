import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CriteriaTypeActions from './criteria-type.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { criteriaTypeEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './criteria-type-entity-edit-screen-style'

let Form = t.form.Form

class CriteriaTypeEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        content: t.maybe(t.String),
        level: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          content: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('level').refs.input.focus(),
            testID: 'contentInput'
          },
          level: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'levelInput'
          }
        }
      },
      success: false,
      criteriaType: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCriteriaType(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.criteriaType && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.criteriaType)
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
        this.props.getAllCriteriaTypes({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.criteriaType.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: criteriaTypeEntityDetailScreen.bind(this, { entityId })
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
      content: value.content || null,
      level: value.level || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      content: value.content || null,
      level: value.level || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const criteriaType = this.refs.form.getValue()
    if (criteriaType) { // if validation fails, value will be null
      this.props.updateCriteriaType(this.formValueToEntity(criteriaType))
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
    criteriaType: state.criteriaTypes.criteriaType,
    fetching: state.criteriaTypes.fetchingOne,
    updating: state.criteriaTypes.updating,
    error: state.criteriaTypes.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCriteriaType: (id) => dispatch(CriteriaTypeActions.criteriaTypeRequest(id)),
    getAllCriteriaTypes: (options) => dispatch(CriteriaTypeActions.criteriaTypeAllRequest(options)),
    updateCriteriaType: (criteriaType) => dispatch(CriteriaTypeActions.criteriaTypeUpdateRequest(criteriaType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaTypeEntityEditScreen)
