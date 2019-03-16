import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { teacherDocumentEntityEditScreen } from '../../../navigation/layouts'

import TeacherDocumentActions from './teacher-document.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './teacher-document-entity-detail-screen-style'

class TeacherDocumentEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      teacherDocument: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTeacherDocument(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.teacherDocument) {
      this.setState({ teacherDocument: newProps.teacherDocument })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTeacherDocuments()
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
      'Delete TeacherDocument?',
      'Are you sure you want to delete the TeacherDocument?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTeacherDocument(this.props.data.entityId)
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
        <Text>ID: {this.state.teacherDocument.id}</Text>
        <Text testID='role'>Role: {this.state.teacherDocument.role}</Text>
        <RoundedButton text='Edit' onPress={teacherDocumentEntityEditScreen.bind(this, { entityId: this.state.teacherDocument.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teacherDocument: state.teacherDocuments.teacherDocument,
    deleting: state.teacherDocuments.deleting,
    errorDeleting: state.teacherDocuments.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacherDocument: (id) => dispatch(TeacherDocumentActions.teacherDocumentRequest(id)),
    getAllTeacherDocuments: (options) => dispatch(TeacherDocumentActions.teacherDocumentAllRequest(options)),
    deleteTeacherDocument: (id) => dispatch(TeacherDocumentActions.teacherDocumentDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDocumentEntityDetailScreen)
