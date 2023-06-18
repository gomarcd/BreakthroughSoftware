const navMenu = () => {
	const navLinks = document.getElementById("navLinks");
	const hamburger = document.querySelector(".hamburger");

	if (navLinks.style.display === "none") {
		hamburger.classList.toggle("active");
		navLinks.style.display = "flex";
	} else {
		hamburger.classList.remove("active");
		navLinks.style.display = "none";
	}
};
