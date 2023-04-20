import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { Button } from '@app/components/common/buttons/Button/Button';
import { TagDropdown } from '@app/components/apps/kanban/newCardForm/TagDropdown/TagDropdown';
import {
  CardState,
  // Tag as ITag,
  // Participant as IParticipant,
  ActivityDifficulty as Difficulty,
  
} from '@app/components/apps/kanban/interfaces';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import * as S from './Card.styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Modal } from '@app/components/common/Modal/Modal';
import * as s from './../newCardForm/NewCardForm/NewCardForm.styles';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { toolbarOptions } from '../newCardForm/NewCardForm/NewCardForm';
import { httpApi } from '@app/api/http.api';
import { notificationController } from '@app/controllers/notificationController';

interface CardProps {
  style: CSSStyleSheet;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onChange: (card: CardState) => void;
  onReview: (card: CardState | undefined) => void;
  className: string;
  id?: string | number;
  activity_title?: string;
  activity_method?: string;
  activity_description?: string;
  activity_technique?: string[];
  activity_difficulty?: Difficulty[];
  activity_duration?: number;
  activity_objectives?: string;
  activity_needs?: string;
  activity_organization?: string;
  activity_variations?: string;
  cardDraggable?: boolean;
}

interface EditPopoverProps {
  onDelete: () => void;
  // onEdit: () => void;
  onReview: () => void;
}

const EditPopover: React.FC<EditPopoverProps> = ({ onDelete, onReview, ...props }) => {
  // const { t } = useTranslation();

  return (
    <S.CardMenu selectable={true} {...props}>
      <S.MenuItem key="1" onClick={onReview}>
        Review
      </S.MenuItem>
      <S.MenuItem key="2" onClick={onDelete}>
        Delete
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
  activity_technique = [],
  activity_difficulty = [],
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
  // const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  // const [isEditable, setIsEditable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const [selectedTags, setSelectedTags] = useState<Difficulty[]>(activity_difficulty);

  const onArrowPress = () => {
    setIsExpanded(!isExpanded);
  };

  const updateCard = (card: CardState) => {
    onChange({ ...card, id });
  };

  const onDeleteCard = (id:number | string | undefined) => {
    httpApi.delete(`http://localhost:8000/activity/${id}/`)
    .then(()=>{
      notificationController.success({message:'Activity deleted successfully'})
      onDelete();
    })
    .catch((err)=>{
      notificationController.error({message:err.message})
    })
  };

  // const updateTags = (tags: ITag[]) => {
  //   updateCard({ tags });
  // };

  // const updateDifficulty = (activity_difficulty: Difficulty[]) => {
  //   updateCard({ activity_difficulty });
  // };

  // const updateMethod = (tags: ITag[]) => {
  //   updateCard({ tags });
  // };

  // const updateParticipants = (participants: IParticipant[]) => {
  //   updateCard({ participants });
  // };

  // const onEditCard = () => {
  //   setIsEditable(!isEditable);
  // };

  const onReviewCard = () => {
    setIsModalOpen(true);
  };

  const formInputs = [
    {
      title: 'Title',
      label: 'Title',
      name: 'activity_title',
      value: activity_title,
    },
    {
      title: 'Objectives',
      label: 'Objectives',
      name: 'activity_objectives',
      value: activity_objectives,
    },
    {
      title: 'Method',
      label: 'Method',
      name: 'activity_method',
      value: activity_method,
    },
    {
      title: 'Technique',
      label: 'Technique',
      name: 'activity_technique',
      value: activity_technique,
    },
    {
      title: 'Difficulty',
      label: 'Difficulty',
      name: 'activity_difficulty',
      value: activity_difficulty,
    },
    {
      title: 'Duration',
      label: 'Duration',
      name: 'activity_duration',
      value: activity_duration,
    },
    {
      title: 'Description',
      label: 'Description',
      name: 'activity_description',
      value: activity_description,
    },
    {
      title: 'Needs',
      label: 'Needs',
      name: 'activity_needs',
      value: activity_needs,
    },
    {
      title: 'Organization',
      label: 'Organization',
      name: 'activity_organization',
      value: activity_organization,
    },
    {
      title: 'Variations',
      label: 'Variations',
      name: 'activity_variations',
      value: activity_variations,
    },
  ];

  const [isUpdated, setIsUpdated] = useState({
    activity_title: activity_title,
    activity_description: activity_description,
    activity_objectives: activity_objectives,
    activity_organization: activity_organization,
    activity_variations: activity_variations,
    activity_duration: activity_duration,
    activity_technique: activity_technique,
    activity_method: activity_method,
    activity_needs: activity_needs,
  });

  const onFinish = (values: CardState) => {
    setLoading(true);
    setTimeout(() => {
      setFieldsChanged(true);
      updateCard({
        ...values,
        ...isUpdated,
        activity_method: values.activity_method || isUpdated.activity_method,
        activity_technique: values.activity_technique || isUpdated.activity_technique,
        activity_needs: values.activity_needs || isUpdated.activity_needs,
        activity_difficulty: selectedTags
      });
      console.log('values', values);
      console.log('Updated', isUpdated);
      setIsModalOpen(false);
      setLoading(false);
    }, 1000);
  };
  // eslint-disable-next-line
  const handleChange = (e: number | any) => {
    setIsUpdated({ ...isUpdated, activity_duration: e });
  };
  // eslint-disable-next-line
  const handleMethodChange = (value: string | any) => {
    setIsUpdated({ ...isUpdated, activity_method: value });
  };
  // eslint-disable-next-line
  const handleTechniqueChange = (values: string[] | any) => {
    setIsUpdated({ ...isUpdated, activity_technique: values });
  };
  // eslint-disable-next-line
  const handleNeedsChange = (value: string | any) => {
    setIsUpdated({ ...isUpdated, activity_needs: value });
  };


  const formItems = formInputs.map((item, index) => {
    const { label, name, value } = item;
    if (name === 'activity_method') {
      return (
        <>
          <BaseButtonsForm.Item
            name="activity_method"
            label="Method"
            hasFeedback
            rules={[{ message: 'you have to choose an activity method' }]}
          >
            <Select width={100} onSelect={handleMethodChange} defaultValue={activity_method}>
              <Option value="Presential">Presential</Option>
              <Option value="Online">Online</Option>
              <Option value="Blended">Blended</Option>
            </Select>
          </BaseButtonsForm.Item>
        </>
      );
    }
    if (name === 'activity_technique') {
      return (
        <>
          <BaseButtonsForm.Item
            name="activity_technique"
            label="Technique"
            hasFeedback
            //  rules={[{message:'youx must choose at least one need'}]}
          >
            <Select width={100} onChange={handleTechniqueChange} defaultValue={activity_technique} mode="multiple">
              <Option value="Business Simulation" key={1}>
                Business Simulation
              </Option>
              <Option value="Role play simulation" key={2}>
                Role play simulation
              </Option>
              <Option value="Role play" key={3}>
                Role play
              </Option>
              <Option value="Idea generation" key={4}>
                Idea generation
              </Option>
              <Option value="Group discussion" key={5}>
                Group discussion
              </Option>
              <Option value="Team challenge" key={6}>
                Team challenge
              </Option>
              <Option value="Multimedia, Video" key={7}>
                Multimedia, Video
              </Option>
              <Option value="Story telling, drawing" key={8}>
                Story telling, drawing
              </Option>
              {/* <Option value="Hands-on, Application" key={9}>Hands-on, Application</Option> */}
            </Select>
          </BaseButtonsForm.Item>
        </>
      );
    }
    if (name === 'activity_difficulty') {
      return (
        <>
          <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </>
      );
    }
    if (name === 'activity_duration') {
      return (
        <>
          <BaseButtonsForm.Item label="Duration">
            <label>
              <BaseButtonsForm.Item name="activity_duration">
                <InputNumber min={0} keyboard={true} defaultValue={activity_duration} onChange={handleChange} />
              </BaseButtonsForm.Item>
            </label>
          </BaseButtonsForm.Item>
        </>
      );
    }
    if (name === 'activity_needs') {
      return (
        <>
          <BaseButtonsForm.Item
            name="activity_needs"
            label="Needs"
            hasFeedback
            rules={[{ message: 'you must choose at least one need' }]}
          >
            <Select width={100} onSelect={handleNeedsChange} defaultValue={activity_needs}>
              <Option value="Metaplan cards" key={1}>
                Metaplan cards
              </Option>
              <Option value="Flip cards" key={2}>
                Flip cards
              </Option>
              <Option value="Pinboard" key={3}>
                Pinboard
              </Option>
              <Option value="Special facilitation tool" key={4}>
                Special facilitation tool
              </Option>
            </Select>
          </BaseButtonsForm.Item>
        </>
      );
    }

    if (name === 'activity_description') {
      return (
        <BaseButtonsForm.Item label={'Description'} className="ql-editor-Description2" key={index}>
          <ReactQuill
            // key={index}
            modules={{
              toolbar: toolbarOptions,
            }}
            theme="snow"
            defaultValue={value?.toString()}
            onChange={(value: string) => setIsUpdated({ ...isUpdated, activity_description: value })}
          />

          <style>{`
            .ql-editor-Description2 {
              .ql-editor {
                 min-height: 150px
              }  
            }
          `}</style>
        </BaseButtonsForm.Item>
      );
    }

    return (
      <BaseButtonsForm.Item label={label} key={index}>
        <ReactQuill
          // key={index}
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          defaultValue={value?.toString()}
          onChange={(value: string) => setIsUpdated({ ...isUpdated, [name]: value })}
        />

        <style>{`
              .ql-editor {
                 min-height: 70px
              }  
        `}</style>
      </BaseButtonsForm.Item>
    );
  });
  return (
    <>
      {isModalOpen ? (
        <Modal
          title="Review Activity"
          centered
          open={isModalOpen}
          onOk={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
          onCancel={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
          closable={true}
          mask={true}
          maskClosable={false}
          footer={<div></div>}
        >
          <BaseButtonsForm
            {...formItemLayout}
            isFieldsChanged
            onFieldsChange={() => setFieldsChanged(true)}
            name="ReviewCard"
            footer={
              <s.FooterButtons
                loading={isLoading}
                size="small"
                onCancel={() => {
                  setIsModalOpen(false);
                }}
              />
            }
            onFinish={onFinish}
          >
            {formItems}
          </BaseButtonsForm>
        </Modal>
      ) : (
        ''
      )}

      <S.CardWrapper data-id={id} onClick={onClick} style={style} className={className}>
        <style>{`
            .ql-editor-Des {
              .ql-editor {
                 max-height: 50px
              }  
            }
          `}</style>
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
                  <ReactQuill
                    style={{ zIndex: 1, overflow: 'visible', position: 'relative' }}
                    theme="bubble"
                    value={activity_title}
                    defaultValue={activity_title}
                    className="ql-editor-Des"
                    readOnly={true}
                  />
                  {/* <ReactQuill theme="bubble" defaultValue={activity_title} readOnly={true} /> */}
                </S.CardTitle>
                <S.CardRightContent>
                  <Button noStyle type="text" icon={<S.ArrowDownIcon $expanded={isExpanded} />} />
                  <Dropdown
                    overlay={
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        {' '}
                        <EditPopover
                          onDelete={()=>onDeleteCard(id)}
                          
                          onReview={onReviewCard}
                          
                        />{' '}
                      </div>
                    }
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
              {/* <ReactQuill
                  style={{ zIndex: 999, overflow: 'visible' }}
                  theme="bubble"
                  value={activity_objectives}
                  onChange={(value: string) => updateCard({ activity_objectives: value })}
                /> */}
              <ReactQuill theme="bubble" value={activity_objectives} className="ql-editor-Des" readOnly={true} />
            </S.CardDetails>
            {/* <S.CardDetails>
              {isEditable==false ? (
                <BaseButtonsForm.Item
                  name="activity_technique"
                  //  label='Needs'
                  hasFeedback
                  rules={[{ required: true, message: 'you must choose at least one need' }]}
                  className="Select-container"
                >
                  <div> */}
            {/* <Select defaultValue={activity_technique} mode="multiple">
                      <Option value="Business Simulation" key="Business Simulation">
                        Business Simulation
                      </Option>
                      <Option value="Role play simulation" key="Role play simulation">
                        Role play simulation
                      </Option>
                      <Option value="Role play" key="Role play">
                        Role play
                      </Option>
                      <Option value="Idea generation" key="Idea generation">
                        Idea generation
                      </Option>
                      <Option value="Group discussion" key="Group discussion">
                        Group discussion
                      </Option>
                      <Option value="Team challenge" key="Team challenge">
                        Team challenge
                      </Option>
                      <Option value="Multimedia, Video" key="Multimedia, Video">
                        Multimedia, Video
                      </Option>
                      <Option value="Storytelling, drawing" key="Storytelling, drawing">
                        Storytelling, drawing
                      </Option> */}
            {/* <Option value="Hands-on, Application" key={9}>Hands-on, Application</Option> */}
            {/* </Select>
                  </div> */}
            {/* </BaseButtonsForm.Item>
              ) : (
                activity_technique
              )}
            </S.CardDetails> */}
            <S.CardDetails>
              {/* {isEditable == false ? (
                <TagDropdown selectedTags={activity_difficulty} setSelectedTags={updateDifficulty} />
              ) : ( */}
              <TagDropdown selectedTags={activity_difficulty} />
              {/* )} */}
            </S.CardDetails>
            <S.CardDetails style={{ marginLeft: '10px' }}>{isUpdated.activity_duration}</S.CardDetails>
            <S.CardDetails>
              {/* <ReactQuill
                  style={{ zIndex: 1, overflow: 'visible', position: 'relative' }}
                  theme="bubble"
                  value={activity_description?.toString()}
                  onChange={(value: string) => updateCard({ activity_description: value })}
                /> */}
              <ReactQuill theme="bubble" value={activity_description} className="ql-editor-Des" readOnly={true} />
            </S.CardDetails>

            {/* <S.CardDetails> */}

            {/* <BaseButtonsForm>

             <BaseButtonsForm.Item 
                name='activity_method'
                label='Method'
                hasFeedback
                rules={[{message:'you have to choose an activity method'}]}
                >
                <Select width={100} defaultValue={activity_method} value={activity_method}>
                  <Option value="Presential">Presential</Option>
                  <Option value="Online">Online</Option>
                  <Option value="Blended">Blended</Option>
                </Select>
                       
              </BaseButtonsForm.Item>
              </BaseButtonsForm> */}
            {/* </S.CardDetails> */}
          </S.CardContent>
        </S.CollapseCard>
      </S.CardWrapper>
    </>
  );
};
