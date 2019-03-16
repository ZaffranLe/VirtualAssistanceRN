import React from 'react'
import { View, Text, Button } from 'react-native'
import { Navigation } from 'react-native-navigation'
export default class DocumentStorage extends React.Component {

  handlePress = () => {

  }
  render () {
    return (
      <View testID='documentStorage'>
        <Button title="Click me" color="blue" onPress={this.handlePress}/>
      </View>
    )
  }
}
