export const swaggerForgotPasswordSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Check your email to complete your password reset process"
                }
            }
        }
    },
    status: 200, 
}

export const swaggerForgotPasswordBadRequest = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "No account found with such email",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400, 
}