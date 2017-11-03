/**
 * Created by sybil052 on 2017/6/19.
 */
import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class AlertSelected extends Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return(
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={{marginTop: 22}}>
                    <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}