import React, { useState, useMemo, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from '@app/components/common/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Col, Row } from 'antd';
import { TextArea, Input } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { notificationController } from '@app/controllers/notificationController';
import { CardState } from './../interfaces';

import { kanbanData } from '@app/constants/kanbanData';

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