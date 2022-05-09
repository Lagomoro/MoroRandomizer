// ================================================================================
// * DataArray
// --------------------------------------------------------------------------------
function DataArray(){
    this.initialize.apply(this, arguments);
}
// --------------------------------------------------------------------------------
// * Property
// --------------------------------------------------------------------------------
DataArray.prototype._full_input = [];
DataArray.prototype._input = [];
DataArray.prototype._eliminate = [];
DataArray.prototype._output = [];
// --------------------------------------------------------------------------------
// * Getter & Setter
// --------------------------------------------------------------------------------
Object.defineProperty(DataArray.prototype, 'count', {
    get: function() { return this.getAliveIndexArray().length; },
    configurable: true
});
// --------------------------------------------------------------------------------
// * Initialize
// --------------------------------------------------------------------------------
DataArray.prototype.initialize = function(){
    this.clear();
};
// --------------------------------------------------------------------------------
DataArray.prototype.clear = function(){
    this._full_input = [];
    this._input = [];
    this._eliminate = [];
    this._output = [];
};
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
DataArray.prototype.isEmpty = function(){
    return this._full_input.length + this._input.length + this._output.length === 0;
};
// --------------------------------------------------------------------------------
DataArray.prototype.setInputRange = function(min, max){
    this._input = [];
    for(let i = min; i <= max; i++){
        this._input.push(i);
    }
    for(let i = 0; i < this._input.length; i++){
        if(!this._full_input.contains(this._input[i])){
            this._full_input.push(this._input[i]);
        }
    }
};

DataArray.prototype.setInputString = function(input_str, separator_char){
    let str = input_str.replace(/\n/g, separator_char).replace(/\r/g, separator_char);
    let array = str.split(separator_char);
    this._input = [];
    for(let i = 0; i < array.length; i++){
        if(array[i] !== ''){
            this._input.push(array[i]);
        }
    }
    for(let i = 0; i < this._input.length; i++){
        if(!this._full_input.contains(this._input[i])){
            this._full_input.push(this._input[i]);
        }
    }
};

DataArray.prototype.setEliminateString = function(input_str, separator_char){
    let str = input_str.replace(/\n/g, separator_char).replace(/\r/g, separator_char);
    let array = str.split(separator_char);
    this._eliminate = [];
    for(let i = 0; i < array.length; i++){
        if(array[i] !== ''){
            this._eliminate.push(array[i]);
        }
    }
};
// --------------------------------------------------------------------------------
DataArray.prototype.getInputString = function(link_char){
    return this._input.join(link_char);
};

DataArray.prototype.getOutputString = function(link_char){
    return this._output.join(link_char);
};
// --------------------------------------------------------------------------------
DataArray.prototype.getAliveIndexArray = function(){
    let output = [];
    for(let i = 0; i < this._input.length; i++){
        if(this._input[i] !== null && !this._eliminate.contains(this._input[i])){
            output.push(i);
        }
    }
    return output;
};
// --------------------------------------------------------------------------------
DataArray.prototype.moveToOutput = function(alive_index_array, random_index){
    let move_index = alive_index_array[random_index];
    let data = this._input[move_index];
    this._output.push(data);
    this._input[move_index] = null;
    return data;
};

DataArray.prototype.moveIndexToOutput = function(random_index){
    let alive_index_array = this.getAliveIndexArray();
    return this.moveToOutput(alive_index_array, random_index);
};
DataArray.prototype.moveIndexArrayToOutput = function(random_index_array){
    let alive_index_array = this.getAliveIndexArray();
    let output = [];
    for(let i = 0; i < random_index_array.length; i++){
        output.push(this.moveToOutput(alive_index_array, random_index_array[i]));
    }
    return output;
};
// --------------------------------------------------------------------------------
DataArray.prototype.getToOutput = function(alive_index_array, random_index){
    let get_index = alive_index_array[random_index];
    let data = this._input[get_index];
    this._output.push(data);
    return data;
};

DataArray.prototype.getIndexToOutput = function(random_index){
    let alive_index_array = this.getAliveIndexArray();
    return this.getToOutput(alive_index_array, random_index);
};
DataArray.prototype.getIndexArrayToOutput = function(random_index_array){
    let alive_index_array = this.getAliveIndexArray();
    let output = [];
    for(let i = 0; i < random_index_array.length; i++){
        output.push(this.getToOutput(alive_index_array, random_index_array[i]));
    }
    return output;
};
// ================================================================================