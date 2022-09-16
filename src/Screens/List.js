import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Card from '../Components/Card';
import { getAllStores, getInitialData } from '../redux/actions/store_actions';
import { GET_STORES } from '../redux/actions/types';
import store from '../redux/store';
import { Get } from '../utils/axiosUtils';

function List({storess}) {

  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const selectCity = (city) => {
    setSelectedCity(city);
    setShowModal(!showModal);
  }

  useEffect(() => {
    const request = async() =>{
      try {
        const res = await Get('/stores');
        if(res){
          const modified = res.data.data.map((store) => {
            let total = 0
            return(
              {
                ...store, 
                total: store.stock.reduce((a,b) => total = total+b.quantity,0)
               }
            )
          });

          await store.dispatch(
                  {
                      type: GET_STORES,
                      payload: modified
                  }
              )

        setStores(modified)
          }
      }catch(e){

      }
          

    }
    request();

  }, [])

  useEffect(()=>{
    setStores(storess)
    console.log('a',storess)
  },[storess])
  return (
    <TouchableOpacity 
    activeOpacity={0.2} 
    onPressOut={() => {setShowModal(!showModal)}}
  >
        <View style={{marginBottom:10, marginTop:50}}>

          {stores.map((store) => 
            <Card onSelect={selectCity} store={store} key={store.city}/>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setShowModal(!showModal);
            }}
          >


            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{selectedCity.city}</Text>
                  <FlatList
                  style={{margin:20}}
                  data={selectedCity.stock}
                  scrollEnabled={true}
                  renderItem={({item}) => 
                  <View style={{margin: 10, padding:10, flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, width:220}}>

                  <Text style={{fontSize:20}}>{item.fruit} : </Text><Text style={{fontSize:20,}}>{item.quantity}</Text>
                  </View>
                  }/>
            </View>
            </View>


          </Modal>
        </View>
        </TouchableOpacity>

        
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
    width: 350,
    height: 400,
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
    fontSize:25,
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return { storess: state.store.stores };
} 

export default connect(mapStateToProps)(List);

