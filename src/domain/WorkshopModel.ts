export interface WorkshopModel {
  id: string,
  workshop_title:string,
  uses:string,
  target_skills:string,
  duration:number,
  workshop_method:string,
  workshop_image:string,
  workshop_description: string,
  created_at:string,
  activities_set:ActivityModel[]
}

export interface ActivityModel {
  id:string,
  activity_title:string,
  activity_method:string,
  activity_technique:string,
  activity_difficulty:string,
  activity_duration:number,
  activity_objectives:string,
  activity_needs:string,
  activity_organization:string,
  activity_variations:string,
  day_index:string
}

