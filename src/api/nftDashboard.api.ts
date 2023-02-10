import pic from '@app/assets/images/download.png';
import { useAppSelector } from '@app/hooks/reduxHooks';


export interface NftItem {
  image: string;
  title: string;
  author: string;
  currentBid: number;
  currentBidCrypto: number;
}

export interface Workshop {
  id: string,
  worshop_title:string;
  uses:string;
  target_skills:string;
  duration: string;
  workshop_method: string
}



export const getRecentlyAddedNfts = (): Promise<Workshop[]> => {
  const workshops = useAppSelector((state)=>state.workshop.workshop)
  return new Promise((res) => { 
    res(workshops);
  });
};
