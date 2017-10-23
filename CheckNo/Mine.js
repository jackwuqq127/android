import React,{Component} from "react";
import {View,Text,StyleSheet} from "react-native";

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class Mine extends Component{
	render(){
		return(
			<View style={styles.container}>
		        <Text>Hello!</Text>
				<Text>Hello!</Text>
				<Text>Hello!</Text>
				<Text>Hello!</Text>
		    </View>
		);
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"#ccc",
		alignItems:"center",
		borderColor:"blue"
	}
});

export default Mine;