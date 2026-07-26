/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    timer.js
==========================================*/

/*=========================================
    START TIMER
==========================================*/

function startTimer(){

    stopTimer();

    AppState.timer.left = AppState.timer.total;

    AppState.timer.running = true;

    AppState.timer.paused = false;

    updateTimerDisplay();

    AppState.timer.interval = setInterval(function(){

        if(AppState.timer.paused){

            return;

        }

        AppState.timer.left--;

        updateTimerDisplay();

        if(AppState.timer.left <= 0){

            stopTimer();

            Swal.fire({

                icon:"info",

                title:"Time Over",

                text:"Quiz time has finished."

            }).then(function(){

                if(typeof showResult==="function"){

                    showResult();

                }

            });

        }

    },1000);

}

/*=========================================
    STOP TIMER
==========================================*/

function stopTimer(){

    if(AppState.timer.interval){

        clearInterval(AppState.timer.interval);

        AppState.timer.interval = null;

    }

    AppState.timer.running = false;

}

/*=========================================
    PAUSE / RESUME
==========================================*/

function pauseTimer(){

    if(!AppState.timer.running){
        return;
    }

    AppState.timer.paused = !AppState.timer.paused;

    const btn = document.querySelector('button[onclick="pauseTimer()"]');

    if(btn){
        btn.innerHTML = AppState.timer.paused ? "▶" : "⏸";
    }

}

/*=========================================
    TIMER DISPLAY
==========================================*/

function updateTimerDisplay(){

    const timer = $("timer");

    if(!timer){

        return;

    }

    let seconds = AppState.timer.left;

    if(seconds < 0){

        seconds = 0;

    }

    const h = Math.floor(seconds / 3600);

    const m = Math.floor(

        (seconds % 3600) / 60

    );

    const s = seconds % 60;

    let text = "";

    if(h > 0){

        text +=

        String(h).padStart(2,"0")

        + ":";

    }

    text +=

    String(m).padStart(2,"0")

    + ":" +

    String(s).padStart(2,"0");

    timer.innerHTML = "⏱ " + text;

}

/*=========================================
    SAVE TIMER
==========================================*/

function saveTimer(){

    const value = parseInt(

        $("timeValue").value

    );

    const unit =

        $("timeUnit").value;

    if(isNaN(value) || value <= 0){

        Swal.fire({

            icon:"warning",

            title:"Invalid Time",

            text:"Enter a valid timer."

        });

        return;

    }

    let total = value;

    if(unit==="min"){

        total *= 60;

    }

    else if(unit==="hr"){

        total *= 3600;

    }

    AppState.timer.total = total;

    AppState.timer.left = total;

    saveLocal(

        STORAGE.TIMER,

        total

    );

    Swal.fire({

        icon:"success",

        title:"Timer Saved"

    }).then(function(){

        if(typeof goHome==="function"){

            goHome();

        }

    });

}

/*=========================================
    LOAD TIMER
==========================================*/

function loadSavedTimer(){

    const saved = loadLocal(

        STORAGE.TIMER,

        DEFAULT_TIMER

    );

    AppState.timer.total = saved;

    AppState.timer.left = saved;

}

/*=========================================
    RESET TIMER
==========================================*/

function resetTimer(){

    stopTimer();

    AppState.timer.left =

        AppState.timer.total;

    updateTimerDisplay();

}

/*=========================================
    ADD EXTRA TIME
==========================================*/

function addExtraTime(seconds){

    seconds = parseInt(seconds);

    if(isNaN(seconds)){

        return;

    }

    AppState.timer.left += seconds;

    updateTimerDisplay();

}

/*=========================================
    REMOVE TIME
==========================================*/

function removeTime(seconds){

    seconds = parseInt(seconds);

    if(isNaN(seconds)){

        return;

    }

    AppState.timer.left -= seconds;

    if(AppState.timer.left < 0){

        AppState.timer.left = 0;

    }

    updateTimerDisplay();

}

/*=========================================
    FORMAT TIME
==========================================*/

function formatTime(totalSeconds){

    const h = Math.floor(totalSeconds/3600);

    const m = Math.floor((totalSeconds%3600)/60);

    const s = totalSeconds%60;

    if(h>0){

        return String(h).padStart(2,"0")

        +":"

        +String(m).padStart(2,"0")

        +":"

        +String(s).padStart(2,"0");

    }

    return String(m).padStart(2,"0")

    +":"

    +String(s).padStart(2,"0");

}

/*=========================================
    TIMER READY
==========================================*/

console.log(

    "✅ timer.js Loaded Successfully"

);