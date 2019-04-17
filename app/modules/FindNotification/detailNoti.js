import React from 'react'
import {View  } from 'react-native'
import { Navigation } from 'react-native-navigation'
import ImageSlider from 'react-native-image-slider';
export default class DetailNotifi extends React.Component {

    render () {
      return (
       <ImageSlider images={[
          'http://placeimg.com/640/480/any',
          'http://placeimg.com/640/480/any',
          'http://placeimg.com/640/480/any'
        ]}/>)
    }
  }