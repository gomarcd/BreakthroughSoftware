// Get all the question and answer elements
const questionElements = document.querySelectorAll(".question");
const answerElements = document.querySelectorAll(".answer");
const plusIcons = document.querySelectorAll(".question svg:first-child");
const minusIcons = document.querySelectorAll(".question svg:last-child");

// Hide all the answer elements by default
answerElements.forEach(function (answerElement) {
	answerElement.classList.add("hidden");
});

// Add a click event listener to each question element
questionElements.forEach(function (questionElement, index) {
	questionElement.addEventListener("click", function () {
		// Toggle the visibility of the corresponding answer
		answerElements[index].classList.toggle("hidden");

		// Toggle the plus and minus icons
		plusIcons[index].classList.toggle("hidden");
		minusIcons[index].classList.toggle("hidden");
	});
});
