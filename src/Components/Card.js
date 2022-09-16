import { useState } from 'react';
import { Text, View } from 'react-native';

export default Card = ({store, onSelect}) => {
    return(
      <View onTouchEnd={()=>onSelect(store)}
            style={{
                margin: 15, borderColor:'black', borderWidth:2, 
                  borderColor:'purple', borderRadius:20, padding:15, 
                  backgroundColor:'white', opacity:0.9, flexDirection:'row', justifyContent:'space-between'
                  }}
                  shadowColor='blue'
                  shadowOpacity={0.5} 
                  shadowOffset={{height:6,width:3}}
                  shadowRadius={4}
                  elevation={11}>
        <Text style={{fontSize: 18, fontWeight:'bold', padding:5, marginLeft:15}}>{store.city}</Text>
        <View style={{backgroundColor: 'white', borderRadius:30,  width:50, padding:5, alignItems:'center', marginRight: 20}}
              shadowColor='black'
              shadowOpacity={0} 
              shadowOffset={{height:2,width:0}}
              shadowRadius={4}>
          <Text style={{fontSize: 18, fontWeight:'bold', textDecorationLine:'none',alignSelf:'center', alignContent:'center'}}> {store.total}</Text>
        </View>
      </View>
    )
  }