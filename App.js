import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MainFrame from './MainFrame';
import { getInitialData } from './src/redux/actions/store_actions';
import store from './src/redux/store'
import { navigationRef } from './src/RootNavigation';

export default function App() {

  return (
    <NavigationContainer ref={navigationRef} theme={{colors: {background:'transparent'}}}>

    <Provider store={store}>
      <MainFrame />
    </Provider>
    </NavigationContainer>
    
  );
}
