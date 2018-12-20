///////Notes///////
// 2018-12-19 A. Lawrence //
// Problem Descriptions: //
// 1. Timer in the last question won't stop if the correct answer is not picked.
// 2. Timer is buggy and does not go through the whole cycle



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
            c: "Simba",
            d: "Timon",
            e: "Pumba"
        },
        correctAnswer: "Mufasa"
    },
    {
        question: "Who is Ariel's guardian in Little Mermaid?",
        answers: {
            a: "Scuttle",
            b: "Ursula",
            c: "Sebastian",
            d: "Prince Eric",
            e: "Flounder"
        },
        correctAnswer: "Sebastian"
    },
    {
        question: "What was the name of the little boy in Beauty and the Beast?",
        answers: {
            a: "Chip",
            b: "Featherduster",
            c: "LeFou",
            d: "Belle",
            e: "Lumiere"
        },
        correctAnswer: "Chip"
    },
    {
        question: "Where is the setting of The Princess and the Frog?",
        answers: {
            a: "Paris",
            b: "Anaheim",
            c: "New York City",
            d: "New Orleans",
            e: "Aldovia"
        },
        correctAnswer: "New Orleans"
    },
    {
        question: "How did Aladdin get out of the Cave of Wonders?",
        answers: {
            a: "Apu turned into an elephant",
            b: "Genie carried them",
            c: "They dug themselves out with a shovel",
            d: "They did not get out of the Cave",
            e: "Rode on Magic Carpet"
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
    } 
  },

  stop: function() {

    // Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {

    // decrement time by 1, remember we cant use "this" here. Stop the clock when time hits 0
    watch.time--;  

    if (watch.time === 0) {
        watch.stop();
        addUnanswered();
        wrong++;
        $("#wrong-text").text(wrong);
    };

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
        document.querySelector("#d-text").innerHTML = quizQuestions[questionIndex].answers.d;
        document.querySelector("#e-text").innerHTML = quizQuestions[questionIndex].answers.e;
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
    //Empty the DIV for next detail
    $("#disneyImage").empty();
}

// Function to add to the unanswered score
function addUnanswered (){
        unanswered++;
        $("#unanswered-text").text(unanswered);

}

function allFunctions() {
    // Increment the questionIndex variable and call the renderQuestion function.
    questionIndex++;
    renderQuestion();

    //reset the clock and start it up again
    watch.reset();
    watch.start();    
    //Empty the DIV for next detail
    $("#disneyImage").empty();
};


 // EXECUTE STUFF //
 
 //  Start on click.
$("#start").on("click", function() {

    //start the clock
    watch.start();
    console.log(clockRunning);
    console.log(watch.time);

    renderQuestion();

    //moves on to the next question if not answered.
    setTimeout(allFunctions, 1000 * 10);
  
}
);

//  Stop on click. We click to answer
$("#a-text").on("click", function() {

   
   //let's see if we get it right 
   var a = quizQuestions[questionIndex].answers.a

    if (a === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        //Empty the DIV for next detail
        $("#disneyImage").empty();   

        //make image
        var imageC = $("<img>");
            imageC.addClass("dis-image");
            imageC.attr("src", "assets/images/Chip.jpg");
            $("#disneyImage").append(imageC);  
        

       //Reset and start new question, holds the image for 4 seconds     
        setTimeout(allFunctions, 1000 * 4);  

    }
        else {
        wrong++;
        $("#wrong-text").text(wrong);

        //make image
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF);  
        
        //Reset and start new question, holds the image for 4 seconds         
        setTimeout(allFunctions, 1000 * 4);  

    }
 
    //moves on to the next question if not answered in 10 seconds
    setTimeout(allFunctions, 1000 * 10);

});
     
//  Stop on click.
$("#b-text").on("click", function() {

    //let's see if we get it right 
    var b = quizQuestions[questionIndex].answers.b

    if (b === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        // Let's make pictures
        var imageA = $("<img>");
            imageA.addClass("dis-image");
            imageA.attr("src", "assets/images/Mufasa.png");
            $("#disneyImage").append(imageA);

    
        //Reset and start new question, holds the image for 4 seconds         
        setTimeout(allFunctions, 1000 * 4);  
        
    } 
    else {
        wrong++;
        $("#wrong-text").text(wrong);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        //make image of sad mickey
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF); 
    
        //Reset and start new question, holds the image for 4 seconds        
        setTimeout(allFunctions, 1000 * 4);  
            
    };

    //moves on to the next question if not answered in 10 seconds
    setTimeout(allFunctions, 1000 * 10);

});

//  Stop on click.
$("#c-text").on("click", function() {


    //let's see if we get it right 
    var c = quizQuestions[questionIndex].answers.c

    if (c === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        // Let's make pictures
        var imageB = $("<img>");
            imageB.addClass("dis-image");
            imageB.attr("src", "assets/images/Sebastian.jpg");
            $("#disneyImage").append(imageB);   
        
        //Reset and start new question, holds the image for 4 seconds      
        setTimeout(allFunctions, 1000 * 4);  

    }
    else {
        wrong++;
        $("#wrong-text").text(wrong);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        //make image of sad Mickey
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF); 


        //Reset and start new question, holds the image for 4 seconds      
        setTimeout(allFunctions, 1000 * 4);     
    };

    //moves on to the next question if not answered in 10 seconds
    setTimeout(allFunctions, 1000 * 10);

});


//  Stop on click.
$("#d-text").on("click", function() {

    //let's see if we get it right 
    var d = quizQuestions[questionIndex].answers.d

    if (d === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        // Let's make pictures
        var imageD = $("<img>");
            imageD.addClass("dis-image");
            imageD.attr("src", "assets/images/NewOrleans.jpg");
            $("#disneyImage").append(imageD);   

        
        //Reset and start new question, holds the image for 4 seconds       
        setTimeout(allFunctions, 1000 * 4);  

    }
    else {
        wrong++;
        $("#wrong-text").text(wrong);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        //make image of sad Mickey
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF); 


        //Reset and start new question, holds the image for 4 seconds       
        setTimeout(allFunctions, 1000 * 4);    
    };

    //moves on to the next question if not answered in 10 seconds
    setTimeout(allFunctions, 1000 * 10);

});

//  Stop on click.
$("#e-text").on("click", function() {

    //let's see if we get it right 
    var e = quizQuestions[questionIndex].answers.e

    if (e === quizQuestions[questionIndex].correctAnswer) {
        correct++;
        $("#correct-text").text(correct);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        // Let's make pictures
        var imageE = $("<img>");
            imageE.addClass("dis-image");
            imageE.attr("src", "assets/images/MagicCarpet.jpg");
            $("#disneyImage").append(imageE);   
       
        //stop the clock
        watch.stop();

        //Finish the game!
        document.querySelector("#question-text").innerHTML = "Game Over!";
        document.querySelector("#finalScore-text").innerHTML = correct + " out of " + quizQuestions.length;

    }
    else {
        wrong++;
        $("#wrong-text").text(wrong);

        //Empty the DIV for next detail
        $("#disneyImage").empty();

        //make image of sad Mickey
        var imageF = $("<img>");
            imageF.addClass("dis-image");
            imageF.attr("src", "assets/images/Mickey.jpg");
            $("#disneyImage").append(imageF); 

        //stop the clock
        watch.stop();

        //Finish the game!
        document.querySelector("#question-text").innerHTML = "Game Over!";
        document.querySelector("#finalScore-text").innerHTML = correct + " out of " + quizQuestions.length;

    };

    //stop the clock
    watch.stop();

    //Finish the game!
    document.querySelector("#question-text").innerHTML = "Game Over!";
    document.querySelector("#finalScore-text").innerHTML = correct + " out of " + quizQuestions.length;

  
});

//  reset stuff
$("#reset").on("click", function() {
    watch.reset();
    resetGame();
});
