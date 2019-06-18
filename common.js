function Common() {};


Common.prototype.formatResponse = function (request) {

    var response = {}
    response.statusCode = request.code

    switch(request.type) {

        

        /**
         * @case
         * @param {string} error
         *
         */
        case 'error':
            response.status = 'error'
            response.message = request.data
            return response
            break;

        /**
         * @case
         * @param {string} success
         *
         /**
         * @case
         * @param {string} dbError
         *
         */
        case 'dbError':
            response.status = 'error'
            response.message = 'Internal Server Error'
            response.data = {}
            response.data.name = request.data.name
            response.data.message = request.data.message
            return response
            break;

         /**
         * @case
         * @param {string} error
         *
         */
        case 'authorizationError':
            response.status = 'error'
            response.message = 'Unauthorized'
            return response
            break;

         
        case 'success':
            response.status = 'success'
            response.message = request.data.message
            response.data = request.data.data
            return response
            break;
     }
}

module.exports = new Common()