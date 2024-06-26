export const swaggerInternalError = {
    description: "Server Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Something went wrong",
                    error: "Internal Error",
                    statusCode: 500
                }
            }
        }
    },
    status: 500,
}