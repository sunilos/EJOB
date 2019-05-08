var Role = require("../bean/Role");
var BaseService = require("./BaseService")

class RoleService extends BaseService {

    /**
     * Adds a record and returns primary key
     * 
     * @param {*} role 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(role, callback, ctx) {
        var sql = "INSERT INTO st_role (CREATED_DATETIME,MODIFIED_DATETIME,NAME,DESCRIPTION) "
            + " VALUES (NOW(),NOW(),?,?)";
        var params = [role.name, role.description];
        super.executeUpdate(sql, params, callback, ctx);
    };

    /**
     * Updates a record and returns count.
     * @param {*} role 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(role, callback, ctx) {
        var sql = "UPDATE st_role SET   MODIFIED_DATETIME = NOW(), NAME=?,DESCRIPTION=? WHERE ID=?"
        var params = [role.name, role.description, role.id];
        super.executeUpdate(sql, params, callback, ctx);
    }


    /**
     * Creates where clause for company search
     */
    getSearchCondition(bean) {

        var whereClause = "";

        if (bean.name) {
            whereClause += " and NAME like  '" + bean.name + "%'";
        }
        if (bean.description) {
            whereClause += "and DESCRIPTION like '" + bean.description + "%'";
        }

        return whereClause;
    }


    /**
     * Returns bean of this service 
     */
    getBean() {
        return new Role();
    }

    /**
     * Retruns table name of this service
     */
    getTable() {
        return "st_role";
    }

}

module.exports = RoleService;

