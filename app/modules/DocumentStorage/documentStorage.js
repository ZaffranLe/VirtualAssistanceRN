import React from 'react'
import {
  Badge,
  View, Text, ScrollView, StyleSheet, Button, TouchableOpacity, Alert, ListView
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as Icon from 'react-native-vector-icons'
export default class DocumentStorage extends React.Component {

  handlePress = () => {

  }
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      text: 'Tìm kiếm theo tên văn bản'
    }
    // this.state = {
    //   dataSource: ds.cloneWithRows([
    //     {title:['Document 1 ','Document 2 ','Document 3 ','Document 4 ']},
    //     {content:['Document 1 ','Document 2 ','Document 3 ','Document 4 ']}
        

    //   ]),
    // };
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
    const ds = this.ds;
    const styles = this.styles;
    

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
        <View style={styles.container}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginTop: 20, width: 300 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          </View>
        <View>
          {/* <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View>
                <Text>{rowData.title}</Text>
                <Text>{rowData.content}</Text>
              </View>
            }
          /> */}
          <Text style={{fontSize:35}}>Tài liệu 1</Text>
            <Text style={{fontSize:24}}>Đây là nội dung tài liệu 1 ...</Text>


        </View>
        <View  >
            <Text style={{fontSize:35}} >Tài liệu 2</Text>
            <Text style={{fontSize:24}}>Đây là nội dung tài liệu 2</Text>
           
          </View>
        <View  >
            <Text style={{fontSize:35}} >Tài liệu 3</Text>
            <Text style={{fontSize:24}}>Đây là nội dung tài liệu 2</Text>
           
          </View>
        <View  >
            <Text style={{fontSize:35}} >Tài liệu 4</Text>
            <Text style={{fontSize:24}}>Đây là nội dung tài liệu 2</Text>
           
          </View>
      </ScrollView>


    );
  }

}
