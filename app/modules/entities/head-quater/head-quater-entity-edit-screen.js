import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import HeadQuaterActions from './head-quater.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { headQuaterEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './head-quater-entity-edit-screen-style'

let Form = t.form.Form

class HeadQuaterEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          name: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'nameInput'
          }
        }
      },
      success: false,
      headQuater: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getHeadQuater(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.headQuater && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.headQuater)
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
        this.props.getAllHeadQuaters({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.headQuater.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: headQuaterEntityDetailScreen.bind(this, { entityId })
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
      name: value.name || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      name: value.name || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const headQuater = this.refs.form.getValue()
    if (headQuater) { // if validation fails, value will be null
      this.props.updateHeadQuater(this.formValueToEntity(headQuater))
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
    headQuater: state.headQuaters.headQuater,
    fetching: state.headQuaters.fetchingOne,
    updating: state.headQuaters.updating,
    error: state.headQuaters.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHeadQuater: (id) => dispatch(HeadQuaterActions.headQuaterRequest(id)),
    getAllHeadQuaters: (options) => dispatch(HeadQuaterActions.headQuaterAllRequest(options)),
    updateHeadQuater: (headQuater) => dispatch(HeadQuaterActions.headQuaterUpdateRequest(headQuater))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadQuaterEntityEditScreen)
