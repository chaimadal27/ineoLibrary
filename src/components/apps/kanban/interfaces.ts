export interface Tag {
  id: string;
  title: string;
  bgColor: 'error' | 'warning' | 'success' | 'primary';
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

export interface ActivityDifficulty {
  id: string;
  activity_difficulty: string;
  bgColor: 'error' | 'warning' | 'success';
}



export interface CardState {
  id?: number | string;
  activity_title?: string;
  activity_description?:string;
  activity_method?: string;
  activity_technique?:string;
  activity_difficulty?:ActivityDifficulty[];
  activity_duration?:number;
  activity_objectives?:string;
  activity_needs?:string;
  activity_organization?:string;
  activity_variations?:string;
  laneId?: string | number;
  tags?: Tag[];
  participants?: Participant[];
}