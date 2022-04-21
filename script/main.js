// ================================================================================
// * Limit
// --------------------------------------------------------------------------------
function Limit(){
    throw new Error('This is a static class');
}
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
Limit.int = function(element){
    Limit.ge(element, 0);
};

Limit.ge = function(element, value){
    if(element.value !== ''){
        element.value = Math.max(value, H5.readElementValueAsInt(element, 0));
    }
};

Limit.gt = function(element, value){
    Limit.ge(element, value + 1);
};

Limit.le = function(element, value){
    if(element.value !== ''){
        element.value = Math.min(H5.readElementValueAsInt(element, 0), value);
    }
};

Limit.lt = function(element, value){
    Limit.le(element, value - 1);
};

Limit.range = function(element, min, max){
    if(element.value !== ''){
        element.value = Math.max(min, Math.min(H5.readElementValueAsInt(element), max));
    }
};
// --------------------------------------------------------------------------------
Limit.autoHeight = function(element, auto_id){
    let auto_element = H5.getElement(auto_id);
    auto_element.textContent = element.value;
};
// ================================================================================


// ================================================================================
// * Page
// --------------------------------------------------------------------------------
function Page(){
    throw new Error('This is a static class');
}
// --------------------------------------------------------------------------------
// * Property
// --------------------------------------------------------------------------------
Page._current = 0;
// --------------------------------------------------------------------------------
// * Getter & Setter
// --------------------------------------------------------------------------------
Object.defineProperty(Page, 'current', {
    get: function() { return Page._current; },
    configurable: true
});
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
Page.change = function(index){
    Page._current = index;

    H5.setAttribute('area-live-streaming-background', 'data-src', "./assets/background_" + index + ".png");

    Page._areaChanging(H5.getElement('area-live-streaming'), index);
    Page._areaChanging(H5.getElement('area-control'),        index);

    Loading.onPageChange();
};
Page._areaChanging = function(area, index){
    for(let i = 0; i < area.children.length; i++){
        area.children[i].className = (i == index ? 'uk-active' : '');
    }
}
// --------------------------------------------------------------------------------
Page.getID = function(text){
    return Page._current + '-' + text;
}
// --------------------------------------------------------------------------------
Page.getStaticRandomizer = function(){
    return R.static;
};
Page.getCurrentRandomizer = function(){
    let random_org = H5.isChecked(Page.getID('checkbox-random-org'));
    return random_org ? R[Page._current].random_org : R[Page._current].local;
};
// --------------------------------------------------------------------------------
Page.getStaticRandomizer = function(){
    return R.static;
};
// --------------------------------------------------------------------------------
Page.getAttribute = function(attr){
    return A[Page._current][attr];
};

Page.setAttribute = function(attr, value){
    A[Page._current][attr] = value;
};
// ================================================================================


// ================================================================================
// * Loading
// --------------------------------------------------------------------------------
function Loading(){
    throw new Error('This is a static class');
}
// --------------------------------------------------------------------------------
// * Constant
// --------------------------------------------------------------------------------
Loading.MAX_PROGRESS = 100;
// --------------------------------------------------------------------------------
// * Getter & Setter
// --------------------------------------------------------------------------------
// 0: 待机 1: 正在运行 2: 正在等待响应 3: 正在结束缓冲期
Object.defineProperty(Loading, 'status', { 
    get: function() { return A[Page.current].Loading.status; },
    set: function(value) { A[Page.current].Loading.status = value; },
    configurable: true
});
Object.defineProperty(Loading, 'text', { 
    get: function() { return A[Page.current].Loading.text; },
    set: function(value) { A[Page.current].Loading.text = value; },
    configurable: true
});
Object.defineProperty(Loading, 'progress', { 
    get: function() { return A[Page.current].Loading.progress; },
    set: function(value) { A[Page.current].Loading.progress = value; },
    configurable: true
});
Object.defineProperty(Loading, 'visible', { 
    get: function() { return A[Page.current].Loading.visible; },
    set: function(value) { A[Page.current].Loading.visible = value; },
    configurable: true
});
// --------------------------------------------------------------------------------
// * Function
// --------------------------------------------------------------------------------
Loading.isBusy = function(){
    return Loading.status > 0;
};
// --------------------------------------------------------------------------------
Loading.setText = function(str){
    if(str !== false){
        Loading.text = str;
        H5.setInnerText('loading-text', Loading.text);
    }
};
// --------------------------------------------------------------------------------
Loading.setProgress = function(value){
    let element = H5.getElement('loading-progress');
    Loading.progress = value;
    element.value = Loading.progress;
};
Loading.addProgress = function(prefix){
    let element = H5.getElement('loading-progress');
    Loading.progress = Loading.progress + (Loading.MAX_PROGRESS - Loading.progress) * prefix;
    element.value = Loading.progress;
};

Loading.clearProgress = function(){
    Loading.setProgress(0);
};
Loading.fullProgress = function(){
    Loading.setProgress(Loading.MAX_PROGRESS);
};
// --------------------------------------------------------------------------------
Loading.setVisible = function(value){
    let element = H5.getElement('loading-spinner');
    Loading.visible = value;
    element.style.visibility = Loading.visible ? 'visible' : 'hidden';
};
// --------------------------------------------------------------------------------
Loading.start = function(text){
    if(Loading.status === 0){
        Loading.status = 1;
        Loading.setVisible(true);
        Loading.setText(text);
        Loading.clearProgress();
        T.loading.start();
    }
};

Loading.wait = function(text){
    if(Loading.status === 1){
        Loading.status = 2;
        Loading.setText(text);
        Loading.fullProgress();
        T.loading.stop();
    }
};

Loading.stop = function(text, delay){
    if(Loading.status > 0){
        Loading.status = 3;
        Loading.setText(text);
        Loading.fullProgress();
        T.loading.stop();

        let current_page = Page.current;
        setTimeout(() => {
            if(A[current_page].Loading.status === 3){
                A[current_page].Loading.status = 0;
                
                if(current_page === Page.current){
                    Loading.setVisible(false);
                    Loading.setText(null);
                    Loading.clearProgress();
                }else{
                    A[current_page].Loading.visible = false;
                    A[current_page].Loading.text = null;
                    A[current_page].Loading.progress = 0;
                }
            }
        }, delay);
    }
};
// --------------------------------------------------------------------------------
Loading.onPageChange = function(){
    Loading.setVisible(Loading.visible);
    Loading.setText(Loading.text);
    Loading.setProgress(Loading.progress);
    Loading.status === 1 ? T.loading.start() : T.loading.stop();
};
// ================================================================================


// ================================================================================
// * Attribute
// --------------------------------------------------------------------------------
let A = {

    0: {
        Loading: {
            status: 0,
            text: null,
            progress: 0,
            visible: false,
        },
        hand_clicked: 0,
        random_number_array: null,
        random_num: 0,
    },

    1: {
        Loading: {
            status: 0,
            text: null,
            progress: 0,
            visible: false,
        },
        hand_clicked: 0,
        random_number_array: null,
        random_num: 0,
    },

    2: {
        Loading: {
            status: 0,
            text: null,
            progress: 0,
            visible: false,
        },
    },

};
// ================================================================================


// ================================================================================
// * Randomizer
// --------------------------------------------------------------------------------
let R = {

    static: new LocalRandomizer(),

    0: {
        local: new LocalRandomizer(),
        random_org: new RandomOrgRandomizer(),
    },

    1: {
        local: new LocalRandomizer(),
        random_org: new RandomOrgRandomizer(),
    },

    2: {
        local: new LocalRandomizer(),
        random_org: new RandomOrgRandomizer(),
    },

};
// ================================================================================


// ================================================================================
// * DataArray
// --------------------------------------------------------------------------------
let D = {

    static: new DataArray(),

    0: new DataArray(),

    1: new DataArray(),

    2: new DataArray(),

};
// ================================================================================


// ================================================================================
// * Func
// --------------------------------------------------------------------------------
let F = {

    0: {
        autoExtract: async function(){
            F[0].initDataArray();

            let num = H5.readValueAsInt('0-input-num', 1);
            let repetition = H5.isChecked('0-checkbox-repetition');
            if (!repetition && num > D[0].count) num = D[0].count;
            
            F[0].setControlDisable(true, []);
            
            let random_index_array = [];
            let random_number_array = [];
            
            let randomizer = Page.getCurrentRandomizer();
            if(repetition){
                Loading.start(randomizer.MESSAGE.WAITING);
                random_index_array = await randomizer.getRandomIntArray(D[0].count, num);
                random_number_array = D[0].getIndexArrayToOutput(random_index_array);
            }else{
                Loading.start(randomizer.MESSAGE.WAITING);
                for(let i = 1; i <= num; i++){
                    Loading.setText(randomizer.MESSAGE.WAITING_ARRAY.format(i, num));
                    let random_index = await randomizer.getRandomInt(D[0].count);
                    random_index_array.push(random_index);
                    random_number_array.push(D[0].moveIndexToOutput(random_index));
                }
            }
            
            Loading.stop(randomizer.MESSAGE.GET, 1000);

            H5.setAutoFontSizeText('0-text-random-output', '0-auto-random-output', '0-div-random-output', random_number_array.join(' '));
            H5.setInnerText('0-text-data-output', D[0].getOutputString(' '));
            F[0].setControlDisable(false, []);
            
            F[0].setFuncDisable(D[0].count === 0, []);
        },
        handExtract: async function(){
            if(A[0].hand_clicked === 0){

                A[0].hand_clicked = 1;

                F[0].initDataArray();
                
                let num = H5.readValueAsInt('0-input-num', 1);
                let repetition = H5.isChecked('0-checkbox-repetition');
                if (!repetition && num > D[0].count) num = D[0].count;
                A[0].random_num = num;

                T[0].random_animation.start();

                F[0].setControlDisable(true, ['0-button-hand']);

                let random_index_array = [];
                let random_number_array = [];
                
                let randomizer = Page.getCurrentRandomizer();
                if(repetition){
                    Loading.start(randomizer.MESSAGE.WAITING);
                    random_index_array = await randomizer.getRandomIntArray(D[0].count, num);
                    random_number_array = D[0].getIndexArrayToOutput(random_index_array);
                }else{
                    Loading.start(randomizer.MESSAGE.WAITING);
                    for(let i = 1; i <= num; i++){
                        Loading.setText(randomizer.MESSAGE.WAITING_ARRAY.format(i, num));
                        let random_index = await randomizer.getRandomInt(D[0].count);
                        random_number_array.push(D[0].moveIndexToOutput(random_index));
                    }
                }
                
                A[0].random_number_array = random_number_array;
                Loading.wait(randomizer.MESSAGE.GET);

                if(A[0].hand_clicked === 2){

                    A[0].hand_clicked = 0;

                    T[0].random_animation.stop();
                    Loading.stop(randomizer.MESSAGE.GET, 1000);

                    H5.setAutoFontSizeText('0-text-random-output', '0-auto-random-output', '0-div-random-output', A[0].random_number_array.join(' '));
                    H5.setInnerText('0-text-data-output', D[0].getOutputString(' '));
                    A[0].random_number_array = null;
                    F[0].setControlDisable(false, []);
                    
                    F[0].setFuncDisable(D[0].count === 0, []);

                }

            } else if(A[0].hand_clicked === 1){

                A[0].hand_clicked = 2;

                if(A[0].random_number_array != null){

                    A[0].hand_clicked = 0;

                    T[0].random_animation.stop();
                    let randomizer = Page.getCurrentRandomizer();
                    Loading.stop(randomizer.MESSAGE.GET, 1000);

                    H5.setAutoFontSizeText('0-text-random-output', '0-auto-random-output', '0-div-random-output', A[0].random_number_array.join(' '));
                    H5.setInnerText('0-text-data-output', D[0].getOutputString(' '));
                    A[0].random_number_array = null;
                    F[0].setControlDisable(false, []);
                    
                    F[0].setFuncDisable(D[0].count === 0, []);

                }

            }
        },
        reset: function(){
            F[0].setControlDisable(false, []);
            F[0].setInputDisable(false, []);
            D[0].clear();
            H5.setAutoFontSizeText('0-text-random-output', '0-auto-random-output', '0-div-random-output', Language.DEFAULT);
            H5.setInnerText('0-text-data-output', Language.EMPTY);
        },

        initDataArray: function(){
            if(D[0].isEmpty()){
                F[0].setInputDisable(true, []);
                let min = H5.readValueAsInt('0-input-min', 0);
                let max = H5.readValueAsInt('0-input-max', 1);
                D[0].setInputRange(min, max);
            }
        },

        setInputDisable: function(value, option){
            if (!option.contains('0-input-min')) H5.setDisable('0-input-min', value);
            if (!option.contains('0-input-max')) H5.setDisable('0-input-max', value);
            
            if (!option.contains('0-button-reset')) H5.setDisable('0-button-reset', !value);

            if (!option.contains('0-checkbox-repetition')) H5.setDisable('0-checkbox-repetition', value);
        },
        setControlDisable: function(value, option){
            if (!option.contains('0-input-num')) H5.setDisable('0-input-num', value);
            
            if (!option.contains('0-button-auto'))  H5.setDisable('0-button-auto', value);
            if (!option.contains('0-button-hand'))  H5.setDisable('0-button-hand', value);
            if (!option.contains('0-button-reset')) H5.setDisable('0-button-reset', value);

            if (!option.contains('0-checkbox-random-org')) H5.setDisable('0-checkbox-random-org', value);
        },
        setFuncDisable: function(value, option){
            if (!option.contains('0-button-auto'))  H5.setDisable('0-button-auto', value);
            if (!option.contains('0-button-hand'))  H5.setDisable('0-button-hand', value);
        },

        checkDisable: function(){
            let min = H5.readValueAsInt('0-input-min', 0);
            let max = H5.readValueAsInt('0-input-max', 1);
            F[0].setFuncDisable(min > max, []);
        },
    },

    1: {
        showData: function(){
            let auto_text = H5.getTextContent('1-input-list-auto');
            if (auto_text === null || auto_text == ''){
                H5.setTextContent('1-input-list-auto', H5.getValue('1-input-list'));
            }else{
                H5.setTextContent('1-input-list-auto', null);
            }
        },
        updateEliminate: function(){
            D[1].setEliminateString(H5.readValueAsString('1-input-eliminate', ''), ' ');
            if(D[1].isEmpty()){
                D.static.clear();
                D.static.setInputString(H5.readValueAsString('1-input-list', '1 2 3 4'), ' ')
                D.static.setEliminateString(H5.readValueAsString('1-input-eliminate', ''), ' ');
                F[1].setFuncDisable(D.static.count === 0, []);
            }else{
                F[1].setFuncDisable(D[1].count === 0, []);
            }
        },
        autoExtract: async function(){
            F[1].initDataArray();

            let num = H5.readValueAsInt('1-input-num', 1);
            if (num > D[1].count) num = D[1].count;
            
            F[1].setControlDisable(true, []);
            
            let random_number_array = [];
            
            let randomizer = Page.getCurrentRandomizer();
            Loading.start(randomizer.MESSAGE.WAITING);
            for(let i = 1; i <= num; i++){
                Loading.setText(randomizer.MESSAGE.WAITING_ARRAY.format(i, num));
                let random_index = await randomizer.getRandomInt(D[1].count);
                random_number_array.push(D[1].moveIndexToOutput(random_index));
            }
            
            Loading.stop(randomizer.MESSAGE.GET, 1000);

            H5.setAutoFontSizeText('1-text-random-output', '1-auto-random-output', '1-div-random-output', random_number_array.join(' '));
            H5.setInnerText('1-text-data-output', D[1].getOutputString(' '));
            F[1].setControlDisable(false, []);
            
            F[1].setFuncDisable(D[1].count === 0, []);
        },
        handExtract: async function(){
            if(A[1].hand_clicked === 0){

                A[1].hand_clicked = 1;

                F[1].initDataArray();
                
                let num = H5.readValueAsInt('1-input-num', 1);
                if (num > D[1].count) num = D[1].count;
                A[1].random_num = num;

                T[1].random_animation.start();

                F[1].setControlDisable(true, ['1-button-hand']);

                let random_number_array = [];
                
                let randomizer = Page.getCurrentRandomizer();
                Loading.start(randomizer.MESSAGE.WAITING);
                for(let i = 1; i <= num; i++){
                    Loading.setText(randomizer.MESSAGE.WAITING_ARRAY.format(i, num));
                    let random_index = await randomizer.getRandomInt(D[1].count);
                    random_number_array.push(D[1].moveIndexToOutput(random_index));
                }
                
                A[1].random_number_array = random_number_array;
                Loading.wait(randomizer.MESSAGE.GET);

                if(A[1].hand_clicked === 2){

                    A[1].hand_clicked = 0;

                    T[1].random_animation.stop();
                    Loading.stop(randomizer.MESSAGE.GET, 1000);

                    H5.setAutoFontSizeText('1-text-random-output', '1-auto-random-output', '1-div-random-output', A[1].random_number_array.join(' '));
                    H5.setInnerText('1-text-data-output', D[1].getOutputString(' '));
                    A[1].random_number_array = null;
                    F[1].setControlDisable(false, []);
                    
                    F[1].setFuncDisable(D[1].count === 0, []);

                }

            } else if(A[1].hand_clicked === 1){

                A[1].hand_clicked = 2;

                if(A[1].random_number_array != null){

                    A[1].hand_clicked = 0;

                    T[1].random_animation.stop();
                    let randomizer = Page.getCurrentRandomizer();
                    Loading.stop(randomizer.MESSAGE.GET, 1000);

                    H5.setAutoFontSizeText('1-text-random-output', '1-auto-random-output', '1-div-random-output', A[1].random_number_array.join(' '));
                    H5.setInnerText('1-text-data-output', D[1].getOutputString(' '));
                    A[1].random_number_array = null;
                    F[1].setControlDisable(false, []);
                    
                    F[1].setFuncDisable(D[1].count === 0, []);

                }

            }
        },
        reset: function(){
            F[1].setControlDisable(false, []);
            F[1].setInputDisable(false, []);
            D[1].clear();
            F[1].updateEliminate();
            H5.setAutoFontSizeText('1-text-random-output', '1-auto-random-output', '1-div-random-output', Language.DEFAULT);
            H5.setInnerText('1-text-data-output', Language.EMPTY);
        },
        generate: function(){
            let min = H5.readValueAsInt('1-input-min', 0);
            let max = H5.readValueAsInt('1-input-max', 1);
            let randomizer = Page.getStaticRandomizer();
            H5.setAutoHeightValue('1-input-list', '1-input-list-auto', randomizer.getIndexArray(min, max).join(' '));
        },

        initDataArray: function(){
            if(D[1].isEmpty()){
                F[1].setInputDisable(true, []);
                D[1].setInputString(H5.readValueAsString('1-input-list', '1 2 3 4'), ' ')
            }
        },

        setInputDisable: function(value, option){
            if (!option.contains('1-input-list')) H5.setDisable('1-input-list', value);
            
            if (!option.contains('1-button-reset')) H5.setDisable('1-button-reset', !value);

            if (!option.contains('1-input-min')) H5.setDisable('1-input-min', value);
            if (!option.contains('1-input-max')) H5.setDisable('1-input-max', value);
            if (!option.contains('1-button-generate')) H5.setDisable('1-button-generate', value);
        },
        setControlDisable: function(value, option){
            if (!option.contains('1-input-eliminate')) H5.setDisable('1-input-eliminate', value);

            if (!option.contains('1-input-num')) H5.setDisable('1-input-num', value);
            
            if (!option.contains('1-button-auto'))  H5.setDisable('1-button-auto', value);
            if (!option.contains('1-button-hand'))  H5.setDisable('1-button-hand', value);
            if (!option.contains('1-button-reset')) H5.setDisable('1-button-reset', value);

            if (!option.contains('1-checkbox-random-org')) H5.setDisable('1-checkbox-random-org', value);
        },
        setFuncDisable: function(value, option){
            if (!option.contains('1-button-auto'))  H5.setDisable('1-button-auto', value);
            if (!option.contains('1-button-hand'))  H5.setDisable('1-button-hand', value);
        },
        setGenerateDisable: function(value, option){
            if (!option.contains('1-button-generate')) H5.setDisable('1-button-generate', value);
        },
        setFileDisable: function(value, option){
            if (!option.contains('1-button-generate')) H5.setDisable('1-button-generate', value);
        },

        checkDisable: function(){
            let min = H5.readValueAsInt('1-input-min', 0);
            let max = H5.readValueAsInt('1-input-max', 1);
            F[1].setGenerateDisable(min > max, []);
        },
    },

};
// ================================================================================


// ================================================================================
// * Task
// --------------------------------------------------------------------------------
let T = {

    loading: new Task(() => {
        Loading.addProgress(0.01);
    }, 100),

    0: {

        random_animation: new Task(async function(){
            let min = H5.readValueAsInt('0-input-min', 0);
            let max = H5.readValueAsInt('0-input-max', 1);

            let randomizer = Page.getStaticRandomizer();
            let temp_array = randomizer.getIndexArray(min, max);

            let num = A[0].random_num;
            let repetition = H5.isChecked('0-checkbox-repetition');
            
            let random_number_array = [];
            
            if(repetition){
                random_number_array = await randomizer.getRandomRangeArray(min, max, num);
            }else{
                for(let i = 1; i <= num; i++){
                    let random_index = await randomizer.getRandomInt(temp_array.length);
                    random_number_array.push(temp_array.splice(random_index, 1)[0]);
                }
            }

            H5.setAutoFontSizeText('0-text-random-output', '0-auto-random-output', '0-div-random-output', random_number_array.join(' '));

        }, 10),

    },

    1: {

        random_animation: new Task(async function(){

            D.static.clear();
            D.static.setInputString(H5.readValueAsString('1-input-list', '1 2 3 4'), ' ')
            D.static.setEliminateString(H5.readValueAsString('1-input-eliminate', ''), ' ');

            let num = A[1].random_num;
            
            let random_number_array = [];
            
            let randomizer = Page.getStaticRandomizer();
            for(let i = 1; i <= num; i++){
                let random_index = await randomizer.getRandomInt(D.static.count);
                random_number_array.push(D.static.moveIndexToOutput(random_index));
            }

            H5.setAutoFontSizeText('1-text-random-output', '1-auto-random-output', '1-div-random-output', random_number_array.join(' '));

        }, 10),

    },
    
};
// ================================================================================



/*

                                
                                <progress id="js-progressbar" class="uk-progress" value="0" max="100" hidden></progress>
                                
                                <script>
                                
                                    var bar = document.getElementById('js-progressbar');
                                
                                    UIkit.upload('.js-upload', {
                                
                                        multiple: true,
                                
                                        beforeSend: function () {
                                            console.log('beforeSend', arguments);
                                        },
                                
                                    });
                                
                                </script>
*/








