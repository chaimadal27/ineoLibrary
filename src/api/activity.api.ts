import { httpApi } from "./http.api";
import { Activity } from "@app/store/slices/activitySlice";

export const getActivities = async ():Promise<Activity[]> => {
    const response = await httpApi.get('http://localhost:8000/activity')
    const data = await response.data
    return data
}

export const destroyActivity = async():Promise<null> => 
    httpApi.delete('http://localhost:/8000/activity/')
