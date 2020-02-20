import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7159c1',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    margin: 20,
  },
});

console.tron.log('Hmm ... Hellow !');

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}> Hmm ... Hellow ow ow ow !!! </Text>
  </View>
);

export default App;
