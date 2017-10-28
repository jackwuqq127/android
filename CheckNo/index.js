import React,{Component} from 'react';
import  {AppRegistry,Text,Button,View } from 'react-native';
import {TabNavigator} from 'react-navigation';

import CheckNo from "./views/CheckNo";
import AddNo from "./views/AddNo";
import ShowDataBase from "./views/ShowDataBase"

const tabApp=TabNavigator({
    CheckNo:{screen: CheckNo},
    AddNo:{screen: AddNo},
    ShowDataBase:{screen:ShowDataBase}
},{
    initialRouteName:"AddNo",
    order:["AddNo","CheckNo","ShowDataBase"],
    animationEnabled: true, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#ff8500', // 文字和图片选中颜色
        inactiveTintColor: '#fff', // 文字和图片未选中颜色
        labelStyle: {
            fontSize: 15, // 文字大小
        },
        style:{
            height:40
        }
    }
});
AppRegistry.registerComponent('CheckNo', () => tabApp);