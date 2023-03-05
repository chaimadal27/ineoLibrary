import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Made by{' '}
        <a href="https://ineo.dev/" target="_blank" rel="noreferrer">
          ineo{' '}
        </a>
        in {new Date().getFullYear()} &copy;
      </S.Text>
      <S.Icons>
        {/* <a href="#" target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FacebookOutlined />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <LinkedinOutlined />
        </a> */}
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
