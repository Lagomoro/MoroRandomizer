// ================================================================================
// * Task
// --------------------------------------------------------------------------------
function Task(){
    this.initialize.apply(this, arguments);
}
// --------------------------------------------------------------------------------
// * Property
// --------------------------------------------------------------------------------
Task.prototype._callback = function(){};
Task.prototype._time = null;
// --------------------------------------------------------------------------------
Task.prototype._running = false;
// --------------------------------------------------------------------------------
// * Initialize
// --------------------------------------------------------------------------------
Task.prototype.initialize = function(callback, time){
    this._callback = callback;
    this._time = time;
};
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
Task.prototype.isBusy = function(){
    return this._running;
};
// --------------------------------------------------------------------------------
Task.prototype.start = async function(){
    if(this._running === false){
        this._running = true;
        while(this._running === true){
            this._callback();
            await this.wait(this._time);
        }
    }
};

Task.prototype.stop = async function(){
    this._running = false;
};
// --------------------------------------------------------------------------------
Task.prototype.wait = function(time){
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
// ================================================================================



