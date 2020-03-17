import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native';
import SearchBar from '../../components/SearchBar'


export default class User extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    header: null
  }) 
  constructor(props) {
    super(props)
  }

 
  navigationTo = () => {
    this.props.navigation.navigate('MusicPlay')
  }


  render() {
    return(
      <View>
        <Text>一般一般</Text>
        <Button
          title="Go to Details... again"
          onPress={this.navigationTo}
        />
       
      </View>      
    )
  }
}