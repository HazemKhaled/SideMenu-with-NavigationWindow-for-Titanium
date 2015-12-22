$.index.open();

function openHome() {
	// without open, drawer has to be opened after setting roles
	Alloy.createController('home_container').getView();
}

setTimeout(openHome, 1000);
