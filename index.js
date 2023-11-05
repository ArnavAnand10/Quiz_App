const express = require("express");
const bodyparser = require("body-parser");
const e = require("express");
const app = express();

app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))


app.listen("3000", function () {
    console.log("Quiz app running")
})

i = 0


const questList = ["First Question", "Second Question", "Third Qeustion"]

const ansList = [["1", "2", "3", "4"], ["1.1", "2.2", "3.2", "4.2"], ["1.3", "2.3", "3.3", "4.3"]]
const ansList1 = [["1", "2", "3", "4"], ["1.1", "2.2", "3.3", "4.4"], ["1.3", "2.3", "3.3", "4.3"]]
var userInp = [];
var wrongQuest = [];
var buttonTextAfter = ["Next", "Submit"];
var buttonIndex = 0;
var score = 0;
var maxScore = ansList.length;
var flag = false;

app.get("/home", function (req, res) {






    if (userInp.length == ansList.length && flag == false){

        
            for (var j = 0; j < questList.length; j++) {

                if (userInp[j] == ansList1[j][0]) {
                    score = score + 1
                } else {
                    wrongQuest.push(questList[j])
                }
            }
            const Accuracy = Math.floor((score / questList.length) * 100)

            if (Accuracy <= 100 && Accuracy >= 90) {
                var Quote = "Excellent Performance, Keep it Up !";
            } else if (Accuracy < 90 && Accuracy >= 75) {
                var Quote = "";
            } else {
                var Quote = "";
            }

            console.log(wrongQuest)
            flag = true
            res.render("output.ejs", { number: score, wrongList: wrongQuest, total: questList.length, accuracy: Accuracy, quote: Quote })
        



    }

    else if (flag == true && userInp.length == ansList.length){
        console.log("refreshed")
        buttonIndex = 0;
        score = 0;
        userInp = [];
        wrongQuest = [];
        i = 0;
        res.redirect("/home")
    }




    else {
        flag = false
        // Shuffle Answer List
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {

                // Generate random number 
                var j = Math.floor(Math.random() * (i + 1));

                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;
        }

        res.render("quiz.ejs", { quest: questList[i], buttonText: buttonTextAfter[buttonIndex], options: shuffleArray(ansList[i]) })
    }
}



)

app.post("/next", function (req, res) {


    const userAns = req.body.value
    userInp.push(userAns)

    if (userInp.length == questList.length - 1) {
        buttonIndex = 1

    }
    i = i + 1
    res.redirect("/home")

})

app.post("/restart", function (req, res) {
    buttonIndex = 0;
    score = 0;
    userInp = [];
    wrongQuest = [];
    i = 0;
    res.redirect("/home")
})

app.get("/",function(req,res){
    res.render("homepage.ejs")
})