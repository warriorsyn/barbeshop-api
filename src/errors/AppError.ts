export default class AppError {
    public readonly message: string;

    public readonly code?: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400, code?: string) {
        this.message = message;
        this.statusCode = statusCode;
        this.code = code;
    }
}