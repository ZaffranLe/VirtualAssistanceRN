import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  teacherEntityScreen,
  teacherDocumentEntityScreen,
  documentEntityScreen,
  documentTypeEntityScreen,
  notificationEntityScreen,
  notificationTypeEntityScreen,
  headQuaterEntityScreen,
  criteriaTypeEntityScreen,
  answerEntityScreen,
  critetiaEvaluateEntityScreen,
  fullEvaluateEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Teacher' onPress={teacherEntityScreen} testID='teacherEntityScreenButton' />
        <RoundedButton text='TeacherDocument' onPress={teacherDocumentEntityScreen} testID='teacherDocumentEntityScreenButton' />
        <RoundedButton text='Document' onPress={documentEntityScreen} testID='documentEntityScreenButton' />
        <RoundedButton text='DocumentType' onPress={documentTypeEntityScreen} testID='documentTypeEntityScreenButton' />
        <RoundedButton text='Notification' onPress={notificationEntityScreen} testID='notificationEntityScreenButton' />
        <RoundedButton text='NotificationType' onPress={notificationTypeEntityScreen} testID='notificationTypeEntityScreenButton' />
        <RoundedButton text='HeadQuater' onPress={headQuaterEntityScreen} testID='headQuaterEntityScreenButton' />
        <RoundedButton text='CriteriaType' onPress={criteriaTypeEntityScreen} testID='criteriaTypeEntityScreenButton' />
        <RoundedButton text='Answer' onPress={answerEntityScreen} testID='answerEntityScreenButton' />
        <RoundedButton text='CritetiaEvaluate' onPress={critetiaEvaluateEntityScreen} testID='critetiaEvaluateEntityScreenButton' />
        <RoundedButton text='FullEvaluate' onPress={fullEvaluateEntityScreen} testID='fullEvaluateEntityScreenButton' />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
