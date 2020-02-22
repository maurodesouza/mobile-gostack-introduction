import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Starred, Info, Author, OwnerAvatar, Title } from './styles';

export default class List extends PureComponent {
  render() {
    const { item } = this.props;

    return (
      <Starred>
        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
        <Info>
          <Title>{item.name}</Title>
          <Author>{item.owner.login}</Author>
        </Info>
      </Starred>
    );
  }
}

List.propTypes = {
  item: PropTypes.shape({
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
    }),
    name: PropTypes.string,
  }).isRequired,
};
