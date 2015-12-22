var direction = Ti.Locale.currentLanguage === 'ar' ? 'Right' : 'Left'

function onItemClick(e) {
	switch (e.itemIndex) {
		case 0:
			Alloy.Globals.windowStack.open(Alloy.createController('home').getView(), Alloy.Globals.drawer);
			break;
		case 1:
			Alloy.Globals.windowStack.open(Alloy.createController('page1').getView(), Alloy.Globals.drawer);
			break;
		case 3:
			Alloy.Globals.drawer.close();
			break;
		default:
			Alloy.Globals.windowStack.open(Alloy.createController('page').getView());
	}

	var fn = 'toggle' + direction + 'Window';
	Alloy.Globals.drawer[fn]();
}
