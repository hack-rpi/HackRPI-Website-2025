$(function () {
	var availableTags = ["apple", "banana", "grape", "orange"];

	$("#tags").autocomplete({
		source: availableTags,
		select: function (event, ui) {
			// Redirect the user based on the selected item
			var selectedItem = ui.item.value;
			redirectUser(selectedItem);
		},
	});

	// Add Enter key functionality
	$("#tags").on("keydown", function (event) {
		if (event.key === "Enter") {
			var inputText = $(this).val().trim(); // Get the entered text
			redirectUser(inputText); // Directly call redirectUser
		}
	});

	function redirectUser(selectedItem) {
		// Normalize the input to lowercase
		selectedItem = selectedItem.trim().toLowerCase();
		// Define the URLs or actions based on the selected item
		var redirectUrls = {
			apple: "http://example/apple.html",
			banana: "http://example/banana.html",
			grape: "http://example/grape.html",
			orange: "http://example/orange.html",
		};

		// Get the URL for the selected item
		var url = redirectUrls[selectedItem];

		// Redirect the user if the URL exists
		if (url) {
			window.location.href = url;
		} else {
			alert("No redirect URL found for '" + selectedItem + "'");
		}
	}
});
