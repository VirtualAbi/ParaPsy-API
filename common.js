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
        
        case 'Activation':
            response.status = 'activated'
            return response
            break;
     }
}

/**
* @method
* @param {string} size
* @return {string} 5 digit random number
*
*/
Common.prototype.generateOTP = function(size = 4) {

    var min = Math.pow( 10, (size-1) );
    var max = min * 9;
    return Math.floor(min + Math.random() * max);
}

module.exports = new Common()