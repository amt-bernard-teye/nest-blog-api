export const swaggerAllCategorySuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    count: 2,
                    data: [
                        {
                            "id": 1,
                            "name": "Music"
                        },
                        {
                            "id": 2,
                            "name": "Entertainment"
                        }
                    ]
                }
            }
        }
    },
    status: 200,        
};