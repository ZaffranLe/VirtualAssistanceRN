import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import AnswerActions from './answer.reducer'
import FullEvaluateActions from '../full-evaluate/full-evaluate.reducer'
import CritetiaEvaluateActions from '../critetia-evaluate/critetia-evaluate.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { answerEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './answer-entity-edit-screen-style'

let Form = t.form.Form
const ScoreLadder = t.enums({
  FAIL: 'FAIL',
  PASS: 'PASS',
  GOOD: 'GOOD',
  EXCELLENT: 'EXCELLENT'
})

class AnswerEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        scoreLadder: t.maybe(ScoreLadder),
        proof: t.maybe(t.String),
        fullEvaluateId: this.getFullEvaluates(),
        critetiaEvaluateId: this.getCritetiaEvaluates()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          fullEvaluateId: {
            testID: 'fullEvaluateIdInput',
            label: 'FullEvaluate'
          },
          critetiaEvaluateId: {
            testID: 'critetiaEvaluateIdInput',
            label: 'CritetiaEvaluate'
          },
          scoreLadder: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('proof').refs.input.focus(),
            testID: 'scoreLadderInput'
          },
          proof: {
            testID: 'proofInput'
          }
        }
      },
      success: false,
      answer: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getAnswer(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllFullEvaluates()
    this.props.getAllCritetiaEvaluates()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.answer && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.answer)
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
        this.props.getAllAnswers({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.answer.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: answerEntityDetailScreen.bind(this, { entityId })
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
      scoreLadder: value.scoreLadder || null,
      proof: value.proof || null,
      fullEvaluateId: (value.fullEvaluate && value.fullEvaluate.id) ? value.fullEvaluate.id : null,
      critetiaEvaluateId: (value.critetiaEvaluate && value.critetiaEvaluate.id) ? value.critetiaEvaluate.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      scoreLadder: value.scoreLadder || null,
      proof: value.proof || null
    }
    if (value.fullEvaluateId) {
      entity.fullEvaluate = { id: value.fullEvaluateId }
    }
    if (value.critetiaEvaluateId) {
      entity.critetiaEvaluate = { id: value.critetiaEvaluateId }
    }
    return entity
  }

  getFullEvaluates = () => {
    const fullEvaluates = {}
    this.props.fullEvaluates.forEach(fullEvaluate => {
      fullEvaluates[fullEvaluate.id] = fullEvaluate.id ? fullEvaluate.id.toString() : fullEvaluate.id.toString()
    })
    return t.maybe(t.enums(fullEvaluates))
  }
  getCritetiaEvaluates = () => {
    const critetiaEvaluates = {}
    this.props.critetiaEvaluates.forEach(critetiaEvaluate => {
      critetiaEvaluates[critetiaEvaluate.id] = critetiaEvaluate.id ? critetiaEvaluate.id.toString() : critetiaEvaluate.id.toString()
    })
    return t.maybe(t.enums(critetiaEvaluates))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const answer = this.refs.form.getValue()
    if (answer) { // if validation fails, value will be null
      this.props.updateAnswer(this.formValueToEntity(answer))
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
    fullEvaluates: state.fullEvaluates.fullEvaluates || [],
    critetiaEvaluates: state.critetiaEvaluates.critetiaEvaluates || [],
    answer: state.answers.answer,
    fetching: state.answers.fetchingOne,
    updating: state.answers.updating,
    error: state.answers.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFullEvaluates: (options) => dispatch(FullEvaluateActions.fullEvaluateAllRequest(options)),
    getAllCritetiaEvaluates: (options) => dispatch(CritetiaEvaluateActions.critetiaEvaluateAllRequest(options)),
    getAnswer: (id) => dispatch(AnswerActions.answerRequest(id)),
    getAllAnswers: (options) => dispatch(AnswerActions.answerAllRequest(options)),
    updateAnswer: (answer) => dispatch(AnswerActions.answerUpdateRequest(answer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerEntityEditScreen)
