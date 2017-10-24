import React,{Component} from "react";
import {View,Text,StyleSheet,Image,TextInput } from "react-native";

console.log(1);

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class Mine extends Component{
	render(){
	 	let pic = {
	      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
	    };

		return(
			<View style={styles.container}>
		        <Text>我的安卓程序！</Text>
		        <Image source={pic} style={{width: 193, height: 110}} />
		        <TextInput
			        style={{ borderColor: 'red', borderWidth: 1,width:200,height:40,color:"red"}}
			     />

		    </View>
		);
	}
}

const styles=StyleSheet.create({
	container:{
		alignItems:"center",
		borderColor:"blue"
	}
});

export default Mine;