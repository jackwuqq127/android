import React,{Component} from"react";
import {Text,Button,View,TextInput,Animated,NativeModules,StyleSheet,FlatList } from "react-native";

var Carmgr = NativeModules.Carmgr;
var Dimensions=require("Dimensions");

export default class ShowDataBase extends  Component{
    static navigationOptions={
        tabBarLabel:'车牌库'
    }

    componentWillMount (){
        let srcData=[];
        this.setState({
            refData:srcData
        });
        Carmgr.dataList( (msg)=>{
            srcData=JSON.parse(msg);
            this.setState({
                refData:srcData
            });
        });
    }
    render(){
        return (
            <FlatList
                data={this.state.refData}
                renderItem={({item}) => <Text key={item.name}>{item.name}</Text>}
                keyExtractor={({item})=>{ console.log(item) }  }
            />
        );
    }
}