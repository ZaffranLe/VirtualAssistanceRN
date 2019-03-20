import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, Picker, TouchableOpacity, Alert } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Table, Row, Rows, Cell, TableWrapper } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
export default class FindNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['#', 'Tên văn bản', 'Thể loại', 'Ngày đăng',''],
      tableData: [
        ['1', '12', '3', '4',''],
        ['a', 'b', 'c', 'd',''],
        ['1', '2', '3', '456',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],
        ['a', 'b', 'c', 'd',''],

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
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
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
        <View>
          <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Danh sách văn bản</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginTop: 20, width: 300 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Dropdown
            label='Tìm kiếm theo loại văn bản'
            data={state.data}

          />
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>

            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            {/* <Rows data={state.tableData} textStyle={styles.text} /> */}
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text} />
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
