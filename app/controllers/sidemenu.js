var direction = Ti.Locale.currentLanguage === 'ar' ? 'Right' : 'Left'

function onItemClick(e) {

	var links = ['home', 'page1', 'page2', 'page3', 'page4'];

	switch (e.itemIndex) {
		case 0:
			Alloy.Globals.windowStack.open(Alloy.createController('home').getView(), Alloy.Globals.drawer);
			break;
		case 1:
			Alloy.Globals.windowStack.open(Alloy.createController('page1').getView(), Alloy.Globals.drawer);
			break;
		case 6:
			Alloy.Globals.drawer.close();
			break;
		default:
			console.log(links[e.itemIndex] || 'defaultPage', e.itemIndex);
	}

	var fn = 'toggle' + direction + 'Window';
	Alloy.Globals.drawer[fn]();
}
