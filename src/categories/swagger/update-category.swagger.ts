export const swaggerUpdateCategorySuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Category updated successfully",
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