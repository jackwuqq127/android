import React,{Component} from "react";
import {View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	NativeModules,
	Button,
	Alert,
    TouchableHighlight,TouchableNativeFeedback
} from "react-native";

var rnToastAndroid = NativeModules.ToastExample;
//rnToastAndroid.getPackageName();

const styles=StyleSheet.create({
	container:{
		alignItems:"center",
		flex:1,
		flexDirection:"column",
		backgroundColor:"#fff"
	}
});


class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

const searchNo= ()=>{
	Alert.alert("查询车牌");
}

var Dimensions=require("Dimensions");

class Mine extends Component{
	render(){
		let cars=[
			{no:"渝A:159654",cell:"13647688503"},
			{no:"渝B:159FG54",cell:"13512369632"},
			{no:"渝C:119FG57",cell:"13512369632"}
		]; 
		let textPackages=[];
		for(var car of cars){
			textPackages.push(
				<Text key={car.no}>{car.no}</Text>
			)
		}
		
		var {height,width} = Dimensions.get('window');
		var styleButton=StyleSheet.create({
            buttonStyle:{
                height:50,
				width:(width)/3,
                borderColor :"red",
                justifyContent:"space-around",
                alignItems:"center"
            },
			buttonText:{
                color:"#ccc",
				fontSize:12,
				fontWeight:"bold"
			}
		});

		return(
			<View style={styles.container}>
		        <View style={{flex:1,width:width}}>
		        	<Text>content</Text>
		        </View>
		        
		        <View style={{
		        	height:50,
		        	width:width,
		        	flexDirection:"row",
		        	justifyContent:"space-around",
                    borderTopWidth :1,
                    borderColor:"#ccc"
		        }}>
                    <TouchableHighlight onPress={searchNo}>
                        <View  style={styleButton.buttonStyle}>

                                <Text style={styleButton.buttonText} key={"no"}>查车牌</Text>

                        </View>
                    </TouchableHighlight>
					<View  style={styleButton.buttonStyle}>
						<TouchableHighlight>
							<Text style={styleButton.buttonText}>录入车牌</Text>
						</TouchableHighlight>
					</View>
					<View  style={styleButton.buttonStyle}>
						<TouchableHighlight>
							<Text style={styleButton.buttonText}>车牌库</Text>
						</TouchableHighlight>
					</View>
		        </View>
		    </View>
		);
	}
}
export default Mine;