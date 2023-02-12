import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from '@app/components/common/Carousel/Carousel';
import { NFTCardHeader } from '@app/components/nft-dashboard/common/NFTCardHeader/NFTCardHeader';
import { ViewAll } from '@app/components/nft-dashboard/common/ViewAll/ViewAll';
import { NftCard } from '@app/components/nft-dashboard/recently-added/nft-card/NftCard';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './RecentlyAddedNft.styles';
import { fetchWorkshops } from '@app/store/slices/workshopSlice'
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { WorkshopModel } from '@app/domain/WorkshopModel';

export const RecentlyAddedNft: React.FC = () => {
  
  
  const { t } = useTranslation();
  const { mobileOnly, isTablet } = useResponsive();
  const dispatch = useAppDispatch()
  
  const workshops:WorkshopModel[] = useAppSelector((state)=>state.workshop.workshop)


  useEffect(() => {
    dispatch(fetchWorkshops())
  }, []);

  const cards = useMemo(()=>{
    return {
      mobile: workshops.map((workshop)=> <NftCard key={workshop.id} workshop={workshop} />),
      tablet: workshops.map((workshop)=> <div key={workshop.id}><S.CardWrapper><NftCard key={workshop.id} workshop={workshop} /></S.CardWrapper></div>)
    }
  },[workshops, t, mobileOnly, isTablet, useAppSelector])


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>();

  return (
    <>
    <NFTCardHeader title={t('nft.recentlyAddedNFTs')}>
        {isTablet && (
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
        {/* {mobileOnly && cards.mobile} */}

        {/* {isTablet && workshops.length > 0 && ( */}
          <Carousel
            // ref={sliderRef}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 3,
                },
              },
            ]}
          >
         {cards.tablet}
          </Carousel>
        {/* // )} */}
      </S.SectionWrapper>

      {mobileOnly && (
        <S.ViewAllWrapper>
          <ViewAll />
        </S.ViewAllWrapper>
      )}
    </>
  );
};
