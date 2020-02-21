import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function User({ route }) {
  console.tron.log(route.params);
  return (
    <Container>
      <Text> Essa é ... hmm a pagina principal ! </Text>
    </Container>
  );
}
