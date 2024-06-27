export const swaggerChangePasswordSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Password changed successfully"
                }
            }
        }
    },
    status: 200, 
}

export const swaggerChangePasswordBadRequest = {
    description: "Validation Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Passwords do not match each other",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400, 
}