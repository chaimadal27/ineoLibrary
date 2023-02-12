import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import * as S from './ActivityStoryItem.styles';
import { WorkshopModel } from '@app/domain/WorkshopModel';


export const ActivityStoryItem: React.FC<WorkshopModel> = ({id, workshop_title, uses, target_skills, duration, workshop_method, workshop_image, workshop_description, created_at}) => {
  const { t } = useTranslation();
  

  return (
    <Row gutter={[20, 20]} wrap={false} align="middle">
      <Col>
        <img width={80} height={80} src={workshop_image} alt={workshop_title} />
      </Col>

      <Col flex={1}>
        <Row justify="space-between" wrap={false}>
          <Col>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <S.Title>{workshop_title}</S.Title>
              </Col>

              {/* <Col span={24}>
                <S.Status $color={currentStatus?.color || 'primary'}>{t(currentStatus?.title || '')}</S.Status>
              </Col> */}
            </Row>
          </Col>

          <Col span={8}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <S.DateText>{Dates.getDate(created_at).format('L')}</S.DateText>
              </Col>

              <Col span={24}>
                {/* <S.Text>{getCurrencyPrice(formatNumberWithCommas(usd_value), 'USD')}</S.Text> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
