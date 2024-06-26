export const swaggerResetPasswordSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Password changed, move to the login page to login"
                }
            }
        }
    },
    status: 200, 
}

export const swaggerResetPasswordBadRequest = {
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