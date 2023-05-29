const navMenu = () => {
	var navLinks = document.getElementById("navLinks");
	if (navLinks.style.display === "none") {
		navLinks.style.display = "flex";
	} else {
		navLinks.style.display = "none";
	}
};
