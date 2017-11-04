import React,{Component} from"react";
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
let database_name = "/sdcard/CheckNo/data.db";//数据库文件
let database_version = "1.0";//版本号
let database_displayname = "MySQLite";
let database_size = -1;//-1应该是表示无限制
let db;

export default class  SQLite extends Component{
    componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
    }
    open(){
        db = SQLiteStorage.openDatabase(database_name,database_version,database_displayname,database_size,()=>{
            this._successCB('open');
        },
        (err)=>{
            this._errorCB('open',err);
        });
        return db;
    }

    close(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }

    drop(){
        if (!db) {this.open(); }
        db.transaction((tx)=> { //删表
            tx.executeSql('drop table cars', [], ()=> {
                this._successCB('executeSql');
            }, (err)=> {
                this._errorCB('executeSql', err);
            });
        }, (err)=> {
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        });
    }

    createTable(){
        if (!db) {this.open(); }
        //建表
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS cars(' +
                'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
                'name varchar,carno varchar,' +
                'cellphone varchar,' +
                'companyunit varchar)', [], ()=> {
                    this._successCB('executeSql');
                }, (err)=> {
                    this._errorCB('executeSql', err);
                });
        }, (err)=> {
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        });
        //console.log("数据库初始化成功！");
    }
    update(sql,params,callback){
        if (!db) { this.open(); }
        db.transaction((tx)=>{
            tx.executeSql(sql,params,callback,callback);
        });
    }

    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    }
    _errorCB(name, err){
        console.log("SQLiteStorage "+name);
    }
    render(){
        return null;
    }
};