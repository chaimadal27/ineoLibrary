

import { httpApi } from "./http.api";
import { WorkshopModel } from '@app/domain/WorkshopModel'



export interface WorkshopsData {
workshop:WorkshopModel[] | undefined
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

export const addWorkshop =  async():Promise<WorkshopsData> => {
    const dd:WorkshopsData | any = []
    return dd
}