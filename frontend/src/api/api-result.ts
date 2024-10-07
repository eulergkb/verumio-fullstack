export class ApiResult {

    private readonly data?: any;
    private readonly error?: any;

    private constructor(data?: any, error?: any) {
        this.data = data;
        this.error = error;
    }

    get ok() {
        return !this.error;
    }

    getErrorMessage() {
        if(this.error){
            if(this.error?.status === 400 && this.error?.errors){
                return Object.values(this.error.errors).join(", ");
            }
            return this.error.toString();
        }

        return undefined;
    }

    getData<T=any>(): T{
        return this.data as T;
    }

    static fromError(error: any) {
        return new ApiResult(undefined, error);
    }

    static fromData(data: any) {
        return new ApiResult(data, undefined);
    }
}


