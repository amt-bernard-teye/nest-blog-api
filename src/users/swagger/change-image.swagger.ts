export const swaggerChangeImageSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Changed profile image successfully"
                }
            }
        }
    },
    status: 200, 
}

export const swaggerChangeImageBadRequest = {
    description: "Validation Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Validation failed (expected size is less than 1000000)",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400, 
}