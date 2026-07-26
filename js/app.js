/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    app.js (Part 1)
==========================================*/

/*=========================================
    APP STARTUP
==========================================*/

window.addEventListener("DOMContentLoaded", initApp);

function initApp(){

    // Login Check
    if(loadLocal(STORAGE.LOGIN)!=="yes"){

        window.location.href="Login Home Page.html";
        return;

    }

    // Theme
    applyTheme();

    // File Upload
    initFileUpload();

    // Home
    showPage("homePage");

    // History
    if(typeof loadHistory==="function"){
        loadHistory();
    }

    // Video
    if(typeof playCurrent==="function"){
        playCurrent();
    }

    console.log("✅ App Initialized");

}

/*=========================================
    PAGE NAVIGATION
==========================================*/

function hideAllPages(){

    const pages=[

        "homePage",
        "setupPage",
        "quizPage",
        "resultPage",
        "timerPage"

    ];

    pages.forEach(function(id){

        const page=$(id);

        if(page){

            page.style.display="none";

        }

    });

}

function showPage(id){

    hideAllPages();

    const page=$(id);

    if(page){

        page.style.display="block";

    }

}

function goHome(){

    showPage("homePage");

    document.getElementById("historyPage").style.display = "none";
    document.querySelector(".bottom-video").style.display = "block";

    if(typeof loadHistory==="function"){

        loadHistory();

    }

}

/*=========================================
    THEME
==========================================*/

function toggleTheme(){

    AppState.darkMode=!AppState.darkMode;

    saveLocal(

        STORAGE.THEME,

        AppState.darkMode

    );

    applyTheme();

}

function applyTheme(){

    if(AppState.darkMode){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

}

/*=========================================
    OPEN PAGES
==========================================*/

function showSetup(){

    showPage("setupPage");

}

function showHistory(){

    showPage("homePage");

    if(typeof loadHistory==="function"){

        loadHistory();

    }

}

function openTimerSettings(){

    showPage("timerPage");

}


/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    app.js (Part 2)
==========================================*/

/*=========================================
    FILE UPLOAD
==========================================*/

function initFileUpload(){

    const fileInput = $("fileInput");

    if(!fileInput) return;

    fileInput.addEventListener("change", handleFileSelect);

}

function handleFileSelect(event){

    const file = event.target.files[0];

    if(!file) return;

    const name = file.name.toLowerCase();

    if(name.endsWith(".json")){

        readJsonFile(file);

    }

    else if(

        name.endsWith(".xlsx") ||

        name.endsWith(".xls")

    ){

        readExcelFile(file);

    }

    else{

        Swal.fire({

            icon:"error",

            title:"Unsupported File",

            text:"Please select a JSON, XLS or XLSX file."

        });

        event.target.value="";

    }

}

/*=========================================
    JSON FILE
==========================================*/

function readJsonFile(file){

    const reader = new FileReader();

    reader.onload = function(e){

        $("jsonInput").value = e.target.result;

        Swal.fire({

            icon:"success",

            title:"JSON Loaded",

            text:file.name

        });

    };

    reader.readAsText(file);

}

/*=========================================
    EXCEL FILE
==========================================*/

function readExcelFile(file){

    const reader = new FileReader();

    reader.onload = function(e){

        try{

            const data = new Uint8Array(e.target.result);

            const workbook = XLSX.read(

                data,

                {type:"array"}

            );

            const sheet =

                workbook.Sheets[

                    workbook.SheetNames[0]

                ];

            const rows =

                XLSX.utils.sheet_to_json(sheet);

            const questions = rows.map(function(r){

                let ans =

                    String(

                        r.Answer

                    ).trim();

                let index = 0;

                if(!isNaN(ans)){

                    index = parseInt(ans);

                }else{

                    const map = {

                        A:0,

                        B:1,

                        C:2,

                        D:3

                    };

                    index =

                        map[

                            ans.toUpperCase()

                        ] ?? 0;

                }

                return{

                    q:r.Question,

                    options:[

                        r.A,

                        r.B,

                        r.C,

                        r.D

                    ],

                    answer:index

                };

            });

            $("jsonInput").value =

                JSON.stringify(

                    questions,

                    null,

                    2

                );

            Swal.fire({

                icon:"success",

                title:"Excel Imported",

                text:file.name

            });

        }

        catch(error){

            console.error(error);

            Swal.fire({

                icon:"error",

                title:"Import Failed",

                text:"Invalid Excel format."

            });

        }

    };

    reader.readAsArrayBuffer(file);

}

/*=========================================
    CLEAR FILE
==========================================*/

function clearQuizInput(){

    if($("jsonInput")){

        $("jsonInput").value="";

    }

    if($("fileInput")){

        $("fileInput").value="";

    }

}



/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    app.js (Part 3)
==========================================*/

/*=========================================
    RESET APPLICATION
==========================================*/

function resetApplication(){

    Swal.fire({

        title:"Reset App?",

        text:"All saved progress will be removed.",

        icon:"warning",

        showCancelButton:true,

        confirmButtonText:"Reset",

        cancelButtonText:"Cancel"

    }).then(function(result){

        if(!result.isConfirmed){

            return;

        }

        localStorage.removeItem(STORAGE.QUIZ_PROGRESS);
        localStorage.removeItem(STORAGE.QUIZ_FILES);
        localStorage.removeItem(STORAGE.BOOKMARKS);
        localStorage.removeItem(STORAGE.CURRENT_VIDEO);
        localStorage.removeItem(STORAGE.CURRENT_VIDEO_TIME);

        resetAllState();

        clearQuizInput();

        if($("progressBar")){

            $("progressBar").style.width="0%";

        }

        if($("quiz")){

            $("quiz").innerHTML="";

        }

        showPage("homePage");

        Swal.fire({

            icon:"success",

            title:"Reset Complete"

        });

    });

}

/*=========================================
    LOGOUT
==========================================*/

function logout(){

    Swal.fire({

        title:"Logout?",

        icon:"question",

        showCancelButton:true,

        confirmButtonText:"Logout",

        cancelButtonText:"Cancel"

    }).then(function(result){

        if(!result.isConfirmed){

            return;

        }

        localStorage.removeItem(STORAGE.LOGIN);

        window.location.href="Login Home Page.html";

    });

}

/*=========================================
    CLEAR HISTORY
==========================================*/

function clearHistoryData(){

    Swal.fire({

        title:"Delete History?",

        icon:"warning",

        showCancelButton:true,

        confirmButtonText:"Delete",

        cancelButtonText:"Cancel"

    }).then(function(result){

        if(!result.isConfirmed){

            return;

        }

        localStorage.removeItem(STORAGE.QUIZ_FILES);

        AppState.history=[];

        if(typeof loadHistory==="function"){

            loadHistory();

        }

        Swal.fire({

            icon:"success",

            title:"History Cleared"

        });

    });

}

/*=========================================
    EXPORT QUIZ
==========================================*/

function exportQuiz(){

    const text=$("jsonInput")?.value;

    if(!text){

        Swal.fire({

            icon:"warning",

            title:"No Quiz Loaded"

        });

        return;

    }

    const blob=new Blob(

        [text],

        {

            type:"application/json"

        }

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="quiz.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

}

/*=========================================
    GLOBAL ERROR
==========================================*/

window.onerror=function(message,source,line,column,error){

    console.error(

        message,

        source,

        line,

        column,

        error

    );

    Swal.fire({

        icon:"error",

        title:"Unexpected Error",

        text:String(message)

    });

};

/*=========================================
    ONLINE / OFFLINE
==========================================*/

window.addEventListener("online",function(){

    console.log("Internet Connected");

});

window.addEventListener("offline",function(){

    Swal.fire({

        icon:"warning",

        title:"Offline Mode",

        text:"Internet connection lost."

    });

});

/*=========================================
    APP READY
==========================================*/

console.log(

    "✅ app.js Loaded Successfully"

);


function getStudentKey(key){

    const student=JSON.parse(

        localStorage.getItem(

            "currentStudent"

        )

    );

    if(!student){

        return key;

    }

    return key+"_"+student.id;

}
