import React,{Component} from 'react';
import {Text,View,TextInput,Button } from "react-native";
var Dimensions=require("Dimensions");

export default class CheckNo extends Component{
    static navigationOptions={
        tabBarLabel:'查车牌'
    }

    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }
    //{carno:"渝:A123456",cellphone:13647688503}
    render(){
        var {height,width} = Dimensions.get('window');
        return(
           <View style={{
               flexDirection:"row",justifyContent:"center",marginTop:5
           }}>
               <View style={{width:width*0.8,padding:0}} >
                    <TextInput style={{borderWidth:1,borderColor:"#2196F3",padding:0,flex:1,padding:5}} underlineColorAndroid="transparent"
                        placeholder={"输入需要查询的车牌号"}
                    />
               </View>

               <View style={{justifyContent:"flex-end",marginLeft:2}}>
                  <Button title="查询" onPress={()=>{}} />
               </View>
           </View>
        );
    }
}