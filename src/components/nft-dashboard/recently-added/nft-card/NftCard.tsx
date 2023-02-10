import React, { useEffect } from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { NftItem } from '@app/api/nftDashboard.api';
import { formatNumberWithCommas, getCurrencyPrice } from '@app/utils/utils';
import * as S from './NftCard.styles';
import { WorkshopModel } from '@app/domain/WorkshopModel';

// interface NftCardProps {
//   workshop: NftItem;
// }

interface Workshops {
  workshop: WorkshopModel
}

export const NftCard: React.FC<Workshops> = ({ workshop }) => {
  const { isTablet } = useResponsive();
  const {workshop_title } = workshop


  const tabletLayout = (
    <>
      <S.InfoHeader>
        <S.InfoText>@{workshop_title}</S.InfoText>
      </S.InfoHeader>

      {/* <S.InfoFooter>
        <S.CurrentBidWrapper>
          <S.CurrentBid>Current Bid</S.CurrentBid>
          <S.BidCrypto>{getCurrencyPrice(formatNumberWithCommas(workshop.currentBidCrypto), 'ETH', false)}</S.BidCrypto>
        </S.CurrentBidWrapper>

        <S.CurrentBidWrapper>
          <S.Bid>{getCurrencyPrice(formatNumberWithCommas(workshop.currentBid), 'USD')}</S.Bid>
        </S.CurrentBidWrapper>
      </S.InfoFooter> */}
    </>
  );

  const mobileLayout = (
    <>
      <S.InfoRow>
        <S.InfoText>@{workshop_title}</S.InfoText>
        {/* <S.BidCrypto>{getCurrencyPrice(formatNumberWithCommas(workshop.currentBidCrypto), 'ETH', false)}</S.BidCrypto> */}
      </S.InfoRow>

      {/* <S.InfoRow>
        <S.CurrentBid>Current Bid</S.CurrentBid>
        <S.Bid>{getCurrencyPrice(formatNumberWithCommas(workshop.currentBid), 'USD')}</S.Bid>
      </S.InfoRow> */}
    </>
  );

  return (
    <S.Card>
      {/* <S.NftImage src={workshop.image} alt="nftImage" /> */}
      <S.NftInfo>
        <S.InfoRow>
          <S.Title>{workshop_title}</S.Title>
        </S.InfoRow>
        {isTablet ? tabletLayout : mobileLayout}
      </S.NftInfo>
    </S.Card>
  );
};
//  padding={0} $img={workshop.image}