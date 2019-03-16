import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { documentEntityEditScreen } from '../../../navigation/layouts'

import DocumentActions from './document.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './document-entity-detail-screen-style'

class DocumentEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      document: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getDocument(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.document) {
      this.setState({ document: newProps.document })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllDocuments()
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
      'Delete Document?',
      'Are you sure you want to delete the Document?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteDocument(this.props.data.entityId)
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
        <Text>ID: {this.state.document.id}</Text>
        <Text testID='name'>Name: {this.state.document.name}</Text>
        <Text testID='description'>Description: {this.state.document.description}</Text>
        <Text testID='uRL'>URL: {this.state.document.uRL}</Text>
        <Text testID='size'>Size: {this.state.document.size}</Text>
        <Text testID='tag'>Tag: {this.state.document.tag}</Text>
        <Text testID='status'>Status: {this.state.document.status}</Text>
        <RoundedButton text='Edit' onPress={documentEntityEditScreen.bind(this, { entityId: this.state.document.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    document: state.documents.document,
    deleting: state.documents.deleting,
    errorDeleting: state.documents.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDocument: (id) => dispatch(DocumentActions.documentRequest(id)),
    getAllDocuments: (options) => dispatch(DocumentActions.documentAllRequest(options)),
    deleteDocument: (id) => dispatch(DocumentActions.documentDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEntityDetailScreen)
