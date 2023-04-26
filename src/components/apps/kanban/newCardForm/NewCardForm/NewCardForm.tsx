import React, { useState, useEffect } from "react";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
// import { Input, Form, Upload } from "antd";
// import { useTranslation } from "react-i18next";
import {
  CardState,
  // Tag,
  // Participant,
  ActivityDifficulty,
  // ActivityTechnique,
} from "../../interfaces";
import { TagDropdown } from "../TagDropdown/TagDropdown";
import * as S from "./NewCardForm.styles";
// import { ParticipantsDropdown } from "../ParticipantsDropdown/ParticipantsDropdown";
import { Modal } from "@app/components/common/Modal/Modal";
import { Col, Row } from "antd";
import { Button } from "@app/components/common/buttons/Button/Button";
// import { useNavigate } from "react-router-dom";
// import { TextArea } from "@app/components/common/inputs/Input/Input";
import { Select, Option } from "@app/components/common/selects/Select/Select";
import { InputNumber } from "@app/components/common/inputs/InputNumber/InputNumber";
import { PlusOutlined } from "@ant-design/icons";
import * as s from "../../AddCardLink/AddCardLink.styles";
// import { AddCardLink } from "../../AddCardLink/AddCardLink";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { httpApi } from "@app/api/http.api";
import { Activity } from "@app/store/slices/activitySlice";
import { Explore } from "./Explore";
import styled from "styled-components";
import { route } from "@app/route"

// import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
// import { UploadChangeParam } from "antd/es/upload";
// import { Values } from "@app/components/common/charts/Legend/Legend.styles";

const formInputs = [
  {
    title: "kanban.title",
    label: "Title",
    name: "activity_title",
  },
  {
    title: 'Objectives',
    label: 'Objectives',
    name: 'activity_objectives',
  },
  {
    title: 'Method',
    label: 'Method',
    name: 'activity_method',
  },
  {
    title: 'Technique',
    label: 'Technique',
    name: 'activity_technique',
  },
  {
    title: 'Difficulty',
    label: 'Difficulty',
    name: 'activity_difficulty',
  },
  {
    title: 'Duration',
    label: 'Duration',
    name: 'activity_duration',
  },
  {
    title: 'kanban.description',
    label: 'Description',
    name: 'activity_description',
  },
  {
    title: 'Needs',
    label: 'Needs',
    name: 'activity_needs',
  },
  {
    title: 'Organization',
    label: 'Organization',
    name: 'activity_organization',
  },
  {
    title: 'Variations',
    label: 'Variations',
    name: 'activity_variations',
  },
];

interface NewCardFormProps {
  onAdd: (state: CardState | Activity) => void;
  onCancel: () => void;
}

export const toolbarOptions = [
  ['bold', 'italic', 'underline'],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['blockquote', 'code-block'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{ 'direction': 'rtl' }],                        // text direction
  ['link', 'image'],

  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];
export const NewCardForm: React.FC<NewCardFormProps> = ({ onAdd, onCancel }) => {
  // const navigate = useNavigate();

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'code-block',
  ];

  const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1rem;
  `;

  const [selectedTags, setSelectedTags] = useState<ActivityDifficulty[]>([]);
  // const [selectedParticipants, setSelectedParticipants] = useState<
  //   Participant[]
  // >([]);
  const [isLoading, setLoading] = useState(false);

  // const [isExploreOpen, setExploreOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpActOpen, setIsExpActOpen] = useState(true);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [modalTitle, setModal] = useState(
    "Explore existing activities or add a new one"
  );
  const [isFieldsChanged, setFieldsChanged] = useState(false);

  const [activities, setActivities] = useState<Activity[]>()
  // const [file, setFile] = useState<File>()
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // const { t } = useTranslation();

  const onFinish = (values: CardState) => {
    setLoading(true);
    setTimeout(() => {
      setFieldsChanged(false);
      onAdd({ ...values, activity_difficulty: selectedTags });
      setIsModalOpen(false);
      setLoading(false);
    }, 1000);
  };

  const add = (activity:Activity) => {
    console.log(activity)
    onAdd(activity)
  }
  
  

  useEffect(()=>{
    httpApi.get(`${route}/activity/`)
    .then((resp)=>{
      setActivities(resp.data);
    })
    .catch((err)=>{
      console.log(err.message)
    })
  },[])

  const formItems = formInputs.map((item, index) => {
    const { label, name } = item;
    if (name === "activity_method") {
      return (
        <>
          <BaseButtonsForm.Item
            name="activity_method"
            label="Method"
            hasFeedback
            rules={[{ message: "you have to choose an activity method" }]}
          >
            <Select width={100}>
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
            rules={[{ required: true, message: 'you must choose at least one need' }]}
          >
            <Select  mode="multiple" width={100}>
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
    if (name === "activity_difficulty") {
      return (
        <>
          <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </>
      );
    }
    if (name === "activity_duration") {
      return (
        <>
          <BaseButtonsForm.Item label="Duration">
            <label>
              <BaseButtonsForm.Item name="activity_duration">
                <InputNumber min={0} keyboard={true} />
              </BaseButtonsForm.Item>
            </label>
          </BaseButtonsForm.Item>
        </>
      );
    }
    if (name === "activity_needs") {
      return (
        <>
          <BaseButtonsForm.Item
            name="activity_needs"
            label="Needs"
            hasFeedback
            rules={[{ required: true, message: 'you must choose at least one need' }]}
          >
            <Select width={100}>
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
        <BaseButtonsForm.Item label={'Description'} className="ql-editor-Description" name="activity_description" key={index}>
          <ReactQuill
            // key={index}
            formats={formats}
            modules={{
              toolbar: toolbarOptions,
            }}
            theme="snow"
          />
        </BaseButtonsForm.Item>
      );
    }

    return (
      <BaseButtonsForm.Item label={label} key={index} name={name}>
        {/* <label>
    <BaseButtonsForm.Item name={name} > */}
        {/* <Input placeholder={label} /> */}
        <ReactQuill
          formats={formats}
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
        />
        {/* </BaseButtonsForm.Item>
  </label> */}
      </BaseButtonsForm.Item>
    );
  });
  return (
    <s.AddCardWrapper
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <Modal
        title={modalTitle}
        centered
        open={isModalOpen}
        onOk={(e) => {
          e.stopPropagation();
          setIsExpActOpen(true);
          setIsModalOpen(false);
          setIsActivityOpen(false);
          // setExploreOpen(false);
          setModal("Explore existing activities or add a new one");
        }}
        onCancel={(e) => {
          e.stopPropagation();
          setIsExpActOpen(true);
          setIsModalOpen(false);
          setIsActivityOpen(false);
          // setExploreOpen(false);
          setModal("Explore existing activities or add a new one");
        }}
        closable={true}
        mask={true}
        maskClosable={false}
        footer={<div></div>}
      >
        {isExpActOpen ? (
          <Row>
            <Col span={4}></Col>
            <Col>
              <Button
                onClick={() => {
                  setIsActivityOpen(true);
                  setIsExpActOpen(false);
                  setModal("Create a new activity");
                }}
              >
                Add Activity
              </Button>
            </Col>
            <Col span={5}></Col>
            <Col>
              <Button
                onClick={() => {
                  // setExploreOpen(true);
                  setIsExpActOpen(false);
                  setModal("Explore activities");
                }}
              >
                Explore Library{" "}
              </Button>
            </Col>
          </Row>
        ) : isActivityOpen ? (
          <BaseButtonsForm
            {...formItemLayout}
            isFieldsChanged
            onFieldsChange={() => setFieldsChanged(true)}
            name="addCard"
            footer={
              <S.FooterButtons
                loading={isLoading}
                size="small"
                onCancel={onCancel}
              />
            }
            onFinish={onFinish}
          >
            {formItems}
            
          </BaseButtonsForm>
        ) : (
          <Container>
            {
              activities?.map((activity)=>{
                return (
                  <Explore key={activity.id}  activity={activity} add={()=>add(activity)} />
                )
              })
            }
          </Container>
        )}
        {}
      </Modal>
      <PlusOutlined />
    </s.AddCardWrapper>
  );
};
