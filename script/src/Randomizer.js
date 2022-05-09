// ================================================================================
// * RandomizerBase
// --------------------------------------------------------------------------------
function RandomizerBase(){
    this.initialize.apply(this, arguments);
}
// --------------------------------------------------------------------------------
// * Constant
// --------------------------------------------------------------------------------
RandomizerBase.prototype.MESSAGE = null;
// --------------------------------------------------------------------------------
// * Property
// --------------------------------------------------------------------------------
RandomizerBase.prototype._storage = [];
// --------------------------------------------------------------------------------
// * Getter & Setter
// --------------------------------------------------------------------------------
Object.defineProperty(RandomizerBase.prototype, 'storage', {
    get: function() { return this._storage; },
    configurable: true
});
// --------------------------------------------------------------------------------
Object.defineProperty(RandomizerBase.prototype, 'count', {
    get: function() { return this._storage.length; },
    configurable: true
});
// --------------------------------------------------------------------------------
// * Initialize
// --------------------------------------------------------------------------------
RandomizerBase.prototype.initialize = function(){
    this.clear();
};
// --------------------------------------------------------------------------------
RandomizerBase.prototype.clear = function(){
    this._storage = [];
}
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
RandomizerBase.prototype.processException = function(min, max, num){
    if(min > max) return [];
    if(min === max) {
        let output = [];
        for (let i = 0 ; i < num; i++){
            output.push(min);
        }
        return output;
    }
    return null;
}

RandomizerBase.prototype.dataToIntArray = function(data){
    let output = [];
    let data_array = String(data).split('\n');
    for(let i = 0; i < data_array.length; i++){
        if(data_array[i] !== ''){
            output.push(Number(data_array[i]));
        }
    }
    return output;
};
// --------------------------------------------------------------------------------
RandomizerBase.prototype.getIndexArray = function(min, max){
    let output = [];
    for(let i = min; i <= max; i++){
        output.push(i);
    }
    return output;
};
// --------------------------------------------------------------------------------
RandomizerBase.prototype.getRandomInt = async function(value){
    return await this.getRandomRange(0, value - 1);
};
RandomizerBase.prototype.getRandomIntArray = async function(value, num){
    return await this.getRandomRangeArray(0, value - 1, num);
};
RandomizerBase.prototype.getRandomIntArrayWithoutRepetition = async function(value, num){
    return await this.getRandomRangeArrayWithoutRepetition(0, value - 1, num);
};
// --------------------------------------------------------------------------------
RandomizerBase.prototype.getRandomRange = async function(min, max){
    this.clear();
    this._storage = await this.requestRandomRange(min, max);
    return this._storage;
};
RandomizerBase.prototype.getRandomRangeArray = async function(min, max, num){
    this.clear();
    this._storage = await this.requestRandomRangeArray(min, max, num);
    return this._storage;
};
RandomizerBase.prototype.getRandomRangeArrayWithoutRepetition = async function(min, max, num){
    this.clear();
    let indexArray = this.getIndexArray(min, max);
    for(let i = 0; i < num; i++){
        let randomIndex = await this.requestRandomRange(0, indexArray.length - 1);
        this._storage.concat(indexArray.splice(randomIndex, 1));
    }
    return this._storage;
};
// --------------------------------------------------------------------------------
RandomizerBase.prototype.requestRandomRange = async function(min, max){
    return (await this.requestRandomRangeArray(min, max, 1))[0];
};
RandomizerBase.prototype.requestRandomRangeArray = async function(min, max, num){
    
};
// ================================================================================


// ================================================================================
// * RandomOrgRandomizer
// --------------------------------------------------------------------------------
function RandomOrgRandomizer(){
    this.initialize.apply(this, arguments);
}
RandomOrgRandomizer.prototype = Object.create(RandomizerBase.prototype);
RandomOrgRandomizer.prototype.constructor = RandomOrgRandomizer;
// --------------------------------------------------------------------------------
// * Constant
// --------------------------------------------------------------------------------
RandomOrgRandomizer.prototype.MESSAGE = Language.Randomizer.RandomOrg;
// --------------------------------------------------------------------------------
// * Initialize
// --------------------------------------------------------------------------------
RandomOrgRandomizer.prototype.initialize = function(){
    RandomizerBase.prototype.initialize.call(this, arguments);
};
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
RandomOrgRandomizer.prototype.requestRandomRangeArray = async function(min, max, num){
    let output = this.processException(min, max, num);
    if (output !== null) return output;

    return await new Promise((resolve) => {
        let data = {
            min: min,
            max: max,
            num: num,
            col: 1, base: 10, format: 'plain', rnd: 'new'
        };
        axios.get('https://www.random.org/integers/?' + Qs.stringify(data)).then(response => {
            resolve(this.dataToIntArray(response.data, '\n'));
        }).catch(error => {
            console.log(error);
            resolve([-1]);
        });
    });
};
// ================================================================================


// ================================================================================
// * LocalRandomizer
// --------------------------------------------------------------------------------
function LocalRandomizer(){
    this.initialize.apply(this, arguments);
}
LocalRandomizer.prototype = Object.create(RandomizerBase.prototype);
LocalRandomizer.prototype.constructor = LocalRandomizer;
// --------------------------------------------------------------------------------
// * Constant
// --------------------------------------------------------------------------------
LocalRandomizer.prototype.MESSAGE = Language.Randomizer.Local;
// --------------------------------------------------------------------------------
// * Initialize
// --------------------------------------------------------------------------------
LocalRandomizer.prototype.initialize = function(){
    RandomizerBase.prototype.initialize.call(this, arguments);
};
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
LocalRandomizer.prototype.requestRandomRangeArray = async function(min, max, num){
    let output = this.processException(min, max, num);
    if (output !== null) return output;

    output = [];
    for(let i = 0; i < num; i++){
        output.push(Math.floor(Math.random() * (max + 1 - min)) + min);
    }
    return output;
};
// ================================================================================