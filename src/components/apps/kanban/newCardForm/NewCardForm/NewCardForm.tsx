import React, { useMemo, useState, useContext, useEffect } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { CardState, Tag, Participant } from '../../interfaces';
import { TagDropdown } from '../TagDropdown/TagDropdown';
import * as S from './NewCardForm.styles';
import { ParticipantsDropdown } from '../ParticipantsDropdown/ParticipantsDropdown';
import { Modal } from '@app/components/common/Modal/Modal';
import { Col, Row } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { useNavigate } from 'react-router-dom';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { PlusOutlined } from '@ant-design/icons';
import * as s from '../../AddCardLink/AddCardLink.styles';
import { AddCardLink } from '../../AddCardLink/AddCardLink';


const formInputs = [
  {
    title: 'kanban.title',
    label: 'Title',
    name: 'activity_title',
  },
  {
    title: 'kanban.description',
    label: 'Description',
    name: 'activity_description',
  },
  {
    title:'Method',
    label: 'Method',
    name: 'activity_method'
  },
  {
    title:'Technique',
    label:'Technique',
    name:'activity_technique'
  },
  {
    title:'Difficulty',
    label:'Difficulty',
    name:'activity_difficulty'
  },
  {
    title:'Duration',
    label:'Duration',
    name:'activity_duration'
  },
  {
    title:'Objectives',
    label:'Objectives',
    name:'activity_objectives'
  },
  {
    title:'Needs',
    label:'Needs',
    name:'activity_needs'
  },
  {
    title:'Organization',
    label:'Organization',
    name:'activity_organization'
  },
  {
    title:'Variations',
    label:'Variations',
    name:'activity_variations'
  }
];

interface NewCardFormProps {
  onAdd: (state: CardState) => void;
  onCancel: () => void;
}

export const NewCardForm: React.FC<NewCardFormProps> = ({ onAdd, onCancel}) => {

  const navigate = useNavigate()

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(true)
  const [modalTitle, setModal] = useState('Explore existing activities or add a new one')
  const [isFieldsChanged, setFieldsChanged] = useState(false)
  const formItemLayout = {
    labelCol:{span:24},
    wrapperCol:{span:24}
  }
  
  const { t } = useTranslation();

  const onFinish = (values: CardState) => {
    setLoading(true);
    setTimeout(() => {
      setFieldsChanged(false)
      onAdd({ ...values, tags: selectedTags, participants: selectedParticipants });
      console.log(values)
      setIsModalOpen(false)
      setLoading(false);
    }, 1000);
  };
  
    

  const formItems = formInputs.map((item, index) => {
    const {label, name} = item
    if (name === 'activity_method') {
      return (
        <>
        <BaseButtonsForm.Item 
                  name='activity_method'
                  label='Method'
                  hasFeedback
                  rules={[{required:true, message:'you have to choose an activity method'}]}
                  >
                  <Select width={100}>
                    <Option value="Presential">Presential</Option>
                    <Option value="Online">Online</Option>
                    <Option value="Blended">Blended</Option>
                  </Select>                
                </BaseButtonsForm.Item>
                </>
      )
    }
    if (name === 'activity_difficulty') {
      return (
        <>
        {/* <BaseButtonsForm.Item
                 name='activity_difficulty'
                 label='Difficulty'
                 hasFeedback
                 rules={[{required:true, message:'you have to choose a diffeculty level'}]}
                >
                  <Select>
                    <Option value="Easy">Easy</Option>
                    <Option value="Intermidiate">Intermidiate</Option>
                    <Option value="Hard">Hard</Option>
                  </Select>
              </BaseButtonsForm.Item> */}
               <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </>
      )
    }
    if (name === 'activity_duration') {
      return (
        <>
          <BaseButtonsForm.Item label='Duration'>
                <label>
                  <BaseButtonsForm.Item name='activity_duration'>
                    <InputNumber
                      min={0}
                      keyboard={true}
                      defaultValue={10}
                    />
                  </BaseButtonsForm.Item>
                </label>
              </BaseButtonsForm.Item>
        </>
      )
    }
    if (name === 'activity_needs') {
      return (
        <>
         <BaseButtonsForm.Item
                 name='activity_needs'
                 label='Needs'
                 hasFeedback
                 rules={[{required:true, message:'you must choose at least one need'}]}
                >
                  <Select mode='multiple' width={100}>
                    <Option value="Business Simulation">Business Simulation</Option>
                    <Option value="Role play simulation">Role play simulation</Option>
                    <Option value="Role play">Role play</Option>
                    <Option value="Idea generation">Idea generation</Option>
                    <Option value="Group discussion">Group discussion</Option>
                    <Option value="Team challenge">Team challenge</Option>
                    <Option value="Multimedia, Video">Multimedia, Video</Option>
                    <Option value="Storytelling, drawing">Storytelling, drawing</Option>
                    <Option value="Hands-on, Application">Hands-on, Application</Option>
                  </Select>
              </BaseButtonsForm.Item>
        </>
      )
    }
    return (
      <>
      <BaseButtonsForm.Item label={label} key={index}>
        <label>
         <BaseButtonsForm.Item name={name}>
           <Input placeholder={label} />
         </BaseButtonsForm.Item>
       </label>
      </BaseButtonsForm.Item> 
      </>
    )
  })
  return (
    <s.AddCardWrapper onClick={()=>{
      setIsModalOpen(true)
    }}>
     
     <Modal
          title={modalTitle}
          centered
          open={isModalOpen}
          onOk={(e)=>{
            e.stopPropagation();
            setIsModalOpen(false)
            setIsActivityOpen(true)
          }}
          onCancel={(e)=>{
            e.stopPropagation();
            setIsModalOpen(false)
            setIsActivityOpen(true)
          }} 
          closable={true}
          mask={true}
          maskClosable={false}
          footer={<div></div>}
        >
          {
            isActivityOpen ? (
          <Row>
              <Col span={4}></Col>
              <Col>
                <Button onClick={()=>{
                  setIsActivityOpen(false)
                  setModal('Create a new activity')
                  }}>Add Activity</Button>
              </Col>
              <Col span={5}></Col>
              <Col>
                <Button onClick={()=>navigate('/')}>Explore Library </Button>
              </Col>
          </Row>
            ) :     
          <BaseButtonsForm
              {...formItemLayout}
              isFieldsChanged
              onFieldsChange={()=>setFieldsChanged(true)}
              name="addCard"
              footer={<S.FooterButtons loading={isLoading} size="small" onCancel={onCancel} />}
              onFinish={onFinish}
            >
              {formItems}
              <ParticipantsDropdown
                selectedParticipants={selectedParticipants}
                setSelectedParticipants={setSelectedParticipants}
              /> 
          </BaseButtonsForm>
          }
        </Modal>
        <PlusOutlined />
  </s.AddCardWrapper>
  )
};
