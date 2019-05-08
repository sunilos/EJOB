var BaseCtl = require("../controller/BaseCtl");
var Candidate = require("../bean/Candidate");
var ServiceLocator = require("../services/ServiceLocator");

/**
 * Contains College REST APIs
 */
class CandidateCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCandidateService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var data = {
            "stateList": '',
            "cityList": ''
        };
        response.status(200).json(data)
    };

    /**
     * Returns College bean populated from request parameters. 
     */
    getBean(request) {
        var bean = new Candidate();
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

module.exports = CandidateCtl;
