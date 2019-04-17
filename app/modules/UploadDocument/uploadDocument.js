import React from 'react'
import {
  Badge,
  View, Text, ScrollView, StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { bgblue } from 'ansi-colors';
import * as Progress from 'react-native-progress';
import { Table, Row, Rows, Col } from 'react-native-table-component';
import * as Icon from 'react-native-vector-icons'
import { Card, Title, Paragraph } from 'react-native-paper';
export default class UploadDocument extends React.Component {

  handlePress = () => {

  }
  constructor(props) {
    super(props);
    this.state = {
      tableHead1: ['Tên tài liệu', 'Loại', ''],
      tableData1: [
        ['Bài giảng số 1', 'Toán', 'Xem'],
        ['Bài tập', 'Anh', 'Xem'],
        ['Bài giảng số 2', 'Lý', 'Xem'],
        ['Bài thi', 'Hóa.', 'Xem']
      ],

      tableHead3: ['Bản đánh giá', 'Xếp loại'],
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
    head: { backgroundColor: '#f1f8ff' },
    text: { margin: 6 },

  });


  render() {
    const state = this.state;
    const styles = this.styles;
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <ScrollView>
        <Card>
          <Card.Content>
            <Title style={{ marginTop: 20, marginLeft: 10, fontSize: 30 }}>Hồ sơ giáo viên</Title>
            <Paragraph>Số chứng minh thư          19283837373</Paragraph>
            <Paragraph>Họ tên                     Nguyễn Văn Anh</Paragraph>
            <Paragraph>Số Điện Thoại              091828222</Paragraph>
            <Paragraph>Ngày sinh                  15/4/1987</Paragraph>
            <Paragraph>Địa chỉ                    Hà Nội</Paragraph>
            <Paragraph>Email                      anh@mail.com</Paragraph>
            <Paragraph>Cấp độ                     Giáo viên</Paragraph>
            <Card>
              <Card.Cover source={{ uri: 'https://thesiliconreview.com/story_image_upload/us/silicon-review-duane-hardacre.jpg' }} />
            </Card>
          </Card.Content>
        </Card>
        <View>
          <Title style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Hồ sơ dạy học</Title>
        </View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={state.tableHead1} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData1} textStyle={styles.text} />
          </Table>
        </View>

        <View>
          <Title style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}>Kết quả tự đánh giá</Title>
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
