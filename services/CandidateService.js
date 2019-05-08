var Candidate = require("../bean/Candidate");
var BaseService = require("./BaseService");

class CandidateService extends BaseService {

    /**
     * Adds a college and returns primary key
     * 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(bean, callback, ctx) {
        var sql = "INSERT INTO " + this.getTable() 
        + " (CREATED_DATETIME,MODIFIED_DATETIME,FIRST_NAME,LAST_NAME,DOB,MOBILE,EMAIL,SKILL,RESUME) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?,?,?)";
        var params = [bean.firstName, bean.lastName, bean.dob, bean.mobile, bean.email,bean.skill,bean.resume];
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
        + " SET  MODIFIED_DATETIME = NOW(), FIRST_NAME=?,LAST_NAME=?,DOB=?,MOBILE=?,EMAIL=?,SKILL=?,RESUME=? WHERE ID=?"
        var params = [bean.firstName, bean.lastName, bean.dob, bean.mobile, bean.email,bean.skill,bean.resume,bean.id];
        super.executeUpdate(sql, params, callback, ctx);
    }

    /**
     * Creates where clause for company search
     */
    getSearchCondition(bean) {

        var whereClause = "";

        if (bean.firstName) {
            whereClause += " and FIRST_NAME like  '" + bean.firstName + "%'";
        }
        if (bean.lastName) {
            whereClause += "and LAST_NAME like '" + bean.lastName + "%'";
        }
        if (bean.skill) {
            whereClause += "and SKILL like '" + bean.skill + "%'";
        }
        if (bean.status) {
            whereClause += "and MOBILE='" + bean.mobile + "'";
        }
        if (bean.companyId) {
            whereClause += "and EMAIL='" + bean.email + "'";
        }

        return whereClause;
    }


    /**
     * Returns bean of this service 
     */
    getBean() {
        return new Candidate();
    }

    /**
     * Retruns table name of this service
     */
    getTable() {
        return "st_candidate";
    }


}

//Export college service
module.exports = CandidateService;

