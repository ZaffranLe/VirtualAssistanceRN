import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Table, Row, Rows, Col } from 'react-native-table-component';

export default class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ID', 'Họ Tên', 'SĐT', 'Email', 'Cấp độ'],
      tableData: [
        ['1', 'Nguyễn Văn Anh', '091829222', 'anh@mail.com', 'Giáo viên'],
        ['2', 'Nguyễn Văn Bình', '091238833', 'binh@mail.com', 'Giáo viên'],
        ['3', 'Đinh Tiến Dũng', '01812112', 'dung@mail.com', 'Giáo viên'],
        ['4', 'Bùi Thị Định', '09337833', 'dinh@mail.com', 'Giáo viên'],
        ['5', 'Lê Văn Giang', '09322333', 'giang@mail.com', 'Giáo viên'],
        ['6', 'Nguyễn Tuấn Quang', '09867564', 'quang@mail.com', 'Giáo viên'],
        ['7', 'Lê Sơn Tùng', '09227833', 'tung@mail.com', 'Giáo viên'],
     
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
          <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Danh sách giáo viên</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:10,marginTop:20,width:300 }}
            onChangeText={(text) => this.setState({ text })}
            value='Tìm kiếm theo SĐT'
          />
        </View>
        <View style={{alignItems:'center'}}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:10,marginTop:20,width:300 }}
            onChangeText={(text) => this.setState({ text })}
            value='Tìm kiếm theo email'
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
