import styled from 'styled-components';

export const Starred = styled.View`
  background: #eee;
  border-radius: 5px;
  padding: 10px 15px;
  margin-bottom: 20px;
  align-items: center;
  flex-direction: row;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;
