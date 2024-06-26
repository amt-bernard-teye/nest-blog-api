export const swaggerRegisterSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Check your email inbox to complete your registration process"
                }
            }
        }
    },
    status: 201,        
};

export const swaggerRegisterBadRequest = {
    description: "User Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Email already exist",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400,
}