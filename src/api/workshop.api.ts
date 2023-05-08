import { httpApi } from "./http.api";
import { Workshop } from "@app/store/slices/workshopSlice";




export const addWorkshop = async(workshop:Workshop):Promise<Workshop> => 
  httpApi.post<Workshop>('http://162.19.153.94:8000/workshop/create/lanes/',{...workshop})
    .then(({data})=>data)

export const getWorkshops = async():Promise<Workshop[]> => 
    httpApi.get<Workshop[]>('http://162.19.153.94:8000/workshop/list/')
    .then(({data})=>data)

export const updateWorkshop = async(workshop:Workshop):Promise<Workshop> => 
    httpApi.patch<Workshop>(`http://162.19.153.94:8000/workshop/${workshop.id}/update/lanes/`,{...workshop})
    .then(({data})=>data)

export const updateWorkshopImage = async(workshop:Workshop):Promise<Workshop> => 
    httpApi.patch<Workshop>(`http://162.19.153.94:8000/workshop/${workshop.id}/update/image/`,{...workshop}, {headers:{'Content-Type':'multipart/form-data; boundary=----------'}})
    .then(({data})=>data)

export const getSingleWorkshop = async(workshop:Workshop):Promise<Workshop> =>
    httpApi.get<Workshop>(`http://162.19.153.94:8000/workshop/${workshop.id}/details/`)
    .then(({data})=>data)

