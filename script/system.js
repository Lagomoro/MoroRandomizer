// ================================================================================
// * Language
// --------------------------------------------------------------------------------
let Language = {

    EMPTY: '空',
    DEFAULT: '-',

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
    return element.value == '' ? default_value : String(element.value);
};

H5.getValue = function(id){
    return H5.getElement(id).value;
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
H5.getInnerText = function(id){
    return H5.getElement(id).innerText;
};
H5.getTextContent = function(id){
    return H5.getElement(id).textContent;
};

H5.setInnerText = function(id, text){
    H5.getElement(id).innerText = text;
};
H5.setTextContent = function(id, text){
    H5.getElement(id).textContent = text;
};
// --------------------------------------------------------------------------------
H5.setAttribute = function(id, attr, value){
    H5.getElement(id).setAttribute(attr, value);
};
// --------------------------------------------------------------------------------
H5.setAutoFontSizeText = function(id, auto_id, field_id, text){
    let element = H5.getElement(id);
    element.innerText = text;

    let auto_element = H5.getElement(auto_id);
    auto_element.textContent = element.innerText;
    
    let field_element = H5.getElement(field_id);
    
    for(let i = 120; i > 0; i--){
        auto_element.style.fontSize = i + 'px';
        if (auto_element.offsetHeight <= field_element.offsetHeight){
            element.style.fontSize = i + 'px';
            break;
        }
    }
};
// --------------------------------------------------------------------------------
H5.setAutoHeightValue = function(id, auto_id, text){
    let element = H5.getElement(id);
    element.value = text;

    let auto_element = H5.getElement(auto_id);
    auto_element.textContent = element.value;
};
// ================================================================================
