/**
 * Data utility contains methods to format the data.
 */

class DataValidator {

    static isNotNull(val) {
        if(val){
            return true;
        }else{
            return false;
        }
    }

    static isNull(val) {
        if(val){
            return false;
        }else{
            return true;
        }
    }


    static isNotEmpty(val) {
        if(this.isNotNull(val) && (typeof val === 'string')){
            var l = val.trim().length;
            if(l > 0){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    static isEmpty(val) {
        return !this.isNotEmpty(val);
    }


    static isNumber(val) {
        if(this.isNotNull(val) && (typeof val === 'number')){
            return true;
        }else{
            return false;
        }
    }

    static isMin(val, min) {
        if(this.isNumber(val) && val >= min ){
            return true;
        } else {
            return false;
        }
    }

    static isMax(val,max) {
        if(this.isNumber(val) && val <= max ){
            return true;
        } else {
            return false;
        }
    }

    static isSize(val,max) {
        if(this.isNotEmpty(val) && val.length <= max ){
            return true;
        }else{
            return false;
        }
    }

    static isLength(val,leng) {
        console.log('---------->',val.length, (val.length === leng));
        if(this.isNotEmpty(val) && val.length === leng ){
            return true;
        }else{
            return false;
        }
    }


    static isEmail(val){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( this.isNotEmpty(val) && re.test(val)){
            return true;
        }else{
            return false;
        }
    }

    static isUrl(val){
        var re = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');

        if( this.isNotEmpty(val) && re.test(val)){
            return true;
        }else{
            return false;
        }
    }


    static test(){
        var a = "http://abc.com";
        var b = "a.com";
        var c = "abc@gmail.co.in";
        var d = {};

        //console.log('a','isNotNull',this.isNotNull(x));
        console.log('a','isNotNull',this.isUrl(a));
        console.log('b','isNotNull',this.isUrl(b));
        console.log('c','isNotNull',this.isUrl(c));
        console.log('d','isNotNull',this.isUrl(d));
     }
}

module.exports = DataValidator;
