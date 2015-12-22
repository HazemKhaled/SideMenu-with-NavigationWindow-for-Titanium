function WindowStack() {

	// The navigation object for iOS
	var navigationWindow = null,
		// Windows array for history pepuse
		windows = [];

	this.setNavigationWindow = function(_navigationWindow) {
		navigationWindow = _navigationWindow;
	}

	this.open = function(_window, drawer) {

		windows.push(_window);

		if (OS_IOS) {

			// Create navigationWindow if we don't have
			if (navigationWindow === null || drawer) {
				navigationWindow = Ti.UI.iOS.createNavigationWindow({
					window: _window
				});

				if (drawer) {
					drawer.setCenterWindow(navigationWindow);
				} else {
					navigationWindow.open();
				}
			} else {

				// Or just push new window to the stack
				navigationWindow.openWindow(_window);
			}
		} else {

			if (drawer) {

				_.extend(drawer.window, _.pick(_window, ['title', 'keepScreenOn', 'exitOnClose']));

				drawer.setCenterWindow(_window);
			} else {
				_window.open();
			}
		}

		// On close the window update the windows array
		_window.addEventListener('close', function() {
			windows = _.without(windows, _window);
		});
	};

	this.close = function(_window) {

		if (OS_IOS) {
			navigationWindow.closeWindow(_window);
		} else if (OS_MOBILEWEB) {
			navigationWindow.close(_window);
		} else {
			_window.close();
		}
	};

	this.back = function() {
		// Get last window in the stack
		var _window = _.last(windows);
		this.close(_window);
	};

	this.home = function() {
		var lastLength = windows.length,
			i = 0;

		Alloy.Globals.homeInterval = interval = setInterval(function() {
			if (lastLength === windows.length) {
				Alloy.Globals.windowStack.back();
				lastLength--;

				if ((OS_IOS && lastLength === 1) || (OS_ANDROID && lastLength === 0)) {
					clearInterval(Alloy.Globals.homeInterval);
				}
			}
		}, 100);
	};

	// Close all screens, close the navigationWindow
	this.destroy = function() {
		if (OS_IOS) {
			navigationWindow.close();
		} else {
			_.each(windows, function(_window) {
				_window.close();
			});
		}
	};

}

// Return new instance
exports.createWindowStack = function() {
	return new WindowStack();
};
