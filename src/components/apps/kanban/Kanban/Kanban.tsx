import React, { useState, useEffect} from 'react';
import { NewCardForm } from '../newCardForm/NewCardForm/NewCardForm';
import { Card } from '../Card/Card';
import { LaneHeader } from '../LaneHeader/LaneHeader';
import { AddCardLink } from '../AddCardLink/AddCardLink';
import { NewLaneSection } from '../NewLaneSection/NewLaneSection';
import { NewLaneForm } from '../NewLaneForm/NewLaneForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { BORDER_RADIUS } from '@app/styles/themes/constants';
import { ActivityModel } from '@app/domain/WorkshopModel';
import { createWorkshop } from '@app/store/slices/workshopSlice';
import { Workshop } from '@app/api/workshop.api';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { notificationController } from '@app/controllers/notificationController';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { Collapse, Panel } from '@app/components/common/Collapse/Collapse';
import * as s from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import * as S from './Kanban.styles';
import { Pane } from 'react-leaflet';


interface WorkshopProps {
  data:Workshop
}

interface LaneType {
  id:string;
  session_title:string;
  cards:ActivityModel[];
}

export const Kanban: React.FC<WorkshopProps> = ({data}) => {



  const [lanes, setLanes] = useState<Workshop>(data)
  const [workshop, setWorkshop] = useState<Workshop>(data)
  const [isFieldsChanged, setIsFieldChanged] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const formItemLayout = {
    labelCol:{span:24},
    wrapperCol:{span:24}
  }

  
  const handleCardAdd = (card:ActivityModel, laneId:number | string) => {
    const laneIndex = lanes.lanes.findIndex(lane => lane.id === laneId);
    const cardExists = lanes.lanes[laneIndex].cards.some(existingCard => existingCard.id === card.id);

    if (cardExists) {
      return;
    }
    
    setLanes(
      previousState => ({
        ...previousState,
        lanes: previousState.lanes.map((lane)=>{
          if (lane.id === laneId) {
            return {
              ...lane,
              cards: [...lane.cards, card]
            }
          }
          return lane
        })
      })
    )
  }

  const handleLaneAdd = (params:LaneType) => {
    const laneExists = lanes.lanes.some(lane => lane.id === params.id && lane.session_title === params.session_title);
    if (laneExists) return;
    setLanes({ ...lanes, lanes:[...lanes.lanes, params]})
  }

  const handleCardDelete = (cardId:string | number, laneId:string | number) => {
    setLanes(
      previousState => ({
        ...previousState,
        lanes: previousState.lanes.map((lane)=>{
          if (lane.id === laneId) {
            return {
              ...lane,
              cards: lane.cards.filter((card)=>card.id !== cardId)
            }
          }
          return lane
        })
      })
    )
  }

  const handleLaneDelete = (laneId:string | number) => {
    setLanes(
      previousState => ({
        ...previousState,
        lanes: previousState.lanes.filter((lane)=>lane.id !== laneId)
      })
    )
  }

  const handleLaneUpdate = (laneId:string | number, params:LaneType) => {
    setLanes(
      previousState => ({
        ...previousState,
        lanes: previousState.lanes.map((lane)=>{
          if (lane.id === laneId) {
            return {
              ...lane,
              session_title: params.session_title
            }
          }
          return lane
        })
      })
    )
  }

  const handleDataChange = (newData:Workshop) => {
    setLanes(newData)
  }


  const onFinish = (values:Workshop) => {
    console.log('onFinish clicked')
      setWorkshop({
        ...workshop,
        workshop_title: values.workshop_title,
        uses: values.uses,
        target_skills: values.target_skills,
        duration: values.duration,
        workshop_method: values.workshop_method,
        workshop_description: values.workshop_description,
        lanes: lanes.lanes
       })
      setLoading(true)
  }

  const handleSubmit = () => {
    console.log(workshop)
    dispatch(createWorkshop(workshop))
    .unwrap()
    .then(()=>{
      notificationController.success({message:'Workshop updated successfully'})
      setLoading(false)     
    })
    .catch((err)=>notificationController.error({message:err.message}))
  }

  useEffect(()=>{
    if (isLoading) {
      handleSubmit()
      setLoading(false)
    }
  },[isLoading])


  return (
    <>
    <s.CollapseWrapper defaultActiveKey="2">
      <Panel header='Workshop details' key='1'>
      <BaseButtonsForm
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={()=>setIsFieldChanged(true)}
      loading={isLoading}
      name='updateWorkshop'
      onFinish={onFinish}
      {...formItemLayout}>

      <BaseButtonsForm.Item label='Title' name='workshop_title' initialValue={workshop.workshop_title}>
        <Input
            placeholder='Title' 
            value={workshop.workshop_title} 
            defaultValue={workshop.workshop_title} />
       
                  
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label='Description' name='workshop_description'>

          <Input 
            placeholder='Description' 
            value={workshop.workshop_description} 
            defaultValue={workshop.workshop_description}
            />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label='Uses' name='uses'>
        <Select 
          defaultValue={workshop.uses}
          value={workshop.uses}>
          <Option value="Business Creation">Business Creation</Option>
          <Option value="Post Creation">Post Creation</Option>
          <Option value="Agriculture Business">Agriculture Business</Option>
          <Option value="Startups">Startups</Option>
          <Option value="Social Business">Social Business</Option>
          <Option value="Green Business">Green Business</Option>
          <Option value="Women Entrepreneurship">Women Entrepreneurship</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label='Target skills' name='target_skills'>
        <Select 
          defaultValue={workshop.target_skills}
          value={workshop.target_skills}>
          <Option value="Computer Skills">Computer Skills</Option>
          <Option value="Numeracy Skills">Numeracy Skills</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label='Method' name='workshop_method'>
        <Select
          defaultValue={workshop.workshop_method}
          value={workshop.workshop_method}>
          <Option value="Online">Online</Option>
          <Option value="Blended">Blended</Option>
          <Option value="Presential">Presential</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label='Duration'>
                <label>
                  <BaseButtonsForm.Item name='duration'>
                    <InputNumber
                      value={workshop.duration}
                      min={0}
                      keyboard={true} />
                  </BaseButtonsForm.Item>
                </label>
      </BaseButtonsForm.Item>
    </BaseButtonsForm>

      </Panel>
    </s.CollapseWrapper>


      <S.Kanban
        components={{
          Card,
          NewCardForm,
          LaneHeader,
          AddCardLink,
          NewLaneSection,
          NewLaneForm,
        }}
        editable
        laneDraggable
        canAddLanes
        data={lanes}

        onCardAdd={(card:ActivityModel, laneId:number | string)=>handleCardAdd(card, laneId)}
        onLaneAdd={(params:LaneType)=>handleLaneAdd(params)}
        onCardDelete={(cardId:string | number, laneId:string | number)=>handleCardDelete(cardId, laneId)}
        onLaneDelete={(laneId:string | number)=>handleLaneDelete(laneId)}
        onLaneUpdate={(laneId:string | number, params:LaneType)=>handleLaneUpdate(laneId, params)}
        onDataChange={(newData:Workshop)=>handleDataChange(newData)}

        laneStyle={{ background: 'transparent', maxHeight: '100%' }}
        cardStyle={{
          borderRadius: BORDER_RADIUS,
          backgroundColor: 'var(--background-color)',
          padding: `1.25rem 1rem`,
          marginBottom: '1rem',
          minWidth: '16rem',
          maxWidth: '16rem',
        }}
      />
    
    </>
  );
};
