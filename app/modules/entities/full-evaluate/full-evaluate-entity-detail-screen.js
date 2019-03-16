import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { fullEvaluateEntityEditScreen } from '../../../navigation/layouts'

import FullEvaluateActions from './full-evaluate.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './full-evaluate-entity-detail-screen-style'

class FullEvaluateEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      fullEvaluate: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getFullEvaluate(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fullEvaluate) {
      this.setState({ fullEvaluate: newProps.fullEvaluate })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllFullEvaluates()
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
      'Delete FullEvaluate?',
      'Are you sure you want to delete the FullEvaluate?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteFullEvaluate(this.props.data.entityId)
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
        <Text>ID: {this.state.fullEvaluate.id}</Text>
        <Text testID='description'>Description: {this.state.fullEvaluate.description}</Text>
        <RoundedButton text='Edit' onPress={fullEvaluateEntityEditScreen.bind(this, { entityId: this.state.fullEvaluate.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fullEvaluate: state.fullEvaluates.fullEvaluate,
    deleting: state.fullEvaluates.deleting,
    errorDeleting: state.fullEvaluates.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFullEvaluate: (id) => dispatch(FullEvaluateActions.fullEvaluateRequest(id)),
    getAllFullEvaluates: (options) => dispatch(FullEvaluateActions.fullEvaluateAllRequest(options)),
    deleteFullEvaluate: (id) => dispatch(FullEvaluateActions.fullEvaluateDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullEvaluateEntityDetailScreen)
