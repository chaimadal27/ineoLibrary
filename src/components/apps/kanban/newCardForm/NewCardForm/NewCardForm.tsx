import React, { useMemo, useState, useContext, useEffect } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { CardState, Tag, Participant, ActivityDifficulty } from '../../interfaces';
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  var toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'size': ['small', false, 'large', 'huge'] }],  
    ['blockquote', 'code-block'],
  
    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                        // text direction
    ['link', 'image'],
  
    // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "code-block"
  ];
  

  const [selectedTags, setSelectedTags] = useState<ActivityDifficulty[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const [isLoading, setLoading] = useState(false);
  
  const [isExploreOpen,setExploreOpen] = useState(false)
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
      onAdd({ ...values, activity_difficulty: selectedTags });
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
                  rules={[{message:'you have to choose an activity method'}]}
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
    if (name === 'activity_technique') {
      return (
        <>
         <BaseButtonsForm.Item
                 name='activity_technique'
                 label='Technique'
                 hasFeedback
                 rules={[{required:true, message:'you must choose at least one need'}]}
                >
                  <Select width={100}>
                    <Option value="Business Simulation" key={1}>Business Simulation</Option>
                    <Option value="Role play simulation" key={2}>Role play simulation</Option>
                    <Option value="Role play" key={3}>Role play</Option>
                    <Option value="Idea generation" key={4}>Idea generation</Option>
                    <Option value="Group discussion" key={5}>Group discussion</Option>
                    <Option value="Team challenge" key={6}>Team challenge</Option>
                    <Option value="Multimedia, Video" key={7}>Multimedia, Video</Option>
                    <Option value="Story telling, drawing" key={8}>Story telling, drawing</Option>
                    {/* <Option value="Hands-on, Application" key={9}>Hands-on, Application</Option> */}
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
                  <Select width={100}>
                    <Option value="Metaplan cards" key={1}>Metaplan cards</Option>
                    <Option value="Flip cards" key={2}>Flip cards</Option>
                    <Option value="Pinboard" key={3}>Pinboard</Option>
                    <Option value="Special facilitation tool" key={4}>Special facilitation tool</Option>
                  </Select>
            </BaseButtonsForm.Item>
         </>
      )
    }
    
    return (
   
     
      <BaseButtonsForm.Item label={label} key={index} name={name}>
  {/* <label>
    <BaseButtonsForm.Item name={name} > */}
      {/* <Input placeholder={label} /> */} 
      <ReactQuill
      formats={formats}
       modules= {{
        toolbar: toolbarOptions
      }}
      theme="snow"
       />
    {/* </BaseButtonsForm.Item>
  </label> */}
 </BaseButtonsForm.Item> 
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
                <Button onClick={()=>setExploreOpen(true)}>Explore Library </Button>
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
              {/* <ParticipantsDropdown
                selectedParticipants={selectedParticipants}
                setSelectedParticipants={setSelectedParticipants}
              />   */}
          </BaseButtonsForm>
          }
        </Modal>
        <PlusOutlined />
  </s.AddCardWrapper>
  )
};
