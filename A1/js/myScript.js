//Gets all the demo elements by class (this is stored in an array)
const demoElements = document.getElementsByClassName("demos");

// Grab quiz elements by id
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitQuiz = document.getElementById('submitQuizButton');
// Turn the submit button into a button that runs the showResults function when clicked.
submitQuiz.addEventListener("click", showResults);

// Demo 2 Quiz questions
const myQuestions = [
  {
    question: "What is the rarest ore in Minecraft?",
    answers: {
      a: "Diamond ore",
      b: "Deepslate coal ore",
      c: "Deepslate emerald ore",
      d: "Lapis lazuli ore"
    },
    correctAnswer: "c"
  },
  {
    question: "Apart from carrots and golden carrots, which item can be used to breed rabbits in Minecraft?",
    answers: {
      a: "Seeds",
      b: "Grass",
      c: "Dandelions",
      d: "Wheat"
    },
    correctAnswer: "c"
  },
  {
    question: "How was the Minecraft creeper created?",
    answers: {
      a: "Skin error",
      b: "Cow error",
      c: "Pig error",
      d: "TNT error"
    },
    correctAnswer: "c"
  },
  {
    question: "In Minecraft, which of the following gives off the smallest light level",
    answers: {
        a: "Magma block",
        b: "Redstone torch",
        c: "Brown Mushroom",
        d: "TNT"
    },
    correctAnswer: "c"
 }
];

//When the button is clicked, it goes through each element in the array and resets them.
function showDemo(thisDemo) {
    for (let i = 0; i < demoElements.length; i++) {
        demoElements[i].style.display = "none";
    }
    //Then, depending on which button was pressed. The corresponding demo is displayed.
    switch (thisDemo) {
        case "demoButton1":
            document.getElementById("demo1").style.display = "block";
            break;
        case "demoButton2":
            document.getElementById("demo2").style.display = "block";
            buildQuiz();
            break;
        case "demoButton3":
            document.getElementById("demo3").style.display = "block";
            break;
        case "demoButton4":
            document.getElementById("demo4").style.display = "block";
            break;

    }
}

//There are two buttons, one for the html form and one for the google form. When one is pressed it displays that form and hides the other.
//I could use an else statement for this as there are only two options but eh this feels better.
function formButton(form) {
    if (form == "htmlButton") {
        document.getElementById("htmlForm").style.display = "block";
        document.getElementById("googleForm").style.display = "none";
    }
    else if (form == "googleButton") {
        document.getElementById("htmlForm").style.display = "none";
        document.getElementById("googleForm").style.display = "block";
    }
}

//Buttons for XML and RSS
function xml_rssButton(form) {
    if (form == "xmlButton") {
        document.getElementById("xmlRules").style.display = "block";
        document.getElementById("rssPage").style.display = "none";
    }
    else if (form == "rssButton") {
        document.getElementById("xmlRules").style.display = "none";
        document.getElementById("rssPage").style.display = "block";
    }
}



// Array of images
const images = ["images/analysis-1841158_1280.jpg", "images/apple-606761_1280.jpg", "images/calculator-2162153_1280.jpg", "images/coffee-2425303_1280.jpg", "images/iphone-1249733_1280.jpg"];

// Where the images go.
const autoSlideshow = document.getElementById("autoSlideshow");
const manSlideshow = document.getElementById("manSlideshow");

var slideIndex = 0; // Begin at index 0
var manSlideIndex = 0;

newSlide();

function newSlide() {
    const img = document.createElement('img');
    img.src = images[slideIndex]; // Create image at the specified index
    img.style.width = "auto";
    img.style.maxWidth = "1024px";
    img.style.height = "auto";
    img.style.maxHeight = "50vh";
    img.style.display = "block";
    img.style.margin = "auto";
    autoSlideshow.innerHTML = ""; // Clear current slideshow
    autoSlideshow.appendChild(img);

    // If it's at the end of the array go back to zero, otherwise move to the next index.
    if (slideIndex >= images.length - 1) {
        slideIndex = 0;
    }
    else slideIndex++;

    // Wait 2 seconds and then do it all again.
    setTimeout(newSlide, 2000)
}

manNewSlide(); // Create the first manual slide show (it will use the variable "manSlideIndex" which is 0)

function manSlideButton(button) {
  if (button == "manSlidePrev") {
    // If it's at the start of the array go back to the end, otherwise move to the previous index.
    if (manSlideIndex <= 0) {
        manSlideIndex = images.length - 1;
    }
    else manSlideIndex--;
  }
  else {
    // If it's at the end of the array go back to zero, otherwise move to the next index.
    if (manSlideIndex >= images.length - 1) {
        manSlideIndex = 0;
    }
    else manSlideIndex++;
  }
  manNewSlide();
}

// The new slide should be it's own separate function called by both a manual slide function and an automatic function. That was originally the intention but to avoid breaking the automatic slideshow, now that I'm doing the manual one I'm just going to give it its own function.
function manNewSlide() {
    const img = document.createElement('img');
    img.src = images[manSlideIndex]; // Create image at the specified index
    img.style.width = "auto";
    img.style.maxWidth = "1024px";
    img.style.height = "auto";
    img.style.maxHeight = "50vh";
    img.style.display = "block";
    img.style.margin = "auto";
    manSlideshow.innerHTML = ""; // Clear current slideshow
    manSlideshow.appendChild(img);
}









// Function to create the quiz for demo 2  
function buildQuiz(){
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  console.log(output);
  quizContainer.innerHTML = output.join('');
}

// Function for showing whether questions were answered correctly or not.
function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

/* The quiz is built when the demo2 button is selected.
    const variables like the one storing the questions are above the function that changes the demos to prevent Temporary Dead Zone errors
// Kick things off
buildQuiz();
*/

