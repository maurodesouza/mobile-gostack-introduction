import React from 'react';
import PropTypes from 'prop-types';

import { Web } from './styles';

export default function WebRepository({ route }) {
  const { uri } = route.params;
  return <Web source={{ uri }} />;
}

WebRepository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      uri: PropTypes.string,
    }),
  }).isRequired,
};
