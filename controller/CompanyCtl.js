var BaseCtl = require("../controller/BaseCtl");
var Company = require("../bean/Company");
var ServiceLocator = require("../services/ServiceLocator");
var DataValidator = require("../utility/DataValidator");

/**
 * Contains College REST APIs
 */
class CompanyCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCompanyService();
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
        if (DataValidator.isEmpty(bean.name)) {
            error.name = "Name is required";
            error.hasError = true;
        }
        if (DataValidator.isEmpty(bean.phoneNo)) {
            error.phoneNo = "Phone is required";
            error.hasError = true;
        } else if ( !DataValidator.isLength(bean.phoneNo, 10)) {
            error.phoneNo = "Phone must of 10 digit";
            error.hasError = true;
        }
        return error;
    }

    /**
     * Returns College bean populated from request parameters. 
     */
    getBean(request) {
        var bean = new Company();
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

module.exports = CompanyCtl;
