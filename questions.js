var timer = document.getElementById("timer");
var quizQuestion = document.getElementById("quiz-question");
var quizResponses = document.getElementById("quiz-responses");
var quizScore = document.getElementById("quiz-score");
var oldScores = JSON.parse(window.localStorage.getItem("gitvicky"));
var vicky = document.getElementById("vicky");
var quizTime = 70;
var totalScore = 0;
var questionNum = 0;
var corrResp;
var questions;

var HTML = [
    { q: "HTML stands for?", r: ["HyperText Markup Language", "HyperText Media Language", "Hyper Markup Language", "HyperText Method Language"], a: "0" },
    { q: "In HTML all tags come in pair?", r: ["YES", "NO"], a: "1" },
    { q: "Hyperlink tag can be applied to", r: ["text", "image", "video", "All"], a: "3" },
    { q: "Which attributes is used to change the number index in tag?", r: ["type", "header", "change", "value"], a: "3" },
    { q: "How many links can the tag accept ?", r: ["two", "one", "three", "zero"], a: "1" },
    { q: "Default size for a text field is around ___________ characters", r: ["14", "12", "13", "15"], a: "2" },
    { q: "Can an HTML link point to a different section on the SAME page ?", r: ["YES", "NO"], a: "1" },
    { q: "Can I nest tables within tables? ", r: ["YES", "NO"], a: "0" },
    { q: "Can I put markup in ALT text?", r: ["YES", "NO"], a: "1" },
    { q: "What is an iframe?", r: ["Divides the page into 2 sections", "Helps include one webpage into another", "Is used to create ajax frame"], a: "1" }
];

var CSS = [
    { q: "Pseudo-classes In CSS", r: ["Match A Specified Element", "Select The Active Links", "Are Used To Select All The Visited Links", "Are Used To Define A Special State Of An Element"], a: "3" },
    { q: "Which Event Will Be Used When A Connection To The Server Is Opened.", r: ["Onmessage", "Onopen", "Onerror", "None Of The Above"], a: "1" },
    { q: "Which Is The Correct CSS Syntax?", r: ["Body:color=black", "{body;color:black}", "{body:color=black(body}", "Body {color: Black}"], a: "3" },
    { q: "Which CSS Property Is Used For Controlling The Layout?", r: ["Header", "Footer", "Display", "None Of The Above"], a: "2" },
    { q: "Which CSS Property Sets A Background Image For An Element?", r: ["Background - Color", "Background - Image", "Background - Attachment", "None of These"], a: "1" },
    { q: "Which Of The Following Properties Will We Use To Display Border Around A Cell Without Any Content ?", r: ["Noncontent-cell", "Blank-cell", "Empty-cell", "Void-cell"], a: "2" },
    { q: "What Should Be The Table Width, So That The Width Of A Table Adjust To The Current Width Of The Browser Window?", r: ["640 Pixels", "100.00%", "Full-screen", "1024 Px"], a: "1" },
    { q: "How Can We Write Comment Along With CSS Code ? ", r: [" / A Comment /", "// A Comment //", " /* A Comment */", "<' A Comment'>"], a: "2" },
    { q: "Which CSS Property Is Used To Control The Text Size Of An Element ?", r: ["Font-style", "Font-size", "Text-size", "Text-style"], a: "1" },

];


var javaScript = [
    { q: "What is the HTML tag under which one can write the JavaScript code?", r: ["<javascript>", "<scripted>", "<script>", "<js>"], a: "2" },
    { q: "Which of the following is the correct syntax to display 'Hello' in an alert box using JavaScript?", r: ["alertbox('Hello');", "{msg('Hello');", "msgbox('Hello');", "alert('Hello');"], a: "3" },
    { q: "What is the correct syntax for referring to an external script called 'main.js'?", r: ["<script src='main.js'>", " <script href='main.js'>", " <script ref='main.js'>", " <script name='main.js'>"], a: "0" },
    { q: "The external JavaScript file must contain <script> tag. True or False?", r: ["True", "False"], a: "1" },
    { q: "Which of the following is not a reserved word in JavaScript?", r: ["interface", "throws", "program", "short"], a: "2" },
    { q: "How is the function called in JavaScript?", r: ["call MainFunc();", "call function MainFunc();", "MainFunc();", "function MainFunc();"], a: "2" },
    { q: "How to write an 'if' statement for executing some code.If 'i' is NOT equal to 8? ", r: ["if(i<>5)", "if i<>5", "if(i!=5)", "if i!=5"], a: "2" },
    { q: "What is the JavaScript syntax for printing values in Console?", r: ["print(5)", "console.log(5);", "console.print(5);", "print.console(5);"], a: "1" },
    { q: "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?", r: ["strip()", "trim()", "stripped()", "trimmed()"], a: "1" },
    { q: "What is the correct syntax for adding comments in JavaScript?", r: ["<!–This is a comment–&gt", "//This is a comment", "-This is a comment", "**This is a comment**"], a: "1" }

];




function initialSetup() {
    var queryString = new URLSearchParams(window.location.search).toString();
    var level = queryString.charAt(queryString.length - 1);
    console.log("level", level);
    if (level == 1) {
        questions = HTML;
        vicky.textContent = "HTML"

    } else if (level == 2) {
        questions = CSS;
        vicky.textContent = "CSS"

    } else if (level == 3) {
        questions = javaScript;
        vicky.textContent = "javaScript"

    }
    showScore();
    var getReady = 3;
    console.log("old scores: ", oldScores);
    var prepInterval = setInterval(function() {
        timer.textContent = "Get ready to begin in: " + getReady + " seconds";
        getReady--;

        if (getReady < 0) {
            clearInterval(prepInterval);
            quizTimer();
            showQuestion();
        }
    }, 1000);
}

function quizTimer() {
    var quizInterval = setInterval(function() {
        timer.textContent = quizTime + " seconds remaining";
        quizTime--;

        if (quizTime === 0) {
            clearInterval(quizInterval);
            clearQuestion();
            saveScore();
        }
    }, 1000)
}

function showQuestion() {
    if (questionNum < questions.length) {
        quizQuestion.textContent = questions[questionNum].q;
        for (var i = 0; i < questions[questionNum].r.length; i++) {
            var resp = document.createElement("div");
            resp.setAttribute("id", "respBtn");
            resp.setAttribute("respID", i);
            resp.textContent = questions[questionNum].r[i];
            quizResponses.appendChild(resp);
            corrResp = questions[questionNum].a;
        }
        questionNum++;
    } else {
        quizQuestion.textContent = "Well that's embarrassing, I've run out of questions before you ran out of time. Try one of the harder levels next time!";
        quizTime = 1;
    }

}

quizResponses.addEventListener("click", function(e) {
    console.log("click event: ", e.target.getAttribute("respID"))
    if (e.target.getAttribute("respID") == corrResp) {
        totalScore = totalScore + quizTime;
    } else {
        quizTime -= 10;
    }
    clearQuestion();
    showScore();
    showQuestion();
})

function clearQuestion() {
    quizQuestion.textContent = "";
    while (quizResponses.firstChild) {
        quizResponses.removeChild(quizResponses.firstChild);
    }

}

function showScore() {
    quizScore.textContent = totalScore;
}

function saveScore() {
    var userInitials = prompt("Wow, your score was " + totalScore + ". Enter your initials to save your score.");
    if (userInitials !== null) {
        if (oldScores === null) {
            oldScores = [{
                initials: userInitials,
                score: totalScore
            }];
        } else {
            oldScores.push({
                initials: userInitials,
                score: totalScore
            });
            console.log("Scores", oldScores);
            oldScores.sort(function(a, b) {
                return (b.score - a.score);
            })
        }
        localStorage.setItem('gitvicky', JSON.stringify(oldScores));
        window.location.href = "index.html";
    }
}

initialSetup();