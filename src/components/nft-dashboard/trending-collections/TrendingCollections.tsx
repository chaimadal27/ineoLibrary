import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from '@app/components/common/Carousel/Carousel';
import { ViewAll } from '@app/components/nft-dashboard/common/ViewAll/ViewAll';
import { NFTCardHeader } from '@app/components/nft-dashboard/common/NFTCardHeader/NFTCardHeader';
import { TrendingCollection } from '@app/components/nft-dashboard/trending-collections/collection/TrendingCollection';
import { useResponsive } from '@app/hooks/useResponsive';
//import { getTrendingActivities, TrendingActivity } from '@app/api/activity.api';
import * as S from './TrendingCollections.styles';
// import { WorkshopModel } from '@app/domain/WorkshopModel';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Workshop } from '@app/store/slices/workshopSlice';

export const TrendingCollections: React.FC = () => {
  // const [trending, setTrending] = useState<WorkshopModel[]>([]);

  const workshops: Workshop[] = useAppSelector((state)=>state.workshop.workshops)

  const { mobileOnly, isTablet: isTabletOrHigher } = useResponsive();


 
  const { t } = useTranslation();


  const trendingList = useMemo(()=>{
    return {
      mobile: workshops.map((item)=>{return (<TrendingCollection key={item.id} {...item} />)}),
      tablet: workshops.map((item)=>{return (
        <div key={item.id}>
          <S.CardWrapper>
            <TrendingCollection key={item.id} {...item} />
          </S.CardWrapper>
        </div>
      )})
    }
  },[workshops])

  const sliderRef = useRef<Slider>(null);

  return (
    <>
      <NFTCardHeader title={t('nft.trendingCollections')}>
        {isTabletOrHigher && (
          <Row align="middle">
            <Col>
              <ViewAll bordered={false} />
            </Col>

            <Col>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickPrev()}>
                <LeftOutlined />
              </S.ArrowBtn>
            </Col>

            <Col>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickNext()}>
                <RightOutlined />
              </S.ArrowBtn>
            </Col>
          </Row>
        )}
      </NFTCardHeader>

      <S.SectionWrapper>
        {mobileOnly && trendingList.mobile}

        {isTabletOrHigher && workshops.length > 0 && (
          <Carousel
            ref={sliderRef}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
            {trendingList.tablet}
          </Carousel>
        )}
      </S.SectionWrapper>

      {mobileOnly && (
        <S.ViewAllWrapper>
          <ViewAll />
        </S.ViewAllWrapper>
      )}
    </>
  );
};
