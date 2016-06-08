(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("react-redux"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "react-redux", "redux"], factory);
	else if(typeof exports === 'object')
		exports["ReactUI"] = factory(require("immutable"), require("react"), require("react-redux"), require("redux"));
	else
		root["ReactUI"] = factory(root["Immutable"], root["React"], root["ReactRedux"], root["Redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reducer = undefined;

	var _ui = __webpack_require__(3);

	var _ui2 = _interopRequireDefault(_ui);

	var _actionReducer = __webpack_require__(2);

	var _actionReducer2 = _interopRequireDefault(_actionReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _ui2.default;
	exports.reducer = _actionReducer2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reducerEnhancer = exports.defaultState = exports.SET_DEFAULT_UI_STATE = exports.UPDATE_UI_STATE = exports.MASS_UPDATE_UI_STATE = undefined;
	exports.default = reducer;
	exports.updateUI = updateUI;
	exports.massUpdateUI = massUpdateUI;
	exports.setDefaultUI = setDefaultUI;
	exports.unmountUI = unmountUI;
	exports.mountUI = mountUI;

	var _immutable = __webpack_require__(5);

	var _invariant = __webpack_require__(1);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// For updating multiple UI variables at once.  Each variable might be part of
	// a different context; this means that we need to either call updateUI on each
	// key of the object to update or do transformations within one action in the
	// reducer. The latter only triggers one store change event and is more
	// performant.
	var MASS_UPDATE_UI_STATE = exports.MASS_UPDATE_UI_STATE = '@@redux-ui/MASS_UPDATE_UI_STATE';
	var UPDATE_UI_STATE = exports.UPDATE_UI_STATE = '@@redux-ui/UPDATE_UI_STATE';
	var SET_DEFAULT_UI_STATE = exports.SET_DEFAULT_UI_STATE = '@@redux-ui/SET_DEFAULT_UI_STATE';

	// These are private consts used in actions only given to the UI decorator.
	var MOUNT_UI_STATE = '@@redux-ui/MOUNT_UI_STATE';
	var UNMOUNT_UI_STATE = '@@redux-ui/UNMOUNT_UI_STATE';

	var defaultState = exports.defaultState = new _immutable.Map({
	  __reducers: new _immutable.Map({
	    // This contains a map of component paths (joined by '.') to an object
	    // containing the fully qualified path and the reducer function:
	    // 'parent.child': {
	    //   path: ['parent', 'child'],
	    //   func: (state, action) => { ... }
	    // }
	  })
	});

	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
	  var action = arguments[1];

	  var key = action.payload && (action.payload.key || []);

	  if (!Array.isArray(key)) {
	    key = [key];
	  }

	  switch (action.type) {
	    case UPDATE_UI_STATE:
	      var _action$payload = action.payload;
	      var name = _action$payload.name;
	      var value = _action$payload.value;

	      state = state.setIn(key.concat(name), value);
	      break;

	    case MASS_UPDATE_UI_STATE:
	      var _action$payload2 = action.payload;
	      var uiVars = _action$payload2.uiVars;
	      var transforms = _action$payload2.transforms;

	      state = state.withMutations(function (s) {
	        Object.keys(transforms).forEach(function (k) {
	          var path = uiVars[k];
	          (0, _invariant2.default)(path, 'Couldn\'t find variable ' + k + ' within your component\'s UI state ' + ('context. Define ' + k + ' before using it in the @ui decorator'));

	          s.setIn(path.concat(k), transforms[k]);
	        });
	      });
	      break;

	    case SET_DEFAULT_UI_STATE:
	      // Replace all UI under a key with the given values
	      state = state.setIn(key, new _immutable.Map(action.payload.value));
	      break;

	    case MOUNT_UI_STATE:
	      var _action$payload3 = action.payload;
	      var defaults = _action$payload3.defaults;
	      var customReducer = _action$payload3.customReducer;

	      state = state.withMutations(function (s) {
	        // Set the defaults for the component
	        s.setIn(key, new _immutable.Map(defaults));

	        // If this component has a custom reducer add it to the list.
	        // We store the reducer func and UI path for the current component
	        // inside the __reducers map.
	        if (customReducer) {
	          var path = key.join('.');
	          s.setIn(['__reducers', path], {
	            path: key,
	            func: customReducer
	          });
	        }

	        return s;
	      });
	      break;

	    case UNMOUNT_UI_STATE:
	      // We have to use deleteIn as react unmounts root components first;
	      // this means that using setIn in child contexts will fail as the root
	      // context will be stored as undefined in our state
	      state = state.withMutations(function (s) {
	        s.deleteIn(key);
	        // Remove any custom reducers
	        s.deleteIn(['__reducers', key.join('.')]);
	      });
	      break;
	  }

	  var customReducers = state.get('__reducers');
	  if (customReducers.size > 0) {
	    state = state.withMutations(function (mut) {
	      customReducers.forEach(function (r) {
	        // This calls each custom reducer with the UI state for each custom
	        // reducer with the component's UI state tree passed into it.
	        //
	        // NOTE: Each component's reducer gets its own UI state: not the entire
	        // UI reducer's state. Whatever is returned from this reducer is set
	        // within the **components** UI scope.
	        //
	        // This is because it's the only way to update UI state for components
	        // without keys - you need to know the path in advance to update state
	        // from a reducer.  If you have list of components with no UI keys in
	        // the component heirarchy, any children will not be able to use custom
	        // reducers as the path is random.
	        //
	        // TODO: Potentially add the possibility for a global UI state reducer?
	        //       Though why wouldn't you just add a custom reducer to the
	        //       top-level component?
	        var path = r.path;
	        var func = r.func;

	        var newState = func(mut.getIn(path), action);
	        if (newState === undefined) {
	          throw new Error('Your custom UI reducer at path ' + path.join('.') + ' must return some state');
	        }
	        mut.setIn(path, newState);
	      });
	      return mut;
	    });
	  }

	  return state;
	}

	var reducerEnhancer = exports.reducerEnhancer = function reducerEnhancer(customReducer) {
	  return function (state, action) {
	    state = reducer(state, action);
	    if (typeof customReducer === 'function') {
	      state = customReducer(state, action);
	    }
	    return state;
	  };
	};

	function updateUI(key, name, value) {
	  return {
	    type: UPDATE_UI_STATE,
	    payload: {
	      key: key,
	      name: name,
	      value: value
	    }
	  };
	};

	function massUpdateUI(uiVars, transforms) {
	  return {
	    type: MASS_UPDATE_UI_STATE,
	    payload: {
	      uiVars: uiVars,
	      transforms: transforms
	    }
	  };
	}

	// Exposed to components, allowing them to reset their and all child scopes to
	// the default variables set up
	function setDefaultUI(key, value) {
	  return {
	    type: SET_DEFAULT_UI_STATE,
	    payload: {
	      key: key,
	      value: value
	    }
	  };
	};

	/** Private, decorator only actions **/

	// This is not exposed to your components; it's only used in the decorator.
	function unmountUI(key) {
	  return {
	    type: UNMOUNT_UI_STATE,
	    payload: {
	      key: key
	    }
	  };
	};

	/**
	 * Given the key/path, set of defaults and custom reducer for a UI component
	 * during construction prepare the state of the UI reducer
	 *
	 */
	function mountUI(key, defaults, customReducer) {
	  return {
	    type: MOUNT_UI_STATE,
	    payload: {
	      key: key,
	      defaults: defaults,
	      customReducer: customReducer
	    }
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = ui;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(8);

	var _reactRedux = __webpack_require__(7);

	var _invariant = __webpack_require__(1);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _actionReducer = __webpack_require__(2);

	var _utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var any = _react.PropTypes.any;
	var array = _react.PropTypes.array;
	var func = _react.PropTypes.func;
	var node = _react.PropTypes.node;
	var object = _react.PropTypes.object;
	var string = _react.PropTypes.string;
	function ui(key) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	    opts = key;
	    key = opts.key;
	  }

	  var connector = (0, _reactRedux.connect)(function (state) {
	    return { ui: (0, _utils.getUIState)(state) };
	  }, function (dispatch) {
	    return (0, _redux.bindActionCreators)({
	      updateUI: _actionReducer.updateUI,
	      massUpdateUI: _actionReducer.massUpdateUI,
	      setDefaultUI: _actionReducer.setDefaultUI,
	      mountUI: _actionReducer.mountUI,
	      unmountUI: _actionReducer.unmountUI
	    }, dispatch);
	  },
	  // These allow you to pass 'mergeProps' and 'options' keys into the
	  // UI decorator's options which will be passed to @connect().
	  // TODO: Document
	  opts.mergeProps, opts.options);

	  return function (WrappedComponent) {
	    var _class, _temp;

	    // Return a parent UI class which scopes all UI state to the given key
	    return connector((
	    /**
	     * UI is a wrapper component which:
	     *   1. Inherits any parent scopes from parent components that are wrapped
	     *      by @UI
	     *   2. Sets up a new UI scope for the current component
	     *   3. Merges the current UI scope into the parent UI scope (where the
	     *      current scope takes precedence over parents)
	     *
	     * This allows normal block-scoping of UI state:
	     *
	     *   1. All UI components must define their local state keys
	     *   2. Upon updating a state key, if it's not in the current scope
	     *      walk up the tree until the variable is set
	     *
	     * This means that any child component can affect the current browser
	     * chrome's UI state whilst maintaining their own local UI state.
	     *
	     * All state will be blown away on navigation by default.
	     */
	    _temp = _class = function (_Component) {
	      _inherits(UI, _Component);

	      function UI(props, ctx, queue) {
	        _classCallCheck(this, UI);

	        // If the key is undefined generate a new random hex key for the
	        // current component's UI scope.
	        //
	        // We do this in construct() to guarantee a new key at component
	        // instantiation time wihch is needed for iterating through a list of
	        // components with no explicit key

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UI).call(this, props, ctx, queue));

	        if (key === undefined) {
	          _this.key = (WrappedComponent.displayName || WrappedComponent.name) + Math.floor(Math.random() * (1 << 30)).toString(16);
	        } else {
	          _this.key = key;
	        }

	        // Immediately set this.uiPath and this.uiVars based on the incoming
	        // context in class instantiation
	        _this.getMergedContextVars(ctx);
	        return _this;
	      }

	      // Pass these down in the new context created for this component


	      // Get the existing context from a UI parent, if possible


	      _createClass(UI, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          // If the component's UI subtree doesn't exist and we have state to
	          // set ensure we update our global store with the current state.
	          if (this.props.ui.getIn(this.uiPath) === undefined && opts.state) {
	            var state = this.getDefaultUIState(opts.state);
	            this.context.store.dispatch((0, _actionReducer.mountUI)(this.uiPath, state, opts.reducer));
	          }
	        }

	        // When a parent context calls resetUI it blows away the entire subtree
	        // that any child contexts may store state in.
	        //
	        // We may need to restore default props for this component if a parent
	        // has blown away our state.

	      }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	          // We can only see if this component's state is blown away by
	          // accessing the current global UI state; the parent will not
	          // necessarily always pass down child state.
	          var ui = (0, _utils.getUIState)(this.context.store.getState());
	          if (ui.getIn(this.uiPath) === undefined && opts.state) {
	            var state = this.getDefaultUIState(opts.state, nextProps);
	            this.props.setDefaultUI(this.uiPath, state);
	          }
	        }

	        // Get default state by evaluating any functions passed in to the state
	        // opts.
	        // This is also used within componentWilLReceiveProps and so props
	        // also needs to be passed in

	      }, {
	        key: 'getDefaultUIState',
	        value: function getDefaultUIState(uiState) {
	          var _this2 = this;

	          var props = arguments.length <= 1 || arguments[1] === undefined ? this.props : arguments[1];

	          var globalState = this.context.store.getState();
	          var state = _extends({}, uiState);
	          Object.keys(state).forEach(function (k) {
	            if (typeof state[k] === 'function') {
	              state[k] = state[k](_this2.props, globalState);
	            }
	          });
	          return state;
	        }

	        // Blow away all UI state for this component key by setting the
	        // state for this key to undefined. This will get reset to the
	        // default state in componentWillMount in the future.
	        //
	        // We use requestAnimationFrame because `@ui()` can be combined with
	        // with `@connect()`; if the connect decorator uses selectors based on
	        // UI state (such as live filtering) the connect decorator will receive
	        // `undefined` as `this.props.ui` before unmounting.
	        //
	        // requestAnimationFrame avoids this.

	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          var _this3 = this;

	          if (opts.persist !== true) {
	            if (window && window.requestAnimationFrame) {
	              window.requestAnimationFrame(function () {
	                return _this3.props.unmountUI(_this3.uiPath);
	              });
	            } else {
	              this.props.unmountUI(this.uiPath);
	            }
	          }
	        }

	        // Sets this.uiVars && this.uiPath.
	        //
	        // Merges this UI context's variables with any parent context's
	        // variables defined in uiVars.

	      }, {
	        key: 'getMergedContextVars',
	        value: function getMergedContextVars() {
	          var _this4 = this;

	          var ctx = arguments.length <= 0 || arguments[0] === undefined ? this.context : arguments[0];

	          if (!this.uiVars || !this.uiPath) {
	            var uiPath = ctx.uiPath || [];
	            this.uiPath = uiPath.concat(this.key);

	            // Keep trackof each UI variable and which path it should be set in
	            var state = opts.state || {};
	            this.uiVars = _extends({}, ctx.uiVars) || {};
	            Object.keys(state).forEach(function (k) {
	              return _this4.uiVars[k] = _this4.uiPath;
	            }, this);
	          }

	          return [this.uiVars, this.uiPath];
	        }

	        // Construct a new context for all child UI components. We need to merge
	        // in the vars defined in opts.state to uiVars to explicitly state that
	        // this context is in charge of those variables.
	        //
	        // Pass the uiKey and partially applied updateUI function to all
	        // child components that are wrapped in a plain `@ui()` decorator

	      }, {
	        key: 'getChildContext',
	        value: function getChildContext() {
	          var _getMergedContextVars = this.getMergedContextVars();

	          var _getMergedContextVars2 = _slicedToArray(_getMergedContextVars, 2);

	          var uiVars = _getMergedContextVars2[0];
	          var uiPath = _getMergedContextVars2[1];


	          return {
	            uiKey: this.key,
	            uiVars: uiVars,
	            uiPath: uiPath,

	            updateUI: this.updateUI.bind(this),
	            resetUI: this.resetUI.bind(this)
	          };
	        }

	        // Helper function to reset UI for the current context **and all child
	        // scopes**.
	        //
	        // This is the same as exiting scope in programming; all variables
	        // defined within the scope are reset.

	      }, {
	        key: 'resetUI',
	        value: function resetUI() {
	          this.props.setDefaultUI(this.uiPath, this.getDefaultUIState(opts.state));
	          // TODO: Wipe all child contexts
	        }
	      }, {
	        key: 'updateUI',
	        value: function updateUI(name, value) {
	          // Get a list of all UI variables available to this context (which

	          var _getMergedContextVars3 = this.getMergedContextVars();

	          var _getMergedContextVars4 = _slicedToArray(_getMergedContextVars3, 1);

	          var uiVars = _getMergedContextVars4[0];

	          var uiVarPath = uiVars[name];

	          if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' && value === undefined) {
	            // We're mass updating many UI variables. These may or may not be
	            // directly controlled by our context, so we delegate to the
	            // reducer which will deeply set each variable according to its
	            // uiPath (from uiVars).
	            //
	            // Doing this means we only trigger one store update.
	            this.props.massUpdateUI(this.uiVars, name);
	            return;
	          }

	          (0, _invariant2.default)(uiVarPath, 'The \'' + name + '\' UI variable is not defined in the UI context in "' + (WrappedComponent.displayName || WrappedComponent.name) + '" ' + 'or any parent UI context. Set this variable using the "state" ' + 'option in the @ui decorator before using it.');

	          this.props.updateUI(uiVarPath, name, value);
	        }

	        // Iterate through the list of contexts merging in UI variables from the
	        // UI store

	      }, {
	        key: 'mergeUIProps',
	        value: function mergeUIProps() {
	          var _this5 = this;

	          // WARNING: React has a subtle componentWillMount bug which we're
	          // working around here!
	          //
	          // ## React bug
	          //
	          // On the first *ever* render of this component we set defaults in
	          // componentWillMount. This works; when `render()` is called the
	          // wrapped component has the default props within this.props.ui
	          //
	          // BUT.  Unmount, navigate away then return to this component.  When
	          // componentWillMount is called a *second* time, we call updateUI to
	          // set default props. **These aren't passed in to render() until the
	          // component is mounted a second time**. Even though it worked first
	          // time. And even though this is a new instance of the component.
	          //
	          // ## Workaround.
	          //
	          // Instead of relying on this.props.ui from our connector we call
	          // getState() in the store directly here. We guarantee that this will
	          // be the latest set of props, including default props set in
	          // componentWillMount.
	          //
	          // We still use @connect() to connect to the store and listen for
	          // changes in other cases.
	          var ui = (0, _utils.getUIState)(this.context.store.getState());

	          return Object.keys(this.uiVars).reduce(function (props, k) {
	            props[k] = ui.getIn(_this5.uiVars[k].concat(k));
	            return props;
	          }, {}) || {};
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
	            uiKey: this.key,
	            uiPath: this.uiPath,
	            ui: this.mergeUIProps(),
	            resetUI: this.resetUI.bind(this),
	            updateUI: this.updateUI.bind(this) }));
	        }
	      }]);

	      return UI;
	    }(_react.Component), _class.propTypes = {
	      // The entire global UI state via react-redux connector
	      ui: object.isRequired,
	      // These actions are passed via react-redux connector
	      setDefaultUI: func.isRequired,
	      updateUI: func.isRequired,
	      massUpdateUI: func.isRequired
	    }, _class.childContextTypes = {
	      // uiKey is the name of the parent context's key
	      uiKey: string,
	      // uiPath is the current path of the UI context
	      uiPath: array,
	      // uiVars is a map of UI variable names stored in state to the parent
	      // context which controls them.
	      uiVars: object,

	      // Actions to pass to children
	      updateUI: func,
	      resetUI: func
	    }, _class.contextTypes = {
	      // This is used in mergeUIProps and construct() to immediately set
	      // props.
	      store: any,

	      uiKey: string,
	      uiPath: array,
	      uiVars: object,

	      updateUI: func,
	      resetUI: func
	    }, _temp));
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * getUIState inspects redux' global state store and returns the UI state node.
	 *
	 * This checks to see whether state is an immutable map or a POJO.
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getUIState = exports.getUIState = function getUIState(state) {
	  if (typeof state.get === 'function') {
	    return state.get('ui');
	  }
	  return state.ui;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;