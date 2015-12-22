var args = arguments[0] || {},

	// Drawer come from right or left
	direction = Ti.Locale.currentLanguage === 'ar' ? 'Right' : 'Left'

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

} else {
	//TODO: Android drawer
}
