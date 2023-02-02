import { ActivityStatusType } from '@app/interfaces/interfaces';
import pic from '@app/assets/images/download.png';

export interface Activity {
  image: string;
  title: string;
  status: ActivityStatusType;
  date: number;
  owner: string;
}

export interface UserActivity extends Omit<Activity, 'owner'> {
  usd_value: number;
}

export interface TrendingActivity {
  title: string;
  owner: string;
  image: string;
  avatar: string;
  usd_value: number;
}

export const getUserActivities = (): Promise<UserActivity[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          image: pic,
          title: 'Cubic#1',
          status: 'sold',
          date: Date.now() - 1000 * 60 * 60 * 24 * 5,
          usd_value: 240,
        },
        {
          image: pic,
          title: 'Ancient Nature',
          status: 'added',
          date: Date.now() - 1000 * 60 * 60 * 24 * 22,
          usd_value: 1360,
        },
        {
          image: pic,
          title: 'Art of Mind',
          status: 'booked',
          date: Date.now() - 1000 * 60 * 60 * 24 * 156,
          usd_value: 1895,
        },
        {
          image: pic,
          title: 'CryptoBox',
          status: 'sold',
          date: Date.now() - 1000 * 60 * 60 * 24 * 31,
          usd_value: 3920,
        },
      ]);
    }, 0);
  });
};

export const getActivities = (): Promise<Activity[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          image: process.env.REACT_APP_ASSETS_BUCKET + '/lightence-activity/unsplash_d2w-_1LJioQ_urzhuj.webp',
          title: 'Yellow Light',
          status: 'sold',
          date: Date.now() - 1000 * 60 * 24,
          owner: '@chingu98',
        },
        {
          image: process.env.REACT_APP_ASSETS_BUCKET + '/lightence-activity/unsplash_1rBg5YSi00c_1_mpz3a7.webp',
          title: 'Cult of Nature',
          status: 'added',
          date: Date.now() - 1000 * 60 * 60 * 2,
          owner: '@azukaru1X',
        },
        {
          image: process.env.REACT_APP_ASSETS_BUCKET + '/lightence-activity/unsplash_GfQEdpIkkuw_vid9mb.webp',
          title: 'Match the Eyes',
          status: 'booked',
          date: Date.now() - 1000 * 60 * 60 * 22,
          owner: '@samsam',
        },
        {
          image: process.env.REACT_APP_ASSETS_BUCKET + '/lightence-activity/unsplash_3MAmj1ZKSZA_rfbw6u.webp',
          title: 'Plan A & CUSTOM X3',
          status: 'sold',
          date: Date.now() - 1000 * 60 * 60 * 8,
          owner: '@mikke_swar',
        },
      ]);
    }, 1000);
  });
};

export const getTrendingActivities = (): Promise<TrendingActivity[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          title: 'TownYTraveler',
          owner: '@akura',
          image: pic,
          avatar: pic,
          usd_value: 1045,
        },
        {
          title: 'TownYTraveler',
          owner: '@akura',
          image: pic,
          avatar: pic,
          usd_value: 1045,
        },
        {
          title: 'TownYTraveler',
          owner: '@akura',
          image: pic,
          avatar: pic,
          usd_value: 1045,
        },
        {
          title: 'TownYTraveler',
          owner: '@akura',
          image: pic,
          avatar: pic,
          usd_value: 1045,
        },
        {
          title: 'TownYTraveler',
          owner: '@akura',
          image: pic,
          avatar: pic,
          usd_value: 1045,
        },
      ]);
    }, 0);
  });
};
