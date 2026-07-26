/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    video.js
==========================================*/

/*=========================================
    VARIABLES
==========================================*/

let player = null;

/*=========================================
    INITIALIZE
==========================================*/

document.addEventListener("DOMContentLoaded", function(){

    player = $("introVideo");

    if(!player){

        console.warn("Video Player Not Found");

        return;

    }

    initializeVideo();

});

/*=========================================
    INITIALIZE VIDEO
==========================================*/

function initializeVideo(){

    AppState.video.index = loadLocal(

        STORAGE.CURRENT_VIDEO,

        0

    );

    AppState.video.currentTime = loadLocal(

        STORAGE.CURRENT_VIDEO_TIME,

        0

    );

    playCurrent();

    attachVideoEvents();

}

/*=========================================
    PLAY CURRENT VIDEO
==========================================*/

function playCurrent(){

    if(!player){

        return;

    }

    if(

        AppState.video.index >=

        VIDEO_LIST.length

    ){

        AppState.video.index = 0;

    }

    player.src =

        VIDEO_LIST[

            AppState.video.index

        ];

    player.load();

    player.onloadedmetadata = function(){

        if(

            AppState.video.currentTime >

            player.duration

        ){

            AppState.video.currentTime = 0;

        }

        player.currentTime =

            AppState.video.currentTime;

        player.play().catch(function(){

            console.log(

                "Autoplay blocked."

            );

        });

    };

}

/*=========================================
    EVENTS
==========================================*/

function attachVideoEvents(){

    player.addEventListener(

        "timeupdate",

        saveVideoProgress

    );

    player.addEventListener(

        "ended",

        nextVideo

    );

    player.addEventListener(

        "pause",

        function(){

            AppState.video.playing=false;

        }

    );

    player.addEventListener(

        "play",

        function(){

            AppState.video.playing=true;

        }

    );

}

/*=========================================
    SAVE PROGRESS
==========================================*/

function saveVideoProgress(){

    AppState.video.currentTime =

        player.currentTime;

    saveLocal(

        STORAGE.CURRENT_VIDEO,

        AppState.video.index

    );

    saveLocal(

        STORAGE.CURRENT_VIDEO_TIME,

        player.currentTime

    );

}

/*=========================================
    NEXT VIDEO
==========================================*/

function nextVideo(){

    AppState.video.index++;

    AppState.video.currentTime=0;

    if(

        AppState.video.index >=

        VIDEO_LIST.length

    ){

        AppState.video.index=0;

    }

    playCurrent();

}

/*=========================================
    PREVIOUS VIDEO
==========================================*/

function previousVideo(){

    AppState.video.index--;

    if(

        AppState.video.index<0

    ){

        AppState.video.index=

        VIDEO_LIST.length-1;

    }

    AppState.video.currentTime=0;

    playCurrent();

}

/*=========================================
    PLAY / PAUSE
==========================================*/

function toggleVideo(){

    if(player.paused){

        player.play();

    }

    else{

        player.pause();

    }

}

/*=========================================
    RESTART VIDEO
==========================================*/

function restartVideo(){

    player.currentTime=0;

    player.play();

}

/*=========================================
    MUTE
==========================================*/

function toggleMute(){

    player.muted=!player.muted;

}

/*=========================================
    FULLSCREEN
==========================================*/

function fullscreenVideo(){

    if(

        player.requestFullscreen

    ){

        player.requestFullscreen();

    }

    else if(

        player.webkitRequestFullscreen

    ){

        player.webkitRequestFullscreen();

    }

}

/*=========================================
    SET PLAYBACK SPEED
==========================================*/

function setPlaybackSpeed(speed){

    speed=parseFloat(speed);

    if(isNaN(speed)){

        return;

    }

    player.playbackRate=speed;

}

/*=========================================
    SEEK
==========================================*/

function seekVideo(seconds){

    seconds=parseInt(seconds);

    if(isNaN(seconds)){

        return;

    }

    player.currentTime+=seconds;

}

/*=========================================
    LOOP
==========================================*/

function enableLoop(enable=true){

    player.loop=enable;

}

/*=========================================
    STOP
==========================================*/

function stopVideo(){

    player.pause();

    player.currentTime=0;

}

/*=========================================
    RESET VIDEO STATE
==========================================*/

function resetVideoProgress(){

    AppState.video.index=0;

    AppState.video.currentTime=0;

    saveLocal(

        STORAGE.CURRENT_VIDEO,

        0

    );

    saveLocal(

        STORAGE.CURRENT_VIDEO_TIME,

        0

    );

}

/*=========================================
    APP VISIBILITY
==========================================*/

document.addEventListener(

    "visibilitychange",

    function(){

        if(!player){

            return;

        }

        if(document.hidden){

            saveVideoProgress();

        }

    }

);

/*=========================================
    VIDEO READY
==========================================*/

console.log(

    "✅ video.js Loaded Successfully"

);