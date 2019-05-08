var BaseBean = require('../bean/BaseBean');
var DataUtility = require("../utility/DataUtility");


class Candidate extends BaseBean {

    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
        this.dob = '';
        this.mobile = '';
        this.email = '';
        this.skill = '';
        this.resume = '';
    }

    /**
       * Set populateResult into bean.
       * @param {*} res 
       */
    populateResult(res) {
        this.id = res.ID;
        this.firstName = res.FIRST_NAME;
        this.lastName = res.LAST_NAME;
        this.dob = res.DOB;
        this.mobile = res.MOBILE;
        this.email = res.EMAIL;
        this.skill = res.SKILL;
        this.resume = res.RESUME;
        this.createdBy = res.CREATED_BY;
        this.modifiedBy = res.MODIFIED_BY;
        this.createdDateTime = res.CREATED_DATETIME;
        this.modifiedDateTime = res.MODIFIED_DATETIME;
    };
    
    /**
       * Get request data from body.
       * @param {*} body 
       */
    populateRequest(body) {
        if (body.id) {
            this.id = body.id;
        }
        if (body.firstName) {
            this.firstName = body.firstName;
        }
        if (body.lastName) {
            this.lastName = body.lastName;
        }
        if (body.dob) {
            this.dob = body.dob;
        }
        if (body.mobile) {
            this.mobile = body.mobile;
        }
        if (body.email) {
            this.email = body.email;
        }
        if (body.skill) {
            this.skill = body.skill;
        }
        if (body.resume) {
            this.resume = body.resume;
        }
    };
}
module.exports = Candidate;