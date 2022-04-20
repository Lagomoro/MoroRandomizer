// ================================================================================
// * Language
// --------------------------------------------------------------------------------
let Language = {

    EMPTY: '空',

    Randomizer: {
        
        Local: {
            WAITING: "正在从本地随机生成器取得随机结果 ...",
            WAITING_ARRAY: "正在从本地随机生成器取得随机结果 ({0}/{1}) ...",
            GET: "已从 本地随机生成器 取得结果！",
        },

        RandomOrg: {
            WAITING: "正在向 random.org 请求随机结果 ...",
            WAITING_ARRAY: "正在向 random.org 请求随机结果 ({0}/{1}) ...",
            GET: "已从 random.org 取得结果！",
        },

    },
    
}
// ================================================================================

// ================================================================================
// * H5 Function
// --------------------------------------------------------------------------------
Array.prototype.contains = function(value){
    for(let i = 0; i < this.length; i++){
        if(this[i] === value){
            return true;
        }
    }
    return false;
};
// --------------------------------------------------------------------------------
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
// ================================================================================


// ================================================================================
// * H5
// --------------------------------------------------------------------------------
function H5(){
    throw new Error('This is a static class');
}
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
H5.getElement = function(id){
    return document.getElementById(id);
};
// --------------------------------------------------------------------------------
H5.readValueAsInt = function(id, default_value){
    return H5.readElementValueAsInt(H5.getElement(id), default_value);
};
H5.readValueAsString = function(id, default_value){
    return H5.readElementValueAsString(H5.getElement(id), default_value);
};

H5.readElementValueAsInt = function(element, default_value){
    return element.value == '' ? default_value : Math.floor(Number(element.value));
};
H5.readElementValueAsString = function(element, default_value){
    return element.value == '' ? default_value : element.value;
};

H5.setValue = function(id, value){
    H5.getElement(id).value = value;
};
// --------------------------------------------------------------------------------
H5.isChecked = function(id){
    return H5.getElement(id).checked;
};

H5.check = function(id, bool){
    H5.getElement(id).checked = bool;
};
// --------------------------------------------------------------------------------
H5.setDisable = function(id, value){
    H5.getElement(id).disabled = value;
};
// --------------------------------------------------------------------------------
H5.setInnerText = function(id, text){
    H5.getElement(id).innerText = text;
};
// --------------------------------------------------------------------------------
H5.setAttribute = function(id, attr, value){
    H5.getElement(id).setAttribute(attr, value);
};
// ================================================================================
