import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { Button } from '@app/components/common/buttons/Button/Button';
import { ParticipantsDropdown } from '@app/components/apps/kanban/newCardForm/ParticipantsDropdown/ParticipantsDropdown';
import { TagDropdown } from '@app/components/apps/kanban/newCardForm/TagDropdown/TagDropdown';
import { CardState, Tag as ITag, Participant as IParticipant, ActivityDifficulty as Difficulty } from '@app/components/apps/kanban/interfaces';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';


import * as S from './Card.styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface CardProps {
  style: CSSStyleSheet;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onChange: (card: CardState) => void;
  className: string;
  id?: string | number;
  activity_title?: string;
  activity_method?: string;
  activity_description?:string;
  activity_technique?:string;
  activity_difficulty?:Difficulty[];
  activity_duration?:number;
  activity_objectives?:string;
  activity_needs?:string;
  activity_organization?:string;
  activity_variations?:string;
  cardDraggable?:boolean;
  // tags:ITag[];
  // participants:IParticipant[];
  // editable?:boolean;
}

interface EditPopoverProps {
  onDelete: () => void;
  onArchive: () => void;
  onEdit: () => void;
  onReview: () => void;
}

const EditPopover: React.FC<EditPopoverProps> = ({ onDelete, onEdit, onArchive, onReview, ...props }) => {
  const { t } = useTranslation();

  return (
    <S.CardMenu selectable={true} {...props} >
      <S.MenuItem key="1" onClick={onDelete}>
        {t('common.delete')}
      </S.MenuItem>

      <S.MenuItem key="2" onClick={onEdit}>
        Edit
      </S.MenuItem>

      <S.MenuItem key="3" onClick={onReview}>
        Review
      </S.MenuItem>

      <S.MenuItem key="4" onClick={onArchive}>
        {t('kanban.archive')}
      </S.MenuItem>
    </S.CardMenu>
  );
};

export const Card: React.FC<CardProps> = ({
  style,
  onClick,
  onDelete,
  onChange,
  className,
  id,
  activity_title,
  activity_description,
  activity_method,
  activity_technique,
  activity_difficulty=[],
  activity_duration,
  activity_objectives,
  activity_needs,
  activity_organization,
  activity_variations,
  cardDraggable,
  // tags = [],
  // participants = [],
  // editable,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  
  const onArrowPress = () => {
    setIsExpanded(!isExpanded);
  };

  const updateCard = (card: CardState) => {
    onChange({ ...card, id });
  };

  const onDeleteCard = () => {
    onDelete();
  };

  const updateTags = (tags: ITag[]) => {
    updateCard({ tags });
  };

  const updateDifficulty = (activity_difficulty: Difficulty[]) => {
    updateCard({ activity_difficulty });
  }

  const updateMethod = (tags: ITag[]) => {
    updateCard({ tags });
  };

  const updateParticipants = (participants: IParticipant[]) => {
    updateCard({ participants });
  };

const onEditCard = () => {
  setIsEditable(!isEditable);
};

const onReviewCard = () => {
  console.log("hiii");
};

  return (
    <S.CardWrapper data-id={id} onClick={onClick} style={style} className={className}>
      <S.CollapseCard onChange={onArrowPress} bordered={false} defaultActiveKey={['1']}>
        <S.CardContent
          showArrow={false}
          key="1"
          header={
            <S.CardHeader>
              <S.CardTitle
                draggable={cardDraggable}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                }}
              >
                {isEditable ? (
                  // <S.Input
                  //   name="title"
                  //   value={activity_title}
                  //   border
                  //   placeholder={t('kanban.title')}
                  //   resize="vertical"
                  //   onSave={(value: string) => updateCard({ activity_title: value })}
                  // />
                  <ReactQuill
                  theme="bubble"
                  value={activity_title}
                  onChange={(value: string) => updateCard({ activity_title: value })}
                />
                ) : (
                  <ReactQuill
                  theme="bubble"
                  value={activity_title}
                  readOnly={true}
                />
                )}
              </S.CardTitle>
              <S.CardRightContent>
                <Button noStyle type="text" icon={<S.ArrowDownIcon $expanded={isExpanded} />} />
                <Dropdown
                  overlay={<div onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}> <EditPopover onDelete={onDeleteCard} onEdit={
                    onEditCard
                  } onReview={onReviewCard} onArchive={onDeleteCard} /> </div>}
                  placement="bottomRight"
                  trigger={['click']}
                  destroyPopupOnHide={true} 
                >
                  <Button
                    noStyle
                    type="text"
                    icon={<MoreOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  />
                </Dropdown>
              </S.CardRightContent>
            </S.CardHeader>
          }
        >
          <S.CardDetails>
            {isEditable ? (
              // <S.Input
              //   value={activity_description}
              //   border
              //   placeholder={t('kanban.description')}
              //   resize="vertical"
              //   onSave={(value: string) => updateCard({ activity_description: value })}
              // />
              <ReactQuill
                 theme="bubble"
                 value={activity_description}
                 onChange={(value: string) => updateCard({ activity_description: value}) }
               />
            ) : (
              <ReactQuill
              theme="bubble"
              value={activity_description}
              readOnly={true}
            />
            )}
          </S.CardDetails>
          {/* <S.CardDetails>
          {isEditable ? (
              <S.Input
                value={activity_method}
                border
                placeholder='Method'
                resize="vertical"
                onSave={(value: string) => updateCard({activity_method: value})}
              />
            ) : (
              activity_method
            )}
          </S.CardDetails> */}
          <S.CardDetails>
            {isEditable ? (
              <BaseButtonsForm.Item
              name='activity_technique'
             //  label='Needs'
              hasFeedback
              rules={[{required:true, message:'you must choose at least one need'}]}
             >
               <Select defaultValue={activity_technique}>
                 <Option value="Business Simulation" key="Business Simulation">Business Simulation</Option>
                 <Option value="Role play simulation" key="Role play simulation">Role play simulation</Option>
                 <Option value="Role play" key="Role play">Role play</Option>
                 <Option value="Idea generation" key="Idea generation">Idea generation</Option>
                 <Option value="Group discussion" key="Group discussion">Group discussion</Option>
                 <Option value="Team challenge" key="Team challenge">Team challenge</Option>
                 <Option value="Multimedia, Video" key="Multimedia, Video">Multimedia, Video</Option>
                 <Option value="Storytelling, drawing" key="Storytelling, drawing">Storytelling, drawing</Option>
                 {/* <Option value="Hands-on, Application" key={9}>Hands-on, Application</Option> */}
               </Select>
           </BaseButtonsForm.Item>
            ) : (
              activity_technique
            )}
          </S.CardDetails>
          <S.CardDetails>
            {isEditable ? (
              // <S.Input
              //   value={activity_difficulty}
              //   border
              //   placeholder='Difficulty'
              //   resize="vertical"
              //   onSave={(value: string) => updateCard({activity_difficulty: value})}
              // />
              <TagDropdown selectedTags={activity_difficulty} setSelectedTags={updateDifficulty}  />
            ) : (
              <TagDropdown selectedTags={activity_difficulty} />
            )}
          </S.CardDetails>
          <S.CardDetails>
            {isEditable ? (
              <S.Input
                value={activity_duration}
                border
                placeholder='Duration'
                resize="vertical"
                onSave={(value: number) => updateCard({activity_duration: value})}
              />
            ) : (
              activity_duration
            )}
          </S.CardDetails>
          <S.CardDetails>
            {isEditable ? (
              <S.Input
                value={activity_objectives}
                border
                placeholder='Objectives'
                resize="vertical"
                onSave={(value: string) => updateCard({activity_objectives: value})}
              />
            ) : (
              activity_objectives
            )}
          </S.CardDetails>
          {/* <S.CardDetails>
            {isEditable ? (
              <S.Input
                value={activity_needs}
                border
                placeholder='Needs'
                resize="vertical"
                onSave={(value: string) => updateCard({activity_needs: value})}
              />
            ) : (
              activity_needs
            )}
          </S.CardDetails> */}
          {/* <S.CardDetails>
            {isEditable ? (
              <S.Input
                value={activity_organization}
                border
                placeholder='Organization'
                resize="vertical"
                onSave={(value: string) => updateCard({activity_organization: value})}
              />
            ) : (
              activity_organization
            )}
          </S.CardDetails> */}
          {/* <S.CardDetails>
            {isEditable ? (
              <S.Input
                value={activity_variations}
                border
                placeholder='Variations'
                resize="vertical"
                onSave={(value: string) => updateCard({activity_variations: value})}
              />
            ) : (
              activity_variations
            )}
          </S.CardDetails> */}
          {/* <S.ParticipantsWrapper>
            <ParticipantsDropdown selectedParticipants={participants} setSelectedParticipants={updateParticipants} />
          </S.ParticipantsWrapper> */}
        </S.CardContent>
      </S.CollapseCard>
    </S.CardWrapper>
  );
};
