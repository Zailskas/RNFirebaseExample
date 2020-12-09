import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import showItemScreen from './src/screens/showItemScreen';
import addItemScreen from './src/screens/addItemScreen';
import deleteItemScreen from './src/screens/deleteItemScreen';
import updateItemScreen from './src/screens/updateItemScreen';
import loginScreen from './src/screens/loginScreen';
import registerScreen from './src/screens/registerScreen';
//import loginScreen from './src/screens/loginScreen';
//import registerScreen from './src/screens/registerScreen';
import combineReducers from './store/reducers/index';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PrivateContainer = () => {
  return (
    <Tab.Navigator
      initialRoute="SHOW"
      tabBarOptions={{activeTintColor: '#deaf04'}}>
      <Tab.Screen
        name="SHOW"
        component={showItemScreen}
        options={{
          tabBarLabel: 'SHOW',
        }}
      />
      <Tab.Screen
        name="ADD"
        component={addItemScreen}
        options={{
          tabBarLabel: 'ADD',
        }}
      />
      <Tab.Screen
        name="DELETE"
        component={deleteItemScreen}
        options={{
          tabBarLabel: 'DELETE',
        }}
      />
    </Tab.Navigator>
  );
};
/*const UpdateContainer = () => {
  return (
    <Stack.Navigator initialRouteName="UPDATE">
      <Stack.Screen
        name="Update"
        component={updateItemScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};*/
const store = createStore(combineReducers, applyMiddleware(ReduxThunk));
//console.log('Before', store.getState());
//store.dispatch(addCar('BMW', 'M3', 1));
//store.dispatch(addCar('BMW', 'M5', 2));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login_page">
            <Stack.Screen
              name="Login_page"
              component={loginScreen}
              options={{title: 'Login page', headerShown: false}}
            />
            <Stack.Screen
              name="Register_page"
              component={registerScreen}
              options={{title: 'Register page', headerShown: false}}
            />
            <Stack.Screen
              name="PrivatePage"
              component={PrivateContainer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Update"
              component={updateItemScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
