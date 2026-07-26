/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    quiz.js (Part 1)
==========================================*/

/*=========================================
    START QUIZ
==========================================*/

function loadNewQuiz(){

    try{

        const text = $("jsonInput").value.trim();

        if(text===""){

            Swal.fire({

                icon:"warning",

                title:"No Quiz Loaded",

                text:"Please load a JSON or Excel file."

            });

            return;

        }

        AppState.questions = JSON.parse(text);

        if(

            !Array.isArray(AppState.questions) ||

            AppState.questions.length===0

        ){

            Swal.fire({

                icon:"error",

                title:"Invalid Quiz File"

            });

            return;

        }

        AppState.current = 0;

        AppState.score = 0;

        AppState.wrong = 0;

        AppState.answers =

            new Array(

                AppState.questions.length

            ).fill(null);

        if(QUIZ.SHUFFLE){

            shuffleQuestions();

        }

        showPage("quizPage");

        if(typeof startTimer==="function"){

            startTimer();

        }

        loadQuestion();

    }

    catch(error){

        console.error(error);

        Swal.fire({

            icon:"error",

            title:"JSON Error",

            text:"Unable to read quiz."

        });

    }

}

/*=========================================
    LOAD QUESTION
==========================================*/

function loadQuestion(){

    if(

        AppState.current >=

        AppState.questions.length

    ){

        showResult();

        return;

    }

    const q =

        AppState.questions[

            AppState.current

        ];

    let html="";

    html +=

    "<h3>" +

    (AppState.current+1) +

    " / " +

    AppState.questions.length +

    "</h3>";

    html +=

    "<br><b>" +

    q.q +

    "</b><br><br>";

    q.options.forEach(function(option,index){

        html +=

        `<div class="option"

        onclick="selectOption(${index})">

        ${option}

        </div>`;

    });

    $("quiz").innerHTML = html;

    updateProgress();

}

/*=========================================
    SELECT ANSWER
==========================================*/

function selectOption(index){

    if(

        AppState.answers[

            AppState.current

        ]!==null

    ){

        return;

    }

    const q =

        AppState.questions[

            AppState.current

        ];

    AppState.answers[

        AppState.current

    ] = index;

    const options =

        document.querySelectorAll(

            ".option"

        );

    options.forEach(function(opt,i){

        if(i===q.answer){

            opt.classList.add(

                "correct"

            );

        }

        if(

            i===index &&

            index!==q.answer

        ){

            opt.classList.add(

                "wrong"

            );

        }

    });

    if(index===q.answer){

        AppState.score++;

    }

    else{

        AppState.wrong++;

    }

    if(QUIZ.AUTO_SAVE){

        saveProgress();

    }

    if(

        $("autoNext") &&

        $("autoNext").checked

    ){

        setTimeout(function(){

            nextQuestion();

        },1200);

    }

}

/*=========================================
    PROGRESS BAR
==========================================*/

function updateProgress(){

    if(

        !AppState.questions.length

    ){

        return;

    }

    const percent =

    (

        (AppState.current+1)

        /

        AppState.questions.length

    )*100;

    $("progressBar").style.width =

    percent + "%";

}

/*=========================================
    SHORTCUTS
==========================================*/

function nextQ(){

    nextQuestion();

}

function prevQ(){

    prevQuestion();

}


/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    quiz.js (Part 2)
==========================================*/

/*=========================================
    NEXT QUESTION
==========================================*/

function nextQuestion(){

    if(

        AppState.current <

        AppState.questions.length-1

    ){

        AppState.current++;

        loadQuestion();

    }

    else{

        showResult();

    }

}

/*=========================================
    PREVIOUS QUESTION
==========================================*/

function prevQuestion(){

    if(AppState.current>0){

        AppState.current--;

        loadQuestion();

    }

}

/*=========================================
    SHOW RESULT
==========================================*/

function showResult(){

    if(typeof stopTimer==="function"){

        stopTimer();

    }

    showPage("resultPage");

    const total=AppState.questions.length;

    const correct=AppState.score;

    const wrong=AppState.wrong;

    const percentage=

    total===0

    ?0

    :((correct/total)*100).toFixed(2);

    let grade="F";

    let status="Fail";

    if(percentage>=90){

        grade="A+";

        status="Excellent";

    }

    else if(percentage>=80){

        grade="A";

        status="Very Good";

    }

    else if(percentage>=70){

        grade="B";

        status="Good";

    }

    else if(percentage>=60){

        grade="C";

        status="Pass";

    }

    else if(percentage>=50){

        grade="D";

        status="Pass";

    }

    $("resultText").innerHTML=`

        <h2>${status}</h2>

        <br>

        ✅ Correct : ${correct}

        <br><br>

        ❌ Wrong : ${wrong}

        <br><br>

        📚 Total : ${total}

        <br><br>

        📊 Percentage : ${percentage}%

        <br><br>

        🏆 Grade : ${grade}

    `;

    if(QUIZ.SHOW_RESULT_CHART){

        drawChart();

    }

    if(typeof saveHistory==="function"){

        saveHistory();

    }

    clearProgress();

}

/*=========================================
    RESULT CHART
==========================================*/

function drawChart(){

    if(AppState.chart){

        AppState.chart.destroy();

    }

    const canvas=$("chart");

    if(!canvas) return;

    AppState.chart=new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[

                "Correct",

                "Wrong"

            ],

            datasets:[{

                data:[

                    AppState.score,

                    AppState.wrong

                ],

                borderWidth:1

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

/*=========================================
    REVIEW MODE
==========================================*/

function reviewMode(){

    if(!QUIZ.ALLOW_REVIEW){

        return;

    }

    AppState.current=0;

    showPage("quizPage");

    loadQuestion();

}

/*=========================================
    AUTO SAVE
==========================================*/

function autoSaveQuiz(){

    if(QUIZ.AUTO_SAVE){

        saveProgress();

    }

}


/*=========================================
    MANABRAJ QUIZ APP
    Enterprise v3.0
    quiz.js (Part 3)
==========================================*/

/*=========================================
    SHUFFLE QUESTIONS
==========================================*/

function shuffleQuestions(){

    for(

        let i=AppState.questions.length-1;

        i>0;

        i--

    ){

        const j=Math.floor(

            Math.random()*(i+1)

        );

        [

            AppState.questions[i],

            AppState.questions[j]

        ]=[

            AppState.questions[j],

            AppState.questions[i]

        ];

    }

}

/*=========================================
    RESTART QUIZ
==========================================*/

function restartQuiz(){

    Swal.fire({

        title:"Restart Quiz?",

        text:"Current progress will be lost.",

        icon:"warning",

        showCancelButton:true,

        confirmButtonText:"Restart",

        cancelButtonText:"Cancel"

    }).then(function(result){

        if(!result.isConfirmed){

            return;

        }

        AppState.current=0;

        AppState.score=0;

        AppState.wrong=0;

        AppState.answers=

        new Array(

            AppState.questions.length

        ).fill(null);

        if(typeof startTimer==="function"){

            startTimer();

        }

        showPage("quizPage");

        loadQuestion();

    });

}

/*=========================================
    RESET QUIZ
==========================================*/

function resetQuiz(){

    resetQuizState();

    clearProgress();

    if($("quiz")){

        $("quiz").innerHTML="";

    }

    if($("jsonInput")){

        $("jsonInput").value="";

    }

    if($("progressBar")){

        $("progressBar").style.width="0%";

    }

}

/*=========================================
    JUMP QUESTION
==========================================*/

function jumpToQuestion(number){

    number=parseInt(number);

    if(

        isNaN(number) ||

        number<1 ||

        number>AppState.questions.length

    ){

        Swal.fire({

            icon:"error",

            title:"Invalid Question Number"

        });

        return;

    }

    AppState.current=number-1;

    loadQuestion();

}

/*=========================================
    BOOKMARK
==========================================*/

function bookmarkQuestion(){

    const index=AppState.current;

    if(

        !AppState.bookmarks.includes(index)

    ){

        AppState.bookmarks.push(index);

        saveLocal(

            getStudentKey(STORAGE.BOOKMARKS),

            AppState.bookmarks

        );

        Swal.fire({

            icon:"success",

            title:"Question Bookmarked"

        });

    }

    else{

        Swal.fire({

            icon:"info",

            title:"Already Bookmarked"

        });

    }

}

/*=========================================
    SAVE PROGRESS
==========================================*/

function saveProgress(){

    saveLocal(

        getStudentKey(STORAGE.QUIZ_PROGRESS),

        {

            current:

            AppState.current,

            score:

            AppState.score,

            wrong:

            AppState.wrong,

            answers:

            AppState.answers

        }

    );

}

/*=========================================
    LOAD PROGRESS
==========================================*/

function loadProgress(){

    const data=

    loadLocal(

        getStudentKey(STORAGE.QUIZ_PROGRESS),

        null

    );

    if(!data){

        return;

    }

    AppState.current=

    data.current||0;

    AppState.score=

    data.score||0;

    AppState.wrong=

    data.wrong||0;

    AppState.answers=

    data.answers||

    [];

}

/*=========================================
    CLEAR PROGRESS
==========================================*/

function clearProgress(){

    localStorage.removeItem(

        getStudentKey(STORAGE.QUIZ_PROGRESS)

    );

}

/*=========================================
    AUTO SAVE
==========================================*/

document.addEventListener(

    "click",

    function(){

        if(

            QUIZ.AUTO_SAVE &&

            AppState.questions.length

        ){

            saveProgress();

        }

    }

);

/*=========================================
    QUIZ READY
==========================================*/

console.log(

    "✅ quiz.js Loaded Successfully"

);