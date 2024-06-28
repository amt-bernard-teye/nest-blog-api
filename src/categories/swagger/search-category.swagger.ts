export const swaggerSearchCategorySuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: [
                        {
                            "id": 3,
                            "name": "Fashion"
                        }
                    ]
                }
            }
        }
    },
    status: 200,        
};