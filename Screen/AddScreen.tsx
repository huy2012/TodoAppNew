import { StatusBar } from 'expo-status-bar';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image
} from "react-native";
import React , {useEffect , useState} from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import Checkbox from 'expo-checkbox';

const WIDTH: number = Dimensions.get("screen").width;

const AddScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'AddScreen'>) => {
    
    const [isSelected, setSelection] = React.useState(false);
    const [name, setName] = React.useState("");
    const [status, setStatus] = useState("Complete");

    const addTodo: Function = (): void => {
        if (name == "") {
            alert("Input name");
        } else {
            axios.post("https://61c0221033f24c001782313a.mockapi.io/api/Todo", {
                name: name,
                status: isSelected
            })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    navigation.replace("Home");
                })
                .catch(function (error) {
                    console.log(error);
                    
                });
        }
    };

    const changeStatus: Function = (): void => {
        if ( isSelected == true ){
            setSelection(false);
            setStatus("Unfinished");
        } else {
            setSelection(true);
            setStatus("Complete");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                marginBottom: 50
            }} > Add Todo </Text>

            <TextInput style={styles.edt_layout} placeholder={"Input name"}
                onChangeText={(text => setName(text))} value={name}
            />

            <TouchableOpacity style={styles.cb_layout} 
            onPress={() => changeStatus() } >
                <Checkbox
                style = {{alignSelf : "center"}}
                    value={isSelected}
                    onValueChange={(newValue) => {
                        setSelection(newValue)
                    }}
                />

                <Text style={styles.checkbox} > {status} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
                onPress={() => addTodo()}
            >
                <Text style={{ fontSize: 20, color: "white" }}> Add </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH,
    },

    edt_layout: {
        borderColor: "black",
        borderWidth: 1,
        width: 300,
        minHeight: 40,
        paddingLeft: 20,
        fontSize: 20
    },

    cb_layout: {
        marginTop: 10,
        width: 300,
        // height : 30,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",        
    },

    checkbox: {
        fontSize: 20,
        marginLeft: 5,
    },

    btn: {
        marginTop: 40,
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

});

export default AddScreen;