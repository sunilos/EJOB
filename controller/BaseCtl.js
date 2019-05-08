var Response = require("../bean/Response");

/**
 * Base class of all Controllers. It provides following  basic REST APIs
 * /get/99: Returns object of given 99 primary key
 * /search: Returns list of searched elements 
 * /save: Inserts or Updates a record
 * /delete/99: Deletes record of given 99 primary key
 */
class BaseCtl {

    constructor() { };

    /**
     * Performs inout validation. 
     * 
     * @param {*} request 
     */
    validate(request) {
        return true;
    };


    /**
     * Loads preload data of usecase.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
    };

    /**
     * Returns bean of this controller. 
     * It populates bean properties from request parameters
     * 
     * @param {*} request 
     */
    getBean(request) {
        return null;
    };

    /**
     * Returns service of this controller
     */
    getService() {
        return null;
    };

    /**
     * Check staus of controller
     * 
     * @param {*} req 
     * @param {*} res 
     */
    health(req, res) {

        res.json({
            'message': 'I am fit and fine'
        });
    };

    /**
     * Gets bean using primary key
     * @param {*} request 
     * @param {*} response 
     */
    get(req, res) {
        var service = this.getService();
        var id = req.params.id;
        service.findByPk(id, function (err, bean) {
            var r = new Response(err, bean);;
            res.json(r);
        });
    };


    /**
     * Delets a record and returns deleted bean
     * @param {*} req 
     * @param {*} res 
     */
    delete(req, res) {
        var service = this.getService();
        var id = req.params.id;
        service.delete(id, function (err, bean) {
            var r = new Response(err, bean);;
            res.json(r);
        });
    };

    /**
     * Adds or updates a record
     * @param {*} request 
     * @param {*} response 
     */
    save(req, res) {
        var service = this.getService();
        var bean = this.getBean(req);

        var error = this.validate(bean);
        if (error.hasError) {
            var r = new Response(error, null);
            res.json(r);
            return;
        }

        if (bean.id && bean.id > 0) {
            service.update(bean, function (err, count) {
                var r = new Response(err, bean.id);
                res.json(r);
            });
        } else {
            service.add(bean, function (err, pk) {
                var r = new Response(err, pk);
                res.json(r);
            });
        }
    };

    validate(bean) {
        var error = { hasError: false };
        /*
        if (DataValidator.isEmpty(bean.login)) {
            error.login = "Login can not be null";
            error.hasError = true;
        }
        */
        return error;
    }

    /**
     * Searches and returns list of beans
     * @param {*} req 
     * @param {*} res 
     */
    search(req, res) {
        var service = this.getService();
        var bean = this.getBean(req);
        var pageNo = 0;
        console.log("Abhay----------------->", pageNo);

        if (req.body.pageNo) {
            pageNo = req.body.pageNo;
        }
        service.search(bean, pageNo, function (err, result) {
            //result.pageNo = pageNo;
            var r = new Response(err, result);
            res.json(r);
        });
    };
}

module.exports = BaseCtl;