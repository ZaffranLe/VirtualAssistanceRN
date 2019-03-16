import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { teacherEntityEditScreen } from '../../../navigation/layouts'

import TeacherActions from './teacher.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './teacher-entity-detail-screen-style'

class TeacherEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      teacher: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTeacher(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.teacher) {
      this.setState({ teacher: newProps.teacher })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTeachers()
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
      'Delete Teacher?',
      'Are you sure you want to delete the Teacher?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTeacher(this.props.data.entityId)
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
        <Text>ID: {this.state.teacher.id}</Text>
        <Text testID='identityNumber'>IdentityNumber: {this.state.teacher.identityNumber}</Text>
        <Text testID='fullName'>FullName: {this.state.teacher.fullName}</Text>
        <Text testID='phone'>Phone: {this.state.teacher.phone}</Text>
        <Text testID='doB'>DoB: {String(this.state.teacher.doB)}</Text>
        <Text testID='address'>Address: {this.state.teacher.address}</Text>
        <Text testID='email'>Email: {this.state.teacher.email}</Text>
        <Text testID='password'>Password: {this.state.teacher.password}</Text>
        <Text testID='dataStorage'>DataStorage: {this.state.teacher.dataStorage}</Text>
        <Text testID='usedStorage'>UsedStorage: {this.state.teacher.usedStorage}</Text>
        <Text testID='level'>Level: {this.state.teacher.level}</Text>
        <Text testID='status'>Status: {this.state.teacher.status}</Text>
        <Text testID='avatar'>Avatar: {this.state.teacher.avatar}</Text>
        <RoundedButton text='Edit' onPress={teacherEntityEditScreen.bind(this, { entityId: this.state.teacher.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teachers.teacher,
    deleting: state.teachers.deleting,
    errorDeleting: state.teachers.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacher: (id) => dispatch(TeacherActions.teacherRequest(id)),
    getAllTeachers: (options) => dispatch(TeacherActions.teacherAllRequest(options)),
    deleteTeacher: (id) => dispatch(TeacherActions.teacherDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherEntityDetailScreen)
