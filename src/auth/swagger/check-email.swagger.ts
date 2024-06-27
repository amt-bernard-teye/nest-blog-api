export const swaggerCheckEmailSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Free to use"
                }
            }
        }
    },
    status: 200,        
};

export const swaggerCheckEmailBadRequest = {
    description: "Validation Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Invalid email address",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400,
}