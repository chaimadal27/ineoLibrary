import pic from '@app/assets/images/download.png';
import { WorkshopModel } from '@app/domain/WorkshopModel';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Workshop } from '@app/store/slices/workshopSlice';


// export interface NftItem {
//   image: string;
//   title: string;
//   author: string;
//   currentBid: number;
//   currentBidCrypto: number;
// }

// export interface Workshop {
//   id: string,
//   worshop_title:string;
//   uses:string;
//   target_skills:string;
//   duration: string;
//   workshop_method: string
// }



export const getRecentlyAddedNfts = (): Promise<Workshop[]> => {
  const workshops = useAppSelector((state)=>state.workshop.workshops)
  return new Promise((res) => { 
    res(workshops);
  });
};
