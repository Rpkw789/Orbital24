import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const tabs = [
  { label: 'Overview'},
  { label: 'Reviews'},
  { label: 'Products'},
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const { width } = Dimensions.get('window');
const tabWidth = (width) / tabs.length;

const AnimatedTutorTabSlider = ({setPage}) => {
  const router = useRouter(); // Hook into router object
  const [selectedIndex, setSelectedIndex] = useState(0);
  const translateX = useState(new Animated.Value(0))[0];

  const handleTabPress = (index) => {
    setSelectedIndex(index);
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
      speed: 14,
      bounciness: 2,
    }).start(() => {
      // After animation completes, navigate to corresponding screen based on index
      if (index == 0) {
        setPage(0);
      } else if (index == 1) {
        setPage(1);
      } else {
        setPage(2);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            onPress={() => handleTabPress(index)}
          >
            <Text style={styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX }],
              width: tabWidth,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    backgroundColor: '#F9EDE3',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderRadius: 10,
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#333333',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#86A49C', // Adjust styling as needed for the slider
    height: 3,
  },
});

export default AnimatedTutorTabSlider;
