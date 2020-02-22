import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  Delete,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    err: false,
    message: 'Adicionar usuário',
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleDeleteUser = user => {
    const { users } = this.state;
    this.setState({
      users: users.filter(({ login }) => login !== user),
    });
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    if (!newUser) return null;

    this.setState({ loading: true });

    const userExist = users.find(({ login }) => login === newUser);

    try {
      if (userExist) throw new Error();

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [data, ...users],
        newUser: '',
        loading: false,
      });

      return Keyboard.dismiss();
    } catch (err) {
      this.setState(
        {
          newUser: '',
          err: true,
          message: err.request
            ? 'Usuário não encontrado !'
            : 'Esse usuário já foi adicionado !',
        },
        () => {
          setTimeout(() => {
            this.setState({
              err: false,
              loading: false,
              message: 'Adicionar usuário',
            });
          }, 1400);
        }
      );
      return null;
    }
  };

  render() {
    const { users, newUser, loading, message, err } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <Form>
          <Input
            err={err}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={message}
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Delete
                name="delete"
                onPress={() => this.handleDeleteUser(item.login)}
              />
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton
                onPress={() => navigation.navigate('User', { user: item })}
              >
                <ProfileButtonText> Ver Perfil </ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
