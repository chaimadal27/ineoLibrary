import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@app/components/common/Avatar/Avatar';
import { WorkshopModel } from '@app/domain/WorkshopModel';
import * as S from './TrendingCollection.styles';
import { useNavigate } from 'react-router-dom';

export const TrendingCollection: React.FC<WorkshopModel> = ({id, workshop_title, uses, target_skills, duration, workshop_method, workshop_image, workshop_description}) => {

  const { t } = useTranslation();
  const navigate = useNavigate()


  return (
    <S.Card padding={0} $img={workshop_image} onClick={()=>navigate('/apps/kanban')}>
      <S.CollectionImage src={workshop_image} alt="nft" />
      
      <S.NftCollectionInfo>
        <S.AuthorAvatarWrapper>
          <Avatar shape="circle" size={64}  />
        </S.AuthorAvatarWrapper>
        <S.InfoRow>
          <S.Title level={5}>{workshop_title}</S.Title>
        </S.InfoRow>
        
        
        <S.InfoRow>
          <S.InfoText>{workshop_description}</S.InfoText>
        </S.InfoRow>
        {/* <S.InfoRow>
          <S.OwnerText>
            {t('nft.by')} {owner}
          </S.OwnerText>
          <S.USDText>{getCurrencyPrice(formatNumberWithCommas(usd_value), 'USD')}</S.USDText>
        </S.InfoRow> */}
      </S.NftCollectionInfo>
    </S.Card>
  );
};
