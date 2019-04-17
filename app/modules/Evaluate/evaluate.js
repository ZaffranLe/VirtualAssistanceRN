import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, Picker, TouchableOpacity, Alert } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Table, Row, Rows, Cell, TableWrapper } from 'react-native-table-component';
import { RadioButton } from 'react-native-paper';

export default class Evaluate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: [ 'Mô tả tiêu chí đánh giá', 'Chưa đạt', 'Đạt','Khá', 'Tốt'],
      tableData: [
        ['Tiêu chí 1: Đạo đức nhà giáo', element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 2: Phong cách nhà giáo',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 3: Phát triển chuyên môn bản thân',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 4: Xây dựng kế hoạch dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 5: Sử dụng phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 6: Kiểm tra, đánh giá theo hướng phát triển phẩm chất, năng lực học sinh',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 7: Tư vấn và hỗ trợ học sinh',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 8: Xây dựng văn hóa nhà trường', element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 9: Thực hiện quyền dân chủ trong nhà trường',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 10: Thực hiện và xây dựng trường học an toàn, phòng chống bạo lực học đường',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 11: Tạo dựng mối quan hệ hợp tác với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan', element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 12: Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện hoạt động dạy học cho học sinh',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 13: Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện giáo dục đạo đức, lối sống cho học sinh', element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 14: Sử dụng ngoại ngữ hoặc tiếng dân tộc',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 14: Sử dụng ngoại ngữ hoặc tiếng dân tộc',  element('1'), element('2'), element(3),element('4')],
        ['Tiêu chí 15: Ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học, giáo dục',  element('1'), element('2'), element(3),element('4')],

      ],
      text: 'Tìm kiếm theo tên văn bản',
      checked: ''


    }
  };
  styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {flex: 1, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' }

  });
  _alertIndex(index) {
    Alert.alert(`This is document ${index + 1}`);
  }
  render () {
    const state = this.state;
    const styles = this.styles;
    
    return (
      <View>
        <ScrollView>
          <View>
            <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Bảng đánh giá</Text>
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
                
                        <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index): cellData} textStyle={styles.text} />
                     
                        ))
                      }
                  </TableWrapper>
                ))
              }
             
            </Table>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const element = (value) => (
  <TouchableOpacity onPress={() => this._alertIndex(value)}>
    <View>
      <RadioButton
        value="ChuaDat"
                  
      />
    </View>
    {/* <View>
      <RadioButton
        value="Dat"
        status={this.state.checked === '2' ? 'checked' : 'unchecked'}
        onPress={() => { this.setState({ checked: 'second' }); }}
      />
    </View>
    <View>
      <RadioButton
        value="Kha"
        status={this.state.checked === '3' ? 'checked' : 'unchecked'}
        onPress={() => { this.setState({ checked: 'second' }); }}
      />
    </View>
    <View>
      <RadioButton
        value="Tot"
        status={this.state.checked === '4' ? 'checked' : 'unchecked'}
        onPress={() => { this.setState({ checked: 'second' }); }}
      />
  </View> */}
  </TouchableOpacity>
);