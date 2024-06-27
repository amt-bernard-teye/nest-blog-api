export const swaggerPersonalInfoSuccess = {
    description: "OK",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Changed personal info successfully"
                }
            }
        }
    },
    status: 200, 
}

export const swaggerPersonalInfoBadRequest = {
    description: "Validation Error",
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
                      "name must match /^[a-zA-Z ]+$/ regular expression"
                    ],
                    error: "Bad Request",
                    statusCode: 400
                  }
            }
        }
    },
    status: 400, 
}