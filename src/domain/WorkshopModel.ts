import { kanbanDifficulty, KanbanTags } from "@app/constants/kanbanTags";
const { high, medium, low } = kanbanDifficulty;

export interface WorkshopModel {
  id: string | number;
  workshop_title:string;
  uses:string;
  target_skills:string;
  duration:number|string;
  workshop_method:string;
  workshop_image:string;
  workshop_description: string;
  created_at:string;
  updated_at:string;
  deleted_at:string;
  lanes:Lanes[];
}

export interface Lanes {
  id:string | number;
  session_title:string;
  cards:ActivityModel[]
}

export interface ActivityModel {
  id:string | number;
  activity_title:string;
  activity_method:string;
  activity_technique:string[];
  activity_difficulty:KanbanTags[];
  activity_duration:number|string;
  activity_objectives:string;
  activity_needs:string;
  activity_organization:string;
  activity_variations:string;
  activity_description:string;
  created_at:string;
}

export interface ActivityTechnique {
  technique:string
}