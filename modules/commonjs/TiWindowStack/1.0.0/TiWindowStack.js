(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TiWindowStack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var a=typeof require=="function"&&require;if(!u&&a)return a.length===2?a(i,!0):a(i);if(s&&s.length===2)return s(i,!0);if(s)return s(i);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[i].exports}var i=Array.prototype.slice;Function.prototype.bind||Object.defineProperty(Function.prototype,"bind",{enumerable:!1,configurable:!0,writable:!0,value:function(e){function r(){return t.apply(this instanceof r&&e?this:e,n.concat(i.call(arguments)))}if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=this,n=i.call(arguments,1);return r.prototype=Object.create(t.prototype),r.prototype.contructor=r,r}});var s=typeof require=="function"&&require;for(var u=0;u<r.length;u++)o(r[u]);return o})({1:[function(require,module,exports){
(function (clearInterval,setInterval){
function WindowStack() {

	// The navigation object for iOS
	var navigationWindow = null,
		// Windows array for history pepuse
		windows = [],
		that = this,
		ANDROID = Ti.Platform.name === 'android',
		IOS = !ANDROID && (Ti.Platform.name === 'iPhone OS');

	this.setNavigationWindow = function(_navigationWindow) {
		navigationWindow = _navigationWindow;
	};

	this.open = function(_window, drawer) {

		if (IOS) {

			// Create navigationWindow if we don't have, or if we have side menu
			if (navigationWindow === null || drawer) {
				navigationWindow = Ti.UI.iOS.createNavigationWindow({
					window: _window
				});

				if (drawer) {
					drawer.setCenterWindow(navigationWindow);
				} else {
					navigationWindow.open();
				}

				// Reset our local stack refrance
				windows = [];
			} else {

				// Or just push new window to the stack
				navigationWindow.openWindow(_window);

				// Add this window to my stack refrance
				windows.push(_window);
			}
		} else {

			if (drawer) {
				// Extend some properties to drawer containner
				_.extend(drawer.window, _.pick(_window, ['title', 'keepScreenOn', 'exitOnClose']));

				// Since android center item is view not a window, we have to fire it ourselves
				_window.fireEvent('open');

				drawer.setCenterWindow(_window);

				// Reset our local stack refrance
				windows = [];
			} else {
				_window.open();

				// Add this window to my stack refrance
				windows.push(_window);
			}
		}

		// On close the window update the windows array
		_window.addEventListener('close', function() {
			windows = _.without(windows, _window);
		});
	};

	this.close = function(_window) {

		if (IOS) {
			navigationWindow.closeWindow(_window);
		} else {
			_window.close();
		}
	};

	this.back = function() {
		// Get last window in the stack
		var _window = _.last(windows);

		// In case assign this function directly to UI item, this will pass to the UI item it self, better use that
		that.close(_window);
	};

	this.home = function() {
		var lastLength = windows.length,
			interval;

		Alloy.Globals.homeInterval = interval = setInterval(function() {
			if (lastLength === windows.length) {
				Alloy.Globals.windowStack.back();
				lastLength--;

				if (lastLength === 0 ||
					// Center window is actually view on Android
					windows[lastLength - 1].apiName === 'View') {

					clearInterval(Alloy.Globals.homeInterval);
				}
			}
		}, 100);
	};

	// Close all screens, close the navigationWindow
	this.destroy = function() {
		if (IOS) {
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

}).call(this,require("--timers--").clearInterval,require("--timers--").setInterval)
},{"--timers--":3}],2:[function(require,module,exports){

module.exports = (function () { return this; })();

module.exports.location = {};

},{}],3:[function(require,module,exports){
(function (global){

module.exports.clearInterval = clearInterval;
module.exports.clearTimeout = clearTimeout;
module.exports.setInterval = setInterval;
module.exports.setTimeout = setTimeout;

// See https://html.spec.whatwg.org/multipage/webappapis.html#dom-windowtimers-cleartimeout

function clearInterval(intervalId) {
  try {
    return global.clearInterval(intervalId);
  }
  catch (e) {
    // Do nothing
    return undefined;
  }
}

function clearTimeout(timeoutId) {
  try {
    return global.clearTimeout(timeoutId);
  }
  catch (e) {
    // Do nothing
    return undefined;
  }
}

function setInterval(func, delay) {
  var args = [];
  for (var i = 2, l = arguments.length; i < l; ++i) {
    args[ i - 2 ] = arguments[ i ];
  }

  return global.setInterval(function () {
    func.apply(this, args);
  }, +delay);
}

function setTimeout(func, delay) {
  var args = [];
  for (var i = 2, l = arguments.length; i < l; ++i) {
    args[ i - 2 ] = arguments[ i ];
  }

  return global.setTimeout(function () {
    func.apply(this, args);
  }, +delay);
}

}).call(this,require("--global--"))
},{"--global--":2}]},{},[1])(1)
});
