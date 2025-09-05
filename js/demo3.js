//Data: Assume we have a list of existing comments stored in an array "allComments"
// These were stored in an object which is way nicer, but I got confused trying to grab from them so I turned it into an array which is actually less easy to read but I knew how to grab them.

/*let allComments = [
 {name: "Ian", comment: "Recommended, good one"},
 {name: "Aman", comment: "I don't like the color"},
 {name: "John", comment: "Love it"},
];*/

let allComments = [
  ["Sabian", "Never owned one."],
  ["Aman", "I don't like the colour"],
  ["John", "Get it in a different colour then stupid"]
];

document.getElementById('postCommentButton').addEventListener('input', postComment);

loadComments();

function loadComments() {

  let commentToAdd;

  //For each name and comment,
  for (let i = 0; i < allComments.length; i++) {
    commentToAdd = allComments[i][0] + ": " + allComments[i][1]; // create a variable that will be "name: comment......."

    addComment(commentToAdd);
  }
}

function addComment(theComment) {
  // Create a p element:
  const para = document.createElement("p");

    // Create a text node:
    const node = document.createTextNode(theComment);


    // Append text node to the p element:
    para.appendChild(node);

    document.getElementById("comments").appendChild(para);
}



// So this isn't working because it refreshes the page which resets everything.
function postComment() {
  const newName = document.getElementById("nameComment").value;
  const newComment = document.getElementById("commentComment").value;

  let newPostComment = newName + ": " + newComment;
  addComment(newPostComment);
}