import { httpApi } from "./http.api";


export interface Activity {
    id:string | number;
    activity_title:string;
    activity_method:string;
    activity_technique:ActivityTechnique[];
    activity_difficulty:ActivityDifficulty[];
    activity_duration:number | string;
    activity_objectives:string;
    activity_needs:string;
    activity_organization:string;
    activity_variations:string;
    activity_description:string;
    created_at:string;
}
export interface ActivityDifficulty {
    id:string;
    activity_difficulty:string;
    bgColor:'error' | 'warning' | 'success';
}

export interface ActivityTechnique {
    technique:string
}


export const getActivities = async ():Promise<Activity[]> => {
    const response = await httpApi.get('http://localhost:8000/activity')
    const data = await response.data
    return data
}

export const destroyActivity = async():Promise<null> => 
    httpApi.delete('http://localhost:/8000/activity/')
