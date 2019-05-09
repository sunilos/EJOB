var pool = require("./MySQLPool");

/**
 * It is base class inherited by all service classes.
 * It provides generic operations of services.
 */
class BaseService {

 
  constructor(){
    this.pageSize = 10;
  }

  /**
  * Finds record by primary key id
  */
  findByPk(id, callback, ctx) {
    var sql = "SELECT * FROM " + this.getTable() + " WHERE ID= ?";
    var params = [id];
    this.executeSQLForObject(sql, params, this.getBean(), callback);
  };

  /**
   * Finds a recordby unique column
   */
  findByUniqueKey(column, val, callback, ctx) {
    var sql = "SELECT * FROM " + this.getTable() + " WHERE " +column +"= ? ";
    var params = [val];
    this.executeSQLForObject(sql, params, this.getBean(), callback);
  };


  /**
  * Returns bean object of a record.
  */
  executeSQLForObject(sql, params, bean, callback) {
    this.executeSQL(sql, params, function (err, result) {
      console.log('executeSQLForObject', err, result);
      if (err) {
        callback(err);
      } else if (result.length > 0) {
        bean.populateResult(result[0]);
        callback(err, bean);
      } else {
        callback("Record not found");
      }
    });
  }

  /**
  * Searches and returns list. Applies pagination as well.
   * 
   * @param {*} college 
   * @param {*} callback 
   */
  search(bean, pageNo, callback, ctx) {

    var sql = "SELECT * FROM " + this.getTable() + " where 1=1 ";

    sql += this.getSearchCondition(bean);

    this.executeSQLForList(sql, { "pageNo": pageNo }, this.getBean(), callback);

  }

  /**
   * Returns list of bean objects and count of total records satisfying search criteria.
   * It applies pagination if page number is given.
   * 
   * @deprecated
   * 
   * @param {*} sql 
   * @param {*} params 
   * @param {*} bean 
   * @param {*} callback :
   */
  executeSQLForList(sql, params, beanObj, callback) {

    var self = this;
    var pageSize = 10;

    //Apply limit for pagination 
    var sqlWithLimit = sql;

    if (params && params.pageNo > -1) {
      var startIndex = (params.pageNo) * pageSize;
      sqlWithLimit += " limit " + startIndex + "," + pageSize;
    }

    console.log('Params', params);
    console.log('Limit SQL', sqlWithLimit);

    //Count query 
    var sqlCount = "select count(*) as ct " + sql.substring(sql.toLocaleLowerCase().indexOf('from'));

    self.executeSQL(sqlWithLimit, params, function (err, result) {
      if (err) {
        callback(err);
        return;
      }

      //Create list of objects
      var list = [];
      result.forEach(function (e) {
        //Create clone of bean
        //var bean = Object.create(beanObj);
        var bean = self.getBean();
        bean.populateResult(e);
        list.push(bean);
      });

      //Get count of records and add at the last of list
      self.executeSQL(sqlCount, params, function (err, result) {
        callback(err, {
          "list": list,
          "count": result[0].ct
        });
      });
    });
  }

  /**
   * Executes SQL with given parameters. 
   * 
   * @param {*} sql 
   * @param {*} params 
   * @param {*} callback 
   */
  executeSQL(sql, params, callback) {
    console.log('SQL: ' + sql);
    console.log(params);
    pool.getConnection(function (error, connection) {
      if (error) {
        console.error(error);
        callback(error);
        return;
      }
      connection.query(sql, params, function (error, results) {
        callback(error, results);
        connection.release();
      });
    });
  }


  /**
   * Executes insert query and returns auto generated primary key of newly inserted record
   * 
   * @param {*} sql 
   * @param {*} params 
   * @param {*} callback 
   * @param {*} ctx 
   */
  executeUpdate(sql, params, callback, ctx) {
    this.executeSQL(sql, params, function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(err, result.insertId);
      }
    });
  };


  /**
  * Delete a record and return deleted bean
  * @param {*} id 
  * @param {*} callback 
  * @param {*} ctx 
  */
  delete(id, callback, ctx) {
    console.log('----------------------> new delete');
    var sql = "DELETE FROM " + this.getTable() + " WHERE ID=?";
    var params = [id];
    var self = this;
    this.findByPk(id, function (err, bean) {
      if (err) {
        callback(err);
      } else {
        self.executeSQL(sql, params, function (err, count) {
          if (err) {
            callback(err);
          } else {
            callback(err, bean);
          }
        });
      }
    });
  }



  /**
   * Get object of bean of this service
   */
  getBean() {
    return "Override getBean() method";
  }

  /**
   * Get table of this service
   */
  getTable() {
    return "Override getTable() method";
  }

  /**
   * Get where conditions for search 
   */
  getSearchCondition() {
    return "";
  }

}

module.exports = BaseService;

