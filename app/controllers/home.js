// Drawer come from right or left
var direction = Ti.Locale.currentLanguage === 'ar' ? 'Right' : 'Left';

function openPage1() {
	Alloy.Globals.windowStack.open(Alloy.createController('page').getView());
}

function toggle() {
	var fn = 'toggle' + direction + 'Window';
	Alloy.Globals.drawer[fn]();
}

if (OS_IOS) {

	var navButton = Ti.UI.createButton({
		title: 'Menu'
	});
	navButton.addEventListener('click', toggle);

	$.home[direction + 'NavButton'] = navButton;
}

$.home.onCreateOptionsMenu = function(e) {

	// Clean up all items from any other controller
	e.menu.clear();

	// Add our items
	var menuItem = e.menu.add({
		title: "Add Task"
	});
	menuItem.addEventListener("click", function() {
		alert("Let's add it");
	});

	// SearchView
	var searchView = Ti.UI.Android.createSearchView({
		hintText: "Search here ..."
	});

	searchView.addEventListener('submit', function(e) {
		alert('Search for: ' + e.source.value);
	});

	e.menu.add({
		title: 'Search',
		showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
		actionView: searchView
	});
};
