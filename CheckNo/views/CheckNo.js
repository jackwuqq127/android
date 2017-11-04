import React,{Component} from 'react';
import {Text,View,TextInput,Button,FlatList,RefreshControl } from "react-native";
import Sqlite from "../Util/sqlite";
import DataRow from "./DataRow";

var Dimensions=require("Dimensions");
let db;

export default class CheckNo extends Component{
    static navigationOptions={
        tabBarLabel:'查车牌'
    }

    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
        this.sqlite=new  Sqlite();
    }

    componentWillMount(){
        this.setState({
            searchCarno:"",
            refData:[]
        });
    }

    loadData = ()=>{
        if(this.state.searchCarno==null||this.state.searchCarno.length==0){
            this.setState({
                refData:[]
            });
            return;
        }

        if(db==null){ db=this.sqlite.open(); }
        let srcData=[];

        let get= db.transaction((tx)=>{
            tx.executeSql("select id,name,carno,cellphone,companyunit from cars where carno like '%"+this.state.searchCarno+"%'",[],(tx,rs)=>{
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
        this.sqlite.update("delete from cars where id=?",[id],this.loadData);
    }

    //{carno:"渝:A123456",cellphone:13647688503}
    render(){
        var {height,width} = Dimensions.get('window');
        let fullWidth=width;
        return(
            <View>
               <View style={{
                   flexDirection:"row",justifyContent:"center",marginTop:5
               }}>
                   <View style={{width:width*0.8,padding:0}} >
                        <TextInput style={{borderWidth:1,borderColor:"#2196F3",padding:0,flex:1,padding:5}} underlineColorAndroid="transparent"  placeholder={"输入需要查询的车牌号"}
                           onChangeText={(text)=>{
                               this.state.searchCarno=text;
                               //console.log("text: "+this.state.searchCarno)
                               this.loadData();
                           }}
                        />
                   </View>

                   <View style={{justifyContent:"flex-end",marginLeft:2}}>
                      <Button title="查询" onPress={this.loadData} />
                   </View>
               </View>

                <View style={{width:fullWidth}}>
                    <FlatList
                        data={this.state.refData}
                        extraData={this.state}
                        renderItem={({item}) =>
                            <DataRow item={item} onDelete={()=>{this.deleteData(item.id); }} reloadData={ this.loadData } />
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
                </View>

            </View>
        );
    }
}