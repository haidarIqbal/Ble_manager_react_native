import React, {useState} from 'react';
import {Text, View, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function DetailsScreen({route, navigation}) {
  const {params} = route;

  const [isEnabled, setIsEnabled] = useState(params.item.connected);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
      <View style={styles.View}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{params.item.name}</Text>
        </View>
        <View style={styles.onOff}>
          <Text style={styles.onOffText}>TURN ON / OFF</Text>
          <Switch
            trackColor={{false: '#81b0ff', true: '#fff'}}
            thumbColor={isEnabled ? '#3BB7F2' : '#000'}
            ios_backgroundColor="#fff"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.forget}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home', {
                forget: params.item,
              })
            }>
            <Text style={styles.forgetText}>FORGET THIS DEVICE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: '#3BB7F2',
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    color: '#3BB7f2',
  },
  onOff: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#fff',
    borderBottomWidth: 5,
    marginTop: 35,
    paddingBottom: 20,
  },
  onOffText: {
    color: '#fff',
    fontSize: 20,
  },
  forget: {
    alignItems: 'center',
    alignContent: 'center',
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  forgetText: {
    color: 'red',
  },
});
