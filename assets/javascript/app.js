///////Notes///////
// 2018-12-17 A. Lawrence //
// Problem Descriptions: //
// 1. Timer - Works most of the time. It is buggy and stops whenever it wants to.
// 2. Setting interval for waiting period - I can't seem to do that. The timer does not reset to 10 seconds when I put in a waiting function for 5 seconds.
//          - waiting function used and placed after If/Else statement and before rendering next question
//          - setTimeout(watch.stop, 1000 * 5);
// 3. Unanswered Text - I believe my watch timer has issues that just won't work. Can't set to 
//          - clockRunning = False after the setTimeout function is triggered. Therefore, the logic for unanswered text is not writing correctly. 
// 4. Images - Images get inserted in jumbotron after the question is answered, but in the next question. I want it to insert in the current one or moving on to the next question
//          - If/Else statement is not working for the images. Both images show up at the same time. 
//          - Inability to clear the images for the next question
//          - Clearing function used; was not working because it cleared the images entirely instead of showing it. Might work if Case statement is used
//          - var x = document.getElementById("disneyImage");
//          - x.style.display = "none";


///////BEGIN CODE HERE///////

//VARIABLES

//QUESTIONS FOR THE GAME
// We start the game with a score of 0.
var correct = 0;
var wrong = 0;
var unanswered = 0;
var questionIndex = 0;


// Let's write things on the page
$("#correct-text").text(correct);
$("#wrong-text").text(wrong);
$("#unanswered-text").text(unanswered);

//quizQuestions
var quizQuestions = [
    {
        question: "Who is the first king in Lion King?",
        answers: {
            a: "Scar",
            b: "Mufasa",
            c: "Simba"
        },
        correctAnswer: "Mufasa"
    },
    {
        question: "Who is Ariel's guardian in Little Mermaid?",
        answers: {
            a: "Scuttle",
            b: "Ursula",
            c: "Sebastian"
        },
        correctAnswer: "Sebastian"
    },
    {
        question: "What was the name of the little boy in Beauty and the Beast?",
        answers: {
            a: "Chip",
            b: "Featherduster",
            c: "LeFou"
        },
        correctAnswer: "Chip"
    },
    {
        question: "Where is the setting of The Princess and the Frog?",
        answers: {
            a: "Paris",
            b: "New Orleans",
            c: "New York City"
        },
        correctAnswer: "New Orleans"
    },
    {
        question: "How did Aladdin get out of the Cave of Wonders?",
        answers: {
            a: "Apu turned into an elephant",
            b: "Genie carried them",
            c: "Rode on Magic Carpet"
        },
        correctAnswer: "Rode on Magic Carpet"
    }
];
   
// VARIABLES FOR THE WATCH
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;


// OUR WATCH OBJECT -- 
// HAS VARIABLES AND FUNCTIONS FOR STARTING AND STOPPING THE WATCH
var watch = {

  time: 10,

  reset: function() {

    watch.time = 10;
    clockRunning = false;
    clearInterval(intervalId);
    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:10");
  },

  start: function() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {

        intervalId = setInterval(watch.count, 1000);
        clockRunning = true;             
        setTimeout(watch.stop, 1000 * 10);
    } 
  },

  stop: function() {

    // Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {

    // decrement time by 1, remember we cant use "this" here.
    watch.time--;  

    // Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable.
    var converted = watch.timeConverter(watch.time);
    console.log(converted);

    // Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },

  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds <= 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    return minutes + ":" + seconds;   
  }

};

//  FUNCTIONS //

// Let's write things on the page
 // Function to render questions.
 
 function renderQuestion() {
      // If there are still more questions, render the next one.
      if (questionIndex <= (quizQuestions.length - 1)) {
        document.querySelector("#question-text").innerHTML = quizQuestions[questionIndex].question;
        document.querySelector("#a-text").innerHTML = quizQuestions[questionIndex].answers.a;
        document.querySelector("#b-text").innerHTML = quizQuestions[questionIndex].answers.b;
        document.querySelector("#c-text").innerHTML = quizQuestions[questionIndex].answers.c;
      }
      // If there aren't, render the end game screen.
      else {
        document.querySelector("#question-text").innerHTML = "Game Over!";
        document.querySelector("#finalScore-text").innerHTML = correct + " out of " + quizQuestions.length;
      }
    };

// Function to reset game
function resetGame () {

    // We start the game with a score of 0.
    correct = 0;
    wrong = 0;
    unanswered = 0;
    questionIndex = 0;
    // Let's write things on the page
    $("#correct-text").text(correct);
    $("#wrong-text").text(wrong);
    $("#unanswered-text").text(unanswered);
    $("#finalScore-text").text(0);
    //ask questions
    renderQuestion();
}

// Function to add to the unanswered score
function addUnanswered (){
    if (clockRunning = false) {
        unanswered++;
        $("#unanswered-text").text(unanswered);
    }
}

 // EXECUTE STUFF //
 
 //  Start on click.
$("#start").on("click", function() {

    //start the clock
    watch.start();
    console.log(clockRunning);
    console.log(watch.time);
    
    //Start the questions
    renderQuestion();

    //NOT WORKING!!!! goal of this is to show unanswered question and add it to tally 
    addUnanswered();

}
);

//  Stop on click. We click to answer
$("#a-text").on("click", function() {


   //stop the clock
    watch.stop();
   
   //let's see if we get it right 
   var a = quizQuestions[questionIndex].answers.a

    if (a === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        //make image
        var imageC = $("<img>");
            imageC.addClass("dis-image");
            imageC.attr("src", "assets/images/Chip.jpg");
            $("#disneyImage").append(imageC);   

    }
        else {
        wrong++;
        $("#wrong-text").text(wrong);

        //make image
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF);  

    }


    // Increment the questionIndex variable and call the renderQuestion function.
    questionIndex++;
    renderQuestion();

    //reset the clock and start it up again
    watch.reset();
    watch.start();

    //NOT WORKING!!!! goal of this is to show unanswered question and add it to tally 
    addUnanswered();


});
     
//  Stop on click.
$("#b-text").on("click", function() {

  
    //stop the clock
    watch.stop();

    //let's see if we get it right 
    var b = quizQuestions[questionIndex].answers.b

    if (b === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        // Let's make pictures
        if (quizQuestions[0]){

            var imageA = $("<img>");
                imageA.addClass("dis-image");
                imageA.attr("src", "assets/images/Mufasa.png");
                $("#disneyImage").append(imageA);
        }
        else (quizQuestions[3]);{
            var imageD = $("<img>");
                imageD.addClass("dis-image");
                imageD.attr("src", "assets/images/NewOrleans.jpg");
                $("#disneyImage").append(imageD);  
        };
        
    } 
    else {
        wrong++;
        $("#wrong-text").text(wrong);

        //make image of sad mickey
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF); 
    };



    // Increment the questionIndex variable and call the renderQuestion function.
    questionIndex++;
    renderQuestion();

    //reset the clock and start it up again
    watch.reset();
    watch.start();

    //NOT WORKING!!!! goal of this is to show unanswered question and add it to tally 
    addUnanswered();

});

//  Stop on click.
$("#c-text").on("click", function() {

    //stop the clock
    watch.stop();

    //let's see if we get it right 
    var c = quizQuestions[questionIndex].answers.c

    if (c === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        // Let's make pictures
        if (quizQuestions[1]){
            var imageB = $("<img>");
                imageB.addClass("dis-image");
                imageB.attr("src", "assets/images/Sebastian.jpg");
                $("#disneyImage").append(imageB);   
            
        }
        else (quizQuestions[4]);{
            var imageE = $("<img>");
                imageE.addClass("dis-image");
                imageE.attr("src", "assets/images/MagicCarpet.jpg");
                $("#disneyImage").append(imageE);  
        };

    }
    else {
        wrong++;
        $("#wrong-text").text(wrong);

        //make image of sad Mickey
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF); 
    };


    // Increment the questionIndex variable and call the renderQuestion function.
    questionIndex++;
    renderQuestion();

    //reset the clock and start it up again
    watch.reset();
    watch.start();

    
    //NOT WORKING!!!! goal of this is to show unanswered question and add it to tally 
    addUnanswered();

});


//  reset stuff
$("#reset").on("click", function() {
    watch.reset();
    resetGame();
});
