import React from 'react'
import {
  Badge,
  View, Text, ScrollView, StyleSheet, Button, TouchableOpacity, Alert, SectionList
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as Icon from 'react-native-vector-icons'
export default class DocumentStorage extends React.Component {

  handlePress = () => {

  }
  constructor(props) {
    super(props);

  };

  styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    btn: { width: '90%', height: 50, backgroundColor: '#78B7BB', borderRadius: 2, alignItems: 'center' },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 24 }


  });

  _alertIndex() {
    Alert.alert(`This is upload method`);
  }
  render() {
    const state = this.state;
    const styles = this.styles;
    const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text key={index}>Override{item}</Text>

    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <ScrollView>
        <View style={{ marginTop: 10, marginLeft: 45 }}>
          <TouchableOpacity onPress={() => this._alertIndex()} >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Upload</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <SectionList
            renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
            sections={[
              { title: 'Title1', data: ['item1', 'item2']},
              { title: 'Title2', data: ['item3', 'item4'] },
              { title: 'Title3', data: ['item5', 'item6'] },
            ]}
          />


        </View>
      </ScrollView>


    );
  }

}
