import pic from '@app/assets/images/download.png';

export interface NftItem {
  image: string;
  title: string;
  author: string;
  currentBid: number;
  currentBidCrypto: number;
}

export const getRecentlyAddedNfts = (): Promise<NftItem[]> => {
  return new Promise((res) => {
    res([
      {
        image: pic,
        title: 'XCopy Humano',
        author: 'neithanwolf',
        currentBid: 3521,
        currentBidCrypto: 1.63,
      },
      {
        image: pic,
        title: 'Borth of Universe',
        author: 'jakeparker',
        currentBid: 3150,
        currentBidCrypto: 1.02,
      },
      {
        image: pic,
        title: 'Star Away',
        author: 'nick_johnson',
        currentBid: 7210,
        currentBidCrypto: 2.08,
      },
      {
        image: pic,
        title: 'Night Deprivation',
        author: 'mikeAdamson',
        currentBid: 740,
        currentBidCrypto: 1.56,
      },
      {
        image: pic,
        title: 'Spiral Hole',
        author: 'jo_wo_le',
        currentBid: 311,
        currentBidCrypto: 1.04,
      },
    ]);
  });
};
