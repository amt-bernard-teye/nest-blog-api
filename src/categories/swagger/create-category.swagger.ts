export const swaggerCreateCategorySuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Category added successfully",
                    data: {
                      id: 2,
                      name: "Entertainment"
                    }
                }
            }
        }
    },
    status: 200,        
};

export const swaggerCreateAndEditCategoryBadRequest = {
    description: "User Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: ["name is required"],
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    },
    status: 400,
}