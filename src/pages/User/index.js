import React, { Component } from 'react';

import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string,
          avatar: PropTypes.string,
          name: PropTypes.string,
          bio: PropTypes.string,
        }),
      }),
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { login } = route.params.user;

    const { data } = await api.get(`/users/${login}/starred`);

    this.setState({ stars: data });
  }

  render() {
    const { stars } = this.state;
    const {
      route: {
        params: { user },
      },
    } = this.props;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
