import React,{Component} from"react";
import {Text,Button,View,TextInput,Animated,NativeModules,StyleSheet } from "react-native";


var Carmgr = NativeModules.Carmgr;
var Dimensions=require("Dimensions");

export default class AddNo extends  Component{
    static navigationOptions={
        tabBarLabel:'录入'
    }

    constructor(){
        super();
        this.carnoValue="";
        this.cellphoneValue="";
        this.name="";
    }

    componentWillMount (){
        this.setState({
            textCellphoneNoInputColor:"#ccc",
            textCarNoInputColor:"#ccc",
            textNameColor:"#ccc"
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

        if(this.name.length==0){
            this.setState({
                textCellphoneNoInputColor:"red"
            });
            flag=false;
        }
        if(flag){
            this.submiAddData(this.carnoValue,this.cellphoneValue);
        }
    }

    submiAddData (carno,phoneno){
        Carmgr.saveCar( this.name,this.carnoValue,this.cellphoneValue,(name,carno,phoneno)=>{
            console.log(name)
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        var {height,width} = Dimensions.get('window');
        var wp=0.85;
        width=width-75;
        return (
            <View style={{
                flexDirection:"column",justifyContent:"center",marginTop:5,width:width
            }}>
                <View style={styles.form} >
                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{ width:75,textAlign:"right"}} >车牌号：</Text>
                        </View>

                         <TextInput style={[styles.textInput,{borderColor:this.state.textCarNoInputColor}]} underlineColorAndroid="transparent" placeholder={"输入需要录入的车牌号"}
                            onChangeText={(text)=>{
                                this.carnoValue=text;
                                if(text.length==0){
                                    this.setState({
                                        textCarNoInputColor:"red"
                                    });
                                }else{
                                    this.setState({
                                        textCarNoInputColor:"#ccc"
                                    });
                                }
                            }}
                        />
                    </View>

                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{ width:75,textAlign:"right"}} >车主姓名：</Text>
                        </View>

                        <TextInput style={[styles.textInput,{borderColor:this.state.textNameColor}]} underlineColorAndroid="transparent"
                                   placeholder={"输入车主姓名"}
                                   onChangeText={(text)=>{
                                       this.name=text;
                                       if(text.length==0){
                                           this.setState({
                                               textNameColor:"red"
                                           });
                                       }else{
                                           this.setState({
                                               textNameColor:"#ccc"
                                           });
                                       }
                                   }}
                        />
                    </View>

                    <View style={styles.group} >
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{width:75,textAlign:"right" }} >车主电话：</Text>
                        </View>

                        <TextInput style={[styles.textInput,{borderColor:this.state.textCellphoneNoInputColor}]} underlineColorAndroid="transparent" placeholder={"车主联系电话"}
                           onChangeText={(text)=>{
                               this.cellphoneValue=text;
                               if(text.length==0){
                                   this.setState({
                                       textCellphoneNoInputColor:"red"
                                   });
                               }else{
                                   this.setState({
                                       textCellphoneNoInputColor:"#ccc"
                                   });
                               }
                           }}
                        />
                    </View>
                </View>

                <View style={styles.loginButton}>
                    <Button title="录入" onPress={this.onWrite} />
                </View>
            </View>
        );
    }
}

var {height,width} = Dimensions.get('window');
var wp=0.85;
width=width-75;
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