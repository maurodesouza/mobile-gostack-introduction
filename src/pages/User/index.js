import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';
import api from '../../services/api';

import List from '../../components/List';
import { Container, Header, Avatar, Name, Bio, Stars } from './styles';

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
    noMoreStars: false,
    loading: false,
    page: 1,
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
    });

    return null;
  };

  renderItem = ({ item }) => {
    const { loading } = this.state;

    return <List loading={loading} item={item} />;
  };

  render() {
    const { stars, loading } = this.state;
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
          ListFooterComponent={
            loading && <ActivityIndicator color="#7159c1" size={30} />
          }
          onEndReachedThreshold={0.2}
          onEndReached={this.loadRepositories}
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
