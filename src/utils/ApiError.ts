class ApiError extends Error {
    statusCode: number;
    errorData: any;
    isOperational: boolean;
    constructor(statusCode:number, message:string, data = null, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if(data) this.errorData = data;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export default ApiError;