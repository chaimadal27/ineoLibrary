import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { CardState } from './../interfaces';


import * as S from './AddCardLink.styles';


interface AddCardLinkProps {
  onClick: () => void;
  onAdd: (state:CardState) => void;
  onCancel: () => void;
}

export const AddCardLink: React.FC<AddCardLinkProps> = ({ onClick }) => {
  
  return ( 
    <S.AddCardWrapper onMouseMoveCapture={onClick}> 
      <PlusOutlined />
    </S.AddCardWrapper>
  );
};