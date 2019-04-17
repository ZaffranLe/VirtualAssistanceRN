import React from 'react'
import {
  Badge,
  View, Text, ScrollView, StyleSheet, Button, TouchableOpacity, Alert, ListView,TextInput
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as Icon from 'react-native-vector-icons'
import { Table, Row, Rows, Cell, TableWrapper } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
export default class DocumentStorage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Id', 'Tên tài liệu', 'Mô tả  ', 'Thẻ tìm kiếm','Trạng thái chia sẻ','Thể loại tài liệu',''],
      tableData: [
        ['1', 'Bài giảng số 1', 'Kiến thức...', '#toan','Riêng tư','Toán',''],
        ['2', 'Bài giảng số 3', 'Kiến thức...', '#van','Riêng tư','Văn',''],
        ['3', 'Bài giảng số 4', 'Kiến thức...', '#anh','Riêng tư','Anh',''],
        ['4', 'Bài giảng số 2', 'Kiến thức...', '#ly','Riêng tư','Lý',''],
        ['5', 'Bài giảng số 5', 'Kiến thức...', '#hoa','Riêng tư','Hóa',''],
        

      ],
      tableData2: [
        ['6', 'Bài giảng số 1', 'Kiến thức...', '#toan','Công khai','Toán',''],
        ['7', 'Bài giảng số 3', 'Kiến thức...', '#van','Công khai','Văn',''],
        ['8', 'Bài giảng số 4', 'Kiến thức...', '#anh','Công khai','Anh',''],
        ['9', 'Bài giảng số 2', 'Kiến thức...', '#ly','Công khai','Lý',''],
        ['10', 'Bài giảng số 5', 'Kiến thức...', '#hoa','Công khai','Hóa',''],
        

      ],
      text: 'Tìm kiếm theo tên văn bản',
      data: [{ value: 'Tất cả' },
      { value: 'Luật' },
      { value: 'Thông báo' }

      ],


    }
  };
  styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    btn: { width: 35, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' }

  });
  _alertIndex(index) {
    Alert.alert(`This is document ${index + 1}`);
  }
  render() {
    const state = this.state;
    const styles = this.styles;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Đọc</Text>
        </View>
      </TouchableOpacity>
    );

    return (

      <ScrollView>
       
        <View style={styles.container}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginTop: 20, width: 300 }}
            onChangeText={(text) => this.setState({ text })}
            value='Tìm theo tên tài liệu'
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginTop: 20, width: 300 }}
            onChangeText={(text) => this.setState({ text })}
            value='Tìm theo tag'
          />
          {/* <Dropdown
            label='Tìm kiếm theo loại văn bản'
            data={state.data}

          /> */}
        </View>
        <View>
          <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Tài liệu dạy học cá nhân</Text>
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>

            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}  />
            {/* <Rows data={state.tableData} textStyle={styles.text} /> */}
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 6 ? element(cellData, index) : cellData} textStyle={styles.text} />
                    ))
                  }
                </TableWrapper>
              ))
            }





          </Table>
        </View>
        <View>
          <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Tài liệu dạy học công khai</Text>
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>

            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            {/* <Rows data={state.tableData} textStyle={styles.text} /> */}
            {
              state.tableData2.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 6 ? element(cellData, index) : cellData} textStyle={styles.text} />
                    ))
                  }
                </TableWrapper>
              ))
            }





          </Table>
        </View>
      </ScrollView>
    )
  }
}
