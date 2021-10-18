import React from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ENTRIES2} from '../data/entries';

class MainMenuScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  _onPress(key) {
    this.props.navigation.navigate('StoryDetails', key);
  }
  render() {
    let stories = [];
    for (let eachStory = 0; eachStory < ENTRIES2.length; eachStory++) {
      var imageUrl = ENTRIES2[eachStory].illustration;
      stories.push(
        <TouchableOpacity
          key={ENTRIES2[eachStory].id}
          identifier={ENTRIES2[eachStory].id}
          onPress={() => this._onPress(ENTRIES2[eachStory].id)}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              paddingBottom: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Image
              source={{uri: imageUrl}}
              style={{
                width: '100%',
                height: 400,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                top: '55%',
                left: '5%',
                fontSize: 32,
                width: '90%',
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'Niveau_smallCaps',
              }}>
              {ENTRIES2[eachStory].title}
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '70%',
                left: '5%',
                fontSize: 26,
                width: '80%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'Niveau_smallCaps',
              }}>
              By {ENTRIES2[eachStory].author}
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: 50,
                paddingHorizontal: 10,
                top: 20,
              }}>
              <Text style={{width: '75%', fontSize: 16, fontWeight: 'bold'}}>
                Romance, Comedy
              </Text>
              <Text
                style={{
                  justifyContent: 'flex-end',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {ENTRIES2[eachStory].posted}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 10,
                top: 8,
              }}>
              {ENTRIES2[eachStory].description}
            </Text>
            <View style={{top: 10, marginLeft: '90%'}}>
              <Icon name="ios-arrow-forward" size={26} />
            </View>
          </View>
        </TouchableOpacity>,
      );
    }
    return <ScrollView>{stories}</ScrollView>;
  }
}

export default MainMenuScreen;
