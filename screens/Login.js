import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';

const Login = ({navigation}) => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.IconsView}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="bluetooth" style={styles.iconStyle} />
        </TouchableOpacity>
        <View>
          <Text style={styles.TextStyles}>SCAN</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#3BB7F2',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  TextStyles: {
    flex: 0.5,
    color: '#fff',
    fontSize: 30,
    marginTop: 150,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  iconStyle: {
    color: '#3BB7F2',
    fontSize: 65,
  },
  scanButton: {
    borderRadius: 150,
    backgroundColor: '#fff',
    padding: 50,
  },
});
export default Login;
