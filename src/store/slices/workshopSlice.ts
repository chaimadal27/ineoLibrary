import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    updateWorkshopImage,
    getWorkshops,
    addWorkshop,
    getSingleWorkshop,
    updateWorkshop,
} from '@app/api/workshop.api'
import { ActivityModel } from '@app/domain/WorkshopModel';


export interface WorkshopState {
    status:'idle' | 'loading' | 'failed';
    workshops:Workshop[];
    error: string | null

}

const initialState:WorkshopState = {
    status: 'idle',
    workshops:[],
    error:  null
}

export interface Activity {
    id:string | number;
    activity_title:string;
    activity_method:string;
    activity_technique:string;
    activity_difficulty:[];
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

export const fetchWorkshops = createAsyncThunk('get_workshops', async()=>{
   return getWorkshops()
})

export const createWorkshop = createAsyncThunk('create_workshop', async(payload:Workshop)=>{
    return addWorkshop(payload)
})

export const getOneWorkshop = createAsyncThunk('get_one_workshop', async(payload:Workshop)=>{
    return getSingleWorkshop(payload)
})

export const patchWorkshop = createAsyncThunk('update_workshop', async(payload:Workshop)=>{
    return updateWorkshop(payload)  
})

export const patchWorkshopImage = createAsyncThunk('update_workshop_image', async(payload:Workshop)=>{
    return updateWorkshopImage(payload)
})



export const workshopSlice = createSlice({
    name:'workshop',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchWorkshops.pending, (state)=>{
            state.status = 'loading'
        })

        builder.addCase(fetchWorkshops.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.workshops = action.payload
        })

        builder.addCase(fetchWorkshops.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message ?? 'Unkown error'
        })

        // builder.addCase(createWorkshop.fulfilled,(state, payload)=>{
        // })
        // builder.addCase(patchWorkshop.fulfilled, (state, payload)=>{
        // })
        // builder.addCase(patchWorkshopImage.fulfilled, (state, action)=>{
        // })
    }
})
export const {} = workshopSlice.actions;
export default workshopSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {
//     getWorkshops,
//     WorkshopsData,
//     addWorkshop,
//     Workshop,
//     getSingleWorkshop,
//     updateWorkshop
// } from '@app/api/workshop.api'
// import { WorkshopModel } from '@app/domain/WorkshopModel';



// const initialState:WorkshopsData = {
//     workshop:[],
//     singleWorkshop:<WorkshopModel>{}
// }


// export const fetchWorkshops = createAsyncThunk('get_workshops', async(payload, { dispatch })=>{
//    return getWorkshops()
// })

// export const createWorkshop = createAsyncThunk('create_workshop', async(payload:Workshop,{dispatch})=>{
//     return addWorkshop(payload)
// })

// export const getOneWorkshop = createAsyncThunk('get_one_workshop', async(payload:Workshop,{dispatch})=>{
//     return getSingleWorkshop(payload)
// })

// export const patchWorkshop = createAsyncThunk('update_workshop', async(payload:Workshop, {dispatch})=>{
//     return updateWorkshop(payload)  
// })




// export const workshopSlice = createSlice({
//     name:'workshop',
//     initialState,
//     reducers: {},
//     extraReducers:(builder)=>{
//         builder.addCase(fetchWorkshops.fulfilled, (state, action)=>{
//             state.workshop = action.payload
//         })

//         builder.addCase(getOneWorkshop.fulfilled, (state, action)=>{
//             state.singleWorkshop = action.payload
//         })

//         builder.addCase(createWorkshop.fulfilled,(state, payload)=>{
//         })
//         builder.addCase(patchWorkshop.fulfilled, (state, payload)=>{
//         })
//     }
// })
// export const {} = workshopSlice.actions;
// export default workshopSlice.reducer;