import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
export default function HomeScreen({route, navigation}) {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([
    {id: 'abc', name: 'csk'},
    {
      id: 'bbn',
      name: 'test',
      connected: true,
      peripheral: {
        id: 'abcc',
      },
    },
  ]);
  useEffect(
    prevProps => {
      BleManager.start({showAlert: false});

      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      );
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      );

      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(result => {
          if (result) {
            console.log('Permission is OK');
            retrieveConnected();
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(result => {
              if (result) {
                console.log('User accept');
                retrieveConnected();
              } else {
                console.log('User refuse');
              }
            });
          }
        });
      }
      console.log('props', prevProps, route.params);
      if (route.params?.forget) {
        const result = route.params?.forget;
        console.log('result', result);
        handleDisconnectedPeripheral(result);
      }
      return () => {
        console.log('unmount');
        bleManagerEmitter.removeListener(
          'BleManagerDiscoverPeripheral',
          handleDiscoverPeripheral,
        );
        bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
        bleManagerEmitter.removeListener(
          'BleManagerDisconnectPeripheral',
          handleDisconnectedPeripheral,
        );
        bleManagerEmitter.removeListener(
          'BleManagerDidUpdateValueForCharacteristic',
          handleUpdateValueForCharacteristic,
        );
      };
    },
    [route.params],
  );
  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  };

  const handleDisconnectedPeripheral = data => {
    console.log(data);
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  };

  const handleUpdateValueForCharacteristic = data => {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
    );
  };

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  };
  const handleDiscoverPeripheral = peripheral => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  return (
    <View style={styles.View}>
      <View style={styles.header}>
        <Text style={styles.headerText}>List of scanned devices</Text>
      </View>
      <FlatList
        data={list}
        renderItem={({item}) =>
          renderItem(item, navigation, () => handleDisconnectedPeripheral)
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const renderItem = (item, navigation, handleDisconnectedPeripheral) => {
  const color = item.connected ? '#21E869' : 'red';
  return (
    <View style={styles.list}>
      <TouchableOpacity
        style={styles.eachItem}
        onPress={() => {
          navigation.navigate('Details', {
            item: item,
          });
        }}>
        <View style={styles.ItemName}>
          <Text style={styles.ItemNameText}>{item.id}</Text>
        </View>
        <View style={styles.ItemConnect}>
          <Text style={[styles.connect, {color: color}]}>Connect</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
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
  list: {
    alignItems: 'center',
  },
  eachItem: {
    backgroundColor: '#fff',
    width: 260,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 15,
  },
  ItemName: {
    alignItems: 'center',
  },
  ItemNameText: {
    fontSize: 25,
    color: '#3BB7F2',
    fontWeight: 'bold',
  },
  ItemConnect: {
    flex: 1,
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  connect: {
    color: '#21E869',
    fontWeight: 'bold',
  },
});
