import { Rectangle } from "../types/rectangle";
import { CreateRectangle } from "../types/createRectangle";
import { ApiResult } from "./api-result";

const BASE_URL = "http://localhost:5275";

export const getRectangle = async () : Promise<ApiResult> => {

    try{
        const response = await fetch(`${BASE_URL}/rectangle`, {
            headers: {
                "Accept": "application/json"
            }
        });
        const body = await response.json();

        return response.ok ?
            ApiResult.fromData(body as Rectangle) :
            ApiResult.fromError(body);
    }
    catch (error: any){
        return ApiResult.fromError(error);
    }
}

export const validateRectangle = async (rectangle: CreateRectangle) : Promise<ApiResult> => {

    try{
        const response = await fetch(`${BASE_URL}/rectangle`,{
            body: JSON.stringify(rectangle),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        const body = await response.json();

        return response.ok ?
            ApiResult.fromData(body as Rectangle) :
            ApiResult.fromError(body);
    }
    catch (error: any){
        return ApiResult.fromError(error);
    }
}