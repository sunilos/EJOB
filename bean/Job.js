var BaseBean = require('../bean/BaseBean');

class Job extends BaseBean {

    static ACTIVE() { return 'Active'; }
    static INACTIVE() { return 'Inactive'; }

    constructor() {
        super();
        this.title = '';
        this.description = '';
        this.startDate = '';
        this.endDate = '';
        this.companyId = 0;
        this.skill = '';
        this.status = this.ACTIVE;
    };

    /**
     * Populates database result set (record) into bean.
     * @param {*} res 
     */
    populateResult(res) {
        this.id = res.ID;
        this.title = res.title;
        this.description = res.description;
        this.companyId = res.company_id;
        this.startDate = res.start_date;
        this.endDate = res.end_date;
        this.status = res.status;
        this.skill = res.skill;

    }

    /**
     * Populates http request form data into bean.
     * @param {*} body 
     */
    populateRequest(body) {

        console.log('body---------->',body);

        if (body.id) {
            this.id = body.id;
        }
        if (body.title) {
            this.title = body.title;
        }
        if (body.description) {
            this.description = body.description;
        }
        if (body.companyId) {
            this.companyId = body.companyId;
        }
        if (body.startDate) {
            this.startDate = body.startDate;
        }
        if (body.endDate) {
            this.endDate = body.endDate;
        }
        if (body.status) {
            this.status = body.status;
        }
        if (body.skill) {
            this.skill = body.skill;
        }

    }
}

module.exports = Job;