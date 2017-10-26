import React from 'react';
import {
    AppRegistry,
    Text,View,Button
} from 'react-native';
//导入stack导航组件
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component { //HomeScreen 页面

    static navigationOptions = {
        title: 'StackNavigator',//标题
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => { //点击按钮时跳转到 ChatScreen页面，并传递参数：{user:'吴超'}
                        navigate('Chat',{user:'吴超'});
                    }}
                    title="Chat with Lucy"
                />
            </View>
        )
    }
}

class ChatScreen extends React.Component { //ChatScreen 页面
    static navigationOptions = {
        title: 'This is the Chat View',
    };
    render() {
        const { params } = this.props.navigation.state; //当页面加载时获取传递过来的参数
        let textPage=[];
        console.log(params)
        /*for(var p of params){
            console.log(p)
        }*/
        return (
            <View>
                <Text>Let us to Char. have get a params for => user: {params.user}</Text>
            </View>
        );
    }
}
//导航注册
const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen }
});

AppRegistry.registerComponent('CheckNo', () => SimpleApp);