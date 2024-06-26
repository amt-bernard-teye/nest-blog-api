export const swaggerLoginSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Access granted"
                }
            }
        }
    },
    status: 200,        
};

export const swaggerLoginBadRequest = {
    description: "User Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
                        "email needs to be an email"
                    ],
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400,
}