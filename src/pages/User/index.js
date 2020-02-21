import React, { Component } from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container } from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string,
        }),
      }),
    }).isRequired,
  };

  state = {
    repositories: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { login } = route.params.user;

    const { data } = await api.get(`/users/${login}/repos`);

    this.setState({ repositories: data });
  }

  render() {
    const { repositories } = this.state;
    return (
      <Container>
        <Text> Essa é ... hmm a pagina principal ! </Text>
      </Container>
    );
  }
}
