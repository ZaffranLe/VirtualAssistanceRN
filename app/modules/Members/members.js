import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Table, Row, Rows, Col } from 'react-native-table-component';

export default class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ID', 'Họ Tên', 'Địa chỉ', 'Số điện thoại', 'Mạng xã hội'],
      tableData: [
        ['1', '2', '3', '4', '5'],
        ['a', 'b', 'c', 'd', 'e'],
        ['1', '2', '3', '456', '789'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'b', 'c', 'd', 'e']
      ],
      text: 'Nhập họ tên cần tìm kiếm'
    }
  };
  styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });
  render() {
    const state = this.state;
    const styles = this.styles;
    return (
      <ScrollView>
        <View>
          <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Danh sách thành viên</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:10,marginTop:20,width:300 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
    )
  }
}
