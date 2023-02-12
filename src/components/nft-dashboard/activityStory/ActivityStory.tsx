import React, { useEffect, useMemo, useState } from 'react';
import { Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { ActivityStoryItem } from './ActivityStoryItem/ActivityStoryItem';
import { UserActivity, getUserActivities } from '@app/api/activity.api';
import * as S from './ActivityStory.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { WorkshopModel } from '@app/domain/WorkshopModel';

export const ActivityStory: React.FC = () => {
  // const [story, setStory] = useState<UserActivity[]>([]);
  const workshops: WorkshopModel[] = useAppSelector((state)=>state.workshop.workshop)

  const { t } = useTranslation();

  // useEffect(() => {
  //   getUserActivities().then((res) => setStory(res));
    
  // }, []);

  const activityStory = useMemo(
    () =>
      workshops.map((workshop) => (
        <Col span={24}>
          <ActivityStoryItem key={workshop.id} {...workshop} />
        </Col>
      )),
    [workshops],
  );

  return (
    <S.Wrapper>
      <S.Title level={2}>{t('nft.activityStory')}</S.Title>
      <S.ActivityRow gutter={[26, 26]}>{activityStory}</S.ActivityRow>
    </S.Wrapper>
  );
};