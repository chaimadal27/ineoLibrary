import React, { useMemo } from 'react';
import InlineInput from 'react-trello/dist/widgets/InlineInput';
import * as S from './LaneHeader.styles';
import { CardState } from '../interfaces';

interface LaneHeaderProps {
  updateTitle: () => void;
  editLaneTitle: boolean;
  style: CSSStyleSheet;
  session_title: string;
  onDoubleClick: () => void;
  cards: Array<CardState>;
}

export const LaneHeader: React.FC<LaneHeaderProps> = ({
  updateTitle,
  onDoubleClick,
  editLaneTitle = true,
  session_title,
  style,
  cards,
}) => {
  const numberOfCards = useMemo(() => (cards?.length ? `${cards.length}` : ''), [cards?.length]);
  return (
    <S.Header onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle} style={style}>
      <S.Title>
        {editLaneTitle ? (
          <InlineInput value={session_title} border placeholder={session_title} resize="vertical" onSave={updateTitle} />
        ) : (
          <>
            {session_title}
            {cards.length ? <S.Dot>·</S.Dot> : ''}
            {numberOfCards}
          </>
        )}
      </S.Title>
    </S.Header>
  );
};
