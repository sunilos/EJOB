var BaseCtl = require("../controller/BaseCtl");
var JobApplication = require("../bean/JobApplication");
var ServiceLocator = require("../services/ServiceLocator");

/**
 * Contains College REST APIs
 */
class JobApplicationCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getJobApplicationService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var data = {
            "stateList": 'state',
            "cityList": 'city'
        };
        response.status(200).json(data)
    };

    /**
     * Returns College bean populated from request parameters. 
     */
    getBean(request) {
        var bean = new JobApplication();
        bean.populateRequest(request.body);
        return bean;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = JobApplicationCtl;
