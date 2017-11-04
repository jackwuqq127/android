import React,{Component} from"react";
import { Text,Button,View,TextInput,Animated,NativeModules,StyleSheet,FlatList,RefreshControl } from "react-native";
import Sqlite from "../Util/sqlite";
import DataRow from "./DataRow";

let Carmgr = NativeModules.Carmgr;
let Dimensions=require("Dimensions");

let sqlite=new Sqlite();
let db;
export default class ShowDataBase extends  Component{
    static navigationOptions={
        tabBarLabel:'车牌库'
    }
    componentWillMount (){
        this.setState({
            refData:[],
            refreshing:true
        });
       this.loadData();
    }

    loadData = ()=>{
        if(db==null){ db=sqlite.open(); }
        let srcData=[];
        let get= db.transaction((tx)=>{
            tx.executeSql("select id,name,carno,cellphone,companyunit from cars",[],(tx,rs)=>{
                let len=rs.rows.length;
                for(let i=0;i<len;i++){
                    let o=rs.rows.item(i);
                    srcData.push(o);
                }
                this.setState({
                    refData:srcData
                });
            })
        },(error)=>{
            console.log("程序错误")
        });
    }

    deleteData =(id)=>{
       sqlite.update("delete from cars where id=?",[id],this.loadData);
    }


    render(){
        return (
            <FlatList
                data={this.state.refData}
                extraData={this.state}
                renderItem={({item}) =>
                   <DataRow item={item}
                       onDelete={this.deleteData} reloadData={ this.loadData }
                   />
                }
                keyExtractor={(item)=>{ return item.id }  }
                refreshing={false}
                onRefresh={this.loadData}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                    />
                }
            />
        );
    }
}