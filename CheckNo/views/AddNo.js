import React,{Component} from"react";
import {Text,Button,View,TextInput,Animated,NativeModules,StyleSheet,FlatList,RefreshControl } from "react-native";
import Sqlite from "../Util/sqlite";
import DataRow from "./DataRow";

var Carmgr = NativeModules.Carmgr;
var Dimensions=require("Dimensions");
let db;

export default class AddNo extends  Component{
    static navigationOptions={
        tabBarLabel:'录入'
    }

    constructor(){
        super();
        this.carnoValue="";
        this.cellphoneValue="";
        this.name="";
        this.companyunit="";
        this.sqlite=new  Sqlite();
        //this.sqlite.drop();
        this.sqlite.createTable();
        console.log("构造函数执行……");
    }

    componentWillMount (){
        this.setState({
            refData:[],
            textCellphoneNoInputColor:"#ccc",
            textCarNoInputColor:"#ccc",
            textNameColor:"#ccc",
            textCompanyunitColor:"#ccc",
            carno:"",
            cellphone:"",
            name:"",
            companyunit:""
        });
    }

    onWrite =()=>{ //监控  "录入"  按钮事件，组装输入框参数
        var flag=true;
        if(this.carnoValue.length==0){
            this.setState({
                textCarNoInputColor:"red"
            });
            flag=false;
        }

        if(this.name.length==0){
            this.setState({
                textNameColor:"red"
            });
            flag=false;
        }

        if(this.cellphoneValue.length==0){
            this.setState({
                textCellphoneNoInputColor:"red"
            });
            flag=false;
        }

        if(this.companyunit.length==0){
            this.setState({
                textCompanyunitColor:"red"
            });
            flag=false;
        }

        if(flag){
            this.submiAddData();
        }
    }

    loadData = ()=>{
        if(db==null){ db=this.sqlite.open(); }
        let srcData=[];
        let get= db.transaction((tx)=>{
            tx.executeSql("select id,name,carno,cellphone,companyunit from cars where id=(select max(id) from cars)",[],(tx,rs)=>{
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

    submiAddData (){
        this.sqlite.update("insert into cars(name,carno,cellphone,companyunit) " +
            "values(?,?,?,?)",[this.name,this.carnoValue,this.cellphoneValue,this.companyunit],(msg)=>{
            this.loadData();
        });
        this.setState({carno:"",cellphone:"", name:"",companyunit:"" });
    }
    deleteData =(id)=>{
        this.sqlite.update("delete from cars where id=?",[id],this.loadData);
    }
    render(){
        const { navigate } = this.props.navigation;
        var {height,width} = Dimensions.get('window');
        var wp=0.85;
        let fullWidth=width;
        width=width-75;
        return (
            <View style={{justifyContent:"center",marginTop:5,width:fullWidth }}>
                <View style={styles.form} >
                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{ width:95,textAlign:"right",fontSize:16}} >车牌号：</Text>
                        </View>

                         <TextInput style={[styles.textInput,{borderColor:this.state.textCarNoInputColor}]}
                                    underlineColorAndroid="transparent" placeholder={"输入需要录入的车牌号"} value={this.state.carno}
                                    onChangeText={(text)=>{
                                this.carnoValue=text;
                                this.state.carno=text;
                                if(text.length==0){
                                    this.setState({ textCarNoInputColor:"red"});
                                }else{
                                    this.setState({ textCarNoInputColor:"#ccc" });
                                }
                            }}
                        />
                    </View>

                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{ width:95,textAlign:"right",fontSize:16}} >车主姓名：</Text>
                        </View>

                        <TextInput style={[styles.textInput,{borderColor:this.state.textNameColor}]} underlineColorAndroid="transparent"
                                   placeholder={"输入车主姓名"} value={this.state.name}
                                   onChangeText={(text)=>{
                                       this.name=text;
                                       this.state.name=text;
                                       if(text.length==0){
                                           this.setState({ textNameColor:"red" });
                                       }else{
                                           this.setState({ textNameColor:"#ccc" });
                                       }
                                   }}
                        />
                    </View>

                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{width:95,textAlign:"right",fontSize:16 }} >车主电话：</Text>
                        </View>

                        <TextInput style={[styles.textInput,{borderColor:this.state.textCellphoneNoInputColor}]}
                                   underlineColorAndroid="transparent" placeholder={"车主联系电话"} value={this.state.cellphone}
                           onChangeText={(text)=>{
                               this.cellphoneValue=text;
                               this.state.cellphone=text;

                               if(text.length==0){
                                   this.setState({ textCellphoneNoInputColor:"red" });
                               }else{
                                   this.setState({textCellphoneNoInputColor:"#ccc" });
                               }
                           }}
                        />
                    </View>


                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{width:95,textAlign:"right",fontSize:16 }} >单位/公司：</Text>
                        </View>

                        <TextInput style={[styles.textInput,{borderColor:this.state.textCompanyunitColor}]}
                                   underlineColorAndroid="transparent" placeholder={"单位/公司"} value={this.state.companyunit}
                                   onChangeText={(text)=>{
                                       this.companyunit=text;
                                       this.state.companyunit=text;

                                       if(text.length==0){
                                           this.setState({ textCompanyunitColor:"red" });
                                       }else{
                                           this.setState({textCompanyunitColor:"#ccc" });
                                       }
                                   }}
                        />
                    </View>


                </View>

                <View style={styles.loginButton}>
                    <Button title="录入" onPress={this.onWrite} />
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

var {height,width} = Dimensions.get('window');
var wp=0.85;
width=width-95;
const styles=StyleSheet.create({
    form:{
        padding:0,
        flexDirection:"column",
        width:width*wp,
        justifyContent:"center",
        marginLeft:width*((1-wp)/2)
    },
    group:{
        flexDirection:"row",
        width:width*wp,
        marginTop:12
    },
    textInput:{
        borderWidth:1,
        padding:0,padding:5,
        width:width*wp
    },
    loginButton:{
        justifyContent:"flex-end",
        marginLeft:2,
        width:width*wp,
        marginLeft:width*((1-wp)/2)+75,
        marginTop:12
    }
});