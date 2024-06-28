export const swaggerRemoveCategorySuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Category removed successfully",
                }
            }
        }
    },
    status: 200,        
};

export const swaggerRemoveCategoryBadRequest = {
    description: "Validation Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Invalid value",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400
}