import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

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
  Info,
  Author,
  OwnerAvatar,
  Title,
} from './styles';

export default class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
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
    noMoreStars: false,
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    const { page, stars, loading, noMoreStars } = this.state;
    const { route } = this.props;
    const { login } = route.params.user;

    if (loading || noMoreStars) return null;

    this.setState({ loading: true });

    const { data } = await api.get(`/users/${login}/starred`, {
      params: { page },
    });

    if (data.length < 30) {
      this.setState({ noMoreStars: true });
    }

    await this.setState({
      stars: [...stars, ...data],
      loading: false,
      page: page + 1,
      refreshing: false,
    });

    return null;
  };

  onRefresh = async () => {
    this.setState(
      { refreshing: true, page: 1, stars: [], noMoreStars: false },
      this.loadRepositories
    );
  };

  render() {
    const { stars, loading, refreshing } = this.state;
    const {
      navigation,
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
          ListFooterComponent={
            loading &&
            !refreshing && <ActivityIndicator color="#7159c1" size={30} />
          }
          onEndReachedThreshold={0.2}
          onEndReached={this.loadRepositories}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred
              onPress={() =>
                navigation.navigate('WebRepository', {
                  uri: item.html_url,
                  name: item.name,
                })
              }
            >
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
