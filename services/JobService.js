var Job = require("../bean/Job");
var BaseService = require("./BaseService");

class JobService extends BaseService {

    /**
     * Adds a college and returns primary key
     * 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(bean, callback, ctx) {
        var sql = "INSERT INTO " + this.getTable() 
        + " (CREATED_DATETIME,MODIFIED_DATETIME,TITLE,DESCRIPTION,START_DATE,END_DATE,COMPANY_ID,STATUS,SKILL) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?,?,?)";
        var params = [bean.title, bean.description, bean.startDate, bean.endDate, bean.companyId,bean.status,bean.skill];
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
        + " SET  MODIFIED_DATETIME = NOW(), TITLE=?,DESCRIPTION=?,START_DATE=?,END_DATE=?,COMPANY_ID=?,STATUS=?,SKILL=? WHERE ID=?"
        var params = [bean.title, bean.description, bean.startDate, bean.endDate, bean.companyId,bean.status,bean.skill,bean.id];
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
        if (bean.skill) {
            whereClause += "and SKILL like '" + bean.skill + "%'";
        }
        if (bean.description) {
            whereClause += "and DESCRIPTION like '" + bean.description + "%'";
        }
        if (bean.status) {
            whereClause += "and STATUS='" + bean.status + "'";
        }
        if (bean.companyId) {
            whereClause += "and COMPANY_ID='" + bean.companyId + "'";
        }

        return whereClause;
    }


    /**
     * Returns bean of this service 
     */
    getBean() {
        return new Job();
    }

    /**
     * Retruns table name of this service
     */
    getTable() {
        return "st_job";
    }
}

//Export college service
module.exports = JobService;

