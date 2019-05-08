var BaseBean = require('../bean/BaseBean');

class JobApplication extends BaseBean {

    static ACTIVE() { return 'Active'; }
    static INACTIVE() { return 'Inactive'; }

    constructor() {
        super();
        this.jobId = '';
        this.title = '';
        this.companyId = '';
        this.candidateId = '';
        this.name = '';
        this.date = '';
    };

    /**
     * Populates database result set (record) into bean.
     * @param {*} res 
     */
    populateResult(res) {
        this.id = res.ID;
        this.title = res.title;
        this.jobId = res.JOB_ID;
        this.companyId = res.company_id;
        this.candidateId = res.CANDIDATE_ID;
        this.name = res.NAME;
        this.date = res.DATE;
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
        if (body.jobId) {
            this.jobId = body.jobId;
        }
        if (body.companyId) {
            this.companyId = body.companyId;
        }
        if (body.candidateId) {
            this.candidateId = body.candidateId;
        }
        if (body.name) {
            this.name = body.name;
        }
        if (body.date) {
            this.date = body.date;
        }
    }
}

module.exports = JobApplication;