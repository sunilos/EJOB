var RoleService = require("./RoleService");
var UserService = require("./UserService");
var CompanyService = require("./CompanyService");
var JobService = require("./JobService");
var CandidateService = require("./CandidateService");
var JobApplicationService = require("./JobApplicationService");


/**
 * Locate service 
 */
class ServiceLocator {

  constructor() {
    this.db = 'MySQL';
  }
  static getRoleService() {
    return new RoleService();
  }

  static getUserService() {
    return new UserService();
  }

  static getCompanyService() {
    return new CompanyService();
  }

  static getJobService() {
    return new JobService();
  }

  static getCandidateService() {
    return new CandidateService();
  }

  static getJobApplicationService() {
    return new JobApplicationService();
  }

}
module.exports = ServiceLocator;
