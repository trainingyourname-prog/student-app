/*=========================================
    STUDENT LOGIN ENTERPRISE v3.0
    state.js
==========================================*/

/*=========================================
GLOBAL APPLICATION STATE
==========================================*/

const AppState = {

    /*-------------------------------------
      Quiz
    -------------------------------------*/

    questions : [],

    current : 0,

    score : 0,

    wrong : 0,

    answers : [],

    bookmarks : [],

    /*-------------------------------------
      Timer
    -------------------------------------*/

    timer : {

        total : DEFAULT_TIMER,

        left : DEFAULT_TIMER,

        running : false,

        paused : false,

        interval : null

    },

    /*-------------------------------------
      History
    -------------------------------------*/

    history : [],

    /*-------------------------------------
      Theme
    -------------------------------------*/

    darkMode : ENABLE_DARK_MODE,

    /*-------------------------------------
      Video
    -------------------------------------*/

    video : {

        index : 0,

        currentTime : 0,

        playing : false

    },

    /*-------------------------------------
      Result Chart
    -------------------------------------*/

    chart : null

};

/*=========================================
LOAD SAVED SETTINGS
==========================================*/

(function(){

    const savedTheme = loadLocal(STORAGE.THEME,false);

    AppState.darkMode = savedTheme;

    const savedTimer = loadLocal(

        STORAGE.TIMER,

        DEFAULT_TIMER

    );

    AppState.timer.total = savedTimer;

    AppState.timer.left = savedTimer;

    AppState.video.index = loadLocal(

        STORAGE.CURRENT_VIDEO,

        0

    );

    AppState.video.currentTime = loadLocal(

        STORAGE.CURRENT_VIDEO_TIME,

        0

    );

    AppState.bookmarks = loadLocal(

        STORAGE.BOOKMARKS,

        []

    );

    AppState.pin.attempts = loadLocal(

        STORAGE.PIN_TRY,

        0

    );

})();

/*=========================================
HELPER FUNCTIONS
==========================================*/

function resetQuizState(){

    AppState.questions = [];

    AppState.current = 0;

    AppState.score = 0;

    AppState.wrong = 0;

    AppState.answers = [];

}

function resetTimerState(){

    if(AppState.timer.interval){

        clearInterval(AppState.timer.interval);

    }

    AppState.timer.left = AppState.timer.total;

    AppState.timer.running = false;

    AppState.timer.paused = false;

    AppState.timer.interval = null;

}

function resetVideoState(){

    AppState.video.index = 0;

    AppState.video.currentTime = 0;

    AppState.video.playing = false;

}

function resetPinState(){

    AppState.pin.unlocked = false;

    AppState.pin.attempts = 0;

    saveLocal(

        STORAGE.PIN_TRY,

        0

    );

}

function resetAllState(){

    resetQuizState();

    resetTimerState();

    resetVideoState();

    resetPinState();

}

/*=========================================
SAVE STATE
==========================================*/

function saveAppState(){

    saveLocal(

        STORAGE.BOOKMARKS,

        AppState.bookmarks

    );

    saveLocal(

        STORAGE.CURRENT_VIDEO,

        AppState.video.index

    );

    saveLocal(

        STORAGE.CURRENT_VIDEO_TIME,

        AppState.video.currentTime

    );

    saveLocal(

        STORAGE.TIMER,

        AppState.timer.total

    );

    saveLocal(

        STORAGE.PIN_TRY,

        AppState.pin.attempts

    );

}

/*=========================================
DEBUG
==========================================*/

console.log(

    "✅ state.js Loaded"

);
