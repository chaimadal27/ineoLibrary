

import { httpApi } from "./http.api";
import { WorkshopModel } from '@app/domain/WorkshopModel'



export interface WorkshopsData {
    workshop:WorkshopModel[];
    singleWorkshop:WorkshopModel
    
}


export interface ActivityModel {
    id:string | number;
    activity_title:string;
    activity_method:string;
    activity_technique:string;
    activity_difficulty:string;
    activity_duration:number | string;
    activity_objectives:string;
    activity_needs:string;
    activity_organization:string;
    activity_variations:string;
    activity_description:string;
    created_at:string;
  }
  

export interface Workshop {
    id: string | number;
    workshop_title:string;
    uses:string;
    target_skills:string;
    duration:number | string;
    workshop_method:string;
    // workshop_image:string;
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

export const getWorkshops= async ():Promise<WorkshopsData> => {
    try {
        const response = await httpApi.get<WorkshopsData>('http://localhost:8000/workshop/')
        const data = await response.data
        return data
    } catch(e:any) {
        throw new Error(e);
    }
} 

export const getSingleWorkshop = async (workshop:Workshop):Promise<WorkshopModel> => {
    try {
        const response = await httpApi.get<WorkshopModel>(`http://localhost:8000/workshop/${workshop.id}/`)
        const data = await response.data
        return data
    } catch (e:any) {
        throw new Error(e)
    }
}

export const addWorkshop = (workshop: Workshop): Promise<Workshop> =>
    httpApi.post<Workshop>('http://localhost:8000/workshop/', { ...workshop }).then(({ data }) => data);

export const updateWorkshop = async (workshop:Workshop):Promise<Workshop> => 
    httpApi.patch<Workshop>(`http://localhost:8000/workshop/${workshop.id}/`, { ...workshop }).then(({ data }) => data);