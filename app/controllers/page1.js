function openPage1() {
	Alloy.Globals.windowStack.open(Alloy.createController('page').getView());
}

$.page1.onCreateOptionsMenu = function(e) {
	// Clean up all items from any other controller
	e.menu.clear();

	// Add our items
	var menuItem = e.menu.add({
		title: "Button",
		showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
	});
	menuItem.addEventListener("click", function() {
		alert("Hey another button");
	});
};
