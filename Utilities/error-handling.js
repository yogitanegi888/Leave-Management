class errorHandel {
    sendSuccess(message, data) {
        return {
            success: true,
            data: data,
            message: message,
            status: 200
        }

    }


    Unauthorized(message, data) {
        return {
            success: false,
            data: data,
            message: message,
            status: 401
        }

    }

    badRequest(message, data) {
        return {
            success: false,
            data: data,
            message: message,
            status: 400
        }

    }
    Internal_Server_Error(message, data) {
        return {
            success: false,
            data: data,
            message: message,
            status: 500
        }

    }


    Not_found(message, data) {
        return {
            success: false,
            data: data,
            message: message,
            status: 404
        }

    }
}
module.exports = new errorHandel()
