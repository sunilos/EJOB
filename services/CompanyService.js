var Company = require("../bean/Company");
var BaseService = require("./BaseService");

class CompanyService extends BaseService {

    /**
     * Adds a college and returns primary key
     * 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(college, callback, ctx) {
        var sql = "INSERT INTO " + this.getTable() + " (CREATED_DATETIME,MODIFIED_DATETIME,NAME,ADDRESS,STATE,CITY,PHONE_NO) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?)";
        var params = [college.name, college.address, college.state, college.city, college.phoneNo];
        super.executeUpdate(sql, params, callback, ctx);
    };

    /**
     * Updates a college 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(college, callback, ctx) {
        var sql = "UPDATE " + this.getTable() + " SET  MODIFIED_DATETIME = NOW(),NAME=?,ADDRESS=?,STATE=?,CITY=?,PHONE_NO=?  WHERE ID=?"
        var params = [college.name, college.address, college.state, college.city, college.phoneNo, college.id];
        super.executeUpdate(sql, params, callback, ctx);
    }

    /**
     * Creates where clause for company search
     */
    getSearchCondition(company) {

        var whereClause = "";

        if (company.name) {
            whereClause += " and NAME like  '" + company.name + "%'";
        }
        if (company.address) {
            whereClause += "and ADDRESS like '" + company.address + "%'";
        }
        if (company.phoneNo) {
            whereClause += "and PHONE_NO='" + company.phoneNo + "'";
        }

        return whereClause;
    }



    /**
     * Returns bean of this service 
     */
    getBean() {
        return new Company();
    }

    /**
     * Retruns table name of this service
     */
    getTable() {
        return "st_company";
    }


}

//Export college service
module.exports = CompanyService;

