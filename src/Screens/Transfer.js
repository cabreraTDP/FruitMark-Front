import { useEffect, useState } from 'react';
import { StyleSheet, View,  Text, Button, TouchableOpacity, Modal, Pressable, TextInput} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { connect } from 'react-redux';
import Carousel from '../Components/Carousel';
import { AUTH_LOGIN, SET_AVAILABLE_STORES, SET_LIST_STORES, SET_SOURCE, SET_TARGET, STORE_TRANSFER } from '../redux/actions/types';
import store from '../redux/store';
import { Get, Post } from '../utils/axiosUtils';
import Dropdown from 'react-native-input-select';
import React from 'react';
import NumericInput from 'react-native-numeric-input'
import {PickerIOS} from '@react-native-picker/picker';
import { navigationRef } from '../RootNavigation';

function Transfer({sourceStore, isLoggedIn}) {

  const [listStores, setListStores] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);

  const [showModalTransfer, setShowModalTransfer] = useState(false);
  const [showModalAuth, setShowModalTransferAuth] = useState(false);

  const [selectedFruit, setSelectedFruit] = useState('banana');
  const [numberOfFruits, setNumberOfFruits] = useState(1);

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const request = async() =>{
      const resp = await Get('/stores/');
      const list = resp.data.data.map((store, i)=>{
        return({
          city: store.city,
          id: i
        })
      })

      store.dispatch({
        type: SET_LIST_STORES,
        payload: list
      })

      store.dispatch({
        type: SET_AVAILABLE_STORES,
        payload: [...list.slice(1)]
      });

      setAvailableStores([...list.slice(1)])
      setListStores(list)

    }

    request();

  }, []);

  useEffect(()=>{
    if(!isLoggedIn){
      setShowModalTransferAuth(true)
    }
  },[isLoggedIn])



  useEffect(()=> {
    setAvailableStores([...store.getState().store.available_stores.filter((item) => item.id!=sourceStore.id)]);
  },[sourceStore])

  const selectSourceStore = (item) =>{
    const listStores = store.getState().store.list;
    store.dispatch({
      type: SET_SOURCE,
      payload: item
    })
    store.dispatch({
      type: SET_AVAILABLE_STORES,
      payload: [...listStores.filter(storei=>storei.id!=item.key)]
    });

  }

  const selectTargetStore = (item) =>{
    store.dispatch({
      type: SET_TARGET,
      payload: item
    });

  }

  const Transfer = async() => {
    const source = store.getState().store.target_store.city;
    const target = store.getState().store.source_store.city;
    const token = store.getState().auth.token
    const body = {
      sourceStoreCity: source,
      targetStoreCity: target,
      fruit: selectedFruit,
      quantity: numberOfFruits
    }
    const res = await Post('/stores/transfer',body,{},true,token);
    if(res){
      store.dispatch({
        type: STORE_TRANSFER,
        payload: {
          city: target,
          fruit: selectedFruit,
          numberOfFruits
        }
      });
      store.dispatch({
        type: STORE_TRANSFER,
        payload: {
          city: source,
          fruit: selectedFruit,
          numberOfFruits: (numberOfFruits*(-1))
        }
      });
    }else{
      console.log('failed')
    }


    setShowModalTransfer(!showModalTransfer)
  }

  const login = async() =>{
    const body = {
      user,
      password: pass
    }

    const res = await Post('/users/signIn', body);
    if(res){
      store.dispatch({
        type: AUTH_LOGIN,
        payload: {
          token: res.data.data
        }
      })
      setShowModalTransferAuth(!showModalAuth)
    }
  }

  return (
      <View style={{height: '100%'}}>

        <Carousel onSelect={(item) => selectSourceStore(item)} data={listStores}/>
        <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold'}}>TO</Text>
        <Carousel onSelect={(item)=>selectTargetStore(item)} data={availableStores}/>

        <TouchableOpacity onPress={()=>setShowModalTransfer(!showModalTransfer)} style={{borderColor:'violet', borderWidth:2.5, backgroundColor:'rgba(255,255,255,0.7)', width:85, height:50, alignContent:'center', marginLeft: '35%', marginRight:10, padding: 5, borderRadius:50}}>
          <Text style={{textAlign:'center', fontSize: 25, color:'black', fontWeight:'bold'}}>></Text>
        </TouchableOpacity>

        <Modal

        animationType="slide"
        transparent={true}
        visible={showModalTransfer}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModalTransfer(!showModalTransfer);
        }}
      >
       <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select the fruit and quantity</Text>
          <View style={{marginBottom:30}}>
            <PickerIOS
              style={{ width:250}}
              mode={'dropdown'}
              selectedValue={selectedFruit}
              onValueChange={(itemValue) =>setSelectedFruit(itemValue)}
              itemStyle={{
                fontSize: 25,
                height: 200,
                color: 'black',
                textAlign: 'center',
                fontWeight: 'bold'}}>
                <PickerIOS.Item label="Banana" value="banana" />
                <PickerIOS.Item label="Strawberry" value="strawberry" />
                <PickerIOS.Item label="Apple" value="apple" />
                <PickerIOS.Item label="Cherry" value="cherry" />
                <PickerIOS.Item label="Orange" value="orange" />

            </PickerIOS>

            <NumericInput 
            value={numberOfFruits}
            onChange={value => setNumberOfFruits(value)} 
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>
          </View>
            

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => Transfer()}
            >
              <Text style={styles.textStyle}>Transfer</Text>
            </Pressable>
          </View>
        </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalAuth}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShowModalTransfer(!showModalAuth);
          }}
          >
          <View style={{...styles.centeredView}}>
            <View style={{...styles.modalView}}>
            <Text onPress={()=>navigationRef.navigate('List')} style={{marginLeft: '90%', fontSize: 20, fontWeight:'bold'}}>X</Text>
                <Text style={styles.modalText}>You need to login.</Text>


            <View>
              <Text style={{fontSize:15, marginTop:20, marginLeft:20, marginBottom:5, width:240, textAlign:'left'}}>USER</Text>
              <TextInput
                style={{    
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  width: 240
                }}
                onChangeText={(value)=>setUser(value)}
                value={user}
              />    
              <Text style={{fontSize:15, marginTop:20, marginLeft:20, marginBottom:5, width:240, textAlign:'left'}}>PASSWORD</Text>
              <TextInput
                style={{    
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  width: 240
                }}
                onChangeText={(value)=>setPass(value)}
                value={pass}
                secureTextEntry={true}
              />    
            </View>          
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => login()}
            >
              <Text style={styles.textStyle}>Log In</Text>
            </Pressable>
          </View>
        </View>
        </Modal>

      
      </View>

  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    margin:20,
    backgroundColor: "white",
    width:240,
    borderColor: 'black',
    borderWidth:1,
    borderRadius: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 0,
    textAlign: "center",
    fontSize:20
  }
});

function mapStateToProps(state) {
  return { sourceStore: state.store.source_store, isLoggedIn: state.auth.isSignedIn };
} 

export default connect(mapStateToProps)(Transfer);



