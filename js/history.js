/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    history.js
==========================================*/

/*=========================================
    SAVE HISTORY
==========================================*/

function saveHistory(){

    if(!AppState.questions.length){

        return;

    }

    let history = loadLocal(
        getStudentKey(STORAGE.QUIZ_FILES),
        []
    );

    history.unshift({

        id:Date.now(),

        date:new Date().toLocaleString(),

        total:AppState.questions.length,

        correct:AppState.score,

        wrong:AppState.wrong,

        percentage:

        (

            (AppState.score/

            AppState.questions.length)

            *100

        ).toFixed(2),

        questions:AppState.questions

    });

    saveLocal(

        getStudentKey(STORAGE.QUIZ_FILES),

        history

    );

}

/*=========================================
    LOAD HISTORY
==========================================*/

function loadHistory(){

    const box = $("historyBox");

    if(!box){

        return;

    }

    const history = loadLocal(

                        getStudentKey(STORAGE.QUIZ_FILES),

                        []

                    );

    AppState.history = history;

    if(history.length===0){

        box.innerHTML=

        "<p>No History Found.</p>";

        return;

    }

    let html="";

    history.forEach(function(item,index){

        html+=`

        <div class="history-item">

            <b>

            Quiz ${index+1}

            </b>

            <br>

            📅 ${item.date}

            <br>

            📚 ${item.total} Questions

            <br>

            ✅ ${item.correct}

            |

            ❌ ${item.wrong}

            <br>

            📊 ${item.percentage}%

            <br><br>

            <div class="history-buttons">

                <button onclick="openHistory(${index})">
                    Open
                </button>

                <button onclick="deleteHistory(${index})">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

    box.innerHTML=html;

}

/*=========================================
    OPEN HISTORY
==========================================*/

function openHistory(index){

    const history = loadLocal(

        getStudentKey(STORAGE.QUIZ_FILES),

        []

    );

    if(

        !history[index]

    ){

        return;

    }

    AppState.questions =

    history[index].questions;

    AppState.current = 0;

    AppState.score = 0;

    AppState.wrong = 0;

    AppState.answers =

    new Array(

        AppState.questions.length

    ).fill(null);

    showPage("quizPage");

    if(typeof startTimer==="function"){

        startTimer();

    }

    loadQuestion();

}

/*=========================================
    DELETE HISTORY
==========================================*/

function deleteHistory(index){

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

        let history = loadLocal(

            getStudentKey(STORAGE.QUIZ_FILES),

            []

        );

        history.splice(index,1);

        saveLocal(

            getStudentKey(STORAGE.QUIZ_FILES),

            history

        );

        loadHistory();

        Swal.fire({

            icon:"success",

            title:"Deleted"

        });

    });

}

/*=========================================
    CLEAR HISTORY
==========================================*/

function clearAllHistory(){

    Swal.fire({

        title:"Delete All History?",

        icon:"warning",

        showCancelButton:true,

        confirmButtonText:"Delete All",

        cancelButtonText:"Cancel"

    }).then(function(result){

        if(!result.isConfirmed){

            return;

        }

        localStorage.removeItem(

            getStudentKey(STORAGE.QUIZ_FILES)

        );

        AppState.history=[];

        loadHistory();

        Swal.fire({

            icon:"success",

            title:"History Cleared"

        });

    });

}

/*=========================================
    SEARCH HISTORY
==========================================*/

function searchHistory(keyword){

    keyword =

    String(keyword)

    .toLowerCase()

    .trim();

    const history = loadLocal(
        getStudentKey(STORAGE.QUIZ_FILES),
        []
    );

    const result = history.filter(

        function(item){

            return item.date

            .toLowerCase()

            .includes(keyword);

        }

    );

    const box=$("historyBox");

    if(result.length===0){

        box.innerHTML=

        "<p>No Matching History.</p>";

        return;

    }

    let html="";

    result.forEach(function(item){

        html+=`

        <div class="history-item">

            <b>${item.date}</b>

            <br>

            ${item.correct}

            /

            ${item.total}

            <br>

            ${item.percentage}%

        </div>

        `;

    });

    box.innerHTML=html;

}

/*=========================================
    HISTORY STATISTICS
==========================================*/

function historyStatistics(){

    const history = loadLocal(
        getStudentKey(STORAGE.QUIZ_FILES),
        []
    );

    let totalQuiz=history.length;

    let totalCorrect=0;

    let totalWrong=0;

    history.forEach(function(item){

        totalCorrect+=item.correct;

        totalWrong+=item.wrong;

    });

    return{

        quiz:totalQuiz,

        correct:totalCorrect,

        wrong:totalWrong

    };

}

/*=========================================
    EXPORT HISTORY
==========================================*/

function exportHistory(){

    const history = loadLocal(

        getStudentKey(STORAGE.QUIZ_FILES),

        []

    );

    if(history.length===0){

        Swal.fire({

            icon:"warning",

            title:"No History"

        });

        return;

    }

    const blob=new Blob(

        [

            JSON.stringify(

                history,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    const url=

    URL.createObjectURL(blob);

    const a=

    document.createElement("a");

    a.href=url;

    a.download="quiz_history.json";

    a.click();

    URL.revokeObjectURL(url);

}

/*=========================================
    IMPORT HISTORY
==========================================*/

function importHistory(json){

    try{

        const history=

        JSON.parse(json);

        if(!Array.isArray(history)){

            throw "";

        }

        saveLocal(

            getStudentKey(STORAGE.QUIZ_FILES),

            history

        );

        loadHistory();

        Swal.fire({

            icon:"success",

            title:"History Imported"

        });

    }

    catch{

        Swal.fire({

            icon:"error",

            title:"Invalid History File"

        });

    }

}

/*=========================================
    HISTORY READY
==========================================*/

console.log(

    "✅ history.js Loaded Successfully"

);


/*=========================================
    SHOW HISTORY
==========================================*/

function showHistory(){

    const history = document.getElementById("historyPage");
    const video = document.querySelector(".bottom-video");

    if(history.style.display === "none" || history.style.display === ""){

        // History Show
        history.style.display = "block";
        video.style.display = "block";

        loadHistory();

    }else{

        // History Hide
        history.style.display = "none";
        video.style.display = "block";

    }

}