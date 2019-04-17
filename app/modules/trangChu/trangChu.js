import React from 'react'
import {
  Badge,
  View, Text, ScrollView, StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { bgblue } from 'ansi-colors';
import * as Progress from 'react-native-progress';
import { Table, Row, Rows,Col } from 'react-native-table-component';
import * as Icon from 'react-native-vector-icons'
export default class Home extends React.Component {

  handlePress = () => {

  }
  constructor(props) {
    super(props);
    this.state = {
      tableHead1: ['Tên văn bản', 'Mô tả', 'Cơ quan ban hành', 'Ngày ban hành',''],
      tableData1: [
        ['Thông tư 20 BGD', 'Đánh giá gv', 'Bộ giáo dục', '20/5/2018','Xem'],
        ['Thông báo nghỉ', 'Nghỉ lễ', 'Nhà trường', '20/5/2018','Xem'],
        ['Thông báo tăng lương', 'Tăng lương cho ...', 'Bộ giáo dục', '20/5/2018','Xem'],
        ['Thông báo lịch giảng dạy', 'Lịch giảng dạy...', 'Nhà trường', '20/5/2018','Xem']
      ],
     
      tableHead3: ['Kỳ đánh giá', 'Xếp loại'],
      tableData3: [
        ['Quý 1 Năm 2018', 'Tốt'],
        ['Quý 2 Năm 2018', 'Khá '],
        ['Quý 3 Năm 2018', 'Tốt'],
        ['Quý 4 Năm 2018', 'Đạt']
      ]
    }
  };

  styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    progressCard1: {
      flex: 1,
      backgroundColor: '#afcbf7',
      borderWidth: 0.5,
      borderColor: 'black',
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 4,
      width: 320,
      height: 150,


    },
    progressCard2: {
      flex: 1,
      backgroundColor: '#34ba80',
      borderWidth: 0.5,
      borderColor: 'black',
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 4,
      width: 320,
      height: 150,


    },
    progressCard3: {
      flex: 1,
      backgroundColor: '#eac627',
      borderWidth: 0.5,
      borderColor: 'black',
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 4,
      width: 320,
      height: 150,


    },
    
  });


  render() {
    const state = this.state;
    const styles = this.styles;
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.progressCard1} >
            
            <Text style={{fontSize:24,color:'white'}}>Số tài liệu chia sẻ</Text>
            <Text style={{fontSize:35,color:'white'}}>200</Text>
            

            <Progress.Bar  style={{  marginTop:20 }} progress={0.3} width={300} />
          </View>
          <View style={styles.progressCard2} >
            <Text style={{fontSize:24,color:'white'}} >Số tài liệu trong kho</Text>
            <Text style={{fontSize:35,color:'white'}}>140</Text>
            <Progress.Bar style={{marginTop:20  }} progress={0.4} width={300} />
          </View>
          <View style={styles.progressCard3} >
            <Text style={{fontSize:24,color:'white'}}>Dung lượng còn lại</Text>
            <Text style={{fontSize:35,color:'white'}}>100MB</Text>
            <Progress.Bar  style={{ marginTop:20 }} progress={0.5} width={300} />
          </View>
        </View>
        <View>
          <Text style={{marginTop:20,marginLeft:20,fontSize:30}}>Văn bản mới nhất</Text>
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={state.tableHead1} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData1} textStyle={styles.text} />
          </Table>
        </View>
        
        <View>
          <Text style={{marginTop:20,marginLeft:20,fontSize:30}}>Kết quả tự đánh giá</Text>
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={state.tableHead3} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData3} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>


    );
  }

}
