/*=========================================
    STUDENT LOGIN ENTERPRISE v3.0
    config.js
==========================================*/

/*-----------------------------------------
 APP INFORMATION
-----------------------------------------*/

const APP_NAME = "Student Login Enterprise";

const APP_VERSION = "3.0";

const DEVELOPER = "Manabraj";

/*-----------------------------------------
 GOOGLE APPS SCRIPT
-----------------------------------------*/

const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbwjvawKmQglT-2LPE6nlhFYfEvJeWEXjIhmSpoVcKE0aPg6bTIPBbF-Ekh_IfsIcitC/exec";

/*-----------------------------------------
 SECURITY
-----------------------------------------*/

// App Lock PIN

const APP_PIN = "2026";

// Maximum Wrong PIN Attempts

const MAX_PIN_ATTEMPTS = 5;

/*-----------------------------------------
 VIDEO PLAYLIST
-----------------------------------------*/

const VIDEO_LIST = [

"videos/intro1.mp4"

];

/*-----------------------------------------
 DEFAULT SETTINGS
-----------------------------------------*/

const DEFAULT_TIMER = 60;

const AUTO_NEXT = true;

const ENABLE_DARK_MODE = false;

/*-----------------------------------------
 LOCAL STORAGE KEYS
-----------------------------------------*/

const STORAGE = {

LOGIN : "login",

RESET_EMAIL : "resetEmail",

QUIZ_FILES : "mcqFiles",

QUIZ_PROGRESS : "quizProgress",

BOOKMARKS : "bookmarks",

CURRENT_VIDEO : "currentVideo",

CURRENT_VIDEO_TIME : "currentTime",

TIMER : "timer",

THEME : "theme",

PIN_TRY : "pinTry"

};

/*-----------------------------------------
 SUPPORTED FILE TYPES
-----------------------------------------*/

const SUPPORTED_FILES = [

".json",

".xls",

".xlsx"

];

/*-----------------------------------------
 QUIZ SETTINGS
-----------------------------------------*/

const QUIZ = {

AUTO_SAVE : true,

AUTO_RESTORE : true,

SHUFFLE : false,

SHOW_RESULT_CHART : true,

ALLOW_REVIEW : true,

ALLOW_BOOKMARK : true

};

/*-----------------------------------------
 SWEET ALERT DEFAULT
-----------------------------------------*/

const ALERT = {

confirmButtonColor : "#667eea",

cancelButtonColor : "#d33",

allowOutsideClick : false

};

/*-----------------------------------------
 HELPER FUNCTIONS
-----------------------------------------*/

function $(id){

    return document.getElementById(id);

}

function saveLocal(key,value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function loadLocal(key,defaultValue=null){

    let data = localStorage.getItem(key);

    if(data===null){

        return defaultValue;

    }

    try{

        return JSON.parse(data);

    }

    catch(e){

        return data;

    }

}

function removeLocal(key){

    localStorage.removeItem(key);

}

/*-----------------------------------------
 STARTUP LOG
-----------------------------------------*/

console.log(

APP_NAME +

" v" +

APP_VERSION +

" Loaded Successfully"

);