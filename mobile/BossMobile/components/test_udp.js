/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { View, Text } from 'react-native';
import dgram from 'react-native-udp';
// import Buffer from 'buffer';

// global.Buffer = global.Buffer || Buffer;

export default class TestUdp extends Component {
    socket = null;

    constructor(props) {
        super(props);
    }

    byteArrayToString(byteArray) {
        
        var utf16 = escape(decodeURIComponent(str));
        return utf16;
    }

    toByteArray(string) {
        var utf8 = unescape(encodeURIComponent(string));
        var arr = [];
        for (var i = 0; i < utf8.length; i++) {
            arr.push(utf8.charCodeAt(i));
        }
        return arr;
        //     console.log("\n\nTO BYTE ARRAY - 1\n");
        //     var myBuffer = [];
        //     console.log("\n\nTO BYTE ARRAY - 2\n");
        //     var buffer = new Buffer.from(string, 'utf16le');
        //     console.log("\n\nTO BYTE ARRAY - 3\n");
        //     for (var i = 0; i < buffer.length; i++) {
        //         myBuffer.push(buffer[i]);
        //     }
        //     console.log("\n\nTO BYTE ARRAY - 4\n");
        //     return myBuffer;
    }

    componentWillUnmount(){
        this.socket.close();
        console.log("\n\n. . . . . END . . . . . \n\n");
    }

    componentDidMount() {
        console.log("\n\nCOMPONENT DID MOUNT\n");
        this.initUdpSocket();
    }

    /**
     * Create socket and listen for messages
     */
    initUdpSocket() {
        // console.log('INIT UDP SOCKET');
        this.socket = dgram.createSocket({
            type: 'udp4',
            reusePort: true,
        });

        this.socket.on('error', (err) => {
            console.log(`socket error:\n${err.stack}`);
            this.socket.close();
        });

        this.socket.on('message', (msg, rinfo) => {
            // console.log(`socket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            console.log(`\nGOT MESSAGE!\nlength: ${msg.length}\nfirst: ${msg[0]} \n last: ${msg[msg.length-1]}`);
        });

        this.socket.on('listening', () => {
            const address = this.socket.address();
            console.log(`socket listening ${address.address}:${address.port}`);
            this.sendMessage();
        });

        this.socket.bind(4444, '0.0.0.0');


    }

    sendMessage(){
        // SEND UDP PACKAGE
        console.log("\n\nWILL SEND\n");
        let msg = 'teste';
        let msg64 = this.toByteArray(msg);
        console.log(msg64);
        this.socket.send(msg64, 0, msg64.length, 4444, '192.168.0.102', (err) => {
            if (err) {throw err;}
            console.log('message sent');
        });
        console.log("\n\nAFTER SEND\n");
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{alignContent: 'center'}}>
                    HELLO COMPONENT TEST-UDP
                </Text>
            </View>
        );
    }

}
