import {  useRef } from 'react';
import {  FlatList, Text, View, Dimensions, StyleSheet } from 'react-native';
import store from '../redux/store';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default Carousel = ({data, onSelect}) => {

    const renderItem=({item})=>{
      
      return(
        <View  
        style={{
            height:height*0.15, width:(width)*0.7, marginRight:25, marginLeft:25, borderRadius:5,
            justifyContent:"center", borderWidth:1, borderColor:'white', alignItems:"center", backgroundColor:'rgba(255,255,255,0.15)',
            shadowColor:'black', shadowOffset:{width:10,height:25}, shadowOpacity:0.3, shadowRadius:5
            }}>
          <Text style={{fontSize: 30, textAlign:'center', color:'white'}}>{item.city}</Text>
        </View>
      )
    }
  
    const selection = (item)=>onSelect(item);
  
    const onViewableItemsChanged = ({viewableItems }) => {
      const currentItem = viewableItems[0];
      selection(currentItem.item);
    };
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 40,
    minimumViewTiem: 400,
    waitForInteraction: true,
  };
  
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);
  
    return (
      <View style={styles.container}>

       <FlatList
       style={{marginLeft:10,marginRight:30, padding:15}}
       decelerationRate={'fast'} showsHorizontalScrollIndicator={false} snapToInterval={(width)*0.815} snapToAlignment={'start'}
       data={data} renderItem={renderItem} keyExtractor={item=>item.id} 
       viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}     horizontal={true}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '10%',
      marginBottom: '10%',
    },
  });