import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as RootNavigation from './src/RootNavigation';


import List from './src/Screens/List';
import Transfer from './src/Screens/Transfer';
import { useState } from 'react';

export default function MainFrame({ navigation }) {
    const Stack = createNativeStackNavigator();
    const [currentPage, setCurrentPage] = useState('List');


  return (
    <View  style={styles.container}>
    <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 0, y: 1}}
    colors={['#5650DE','#F00B51']}
    style={{height: '100%'}}
    >
      <View style={{height: '7%', borderRadius: 10, marginTop:50, marginBottom:30}}>
      </View>

      

        <View style={{marginBottom:20}}>
          <Text style={{fontSize: 28, textAlign: 'center', fontWeight:'bold'}}>FRUITMARKET</Text>
        </View>

        <Stack.Navigator initialRouteName='List' screenOptions={{headerShown:false}} >
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Transfer" component={Transfer} />
        </Stack.Navigator>
    

      <View style={{ marginTop:20, display:'flex', flexDirection:'row', justifyContent:'space-around', paddingBottom:20, padding:10}}>
        <Text onPress={()=>{RootNavigation.navigate('List'), setCurrentPage('List')}} style={currentPage==='List'?styles.selectedOption:styles.option}>List</Text>
        <Text onPress={()=>{RootNavigation.navigate('Transfer'), setCurrentPage('Transfer')}} style={currentPage==='Transfer'?styles.selectedOption:styles.option}>Transfer</Text>
      </View>

      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    marginTop: 0,
    marginBottom: 0,
    height: '100%',
    padding: 0
  },
  option: {
    fontSize:25, 
    alignSelf:'center',  
    padding:10, 
    fontWeight: 'bold',
    color: 'black'
  },
  selectedOption: {
    fontSize:25, 
    alignSelf:'center',  
    padding:10, 
    fontWeight: 'bold',
    color: 'white'
  }
});
