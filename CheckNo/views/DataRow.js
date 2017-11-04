import React,{Component} from "react";
import {View,Text,Button,TouchableHighlight,Modal,StyleSheet,TextInput,Linking } from "react-native";
import Sqlite from "../Util/sqlite";

var Dimensions=require("Dimensions");
export default class DataRow extends Component{
    constructor() {
        super();
        this.carnoValue="";
        this.cellphoneValue="";
        this.name="";
        this.sqlite=new  Sqlite();
    }
    componentWillMount(){
        this.setState({
            modalVisible: false,
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
    onSubmit =()=>{ //监控  "录入"  按钮事件，组装输入框参数
        var flag=true;
        if(this.state.carno.length==0){
            this.setState({
                textCarNoInputColor:"red"
            });
            flag=false;
        }

        if(this.state.name.length==0){
            this.setState({
                textNameColor:"red"
            });
            flag=false;
        }

        if(this.state.cellphone.length==0){
            this.setState({
                textCellphoneNoInputColor:"red"
            });
            flag=false;
        }

        if(this.state.companyunit.length==0){
            this.setState({
                textCompanyunitColor:"red"
            });
            flag=false;
        }

        if(flag){
            this.submiAddData();
        }
    }

    submiAddData (){
        this.sqlite.update("update cars set name=?,carno=?,cellphone=?,companyunit=? where id=?"
            ,[this.state.name,this.state.carno,this.state.cellphone,this.state.companyunit,this.state.carid],(msg)=>{
            this.props.reloadData();
        });
        this.setState({carno:"",cellphone:"", name:"",companyunit:"",modalVisible:false});
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    edit=()=>{
       this.setModalVisible(true);
       var item=this.props.item;
       console.log(item.id)
       this.setState({
           carno:item.carno,
           cellphone:item.cellphone,
           name:item.name,
           carid:item.id,
           companyunit:item.companyunit
       });
    }


    render(){
        return(
            <View style={{flexDirection:"row",backgroundColor:"#e5e5e5",marginTop:12,justifyContent:"space-between",alignItems:"center",paddingLeft:5,paddingRight:5}}>
                <View style={{width:200}}>
                    <Text>
                        {this.props.item.carno} {this.props.item.name}
                    </Text>
                    <Text>
                        {this.props.item.cellphone}
                    </Text>
                    <Text>
                        {this.props.item.companyunit}
                    </Text>
                </View>

                <View  style={{flexDirection:"row",justifyContent:"space-between",width:140}}>
                    <TouchableHighlight onPress={ ()=>{ this.props.onDelete(this.props.item.id) }}
                                        style={[styles.touchButton,{ backgroundColor:"red" }]}
                    >
                        <Text style={{color:"#fff",fontWeight:"bold"}}>删除</Text>
                    </TouchableHighlight>


                    <TouchableHighlight onPress={ ()=>{ this.edit() } }
                                        style={[styles.touchButton,{backgroundColor:"orange" }]}
                    >
                        <Text style={{color:"#fff",fontWeight:"bold"}}>修改</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={ ()=>Linking.openURL("tel:"+this.props.item.cellphone).catch(err => console.error('An error occurred', err)) }
                                        style={[styles.touchButton,{backgroundColor:"green"}]}
                    >
                        <Text style={{color:"#fff",fontWeight:"bold"}}>打电话</Text>
                    </TouchableHighlight>
                </View>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}

                >
                    <View style={{
                        flex:1,
                        backgroundColor:"rgba(0,0,0,0.3)",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:120
                    }}>
                        <View style={styles.form} >
                            <View style={styles.group} >
                                <View style={{ justifyContent: 'center'}}>
                                    <Text style={{ width:80,textAlign:"right"}} >车牌号：</Text>
                                </View>

                                <TextInput style={[styles.textInput,{borderColor:this.state.textCarNoInputColor}]}
                                           underlineColorAndroid="transparent" placeholder={"输入需要录入的车牌号"} value={this.state.carno}
                                           onChangeText={(text)=>{
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
                                    <Text style={{ width:80,textAlign:"right"}} >车主姓名：</Text>
                                </View>

                                <TextInput style={[styles.textInput,{borderColor:this.state.textNameColor}]} underlineColorAndroid="transparent"
                                           placeholder={"输入车主姓名"} value={this.state.name}
                                           onChangeText={(text)=>{
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
                                    <Text style={{width:80,textAlign:"right" }} >车主电话：</Text>
                                </View>

                                <TextInput style={[styles.textInput,{borderColor:this.state.textCellphoneNoInputColor}]}
                                           underlineColorAndroid="transparent" placeholder={"车主联系电话"} value={this.state.cellphone}
                                           onChangeText={(text)=>{
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
                                    <Text style={{width:80,textAlign:"right" }} >单位/公司：</Text>
                                </View>

                                <TextInput style={[styles.textInput,{borderColor:this.state.textCompanyunitColor}]}
                                           underlineColorAndroid="transparent" placeholder={"单位/公司"} value={this.state.companyunit}
                                           onChangeText={(text)=>{
                                               this.state.companyunit=text;

                                               if(text.length==0){
                                                   this.setState({ textCompanyunitColor:"red" });
                                               }else{
                                                   this.setState({textCompanyunitColor:"#ccc" });
                                               }
                                           }}
                                />
                            </View>


                            <View style={[styles.group,{width:150,justifyContent:"space-around"}]}>

                                <TouchableHighlight onPress={ ()=>{ this.setState({modalVisible:false}) } }
                                                    style={[styles.touchButton,{ backgroundColor:"#ccc",width:60,height:40 }]}  >
                                    <Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}>取消</Text>
                                </TouchableHighlight>


                                <TouchableHighlight onPress={this.onSubmit}  style={[styles.touchButton,{ backgroundColor:"orange",width:60,height:40 }]} >
                                    <Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}>提交</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

var {height,width} = Dimensions.get('window');
var wp=0.85;
let inputWidth=width
const styles=StyleSheet.create({
    touchButton:{
        alignItems:"center",justifyContent:"center",padding:5,borderRadius:2
    },
    form:{
        paddingBottom:12,
        width:width*wp,
        justifyContent:"center",alignItems:"center",
        backgroundColor:"rgb(255,255,255)",
        borderRadius:5,
        height:300
    },
    group:{
        flexDirection:"row",
        width:width*wp,
        marginTop:12,
        justifyContent:"center"
    },
    textInput:{
        borderWidth:1,
        padding:0,padding:5,
        width:width*wp-100
    },
    loginButton:{
        justifyContent:"flex-start",
        width:200,
        marginLeft:width*((1-wp)/2)+80,
        marginTop:12
    }
});