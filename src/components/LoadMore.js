import React from 'react'
import { 
  View, 
  Text,
  TouchableOpacity 
} from "react-native"
export default class LoadMore extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <View>
        <TouchableOpacity
            style={{width: '100%',height: 40,justifyContent:'center',
                alignItems:'center'
            }}
            onPress={this.props.click}
        >
          <Text>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}