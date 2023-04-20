import { destroyActivity, getActivities } from "@app/api/activity.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface ActivityState {
    status: 'idle' | 'loading' | 'failed'
    activities: Activity[]
    error: string | null
}

const initialState: ActivityState = {
    status:'idle',
    activities:[],
    error: null
}

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

export const fetchActivities = createAsyncThunk('get_activities', async()=>{
    return getActivities()
})

export const deleteActivity = createAsyncThunk('delete_activity', async()=>{
    return destroyActivity()
})

export const activitySlice = createSlice({
    name:'activity',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
       builder.addCase(fetchActivities.pending, (state)=>{
            state.status = 'loading'
       })
       builder.addCase(fetchActivities.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.activities = action.payload
       })
       builder.addCase(fetchActivities.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message ?? 'Unkown error'
       })

       builder.addCase(deleteActivity.fulfilled, (state)=>{
            state.status = 'idle'
       })
    }
})
export const {} = activitySlice.actions
export default activitySlice.reducer