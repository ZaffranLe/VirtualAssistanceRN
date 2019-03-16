import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { critetiaEvaluateEntityEditScreen } from '../../../navigation/layouts'

import CritetiaEvaluateActions from './critetia-evaluate.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './critetia-evaluate-entity-detail-screen-style'

class CritetiaEvaluateEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      critetiaEvaluate: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCritetiaEvaluate(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.critetiaEvaluate) {
      this.setState({ critetiaEvaluate: newProps.critetiaEvaluate })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCritetiaEvaluates()
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
      'Delete CritetiaEvaluate?',
      'Are you sure you want to delete the CritetiaEvaluate?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCritetiaEvaluate(this.props.data.entityId)
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
        <Text>ID: {this.state.critetiaEvaluate.id}</Text>
        <Text testID='content'>Content: {this.state.critetiaEvaluate.content}</Text>
        <Text testID='level'>Level: {this.state.critetiaEvaluate.level}</Text>
        <RoundedButton text='Edit' onPress={critetiaEvaluateEntityEditScreen.bind(this, { entityId: this.state.critetiaEvaluate.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    critetiaEvaluate: state.critetiaEvaluates.critetiaEvaluate,
    deleting: state.critetiaEvaluates.deleting,
    errorDeleting: state.critetiaEvaluates.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCritetiaEvaluate: (id) => dispatch(CritetiaEvaluateActions.critetiaEvaluateRequest(id)),
    getAllCritetiaEvaluates: (options) => dispatch(CritetiaEvaluateActions.critetiaEvaluateAllRequest(options)),
    deleteCritetiaEvaluate: (id) => dispatch(CritetiaEvaluateActions.critetiaEvaluateDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CritetiaEvaluateEntityDetailScreen)
