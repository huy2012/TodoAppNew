import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Button, Dimensions,
    SafeAreaView, FlatList, TouchableOpacity, Image,
    useColorScheme, Alert, ListRenderItem
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';

const WIDTH: number = Dimensions.get("screen").width;

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'> ) => {

    const [data, setData] = React.useState(null);
    const isDarkMode = useColorScheme() === 'dark';
    const [refreshing, setRefreshing] = useState(false);
    const imgComplete: string = "https://icon-library.com/images/complete-icon/complete-icon-8.jpg";
    const imgUnComplete: string = "https://icon-library.com/images/incomplete-icon/incomplete-icon-24.jpg";

    useEffect(() => {
        getDATA()
    }, []);

    const getDATA = (): void => {
        axios.get("https://61c0221033f24c001782313a.mockapi.io/api/Todo")
            .then((response) => {
                setData(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    const removeTodo = (id: string): void => {
        axios.delete("https://61c0221033f24c001782313a.mockapi.io/api/Todo/" + id)
            .then((reponse) => {
                console.log(reponse.data);
                getDATA()
            })
            .catch(error => console.log(error))
    };

    const createTwoButtonAlert = (id: string): void =>
        Alert.alert('Notification', 'Your are update or delete ?', [
            {
                text: 'Update',
                onPress: () => navigation.navigate("EditScreen", { id: id }),
            },
            { text: 'Delete', onPress: () => removeTodo(id), style: 'cancel' },
        ]);


    const renderItem = ( { item }: any ) => (
        <View style={styles.item_todo} >
            <TouchableOpacity onPress={() => createTwoButtonAlert(item.id)}
                style={{ 
                    width: WIDTH , 
                    flexDirection : "row",
                    justifyContent : "space-between"                
                    }} >
                <Text style={styles.name}> {item.name} </Text>
                <Image source={{
                    uri : item.status == true ? imgComplete : imgUnComplete }}
                style = {{width : 50 , height : 50 , marginRight : 10 , marginBottom : 10}}
                />
            </TouchableOpacity>
        </View>
    );

    const refresh = (): void => {
        setRefreshing(true);
        getDATA()
        setRefreshing(false);
    };


    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                style={styles.list_layout}
                data={data}
                renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={() => refresh()}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                onPress = { () => navigation.navigate("AddScreen") }
                style={styles.touchableOpacityStyle}>
                <Image
                    //We are making FAB using TouchableOpacity with an image
                    //We are using online image here
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                    }}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: WIDTH,
    },

    item_todo: {
        flexDirection: "row",
        // backgroundColor: "red",
        marginTop : 10,
        // marginBottom : 10,
        borderBottomWidth: 1,
    },

    name: {
        fontSize: 27,
        marginLeft: 10,
        // alignSelf: "center"
    },

    list_layout: {
        width: WIDTH,
        alignSelf: "flex-start"
    },

    view_layout: {
        width: WIDTH,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },

    btn_radius: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "blue",
        // marginRight : 30,
        borderRadius: 30,
        // position: "relative",
        // bottom: 0,
        // right: 0,
    },

    btn_text: {
        fontSize: 18,
        color: "white"
    },

    edt_layout: {
        borderColor: "black",
        borderWidth: 1,
        width: 300,
        paddingLeft: 20
    },

    cb_layout: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    checkbox: {
        fontSize: 24
    },

    btn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "blue",
    },

    btn_xoa: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "blue",
        marginLeft: 40
    },

    icon_layout: {
        flexDirection: "row",
        marginRight: 5,
        alignItems: "center",

    },

    img: {
        width: 40,
        height: 40
    },

    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        // backgroundColor : "blue",
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },

});

export default HomeScreen;