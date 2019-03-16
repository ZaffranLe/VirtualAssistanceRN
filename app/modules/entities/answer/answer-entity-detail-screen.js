import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { answerEntityEditScreen } from '../../../navigation/layouts'

import AnswerActions from './answer.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './answer-entity-detail-screen-style'

class AnswerEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      answer: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getAnswer(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.answer) {
      this.setState({ answer: newProps.answer })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllAnswers()
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
      'Delete Answer?',
      'Are you sure you want to delete the Answer?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteAnswer(this.props.data.entityId)
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
        <Text>ID: {this.state.answer.id}</Text>
        <Text testID='scoreLadder'>ScoreLadder: {this.state.answer.scoreLadder}</Text>
        <Text testID='proof'>Proof: {this.state.answer.proof}</Text>
        <RoundedButton text='Edit' onPress={answerEntityEditScreen.bind(this, { entityId: this.state.answer.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    answer: state.answers.answer,
    deleting: state.answers.deleting,
    errorDeleting: state.answers.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAnswer: (id) => dispatch(AnswerActions.answerRequest(id)),
    getAllAnswers: (options) => dispatch(AnswerActions.answerAllRequest(options)),
    deleteAnswer: (id) => dispatch(AnswerActions.answerDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerEntityDetailScreen)
