import { httpApi } from "./http.api"
import { UserModel } from "@app/domain/UserModel"

export interface UsersData {
    users:UserModel[] | undefined
}


export const getUsers = async ():Promise<UsersData> => {
    try{
        const response = await httpApi.get<UsersData>('http://162.19.153.94:8000/user/')
        const data = await response.data
        return data
    } catch (e:any) {
        throw new Error(e)
    }
}