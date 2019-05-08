var BaseCtl = require("../controller/BaseCtl");
var Job = require("../bean/Job");
var ServiceLocator = require("../services/ServiceLocator");
var DataValidator = require("../utility/DataValidator");


/**
 * Contains College REST APIs
 */
class JobCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getJobService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var state = [{ name: 'Maharstra', code: 'MH' },
        { name: 'Madhya Pradesh', code: 'MP' },
        { name: 'Delhi', code: 'DL' }]
        var city = [{ name: 'Indore', code: 'IND', state: 'MP' },
        { name: 'Bhopal', code: 'BHO', state: 'MP' },
        { name: 'Mumbai', code: 'BOM', state: 'MH' },
        { name: 'Pune', code: 'PNQ', state: 'MH' },
        { name: 'Delhi', code: 'DEL', state: 'DL' }]

        var data = {
            "stateList": state,
            "cityList": city
        };
        response.status(200).json(data)
    };


    validate(bean) {
        var error = { hasError: false };
        if (DataValidator.isEmpty(bean.title)) {
            error.title = "Title is required";
            error.hasError = true;
        }
        if ( DataValidator.isNull(bean.companyId) || bean.companyId ==  0) {
            error.companyId = "Company is required";
            error.hasError = true;
        }
        if (DataValidator.isEmpty(bean.skill)) {
            error.skill = "Skill is required";
            error.hasError = true;
        }
        return error;
    }


    /**
     * Returns College bean populated from request parameters. 
     */
    getBean(request) {
        var bean = new Job();
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

module.exports = JobCtl;
