var JobApplication = require("../bean/JobApplication");
var BaseService = require("./BaseService");

class JobApplicationService extends BaseService {

    /**
     * Adds a college and returns primary key
     * 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(bean, callback, ctx) {
        var sql = "INSERT INTO " + this.getTable() 
        + " (CREATED_DATETIME,MODIFIED_DATETIME,JOB_ID,TITLE,COMPANY_ID,CANDIDATE_ID,NAME,date) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?,?)";
        var params = [bean.jobId, bean.title, bean.companyId, bean.candidateId, bean.name,bean.date];
        super.executeUpdate(sql, params, callback, ctx);
    };

    /**
     * Updates a college 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(bean, callback, ctx) {
        var sql = "UPDATE " + this.getTable() 
        + " SET  MODIFIED_DATETIME = NOW(), JOB_ID=?,TITLE=?,COMPANY_ID=?,CANDIDATE_ID=?,NAME=?,date=? WHERE ID=?"
        var params = [bean.jobId, bean.title, bean.companyId, bean.candidateId, bean.name,bean.date,bean.id];
        super.executeUpdate(sql, params, callback, ctx);
    }

    /**
     * Creates where clause for company search
     */
    getSearchCondition(bean) {

        var whereClause = "";

        if (bean.title) {
            whereClause += " and TITLE like  '" + bean.title + "%'";
        }
        if (bean.name) {
            whereClause += "and NAME like '" + bean.name + "%'";
        }
        if (bean.companyId) {
            whereClause += "and COMPANY_ID like '" + bean.companyId + "%'";
        }
        if (bean.jobId) {
            whereClause += "and job_Id='" + bean.jobId + "'";
        }
        if (bean.candidateId) {
            whereClause += "and candidate_Id='" + bean.candidateId + "'";
        }

        return whereClause;
    }


    /**
     * Returns bean of this service 
     */
    getBean() {
        return new JobApplication();
    }

    /**
     * Retruns table name of this service
     */
    getTable() {
        return "st_application";
    }


}

//Export college service
module.exports = JobApplicationService;

