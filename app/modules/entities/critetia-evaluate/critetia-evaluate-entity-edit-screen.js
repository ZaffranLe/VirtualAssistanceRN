import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CritetiaEvaluateActions from './critetia-evaluate.reducer'
import CriteriaTypeActions from '../criteria-type/criteria-type.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { critetiaEvaluateEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './critetia-evaluate-entity-edit-screen-style'

let Form = t.form.Form

class CritetiaEvaluateEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        content: t.maybe(t.String),
        level: t.maybe(t.Number),
        criteriaTypeId: this.getCriteriaTypes()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          criteriaTypeId: {
            testID: 'criteriaTypeIdInput',
            label: 'CriteriaType'
          },
          content: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('level').refs.input.focus(),
            testID: 'contentInput'
          },
          level: {
            testID: 'levelInput'
          }
        }
      },
      success: false,
      critetiaEvaluate: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCritetiaEvaluate(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllCriteriaTypes()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.critetiaEvaluate && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.critetiaEvaluate)
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
        this.props.getAllCritetiaEvaluates({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.critetiaEvaluate.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: critetiaEvaluateEntityDetailScreen.bind(this, { entityId })
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
      level: value.level || null,
      criteriaTypeId: (value.criteriaType && value.criteriaType.id) ? value.criteriaType.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      content: value.content || null,
      level: value.level || null
    }
    if (value.criteriaTypeId) {
      entity.criteriaType = { id: value.criteriaTypeId }
    }
    return entity
  }

  getCriteriaTypes = () => {
    const criteriaTypes = {}
    this.props.criteriaTypes.forEach(criteriaType => {
      criteriaTypes[criteriaType.id] = criteriaType.id ? criteriaType.id.toString() : criteriaType.id.toString()
    })
    return t.maybe(t.enums(criteriaTypes))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const critetiaEvaluate = this.refs.form.getValue()
    if (critetiaEvaluate) { // if validation fails, value will be null
      this.props.updateCritetiaEvaluate(this.formValueToEntity(critetiaEvaluate))
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
    criteriaTypes: state.criteriaTypes.criteriaTypes || [],
    critetiaEvaluate: state.critetiaEvaluates.critetiaEvaluate,
    fetching: state.critetiaEvaluates.fetchingOne,
    updating: state.critetiaEvaluates.updating,
    error: state.critetiaEvaluates.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCriteriaTypes: (options) => dispatch(CriteriaTypeActions.criteriaTypeAllRequest(options)),
    getCritetiaEvaluate: (id) => dispatch(CritetiaEvaluateActions.critetiaEvaluateRequest(id)),
    getAllCritetiaEvaluates: (options) => dispatch(CritetiaEvaluateActions.critetiaEvaluateAllRequest(options)),
    updateCritetiaEvaluate: (critetiaEvaluate) => dispatch(CritetiaEvaluateActions.critetiaEvaluateUpdateRequest(critetiaEvaluate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CritetiaEvaluateEntityEditScreen)
