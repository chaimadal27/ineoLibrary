import React from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './NftCard.styles';
import { WorkshopModel } from '@app/domain/WorkshopModel';
import { useNavigate } from 'react-router-dom';




interface Workshops {
  workshop: WorkshopModel
}

export const NftCard: React.FC<Workshops> = ({ workshop }) => {
  const { isTablet } = useResponsive();
  const {workshop_title, workshop_description, id } = workshop
  const navigate = useNavigate()


  const handleClick = () => {
    navigate(`/apps/kanban/${id.toString()}`, {state:{data:workshop}})
  }


  const tabletLayout = (
    <>
      <S.InfoHeader>
        <S.InfoText>@{id}</S.InfoText>
      </S.InfoHeader>
      <S.InfoRow>
        <S.CurrentBid>{workshop_description}</S.CurrentBid>
      </S.InfoRow>

    </>
  );

  const mobileLayout = (
    <>
      <S.InfoRow>
        <S.InfoText>{workshop_title}</S.InfoText>
        {/* <S.BidCrypto>{getCurrencyPrice(formatNumberWithCommas(workshop.currentBidCrypto), 'ETH', false)}</S.BidCrypto> */}
      </S.InfoRow>

      <S.InfoRow>
        <S.CurrentBid>{workshop_description}</S.CurrentBid>
        {/* <S.Bid>{getCurrencyPrice(formatNumberWithCommas(workshop.currentBid), 'USD')}</S.Bid> */}
      </S.InfoRow>
    </>
  );

  return (
    <S.Card padding={0} $img={workshop.workshop_image} onClick={()=>handleClick()} >
      <S.NftImage src={workshop.workshop_image} alt="nftImage" />
      <S.NftInfo>
        <S.InfoRow>
          <S.Title>{workshop_title}</S.Title>
        </S.InfoRow>
        {isTablet ? tabletLayout : mobileLayout}
      </S.NftInfo>
    </S.Card>
  );
};