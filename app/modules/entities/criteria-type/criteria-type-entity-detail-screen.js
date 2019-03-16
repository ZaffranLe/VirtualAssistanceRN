import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { criteriaTypeEntityEditScreen } from '../../../navigation/layouts'

import CriteriaTypeActions from './criteria-type.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './criteria-type-entity-detail-screen-style'

class CriteriaTypeEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      criteriaType: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCriteriaType(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.criteriaType) {
      this.setState({ criteriaType: newProps.criteriaType })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCriteriaTypes()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete CriteriaType?',
      'Are you sure you want to delete the CriteriaType?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCriteriaType(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.criteriaType.id}</Text>
        <Text testID='content'>Content: {this.state.criteriaType.content}</Text>
        <Text testID='level'>Level: {this.state.criteriaType.level}</Text>
        <RoundedButton text='Edit' onPress={criteriaTypeEntityEditScreen.bind(this, { entityId: this.state.criteriaType.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    criteriaType: state.criteriaTypes.criteriaType,
    deleting: state.criteriaTypes.deleting,
    errorDeleting: state.criteriaTypes.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCriteriaType: (id) => dispatch(CriteriaTypeActions.criteriaTypeRequest(id)),
    getAllCriteriaTypes: (options) => dispatch(CriteriaTypeActions.criteriaTypeAllRequest(options)),
    deleteCriteriaType: (id) => dispatch(CriteriaTypeActions.criteriaTypeDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaTypeEntityDetailScreen)
