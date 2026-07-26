/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    pin.js
==========================================*/

/*=========================================
    INITIALIZE PIN
==========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const input = $("pinInput");

    if (!input) return;

    input.focus();

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            checkPin();

        }

    });

});

/*=========================================
    CHECK PIN
==========================================*/

function checkPin() {

    const input = $("pinInput");

    if (!input) return;

    const pin = input.value.trim();

    if (pin === "") {

        Swal.fire({

            icon: "warning",

            title: "PIN Required",

            text: "Please enter your PIN."

        });

        input.focus();

        return;

    }

    if (pin === APP_PIN) {

        unlockApp();

    } else {

        wrongPin();

    }

}

/*=========================================
    UNLOCK APP
==========================================*/

function unlockApp() {

    AppState.pin.unlocked = true;

    AppState.pin.attempts = 0;

    saveLocal(STORAGE.PIN_TRY, 0);

    const lock = $("lockScreen");

    if (lock) {

        lock.style.display = "none";

    }

    Swal.fire({

        icon: "success",

        title: "Unlocked",

        timer: 1200,

        showConfirmButton: false

    });

}

/*=========================================
    WRONG PIN
==========================================*/

function wrongPin() {

    AppState.pin.attempts++;

    saveLocal(

        STORAGE.PIN_TRY,

        AppState.pin.attempts

    );

    const left =

        MAX_PIN_ATTEMPTS -

        AppState.pin.attempts;

    $("pinInput").value = "";

    $("pinInput").focus();

    if (left <= 0) {

        Swal.fire({

            icon: "error",

            title: "Too Many Attempts",

            text: "Application will be locked."

        }).then(function () {

            localStorage.removeItem(

                STORAGE.LOGIN

            );

            location.href =

                "Login Home Page.html";

        });

        return;

    }

    Swal.fire({

        icon: "error",

        title: "Wrong PIN",

        text: "Remaining Attempts : " + left

    });

}

/*=========================================
    LOCK APP
==========================================*/

function lockApp() {

    AppState.pin.unlocked = false;

    const lock = $("lockScreen");

    if (lock) {

        lock.style.display = "flex";

    }

    const input = $("pinInput");

    if (input) {

        input.value = "";

        setTimeout(function () {

            input.focus();

        }, 200);

    }

}

/*=========================================
    CHANGE PIN
==========================================*/

function changePin(oldPin, newPin) {

    const savedPin =

        loadLocal("customPin", APP_PIN);

    if (oldPin !== savedPin) {

        Swal.fire({

            icon: "error",

            title: "Current PIN Incorrect"

        });

        return;

    }

    if (newPin.length < 4) {

        Swal.fire({

            icon: "warning",

            title: "PIN Too Short"

        });

        return;

    }

    saveLocal(

        "customPin",

        newPin

    );

    Swal.fire({

        icon: "success",

        title: "PIN Changed"

    });

}

/*=========================================
    GET CURRENT PIN
==========================================*/

function getCurrentPin() {

    return loadLocal(

        "customPin",

        APP_PIN

    );

}

/*=========================================
    RESET PIN
==========================================*/

function resetPin() {

    localStorage.removeItem(

        "customPin"

    );

    Swal.fire({

        icon: "success",

        title: "PIN Reset",

        text: "Default PIN Restored."

    });

}

/*=========================================
    AUTO LOCK
==========================================*/

let autoLockTimer = null;

function startAutoLock(minutes = 10) {

    clearTimeout(autoLockTimer);

    autoLockTimer = setTimeout(function () {

        lockApp();

    }, minutes * 60 * 1000);

}

[
    "click",
    "touchstart",
    "keydown",
    "mousemove"
].forEach(function (eventName) {

    document.addEventListener(eventName, function () {

        if (AppState.pin.unlocked) {

            startAutoLock();

        }

    });

});

/*=========================================
    PIN READY
==========================================*/

console.log(

    "✅ pin.js Loaded Successfully"

);