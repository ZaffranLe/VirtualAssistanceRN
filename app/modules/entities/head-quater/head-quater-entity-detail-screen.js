import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { headQuaterEntityEditScreen } from '../../../navigation/layouts'

import HeadQuaterActions from './head-quater.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './head-quater-entity-detail-screen-style'

class HeadQuaterEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      headQuater: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getHeadQuater(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.headQuater) {
      this.setState({ headQuater: newProps.headQuater })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllHeadQuaters()
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
      'Delete HeadQuater?',
      'Are you sure you want to delete the HeadQuater?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteHeadQuater(this.props.data.entityId)
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
        <Text>ID: {this.state.headQuater.id}</Text>
        <Text testID='name'>Name: {this.state.headQuater.name}</Text>
        <RoundedButton text='Edit' onPress={headQuaterEntityEditScreen.bind(this, { entityId: this.state.headQuater.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headQuater: state.headQuaters.headQuater,
    deleting: state.headQuaters.deleting,
    errorDeleting: state.headQuaters.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHeadQuater: (id) => dispatch(HeadQuaterActions.headQuaterRequest(id)),
    getAllHeadQuaters: (options) => dispatch(HeadQuaterActions.headQuaterAllRequest(options)),
    deleteHeadQuater: (id) => dispatch(HeadQuaterActions.headQuaterDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadQuaterEntityDetailScreen)
