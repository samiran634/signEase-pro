var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS((exports, module) => {
  (function() {
    function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function() {
          console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
        }
      });
    }
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    function warnNoop(publicInstance, callerName) {
      publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
      var warningKey = publicInstance + "." + callerName;
      didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
    }
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
      self = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (self !== undefined ? self : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      newKey = ReactElement(oldElement.type, newKey, undefined, undefined, oldElement._owner, oldElement.props, oldElement._debugStack, oldElement._debugTask);
      oldElement._store && (newKey._store.validated = oldElement._store.validated);
      return newKey;
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    function getElementKey(element, index) {
      return typeof element === "object" && element !== null && element.key != null ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function noop$1() {}
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch (typeof thenable.status === "string" ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
            thenable.status === "pending" && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          }, function(error) {
            thenable.status === "pending" && (thenable.status = "rejected", thenable.reason = error);
          })), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if (type === "undefined" || type === "boolean")
        children = null;
      var invokeCallback = false;
      if (children === null)
        invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
            }
        }
      if (invokeCallback) {
        invokeCallback = children;
        callback = callback(invokeCallback);
        var childKey = nameSoFar === "" ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
        isArrayImpl(callback) ? (escapedPrefix = "", childKey != null && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : callback != null && (isValidElement(callback) && (callback.key != null && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (callback.key == null || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), nameSoFar !== "" && invokeCallback != null && isValidElement(invokeCallback) && invokeCallback.key == null && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
        return 1;
      }
      invokeCallback = 0;
      childKey = nameSoFar === "" ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0;i < children.length; i++)
          nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (i = getIteratorFn(children), typeof i === "function")
        for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true), children = i.call(children), i = 0;!(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (type === "object") {
        if (typeof children.then === "function")
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
        array = String(children);
        throw Error("Objects are not valid as a React child (found: " + (array === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (children == null)
        return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (payload._status === -1) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(function(moduleObject) {
          if (payload._status === 0 || payload._status === -1)
            payload._status = 1, payload._result = moduleObject;
        }, function(error) {
          if (payload._status === 0 || payload._status === -1)
            payload._status = 2, payload._result = error;
        });
        payload._status === -1 && (payload._status = 0, payload._result = ctor);
      }
      if (payload._status === 1)
        return ctor = payload._result, ctor === undefined && console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ctor), "default" in ctor || console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ctor), ctor.default;
      throw payload._result;
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      dispatcher === null && console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return dispatcher;
    }
    function noop() {}
    function enqueueTask(task) {
      if (enqueueTaskImpl === null)
        try {
          var requireString = ("require" + Math.random()).slice(0, 7);
          enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
        } catch (_err) {
          enqueueTaskImpl = function(callback) {
            didWarnAboutMessageChannel === false && (didWarnAboutMessageChannel = true, typeof MessageChannel === "undefined" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var channel = new MessageChannel;
            channel.port1.onmessage = callback;
            channel.port2.postMessage(undefined);
          };
        }
      return enqueueTaskImpl(task);
    }
    function aggregateErrors(errors) {
      return 1 < errors.length && typeof AggregateError === "function" ? new AggregateError(errors) : errors[0];
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
      prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
      actScopeDepth = prevActScopeDepth;
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
      var queue = ReactSharedInternals.actQueue;
      if (queue !== null)
        if (queue.length !== 0)
          try {
            flushActQueue(queue);
            enqueueTask(function() {
              return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            });
            return;
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
        else
          ReactSharedInternals.actQueue = null;
      0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
    }
    function flushActQueue(queue) {
      if (!isFlushing) {
        isFlushing = true;
        var i = 0;
        try {
          for (;i < queue.length; i++) {
            var callback = queue[i];
            do {
              ReactSharedInternals.didUsePromise = false;
              var continuation = callback(false);
              if (continuation !== null) {
                if (ReactSharedInternals.didUsePromise) {
                  queue[i] = callback;
                  queue.splice(0, i);
                  return;
                }
                callback = continuation;
              } else
                break;
            } while (1);
          }
          queue.length = 0;
        } catch (error) {
          queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
        } finally {
          isFlushing = false;
        }
      }
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function(publicInstance) {
        warnNoop(publicInstance, "forceUpdate");
      },
      enqueueReplaceState: function(publicInstance) {
        warnNoop(publicInstance, "replaceState");
      },
      enqueueSetState: function(publicInstance) {
        warnNoop(publicInstance, "setState");
      }
    }, assign = Object.assign, emptyObject = {};
    Object.freeze(emptyObject);
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null)
        throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    var deprecatedAPIs = {
      isMounted: [
        "isMounted",
        "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
      ],
      replaceState: [
        "replaceState",
        "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
      ]
    }, fnName;
    for (fnName in deprecatedAPIs)
      deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    ComponentDummy.prototype = Component.prototype;
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy;
    deprecatedAPIs.constructor = PureComponent;
    assign(deprecatedAPIs, Component.prototype);
    deprecatedAPIs.isPureReactComponent = true;
    var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
      H: null,
      A: null,
      T: null,
      S: null,
      V: null,
      actQueue: null,
      isBatchingLegacy: false,
      didScheduleLegacyUpdate: false,
      didUsePromise: false,
      thrownErrors: [],
      getCurrentStack: null,
      recentlyCreatedOwnerStacks: 0
    }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    deprecatedAPIs = {
      "react-stack-bottom-frame": function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = deprecatedAPIs["react-stack-bottom-frame"].bind(deprecatedAPIs, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = typeof queueMicrotask === "function" ? function(callback) {
      queueMicrotask(function() {
        return queueMicrotask(callback);
      });
    } : enqueueTask;
    deprecatedAPIs = Object.freeze({
      __proto__: null,
      c: function(size) {
        return resolveDispatcher().useMemoCache(size);
      }
    });
    exports.Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
    };
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = deprecatedAPIs;
    exports.act = function(callback) {
      var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
      actScopeDepth++;
      var queue = ReactSharedInternals.actQueue = prevActQueue !== null ? prevActQueue : [], didAwaitActCall = false;
      try {
        var result = callback();
      } catch (error) {
        ReactSharedInternals.thrownErrors.push(error);
      }
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
      if (result !== null && typeof result === "object" && typeof result.then === "function") {
        var thenable = result;
        queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
        });
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            thenable.then(function(returnValue) {
              popActScope(prevActQueue, prevActScopeDepth);
              if (prevActScopeDepth === 0) {
                try {
                  flushActQueue(queue), enqueueTask(function() {
                    return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  });
                } catch (error$0) {
                  ReactSharedInternals.thrownErrors.push(error$0);
                }
                if (0 < ReactSharedInternals.thrownErrors.length) {
                  var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                  ReactSharedInternals.thrownErrors.length = 0;
                  reject(_thrownError);
                }
              } else
                resolve(returnValue);
            }, function(error) {
              popActScope(prevActQueue, prevActScopeDepth);
              0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
            });
          }
        };
      }
      var returnValue$jscomp$0 = result;
      popActScope(prevActQueue, prevActScopeDepth);
      prevActScopeDepth === 0 && (flushActQueue(queue), queue.length !== 0 && queueSeveralMicrotasks(function() {
        didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
      }), ReactSharedInternals.actQueue = null);
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
      return {
        then: function(resolve, reject) {
          didAwaitActCall = true;
          prevActScopeDepth === 0 ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
            return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
          })) : resolve(returnValue$jscomp$0);
        }
      };
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.captureOwnerStack = function() {
      var getCurrentStack = ReactSharedInternals.getCurrentStack;
      return getCurrentStack === null ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
      if (element === null || element === undefined)
        throw Error("The argument must be a React element, but you passed " + element + ".");
      var props = assign({}, element.props), key = element.key, owner = element._owner;
      if (config != null) {
        var JSCompiler_inline_result;
        a: {
          if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
            JSCompiler_inline_result = false;
            break a;
          }
          JSCompiler_inline_result = config.ref !== undefined;
        }
        JSCompiler_inline_result && (owner = getOwner());
        hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
        for (propName in config)
          !hasOwnProperty.call(config, propName) || propName === "key" || propName === "__self" || propName === "__source" || propName === "ref" && config.ref === undefined || (props[propName] = config[propName]);
      }
      var propName = arguments.length - 2;
      if (propName === 1)
        props.children = children;
      else if (1 < propName) {
        JSCompiler_inline_result = Array(propName);
        for (var i = 0;i < propName; i++)
          JSCompiler_inline_result[i] = arguments[i + 2];
        props.children = JSCompiler_inline_result;
      }
      props = ReactElement(element.type, key, undefined, undefined, owner, props, element._debugStack, element._debugTask);
      for (key = 2;key < arguments.length; key++)
        owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
      return props;
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      defaultValue._currentRenderer = null;
      defaultValue._currentRenderer2 = null;
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      for (var i = 2;i < arguments.length; i++) {
        var node = arguments[i];
        isValidElement(node) && node._store && (node._store.validated = 1);
      }
      i = {};
      node = null;
      if (config != null)
        for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)
          hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "__self" && propName !== "__source" && (i[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1)
        i.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), _i = 0;_i < childrenLength; _i++)
          childArray[_i] = arguments[_i + 2];
        Object.freeze && Object.freeze(childArray);
        i.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          i[propName] === undefined && (i[propName] = childrenLength[propName]);
      node && defineKeyPropWarningGetter(i, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return ReactElement(type, node, undefined, undefined, getOwner(), i, propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
      var refObject = { current: null };
      Object.seal(refObject);
      return refObject;
    };
    exports.forwardRef = function(render) {
      render != null && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render !== "function" ? console.error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
      render != null && render.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
      var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
        }
      });
      return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      type == null && console.error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
      compare = {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: compare === undefined ? null : compare
      };
      var ownName;
      Object.defineProperty(compare, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
        }
      });
      return compare;
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      currentTransition._updatedFibers = new Set;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        prevTransition === null && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return resolveDispatcher().useCacheRefresh();
    };
    exports.use = function(usable) {
      return resolveDispatcher().use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return resolveDispatcher().useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useContext = function(Context2) {
      var dispatcher = resolveDispatcher();
      Context2.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
      return dispatcher.useContext(Context2);
    };
    exports.useDebugValue = function(value, formatterFn) {
      return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useDeferredValue = function(value, initialValue) {
      return resolveDispatcher().useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, createDeps, update) {
      create == null && console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      var dispatcher = resolveDispatcher();
      if (typeof update === "function")
        throw Error("useEffect CRUD overload is not enabled in this build of React.");
      return dispatcher.useEffect(create, createDeps);
    };
    exports.useId = function() {
      return resolveDispatcher().useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return resolveDispatcher().useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      create == null && console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      create == null && console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return resolveDispatcher().useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return resolveDispatcher().useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return resolveDispatcher().useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return resolveDispatcher().useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return resolveDispatcher().useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
      return resolveDispatcher().useTransition();
    };
    exports.version = "19.1.0";
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();
});

// node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  if (false) {} else {
    module.exports = require_react_development();
  }
});

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || undefined;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== undefined) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    form[key] = value;
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", 8);
  let i = start;
  for (;i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? undefined : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param ? /\%/.test(param) ? tryDecodeURIComponent(param) : param : undefined;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? undefined;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw[key]();
  };
  json() {
    return this.#cachedBody("json");
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = (headers, map = {}) => {
  for (const key of Object.keys(map)) {
    headers.set(key, map[key]);
  }
  return headers;
};
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status = 200;
  #executionCtx;
  #headers;
  #preparedHeaders;
  #res;
  #isFresh = true;
  #layout;
  #renderer;
  #notFoundHandler;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    this.#isFresh = false;
    return this.#res ||= new Response("404 Not Found", { status: 404 });
  }
  set res(_res) {
    this.#isFresh = false;
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    if (value === undefined) {
      if (this.#headers) {
        this.#headers.delete(name);
      } else if (this.#preparedHeaders) {
        delete this.#preparedHeaders[name.toLocaleLowerCase()];
      }
      if (this.finalized) {
        this.res.headers.delete(name);
      }
      return;
    }
    if (options?.append) {
      if (!this.#headers) {
        this.#isFresh = false;
        this.#headers = new Headers(this.#preparedHeaders);
        this.#preparedHeaders = {};
      }
      this.#headers.append(name, value);
    } else {
      if (this.#headers) {
        this.#headers.set(name, value);
      } else {
        this.#preparedHeaders ??= {};
        this.#preparedHeaders[name.toLowerCase()] = value;
      }
    }
    if (this.finalized) {
      if (options?.append) {
        this.res.headers.append(name, value);
      } else {
        this.res.headers.set(name, value);
      }
    }
  };
  status = (status) => {
    this.#isFresh = false;
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map;
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : undefined;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    if (this.#isFresh && !headers && !arg && this.#status === 200) {
      return new Response(data, {
        headers: this.#preparedHeaders
      });
    }
    if (arg && typeof arg !== "number") {
      const header = new Headers(arg.headers);
      if (this.#headers) {
        this.#headers.forEach((v, k) => {
          if (k === "set-cookie") {
            header.append(k, v);
          } else {
            header.set(k, v);
          }
        });
      }
      const headers2 = setHeaders(header, this.#preparedHeaders);
      return new Response(data, {
        headers: headers2,
        status: arg.status ?? this.#status
      });
    }
    const status = typeof arg === "number" ? arg : this.#status;
    this.#preparedHeaders ??= {};
    this.#headers ??= new Headers;
    setHeaders(this.#headers, this.#preparedHeaders);
    if (this.#res) {
      this.#res.headers.forEach((v, k) => {
        if (k === "set-cookie") {
          this.#headers?.append(k, v);
        } else {
          this.#headers?.set(k, v);
        }
      });
      setHeaders(this.#headers, this.#preparedHeaders);
    }
    headers ??= {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === "string") {
        this.#headers.set(k, v);
      } else {
        this.#headers.delete(k);
        for (const v2 of v) {
          this.#headers.append(k, v2);
        }
      }
    }
    return new Response(data, {
      status,
      headers: this.#headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => {
    return typeof arg === "number" ? this.#newResponse(data, arg, headers) : this.#newResponse(data, arg);
  };
  text = (text, arg, headers) => {
    if (!this.#preparedHeaders) {
      if (this.#isFresh && !headers && !arg) {
        return new Response(text);
      }
      this.#preparedHeaders = {};
    }
    this.#preparedHeaders["content-type"] = TEXT_PLAIN;
    if (typeof arg === "number") {
      return this.#newResponse(text, arg, headers);
    }
    return this.#newResponse(text, arg);
  };
  json = (object, arg, headers) => {
    const body = JSON.stringify(object);
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "application/json";
    return typeof arg === "number" ? this.#newResponse(body, arg, headers) : this.#newResponse(body, arg);
  };
  html = (html, arg, headers) => {
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "text/html; charset=UTF-8";
    if (typeof html === "object") {
      return resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then((html2) => {
        return typeof arg === "number" ? this.#newResponse(html2, arg, headers) : this.#newResponse(html2, arg);
      });
    }
    return typeof arg === "number" ? this.#newResponse(html, arg, headers) : this.#newResponse(html, arg);
  };
  redirect = (location, status) => {
    this.#headers ??= new Headers;
    this.#headers.set("Location", String(location));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response;
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app) {
    const subApp = this.basePath(path);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = undefined;
      try {
        executionContext = c.executionCtx;
      } catch {}
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, undefined, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== undefined) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node;
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node;
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node;
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0;; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== undefined) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== undefined) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(path === "*" ? "" : `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)")}$`);
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie;
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length);
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length;i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (;paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length;i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length;j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length;k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push([handler, paramCount]));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length;i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.#buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  #buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = undefined;
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]]));
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length;i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = undefined;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (Object.keys(curNode.#children).includes(key)) {
        curNode = curNode.#children[key];
        const pattern2 = getPattern(p, nextP);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2;
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    const m = /* @__PURE__ */ Object.create(null);
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      score: this.#order
    };
    m[method] = handlerSet;
    curNode.#methods.push(m);
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length;i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== undefined) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length;i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length;j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(...this.#getHandlerSets(nextNode.#children["*"], method, node.#params));
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length;k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name, matcher] = pattern;
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(...this.#getHandlerSets(child.#children["*"], method, params, node.#params));
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2;
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length;i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter, new TrieRouter]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      if (opts.allowMethods?.length) {
        set("Access-Control-Allow-Methods", opts.allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  };
};

// node_modules/pinata/dist/chunk-7UIMBFJ5.mjs
var import_react = __toESM(require_react(), 1);
var PinataError = class extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = "PinataError";
  }
};
var NetworkError = class extends PinataError {
  constructor(message, statusCode, details) {
    super(message, statusCode, details);
    this.name = "NetworkError";
  }
};
var AuthenticationError = class extends PinataError {
  constructor(message, statusCode, details) {
    super(message, statusCode, details);
    this.name = "AuthenticationError";
  }
};
var ValidationError = class extends PinataError {
  constructor(message, details) {
    super(message, undefined, details);
    this.name = "ValidationError";
  }
};
function isValidCIDv0(cid) {
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(cid);
}
function isValidCIDv1(cid) {
  return /^b[a-z2-7]{58,}$/.test(cid);
}
function isCID(str) {
  str = str.trim();
  return isValidCIDv0(str) || isValidCIDv1(str);
}
async function containsCID(input) {
  if (typeof input !== "string") {
    throw new Error("Input is not a string");
  }
  const startsWithCID = (str) => {
    const parts = str.split("/");
    return isCID(parts[0]) ? parts[0] : null;
  };
  const directCID = startsWithCID(input);
  if (directCID) {
    return {
      containsCid: true,
      cid: directCID
    };
  }
  let url;
  try {
    url = new URL(input);
  } catch (error) {
    const parts = input.split(/\/|\?/);
    for (const part of parts) {
      const cid = startsWithCID(part);
      if (cid) {
        return {
          containsCid: true,
          cid
        };
      }
    }
    return {
      containsCid: false,
      cid: null
    };
  }
  const subdomains = url.hostname.split(".");
  for (const subdomain of subdomains) {
    if (isCID(subdomain)) {
      return {
        containsCid: true,
        cid: subdomain
      };
    }
  }
  const pathParts = url.pathname.split("/");
  for (const part of pathParts) {
    const cid = startsWithCID(part);
    if (cid) {
      return {
        containsCid: true,
        cid
      };
    }
  }
  return {
    containsCid: false,
    cid: null
  };
}
async function convertToDesiredGateway(sourceUrl, desiredGatewayPrefix) {
  const results = await containsCID(sourceUrl);
  if (results.containsCid !== true) {
    throw new Error("url does not contain CID");
  }
  if (!sourceUrl.startsWith("https") && !sourceUrl.startsWith("ipfs://")) {
    return `${desiredGatewayPrefix}/ipfs/${sourceUrl}`;
  }
  const urlObj = new URL(sourceUrl);
  const path = urlObj.pathname + urlObj.search + urlObj.hash;
  if (sourceUrl.startsWith(`ipfs://${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${path}`;
  }
  if (sourceUrl.includes(`/ipfs/${results.cid}`)) {
    return `${desiredGatewayPrefix}${path}`;
  }
  if (sourceUrl.includes(`/ipns/${results.cid}`)) {
    return `${desiredGatewayPrefix}${path}`;
  }
  if (urlObj.hostname.includes(results.cid)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${path}`;
  }
  throw new Error("unsupported URL pattern, please submit a github issue with the URL utilized");
}
var formatConfig = (config) => {
  let gateway = config?.pinataGateway;
  if (config && gateway) {
    if (gateway && !gateway.startsWith("https://")) {
      gateway = `https://${gateway}`;
    }
    config.pinataGateway = gateway;
  }
  return config;
};
var DEFAULT_CHUNKS = 20 * 10;

// node_modules/pinata/dist/index.mjs
var analyticsDateInterval = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const params = new URLSearchParams;
  if (options) {
    const {
      cid,
      gateway_domain,
      start_date,
      end_date,
      file_name,
      user_agent,
      country,
      region,
      referer,
      limit,
      sort_order,
      date_interval,
      sort_by
    } = options;
    if (cid)
      params.append("cid", cid);
    if (gateway_domain)
      params.append("gateway_domain", gateway_domain);
    if (start_date)
      params.append("start_date", start_date);
    if (end_date)
      params.append("end_date", end_date);
    if (file_name)
      params.append("file_name", file_name);
    if (user_agent)
      params.append("user_agent", user_agent.toString());
    if (country)
      params.append("country", country.toString());
    if (region)
      params.append("region", region);
    if (referer)
      params.append("referer", referer.toString());
    if (limit)
      params.append("limit", limit.toString());
    if (sort_order)
      params.append("sort_order", sort_order);
    if (sort_by)
      params.append("sort_by", sort_by);
    if (date_interval)
      params.append("by", date_interval);
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  const url = `${endpoint}/ipfs/gateway_analytics_time_series?${params.toString()}`;
  try {
    let headers;
    if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
      headers = { ...config.customHeaders };
    } else {
      headers = {
        Authorization: `Bearer ${config.pinataJwt}`,
        Source: "sdk/analyticsDateInterval"
      };
    }
    const request = await fetch(url, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing anaytics usage: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while fetching gateway usage");
  }
};
var analyticsTopUsage = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const params = new URLSearchParams;
  if (options) {
    const {
      cid,
      gateway_domain,
      start_date,
      end_date,
      file_name,
      user_agent,
      country,
      region,
      referer,
      limit,
      sort_order,
      sort_by,
      attribute
    } = options;
    const domain = gateway_domain || config.pinataGateway;
    if (domain) {
      const cleanDomain = domain.replace(/^https?:\/\//, "");
      params.append("gateway_domain", cleanDomain);
    }
    if (cid) {
      params.append("cid", cid);
    }
    if (start_date)
      params.append("start_date", start_date);
    if (end_date)
      params.append("end_date", end_date);
    if (file_name)
      params.append("file_name", file_name);
    if (user_agent)
      params.append("user_agent", user_agent.toString());
    if (country)
      params.append("country", country.toString());
    if (region)
      params.append("region", region);
    if (referer)
      params.append("referer", referer.toString());
    if (limit)
      params.append("limit", limit.toString());
    if (sort_order)
      params.append("sort_order", sort_order);
    if (sort_by)
      params.append("sort_by", sort_by);
    if (attribute)
      params.append("by", attribute);
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  const url = `${endpoint}/ipfs/gateway_analytics_top?${params.toString()}`;
  try {
    let headers;
    if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
      headers = { ...config.customHeaders };
    } else {
      headers = {
        Authorization: `Bearer ${config.pinataJwt}`,
        Source: "sdk/analyticsTopUsage"
      };
    }
    const request = await fetch(url, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing anaytics usage: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while fetching gateway usage");
  }
};
var testAuthentication = async (config) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  let endpoint = "https://api.pinata.cloud";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/testAuthentication"
    };
  }
  try {
    const request = await fetch(`${endpoint}/data/testAuthentication`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing authentication: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while testing authentication");
  }
};
var wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
var deleteFile = async (config, files, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const responses = [];
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/deleteFile"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  for (const id of files) {
    try {
      const response = await fetch(`${endpoint}/files/${privacy}/${id}`, {
        method: "DELETE",
        headers
      });
      await wait(300);
      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 401) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, response.status, {
            error: errorData,
            code: "HTTP_ERROR",
            metadata: {
              requestUrl: response.url
            }
          });
        }
        throw new NetworkError(`HTTP error`, response.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: response.url
          }
        });
      }
      responses.push({
        id,
        status: response.statusText
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof PinataError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = `Error deleting file ${id}: ${error.message}`;
      } else {
        errorMessage = `An unknown error occurred while deleting file ${id}`;
      }
      responses.push({
        id,
        status: errorMessage
      });
    }
  }
  return responses;
};
var deleteFileVectors = async (config, fileId) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/vectorizeFile"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}/vectorize/files/${fileId}`, {
      method: "DELETE",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing vectorize file: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while vectorizing file");
  }
};
var deleteSwap = async (config, cid, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/deleteSwap"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${network}/swap/${cid}`, {
      method: "DELETE",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed`, request.status, {
          error: errorData,
          code: "AUTH_ERROR"
        });
      }
      if (request.status === 403) {
        throw new PinataError("Unauthorized CID Swap Deletion", request.status, {
          error: errorData,
          code: "UNAUTHORIZED"
        });
      }
      if (request.status === 404) {
        throw new PinataError("CID not pinned to account", request.status, {
          error: errorData,
          code: "NOT_FOUND"
        });
      }
      throw new NetworkError(`HTTP error occurred`, request.status, {
        error: errorData,
        code: "NETWORK_ERROR"
      });
    }
    return request.statusText;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing deleteSwap: ${error.message}`, undefined, {
        code: "DELETE_SWAP_ERROR"
      });
    }
    throw new PinataError("An unknown error occurred while deleting swap", undefined, {
      code: "UNKNOWN_ERROR"
    });
  }
};
var listFiles = async (config, privacy, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const params = new URLSearchParams;
  if (options) {
    const {
      name,
      group,
      cid,
      order,
      limit,
      mimeType,
      pageToken,
      cidPending,
      metadata,
      noGroup
    } = options;
    if (limit)
      params.append("limit", limit.toString());
    if (name)
      params.append("name", name);
    if (group)
      params.append("group", group);
    if (cid)
      params.append("cid", cid);
    if (mimeType)
      params.append("mimeType", mimeType);
    if (order)
      params.append("order", order);
    if (pageToken)
      params.append("pageToken", pageToken);
    if (cidPending)
      params.append("cidPending", "true");
    if (noGroup)
      params.append("group", "null");
    if (metadata && typeof metadata === "object") {
      Object.entries(metadata).forEach(([key, value]) => {
        params.append(`keyvalues[${key.toString()}]`, value.toString());
      });
    }
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  const url = `${endpoint}/files/${privacy}?${params.toString()}`;
  try {
    let headers;
    if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
      headers = {
        Authorization: `Bearer ${config.pinataJwt}`,
        ...config.customHeaders
      };
    } else {
      headers = {
        Authorization: `Bearer ${config.pinataJwt}`,
        Source: "sdk/listFiles"
      };
    }
    const request = await fetch(url, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing list files: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing files");
  }
};
var swapCid = async (config, options, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    swap_cid: options.swapCid
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/swapCid"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${network}/swap/${options.cid}`, {
      method: "PUT",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      if (request.status === 403) {
        throw new PinataError("Unauthorized CID Swap", request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      if (request.status === 404) {
        throw new PinataError("CID not pinned to account", request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing CID Swap: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while swapping CID");
  }
};
var swapHistory = async (config, options, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/swapHistory"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${network}/swap/${options.cid}?domain=${options.domain}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      if (request.status === 404) {
        throw new PinataError("CID does not have history", request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error fetching swap history: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while fetching swap history");
  }
};
var updateFile = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  if (!options.name && (!options.keyvalues || Object.keys(options.keyvalues).length === 0)) {
    throw new ValidationError("At least one of 'name' or 'keyvalues' must be provided");
  }
  const data = {};
  if (options.name !== undefined) {
    data.name = options.name;
  }
  if (options.keyvalues && Object.keys(options.keyvalues).length > 0) {
    data.keyvalues = options.keyvalues;
  }
  const body = JSON.stringify(data);
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/updateMetadata"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${privacy}/${options.id}`, {
      method: "PUT",
      headers,
      body
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing updateFile: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while updating file");
  }
};
var vectorizeFile = async (config, fileId) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/vectorizeFile"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}/vectorize/files/${fileId}`, {
      method: "POST",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing vectorize file: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while vectorizing file");
  }
};
var vectorizeQuery = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/vectorQuery"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  const body = JSON.stringify({
    text: options.query
  });
  try {
    const request = await fetch(`${endpoint}/vectorize/groups/${options.groupId}/query`, {
      method: "POST",
      headers,
      body
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    if (options.returnFile) {
      if (resData.matches.length === 0) {
        throw new PinataError(`No files returned in query to fetch`);
      }
      const cid = resData.matches[0].cid;
      const fileRes = await getCid(config, cid, "files");
      return fileRes;
    }
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing vectorize file: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while vectorizing file");
  }
};
var queue = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const params = new URLSearchParams({
    includesCount: "false"
  });
  if (options) {
    const { cid, status, sort, limit, pageToken } = options;
    if (cid)
      params.append("cid", cid.toString());
    if (status)
      params.append("status", status.toString());
    if (sort)
      params.append("sort", sort.toString());
    if (limit)
      params.append("limit", limit.toString());
    if (pageToken)
      params.append("pageToken", pageToken.toString());
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  const url = `${endpoint}/files/public/pin_by_cid?${params.toString()}`;
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/pinJobs"
    };
  }
  try {
    const request = await fetch(url, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing pinJobs: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing pin jobs");
  }
};
var deletePinRequest = async (config, id) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/deletePinRequest"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const response = await fetch(`${endpoint}/files/public/pin_by_cid/${id}`, {
      method: "DELETE",
      headers
    });
    if (!response.ok) {
      const errorData = await response.text();
      if (response.status === 401) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, response.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: response.url
          }
        });
      }
      throw new NetworkError(`HTTP error`, response.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: response.url
        }
      });
    }
    return "OK";
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error deleting pin by request: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while deleting pin by CID request");
  }
};
var getCid = async (config, cid, gatewayType, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let data;
  let newUrl = `${config?.pinataGateway}/${gatewayType}/${cid}`;
  const params = new URLSearchParams;
  if (options) {
    if (options.width)
      params.append("img-width", options.width.toString());
    if (options.height)
      params.append("img-height", options.height.toString());
    if (options.dpr)
      params.append("img-dpr", options.dpr.toString());
    if (options.fit)
      params.append("img-fit", options.fit);
    if (options.gravity)
      params.append("img-gravity", options.gravity);
    if (options.quality)
      params.append("img-quality", options.quality.toString());
    if (options.format)
      params.append("img-format", options.format);
    if (options.animation !== undefined)
      params.append("img-anim", options.animation.toString());
    if (options.sharpen)
      params.append("img-sharpen", options.sharpen.toString());
    if (options.onError === true)
      params.append("img-onerror", "redirect");
    if (options.metadata)
      params.append("img-metadata", options.metadata);
  }
  if (config?.pinataGatewayKey) {
    params.append("pinataGatewayToken", config.pinataGatewayKey);
  }
  const queryString = params.toString();
  if (queryString) {
    newUrl += `?${queryString}`;
  }
  if (gatewayType === "ipfs") {
    const request = await fetch(newUrl);
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication Failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const contentType = request.headers.get("content-type")?.split(";")[0] || null;
    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (contentType?.includes("text/")) {
      data = await request.text();
    } else {
      data = await request.blob();
    }
    const res = {
      data,
      contentType
    };
    return res;
  }
  const date = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1000);
  const payload = JSON.stringify({
    url: newUrl,
    date,
    expires: 30,
    method: "GET"
  });
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/getCid"
    };
  }
  const signedUrlRequest = await fetch(`${endpoint}/files/sign`, {
    method: "POST",
    headers,
    body: payload
  });
  const signedUrl = await signedUrlRequest.json();
  try {
    const request = await fetch(signedUrl.data);
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication Failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const contentType = request.headers.get("content-type")?.split(";")[0] || null;
    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (contentType?.includes("text/")) {
      data = await request.text();
    } else {
      data = await request.blob();
    }
    const res = {
      data,
      contentType
    };
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing getCid: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while getting CID contents");
  }
};
var convertIPFSUrl = async (config, url, gatewayPrefix) => {
  let newUrl;
  let prefix = gatewayPrefix || config?.pinataGateway || "https://gateway.pinata.cloud";
  newUrl = await convertToDesiredGateway(url, prefix);
  if (config?.pinataGatewayKey) {
    `${newUrl}?pinataGatewayToken=${config?.pinataGatewayKey}`;
  }
  return newUrl;
};
var createAccessLink = async (config, options, imgOpts) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let baseUrl;
  if (options?.gateway) {
    baseUrl = options.gateway.startsWith("https://") ? options.gateway : `https://${options.gateway}`;
  } else {
    baseUrl = config.pinataGateway;
  }
  let newUrl = `${baseUrl}/files/${options.cid}`;
  const params = new URLSearchParams;
  if (imgOpts) {
    if (imgOpts.width)
      params.append("img-width", imgOpts.width.toString());
    if (imgOpts.height)
      params.append("img-height", imgOpts.height.toString());
    if (imgOpts.dpr)
      params.append("img-dpr", imgOpts.dpr.toString());
    if (imgOpts.fit)
      params.append("img-fit", imgOpts.fit);
    if (imgOpts.gravity)
      params.append("img-gravity", imgOpts.gravity);
    if (imgOpts.quality)
      params.append("img-quality", imgOpts.quality.toString());
    if (imgOpts.format)
      params.append("img-format", imgOpts.format);
    if (imgOpts.animation !== undefined)
      params.append("img-anim", imgOpts.animation.toString());
    if (imgOpts.sharpen)
      params.append("img-sharpen", imgOpts.sharpen.toString());
    if (imgOpts.onError === true)
      params.append("img-onerror", "redirect");
    if (imgOpts.metadata)
      params.append("img-metadata", imgOpts.metadata);
  }
  const queryString = params.toString();
  if (queryString) {
    newUrl += `?${queryString}`;
  }
  const date = options?.date || Math.floor((/* @__PURE__ */ new Date()).getTime() / 1000);
  const payload = JSON.stringify({
    url: newUrl,
    date,
    expires: options.expires,
    method: "GET"
  });
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/createSignURL"
    };
  }
  try {
    const request = await fetch(`${endpoint}/files/private/download_link`, {
      method: "POST",
      headers,
      body: payload
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication Failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res.data;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing createSignedURL: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while getting signed url");
  }
};
var addToGroup = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const wait3 = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };
  const responses = [];
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/addToGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  for (const id of options.files) {
    try {
      const response = await fetch(`${endpoint}/groups/${privacy}/${options.groupId}/ids/${id}`, {
        method: "PUT",
        headers
      });
      await wait3(300);
      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 401) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, response.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: response.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, response.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: response.url
          }
        });
      }
      responses.push({
        id,
        status: response.statusText
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof PinataError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = `Error adding file ${id} to group: ${error.message}`;
      } else {
        errorMessage = `An unknown error occurred while adding file ${id} to group`;
      }
      responses.push({
        id,
        status: errorMessage
      });
    }
  }
  return responses;
};
var createGroup = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    name: options.name,
    is_public: options.isPublic
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/createGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/groups/${privacy}`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing createGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while creating a group");
  }
};
var deleteGroup = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/deleteGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/groups/${privacy}/${options.groupId}`, {
      method: "DELETE",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = request.statusText;
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing deleteGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while deleting a group");
  }
};
var getGroup = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/getGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/groups/${privacy}/${options.groupId}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing getGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while getting info for a group");
  }
};
var listGroups = async (config, privacy, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/listGroups"
    };
  }
  const params = new URLSearchParams;
  if (options) {
    const { pageToken, name, limit, isPublic } = options;
    if (pageToken)
      params.append("pageToken", pageToken.toString());
    if (isPublic)
      params.append("isPublic", isPublic.toString());
    if (name)
      params.append("name", name);
    if (limit !== undefined)
      params.append("limit", limit.toString());
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/groups/${privacy}?${params.toString()}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing listGroups: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing groups");
  }
};
var removeFromGroup = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const wait3 = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };
  const responses = [];
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/addToGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  for (const id of options.files) {
    try {
      const response = await fetch(`${endpoint}/groups/${privacy}/${options.groupId}/ids/${id}`, {
        method: "DELETE",
        headers
      });
      await wait3(300);
      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 401) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, response.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: response.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, response.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: response.url
          }
        });
      }
      responses.push({
        id,
        status: response.statusText
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof PinataError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = `Error adding file ${id} to group: ${error.message}`;
      } else {
        errorMessage = `An unknown error occurred while adding file ${id} to group`;
      }
      responses.push({
        id,
        status: errorMessage
      });
    }
  }
  return responses;
};
var updateGroup = async (config, options, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    name: options.name,
    is_public: options.isPublic
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/updateGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/groups/${privacy}/${options.groupId}`, {
      method: "PUT",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing updateGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while updating group");
  }
};
var createKey = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/createKey"
    };
  }
  const data = JSON.stringify(options);
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/pinata/keys`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing createKey: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while creating API key");
  }
};
var listKeys = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/listKeys"
    };
  }
  const params = new URLSearchParams;
  if (options) {
    const { offset, name, revoked, limitedUse, exhausted } = options;
    if (offset)
      params.append("offset", offset.toString());
    if (revoked !== undefined)
      params.append("revoked", revoked.toString());
    if (limitedUse !== undefined)
      params.append("limitedUse", limitedUse.toString());
    if (exhausted !== undefined)
      params.append("exhausted", exhausted.toString());
    if (name)
      params.append("name", name);
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/pinata/keys?${params.toString()}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res.keys;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing listKeys: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing API keys");
  }
};
var wait2 = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
var revokeKeys = async (config, keys) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/revokeKeys"
    };
  }
  const responses = [];
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  for (const key of keys) {
    try {
      const request = await fetch(`${endpoint}/pinata/keys/${key}`, {
        method: "PUT",
        headers
      });
      await wait2(300);
      if (!request.ok) {
        const errorData = await request.text();
        if (request.status === 401 || request.status === 403) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: request.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      const result = await request.json();
      responses.push({
        key,
        status: result
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof PinataError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = `Error revoking key ${key}: ${error.message}`;
      } else {
        errorMessage = `An unknown error occurred while revoking key ${key}`;
      }
      responses.push({
        key,
        status: errorMessage
      });
    }
  }
  return responses;
};
var uploadBase64 = async (config, base64String, network, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = options?.keys || config?.pinataJwt;
  const name = options?.metadata?.name ? options?.metadata?.name : "base64 string";
  const buffer = Buffer.from(base64String, "base64");
  const blob = new Blob([buffer]);
  const data = new FormData;
  data.append("file", blob, name);
  data.append("network", network);
  data.append("name", name);
  if (options?.groupId) {
    data.append("group_id", options.groupId);
  }
  if (options?.metadata?.keyvalues) {
    data.append("keyvalues", JSON.stringify(options.metadata.keyvalues));
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/base64"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  if (options?.url) {
    try {
      const request = await fetch(options.url, {
        method: "POST",
        body: data
      });
      if (!request.ok) {
        const errorData = await request.text();
        if (request.status === 401 || request.status === 403) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: request.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      const res = await request.json();
      const resData = res.data;
      return resData;
    } catch (error) {
      if (error instanceof PinataError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new PinataError(`Error processing base64: ${error.message}`);
      }
      throw new PinataError("An unknown error occurred while trying to upload base64");
    }
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    if (options?.vectorize) {
      const vectorReq = await fetch(`${endpoint}/vectorize/files/${resData.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      if (vectorReq.ok) {
        resData.vectorized = true;
        return resData;
      } else {
        const errorData = await vectorReq.text();
        throw new NetworkError(`HTTP error during vectorization: ${errorData}`, vectorReq.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
    }
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing base64: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while trying to upload base64");
  }
};
var createSignedUploadURL = async (config, options, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const date = options?.date || Math.floor((/* @__PURE__ */ new Date()).getTime() / 1000);
  const payload = {
    date,
    expires: options.expires
  };
  if (options.groupId) {
    payload.group_id = options.groupId;
  }
  if (options.name) {
    payload.filename = options.name;
  }
  if (options.keyvalues) {
    payload.keyvalues = options.keyvalues;
  }
  if (network) {
    payload.network = network;
  }
  if (options.streamable) {
    payload.streamable = options.streamable;
  }
  if (options.maxFileSize) {
    payload.max_file_size = options.maxFileSize;
  }
  if (options.mimeTypes) {
    payload.allow_mime_types = options.mimeTypes;
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/createSignURL"
    };
  }
  try {
    const request = await fetch(`${endpoint}/files/sign`, {
      method: "POST",
      headers,
      cache: "no-store",
      body: JSON.stringify(payload)
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication Failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res.data;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing createSignedURL: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while getting signed url");
  }
};
var uploadFile = async (config, file, network, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = options?.keys || config.pinataJwt;
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  if (file.size > 94371840) {
    let headers2;
    if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
      headers2 = {
        Authorization: `Bearer ${jwt}`,
        ...config.customHeaders
      };
    } else {
      headers2 = {
        Authorization: `Bearer ${jwt}`,
        Source: "sdk/file"
      };
    }
    const name = options?.metadata?.name || file.name || "File from SDK";
    let metadata = `filename ${btoa(name)},filetype ${btoa(file.type)},network ${btoa(network)}`;
    if (options?.groupId) {
      metadata + `,group_id ${btoa(options.groupId)}`;
    }
    if (options?.metadata?.keyvalues) {
      metadata + `,keyvalues ${btoa(JSON.stringify(options.metadata.keyvalues))}`;
    }
    if (options?.streamable) {
      metadata + `,keyvalues ${btoa("true")}`;
    }
    let updatedEndpoint = `${endpoint}/files`;
    if (options?.url) {
      updatedEndpoint = options.url;
    }
    const urlReq = await fetch(updatedEndpoint, {
      method: "POST",
      headers: {
        "Upload-Length": `${file.size}`,
        "Upload-Metadata": metadata,
        ...headers2
      }
    });
    const url = urlReq.headers.get("Location");
    if (!url) {
      const errorData = await urlReq.text();
      throw new NetworkError("Upload URL not provided", urlReq.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: urlReq.url,
          requestHeaders: urlReq.headers
        }
      });
    }
    const chunkSize = 50 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let offset = 0;
    let uploadReq;
    for (let i = 0;i < totalChunks; i++) {
      const chunk = file.slice(offset, offset + chunkSize);
      let retryCount = 0;
      const maxRetries = 5;
      while (retryCount <= maxRetries) {
        try {
          uploadReq = await fetch(url, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/offset+octet-stream",
              "Upload-Offset": offset.toString(),
              ...headers2
            },
            body: chunk
          });
          if (uploadReq.ok) {
            break;
          } else {
            const errorData = await uploadReq.text();
            throw new Error(`HTTP ${uploadReq.status}: ${errorData}`);
          }
        } catch (error) {
          retryCount++;
          if (retryCount > maxRetries) {
            const errorData = uploadReq ? await uploadReq.text().catch(() => "Unknown error") : error instanceof Error ? error.message : String(error);
            throw new NetworkError(`HTTP error during chunk upload after ${maxRetries} retries: ${errorData}`, uploadReq?.status || 0, {
              error: errorData,
              code: "HTTP_ERROR",
              metadata: {
                requestUrl: uploadReq?.url || url,
                retriesAttempted: maxRetries
              }
            });
          }
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 1e4);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
      offset += chunk.size;
    }
    if (uploadReq.status === 204) {
      const cid = uploadReq.headers.get("upload-cid");
      let dataEndpoint;
      if (config.endpointUrl) {
        dataEndpoint = config.endpointUrl;
      } else {
        dataEndpoint = "https://api.pinata.cloud/v3";
      }
      const fileInfoReq = await fetch(`${dataEndpoint}/files/${network}?cid=${cid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      const fileInfo = await fileInfoReq.json();
      const data2 = fileInfo.data.files[0];
      if (options?.vectorize) {
        const vectorReq = await fetch(`${endpoint}/vectorize/files/${data2.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        if (vectorReq.ok) {
          data2.vectorized = true;
          return data2;
        } else {
          const errorData = await vectorReq.text();
          throw new NetworkError(`HTTP error during vectorization: ${errorData}`, vectorReq.status, {
            error: errorData,
            code: "HTTP_ERROR",
            metadata: {
              requestUrl: vectorReq.url
            }
          });
        }
      }
      return data2;
    }
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/file"
    };
  }
  const data = new FormData;
  data.append("file", file, file.name);
  data.append("network", network);
  data.append("name", options?.metadata?.name || file.name || "File from SDK");
  if (options?.groupId) {
    data.append("group_id", options.groupId);
  }
  if (options?.metadata?.keyvalues) {
    data.append("keyvalues", JSON.stringify(options.metadata.keyvalues));
  }
  if (options?.streamable) {
    data.append("streamable", "true");
  }
  if (options?.url) {
    try {
      const request = await fetch(options.url, {
        method: "POST",
        headers,
        body: data
      });
      if (!request.ok) {
        const errorData = await request.text();
        if (request.status === 401 || request.status === 403) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: request.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      const res = await request.json();
      const resData = res.data;
      return resData;
    } catch (error) {
      if (error instanceof PinataError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new PinataError(`Error uploading file: ${error.message}`, undefined, {
          error: error.toString()
        });
      }
      throw new PinataError("An unknown error occurred while trying to upload file");
    }
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    if (options?.vectorize) {
      const vectorReq = await fetch(`${endpoint}/vectorize/files/${resData.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      if (vectorReq.ok) {
        resData.vectorized = true;
        return resData;
      } else {
        const errorData = await vectorReq.text();
        throw new NetworkError(`HTTP error during vectorization: ${errorData}`, vectorReq.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
    }
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error uploading file: ${error.message}`, undefined, {
        error: error.toString()
      });
    }
    throw new PinataError("An unknown error occurred while trying to upload file");
  }
};
var uploadFileArray = async (config, files, network, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = options?.keys || config?.pinataJwt;
  const folder = options?.metadata?.name || "folder_from_sdk";
  const data = new FormData;
  for (const file of Array.from(files)) {
    const path = file.webkitRelativePath || `${folder}/${file.name}`;
    data.append("file", file, path);
  }
  data.append("pinataMetadata", JSON.stringify({
    name: folder,
    keyvalues: options?.metadata?.keyvalues
  }));
  data.append("pinataOptions", JSON.stringify({
    groupId: options?.groupId,
    cidVersion: 1
  }));
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/fileArray"
    };
  }
  let endpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  if (config.legacyUploadUrl) {
    endpoint = config.legacyUploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = {
      id: res.ID,
      name: res.Name,
      cid: res.IpfsHash,
      size: res.PinSize,
      created_at: res.Timestamp,
      number_of_files: res.NumberOfFiles,
      mime_type: res.MimeType,
      group_id: res.GroupId,
      keyvalues: res.Keyvalues,
      vectorized: false,
      network: "public"
    };
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing fileArray: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while uploading an array of files");
  }
};
var uploadJson = async (config, jsonData, network, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = options?.keys || config?.pinataJwt;
  const json = JSON.stringify(jsonData);
  const blob = new Blob([json]);
  const file = new File([blob], "data.json", { type: "application/json" });
  const data = new FormData;
  data.append("file", file, file.name);
  data.append("network", network);
  data.append("name", options?.metadata?.name || file.name || "File from SDK");
  if (options?.groupId) {
    data.append("group_id", options.groupId);
  }
  if (options?.metadata?.keyvalues) {
    data.append("keyvalues", JSON.stringify(options.metadata.keyvalues));
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/json"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  if (options?.url) {
    try {
      const request = await fetch(options.url, {
        method: "POST",
        body: data
      });
      if (!request.ok) {
        const errorData = await request.text();
        if (request.status === 401 || request.status === 403) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: request.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      const res = await request.json();
      const resData = res.data;
      return resData;
    } catch (error) {
      if (error instanceof PinataError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new PinataError(`Error processing base64: ${error.message}`);
      }
      throw new PinataError("An unknown error occurred while trying to upload base64");
    }
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    if (options?.vectorize) {
      const vectorReq = await fetch(`${endpoint}/vectorize/files/${resData.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      if (vectorReq.ok) {
        resData.vectorized = true;
        return resData;
      } else {
        const errorData = await vectorReq.text();
        throw new NetworkError(`HTTP error during vectorization: ${errorData}`, vectorReq.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
    }
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing json: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while uploading json");
  }
};
var uploadUrl = async (config, url, network, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = options?.keys || config?.pinataJwt;
  const data = new FormData;
  const stream = await fetch(url);
  if (!stream.ok) {
    const errorData = await stream.text();
    throw new NetworkError(`HTTP error: ${errorData}`, stream.status, {
      error: errorData,
      code: "HTTP_ERROR",
      metadata: {
        requestUrl: stream.url
      }
    });
  }
  const arrayBuffer = await stream.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const name = options?.metadata?.name ?? "url_upload";
  const file = new File([blob], name);
  data.append("file", file, name);
  data.append("network", network);
  data.append("name", name);
  if (options?.groupId) {
    data.append("group_id", options.groupId);
  }
  if (options?.metadata?.keyvalues) {
    data.append("keyvalues", JSON.stringify(options.metadata.keyvalues));
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/url"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  if (options?.url) {
    try {
      const request = await fetch(options.url, {
        method: "POST",
        body: data
      });
      if (!request.ok) {
        const errorData = await request.text();
        if (request.status === 401 || request.status === 403) {
          throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
            error: errorData,
            code: "AUTH_ERROR",
            metadata: {
              requestUrl: request.url
            }
          });
        }
        throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      const res = await request.json();
      const resData = res.data;
      return resData;
    } catch (error) {
      if (error instanceof PinataError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new PinataError(`Error processing base64: ${error.message}`);
      }
      throw new PinataError("An unknown error occurred while trying to upload base64");
    }
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    if (options?.vectorize) {
      const vectorReq = await fetch(`${endpoint}/vectorize/files/${resData.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      if (vectorReq.ok) {
        resData.vectorized = true;
        return resData;
      } else {
        const errorData = await vectorReq.text();
        throw new NetworkError(`HTTP error during vectorization: ${errorData}`, vectorReq.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
    }
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing url: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while uploading by url");
  }
};
var uploadCid = async (config, cid, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = options?.keys || config?.pinataJwt;
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
      Source: "sdk/cid"
    };
  }
  const requestBody = {
    cid,
    name: options?.metadata ? options?.metadata?.name : cid,
    keyvalues: options?.metadata?.keyvalues,
    group_id: options?.groupId,
    host_nodes: options?.peerAddresses
  };
  const data = JSON.stringify(requestBody);
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/public/pin_by_cid`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing cid: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while pinning by CID");
  }
};
var Analytics = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.requests = new AnalyticsRequests(this.config);
    this.bandwidth = new AnalyticsBandwidth(this.config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
    this.requests.updateConfig(newConfig);
    this.bandwidth.updateConfig(newConfig);
  }
  summary(options) {
    return new TimeIntervalAnalyticsBuilder(this.config, options.domain, options.start, options.end, options.interval);
  }
};
var calculateDates = (days) => {
  const end = /* @__PURE__ */ new Date;
  const start = /* @__PURE__ */ new Date;
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0]
  };
};
var AnalyticsFilter = class {
  constructor(config, domain, start, end) {
    this.config = config;
    this.query = {
      gateway_domain: domain,
      start_date: start,
      end_date: end,
      sort_by: "requests",
      attribute: "cid"
    };
  }
  cid(cid) {
    this.query.attribute = "cid";
    if (cid) {
      this.query.cid = cid;
    }
    return this;
  }
  fileName(fileName) {
    this.query.attribute = "file_name";
    if (fileName) {
      this.query.file_name = fileName;
    }
    return this;
  }
  userAgent(userAgent) {
    this.query.attribute = "user_agent";
    if (userAgent) {
      this.query.user_agent = userAgent;
    }
    return this;
  }
  country(country) {
    this.query.attribute = "country";
    if (country) {
      this.query.country = country;
    }
    return this;
  }
  region(region) {
    this.query.attribute = "region";
    if (region) {
      this.query.region = region;
    }
    return this;
  }
  referer(referer) {
    this.query.attribute = "referer";
    if (referer) {
      this.query.referer = referer;
    }
    return this;
  }
  limit(limit) {
    this.query.limit = limit;
    return this;
  }
  sort(order) {
    this.query.sort_order = order;
    return this;
  }
  days(numberOfDays) {
    const { start, end } = calculateDates(numberOfDays);
    this.query.start_date = start;
    this.query.end_date = end;
    return this;
  }
  then(onfulfilled) {
    return analyticsTopUsage(this.config, this.query).then(onfulfilled);
  }
};
var AnalyticsBandwidth = class extends AnalyticsFilter {
  constructor(config) {
    super(config, "", "", "");
    this.query.sort_by = "bandwidth";
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  customDates(start, end) {
    if (start)
      this.query.start_date = start;
    if (end)
      this.query.end_date = end;
    return this;
  }
  from(domain) {
    this.query.gateway_domain = domain;
    return this;
  }
};
var AnalyticsBuilder = class {
  constructor(config, query) {
    this.requestCount = 0;
    this.lastRequestTime = 0;
    this.MAX_REQUESTS_PER_MINUTE = 30;
    this.MINUTE_IN_MS = 60000;
    this.config = config;
    this.query = query;
  }
  cid(cid) {
    this.query.cid = cid;
    return this;
  }
  fileName(fileName) {
    this.query.file_name = fileName;
    return this;
  }
  userAgent(userAgent) {
    this.query.user_agent = userAgent;
    return this;
  }
  country(country) {
    this.query.country = country;
    return this;
  }
  region(region) {
    this.query.region = region;
    return this;
  }
  referer(referer) {
    this.query.referer = referer;
    return this;
  }
  limit(limit) {
    this.query.limit = limit;
    return this;
  }
  sort(order) {
    this.query.sort_order = order;
    return this;
  }
  async getAnalytics() {
    throw new Error("getAnalytics method must be implemented in derived class");
  }
  then(onfulfilled) {
    return this.getAnalytics().then(onfulfilled);
  }
};
var AnalyticsRequests = class extends AnalyticsFilter {
  constructor(config) {
    super(config, "", "", "");
    this.query.sort_by = "requests";
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  customDates(start, end) {
    if (start)
      this.query.start_date = start;
    if (end)
      this.query.end_date = end;
    return this;
  }
  from(domain) {
    this.query.gateway_domain = domain;
    return this;
  }
};
var TimeIntervalAnalyticsBuilder = class extends AnalyticsBuilder {
  constructor(config, domain, start, end, dateInterval) {
    super(config, {
      gateway_domain: domain,
      start_date: start,
      end_date: end,
      date_interval: dateInterval
    });
  }
  sortBy(sortBy) {
    this.query.sort_by = sortBy;
    return this;
  }
  async getAnalytics() {
    return analyticsDateInterval(this.config, this.query);
  }
  async all() {
    return this.getAnalytics();
  }
};
var FilterGroups = class {
  constructor(config, privacy) {
    this.query = {};
    this.config = config;
    this.privacy = privacy;
  }
  name(name) {
    this.query.name = name;
    return this;
  }
  limit(limit) {
    this.query.limit = limit;
    return this;
  }
  isPublic(isPublic) {
    this.query.isPublic = isPublic;
    return this;
  }
  pageToken(pageToken) {
    this.query.pageToken = pageToken;
    return this;
  }
  then(onfulfilled) {
    return this.fetchPage().then((response) => {
      this.nextPageToken = response.next_page_token;
      return response;
    }).then(onfulfilled);
  }
  async fetchPage() {
    if (this.nextPageToken) {
      this.query.pageToken = this.nextPageToken;
    }
    return listGroups(this.config, this.privacy, this.query);
  }
  async* [Symbol.asyncIterator]() {
    while (true) {
      const response = await this.fetchPage();
      for (const item of response.groups) {
        yield item;
      }
      if (!response.next_page_token) {
        break;
      }
      this.nextPageToken = response.next_page_token;
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
var PublicGroups = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  create(options) {
    return createGroup(this.config, options, "public");
  }
  list() {
    return new FilterGroups(this.config, "public");
  }
  get(options) {
    return getGroup(this.config, options, "public");
  }
  addFiles(options) {
    return addToGroup(this.config, options, "public");
  }
  removeFiles(options) {
    return removeFromGroup(this.config, options, "public");
  }
  update(options) {
    return updateGroup(this.config, options, "public");
  }
  delete(options) {
    return deleteGroup(this.config, options, "public");
  }
};
var PrivateGroups = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  create(options) {
    return createGroup(this.config, options, "private");
  }
  list() {
    return new FilterGroups(this.config, "private");
  }
  get(options) {
    return getGroup(this.config, options, "private");
  }
  addFiles(options) {
    return addToGroup(this.config, options, "private");
  }
  removeFiles(options) {
    return removeFromGroup(this.config, options, "private");
  }
  update(options) {
    return updateGroup(this.config, options, "private");
  }
  delete(options) {
    return deleteGroup(this.config, options, "private");
  }
};
var Groups = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.public = new PublicGroups(config);
    this.private = new PrivateGroups(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
};
var Keys = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  create(options) {
    return createKey(this.config, options);
  }
  list() {
    return new FilterKeys(this.config);
  }
  revoke(keys) {
    return revokeKeys(this.config, keys);
  }
};
var FilterKeys = class {
  constructor(config) {
    this.query = {};
    this.config = config;
  }
  offset(offset) {
    this.query.offset = offset;
    return this;
  }
  revoked(revoked) {
    this.query.revoked = revoked;
    return this;
  }
  limitedUse(limitedUse) {
    this.query.limitedUse = limitedUse;
    return this;
  }
  exhausted(exhausted) {
    this.query.exhausted = exhausted;
    return this;
  }
  name(name) {
    this.query.name = name;
    return this;
  }
  then(onfulfilled) {
    return listKeys(this.config, this.query).then(onfulfilled);
  }
  async* [Symbol.asyncIterator]() {
    let hasMore = true;
    let offset = 0;
    while (hasMore) {
      this.query.offset = offset;
      const items = await listKeys(this.config, this.query);
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        hasMore = false;
      } else {
        offset += items.length;
      }
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
var Gateways = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.public = new PublicGateways(config);
    this.private = new PrivateGateways(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
};
var OptimizeImageCreateAccessLink = class {
  constructor(config, urlOpts) {
    this.imgOpts = {};
    this.config = config;
    this.urlOpts = urlOpts;
  }
  optimizeImage(options) {
    this.imgOpts = { ...this.imgOpts, ...options };
    return this;
  }
  then(onfulfilled) {
    return createAccessLink(this.config, this.urlOpts, this.imgOpts).then(onfulfilled);
  }
};
var OptimizeImageGetCid = class {
  constructor(config, cid, gatewayType) {
    this.options = {};
    this.config = config;
    this.cid = cid;
    this.gatewayType = gatewayType;
  }
  optimizeImage(options) {
    this.options = { ...this.options, ...options };
    return this;
  }
  then(onfulfilled) {
    return getCid(this.config, this.cid, this.gatewayType, this.options).then(onfulfilled);
  }
};
var PrivateGateways = class {
  constructor(config) {
    this.config = config;
  }
  get(cid) {
    return new OptimizeImageGetCid(this.config, cid, "files");
  }
  createAccessLink(options) {
    return new OptimizeImageCreateAccessLink(this.config, options);
  }
};
var PublicGateways = class {
  constructor(config) {
    this.config = config;
  }
  get(cid) {
    return new OptimizeImageGetCid(this.config, cid, "ipfs");
  }
  convert(url, gatewayPrefix) {
    return convertIPFSUrl(this.config, url, gatewayPrefix);
  }
};
var getFile = async (config, id, privacy) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      ...config.customHeaders
    };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/getFile"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${privacy}/${id}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing getGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while getting info for a group");
  }
};
var FilterFiles = class {
  constructor(config, privacy) {
    this.query = {};
    this.config = config;
    this.privacy = privacy;
  }
  name(name) {
    this.query.name = name;
    return this;
  }
  group(group) {
    this.query.group = group;
    return this;
  }
  cid(cid) {
    this.query.cid = cid;
    return this;
  }
  mimeType(mimeType) {
    this.query.mimeType = mimeType;
    return this;
  }
  order(order) {
    this.query.order = order;
    return this;
  }
  limit(limit) {
    this.query.limit = limit;
    return this;
  }
  cidPending(cidPending) {
    this.query.cidPending = cidPending;
    return this;
  }
  keyvalues(keyvalues) {
    this.query.metadata = keyvalues;
    return this;
  }
  noGroup(noGroup) {
    this.query.noGroup = noGroup;
    return this;
  }
  pageToken(pageToken) {
    this.query.pageToken = pageToken;
    return this;
  }
  then(onfulfilled) {
    return this.fetchPage().then(onfulfilled);
  }
  async fetchPage() {
    if (this.currentPageToken) {
      this.query.pageToken = this.currentPageToken;
    }
    const response = await listFiles(this.config, this.privacy, this.query);
    this.currentPageToken = response.next_page_token;
    return response;
  }
  async* [Symbol.asyncIterator]() {
    while (true) {
      const items = await this.fetchPage();
      for (const item of items.files) {
        yield item;
      }
      if (!this.currentPageToken) {
        break;
      }
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
var FilterQueue = class {
  constructor(config) {
    this.query = {};
    this.requestCount = 0;
    this.lastRequestTime = 0;
    this.MAX_REQUESTS_PER_MINUTE = 30;
    this.MINUTE_IN_MS = 60000;
    this.config = config;
  }
  cid(cid) {
    this.query.cid = cid;
    return this;
  }
  status(status) {
    this.query.status = status;
    return this;
  }
  pageLimit(limit) {
    this.query.limit = limit;
    return this;
  }
  pageToken(pageToken) {
    this.query.pageToken = pageToken;
    return this;
  }
  async fetchPage() {
    if (this.currentPageToken) {
      this.query.pageToken = this.currentPageToken;
    }
    const response = await queue(this.config, this.query);
    this.currentPageToken = response.next_page_token;
    return response;
  }
  sort(sort) {
    this.query.sort = sort;
    return this;
  }
  then(onfulfilled) {
    return queue(this.config, this.query).then(onfulfilled);
  }
  async rateLimit() {
    this.requestCount++;
    const now = Date.now();
    if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
      const timePassedSinceLastRequest = now - this.lastRequestTime;
      if (timePassedSinceLastRequest < this.MINUTE_IN_MS) {
        const delayTime = this.MINUTE_IN_MS - timePassedSinceLastRequest;
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }
      this.requestCount = 0;
    }
    this.lastRequestTime = Date.now();
  }
  async* [Symbol.asyncIterator]() {
    while (true) {
      const items = await this.fetchPage();
      for (const item of items.jobs) {
        yield item;
      }
      if (!this.currentPageToken) {
        break;
      }
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
var PublicFiles = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  list() {
    return new FilterFiles(this.config, "public");
  }
  get(id) {
    return getFile(this.config, id, "public");
  }
  delete(files) {
    return deleteFile(this.config, files, "public");
  }
  update(options) {
    return updateFile(this.config, options, "public");
  }
  addSwap(options) {
    return swapCid(this.config, options, "public");
  }
  getSwapHistory(options) {
    return swapHistory(this.config, options, "public");
  }
  deleteSwap(cid) {
    return deleteSwap(this.config, cid, "public");
  }
  queue() {
    return new FilterQueue(this.config);
  }
  deletePinRequest(requestId) {
    return deletePinRequest(this.config, requestId);
  }
};
var PrivateFiles = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  list() {
    return new FilterFiles(this.config, "private");
  }
  get(id) {
    return getFile(this.config, id, "private");
  }
  delete(files) {
    return deleteFile(this.config, files, "private");
  }
  update(options) {
    return updateFile(this.config, options, "private");
  }
  addSwap(options) {
    return swapCid(this.config, options, "private");
  }
  getSwapHistory(options) {
    return swapHistory(this.config, options, "private");
  }
  deleteSwap(cid) {
    return deleteSwap(this.config, cid, "private");
  }
  vectorize(fileId) {
    return vectorizeFile(this.config, fileId);
  }
  queryVectors(options) {
    return vectorizeQuery(this.config, options);
  }
  deleteVectors(fileId) {
    return deleteFileVectors(this.config, fileId);
  }
};
var Files = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.public = new PublicFiles(config);
    this.private = new PrivateFiles(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
};
var UploadBuilder = class {
  constructor(config, uploadFunction, ...args) {
    this.metadata = {};
    this.config = config;
    this.uploadFunction = uploadFunction;
    this.args = args;
  }
  name(name) {
    if (!this.metadata) {
      this.metadata = {};
    }
    this.metadata.name = name;
    return this;
  }
  keyvalues(keyvalues) {
    if (!this.metadata) {
      this.metadata = {};
    }
    this.metadata.keyvalues = keyvalues;
    return this;
  }
  key(jwt) {
    this.keys = jwt;
    return this;
  }
  vectorize() {
    this.vector = true;
    return this;
  }
  url(url) {
    this.uploadUrl = url;
    return this;
  }
  group(groupId) {
    this.groupId = groupId;
    return this;
  }
  streamable() {
    this.isStreamable = true;
    return this;
  }
  peerAddress(peerAddresses) {
    this.peerAddresses = peerAddresses;
    return this;
  }
  then(onfulfilled, onrejected) {
    const options = this.args[this.args.length - 1] || {};
    if (this.metadata) {
      options.metadata = this.metadata;
    }
    if (this.keys) {
      options.keys = this.keys;
    }
    if (this.groupId) {
      options.groupId = this.groupId;
    }
    if (this.vector) {
      options.vectorize = this.vector;
    }
    if (this.uploadUrl) {
      options.url = this.uploadUrl;
    }
    if (this.isStreamable) {
      options.streamable = this.isStreamable;
    }
    if (this.peerAddresses) {
      options.peerAddresses = this.peerAddresses;
    }
    this.args[this.args.length - 1] = options;
    return this.uploadFunction(this.config, ...this.args).then(onfulfilled, onrejected);
  }
};
var PublicUpload = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  file(file, options) {
    return new UploadBuilder(this.config, (config, file2, options2) => uploadFile(config, file2, "public", options2), file, options);
  }
  fileArray(files, options) {
    return new UploadBuilder(this.config, (config, file, options2) => uploadFileArray(config, file, "public", options2), files, options);
  }
  base64(base64String, options) {
    return new UploadBuilder(this.config, (config, base64String2, options2) => uploadBase64(config, base64String2, "public", options2), base64String, options);
  }
  url(url, options) {
    return new UploadBuilder(this.config, (config, url2, options2) => uploadUrl(config, url2, "public", options2), url, options);
  }
  json(data, options) {
    return new UploadBuilder(this.config, (config, data2, options2) => uploadJson(config, data2, "public", options2), data, options);
  }
  cid(cid, options) {
    return new UploadBuilder(this.config, (config, cid2, options2) => uploadCid(config, cid2, options2), cid, options);
  }
  createSignedURL(options) {
    return createSignedUploadURL(this.config, options, "public");
  }
};
var PrivateUpload = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  file(file, options) {
    return new UploadBuilder(this.config, (config, file2, options2) => uploadFile(config, file2, "private", options2), file, options);
  }
  base64(base64String, options) {
    return new UploadBuilder(this.config, (config, base64String2, options2) => uploadBase64(config, base64String2, "private", options2), base64String, options);
  }
  url(url, options) {
    return new UploadBuilder(this.config, (config, url2, options2) => uploadUrl(config, url2, "private", options2), url, options);
  }
  json(data, options) {
    return new UploadBuilder(this.config, (config, data2, options2) => uploadJson(config, data2, "private", options2), data, options);
  }
  createSignedURL(options) {
    return createSignedUploadURL(this.config, options, "private");
  }
};
var Upload = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.public = new PublicUpload(config);
    this.private = new PrivateUpload(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
};
var addSignature = async (config, options, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    signature: options.signature,
    address: options.address
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/addSignature"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${network}/signature/${options.cid}`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      if (request.status === 403) {
        throw new PinataError("Unauthorized signing, you must be the original owner of the file and it must not have a signature", request.status, {
          error: errorData,
          code: "HTTP_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res.data;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing addSignature: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while adding signature to CID");
  }
};
var getSignature = async (config, cid, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/getSignature"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${network}/signature/${cid}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    const res = await request.json();
    return res.data;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing getSignature: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while fetching signature for CID");
  }
};
var removeSignature = async (config, cid, network) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/removeSignature"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${network}/signature/${cid}`, {
      method: "DELETE",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(`Authentication failed: ${errorData}`, request.status, {
          error: errorData,
          code: "AUTH_ERROR",
          metadata: {
            requestUrl: request.url
          }
        });
      }
      throw new NetworkError(`HTTP error: ${errorData}`, request.status, {
        error: errorData,
        code: "HTTP_ERROR",
        metadata: {
          requestUrl: request.url
        }
      });
    }
    return "OK";
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing addSignature: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while adding signature to CID");
  }
};
var PublicSignatures = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  add(options) {
    return addSignature(this.config, options, "public");
  }
  get(cid) {
    return getSignature(this.config, cid, "public");
  }
  delete(cid) {
    return removeSignature(this.config, cid, "public");
  }
};
var Signatures = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.public = new PublicSignatures(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
};
var PinataSDK = class {
  constructor(config) {
    this.config = formatConfig(config);
    this.files = new Files(this.config);
    this.upload = new Upload(this.config);
    this.gateways = new Gateways(this.config);
    this.keys = new Keys(this.config);
    this.groups = new Groups(this.config);
    this.analytics = new Analytics(this.config);
    this.signatures = new Signatures(this.config);
  }
  setNewHeaders(headers) {
    if (!this.config) {
      this.config = { pinataJwt: "", customHeaders: {} };
    }
    this.config.customHeaders = { ...this.config.customHeaders, ...headers };
    this.files.updateConfig(this.config);
    this.upload.updateConfig(this.config);
    this.gateways.updateConfig(this.config);
    this.keys.updateConfig(this.config);
    this.groups.updateConfig(this.config);
    this.analytics.updateConfig(this.config);
    this.signatures.updateConfig(this.config);
  }
  setNewJwt(jwt) {
    if (!this.config) {
      this.config = { pinataJwt: "" };
    }
    this.config.pinataJwt = jwt;
    this.files.updateConfig(this.config);
    this.upload.updateConfig(this.config);
    this.gateways.updateConfig(this.config);
    this.keys.updateConfig(this.config);
    this.groups.updateConfig(this.config);
    this.analytics.updateConfig(this.config);
    this.signatures.updateConfig(this.config);
  }
  testAuthentication() {
    return testAuthentication(this.config);
  }
};

// src/index.ts
var app = new Hono2;
var jwt = process.env.PINATA_JWT;
var gateway = process.env.GATEWAY_URL;
app.use(cors());
app.get("/", (c) => c.text("Hello Hono!"));
app.post("/identify_group", async (c) => {
  const orgCode = c.req.query("orgCode");
  if (!orgCode || !jwt)
    return c.json({ error: "Missing orgCode or JWT" }, { status: 400 });
  try {
    const pinata = new PinataSDK({ pinataJwt: jwt });
    const list = await pinata.groups.public.list().name(orgCode);
    const existing = list.groups.find((g) => g.name === orgCode);
    if (existing) {
      return c.json({ groupId: existing.id, created: false });
    }
    const created = await pinata.groups.public.create({ name: orgCode });
    return c.json({ groupId: created.id, created: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to identify or create group" }, { status: 500 });
  }
});
app.post("/upload_file", async (c) => {
  const body = await c.req.parseBody();
  const orgId = c.req.query("orgId");
  const file = body["file"];
  if (!jwt || !gateway) {
    return c.json({ error: "Missing PINATA_JWT or GATEWAY_URL" }, { status: 500 });
  }
  if (!orgId || !file) {
    return c.json({ error: "Missing orgId or file" }, { status: 400 });
  }
  try {
    const pinata = new PinataSDK({ pinataJwt: jwt, pinataGateway: gateway });
    const upload = await pinata.upload.public.file(file).group(orgId);
    return c.json({ cid: upload.cid, groupId: orgId });
  } catch (e) {
    console.error("Upload failed:", e);
    return c.json({ error: "File upload failed" }, { status: 500 });
  }
});
app.get("/identify_org", async (c) => {
  const orgCode = c.req.query("orgCode");
  if (!orgCode || !jwt)
    return c.json({ error: "Missing orgCode or JWT" }, { status: 400 });
  try {
    const pinata = new PinataSDK({ pinataJwt: jwt });
    const list = await pinata.groups.public.list().name(orgCode);
    const group = list.groups.find((g) => g.name === orgCode);
    if (!group)
      return c.json({ error: "Group not found" }, { status: 404 });
    const info = await pinata.groups.public.get({ groupId: group.id });
    return c.json({ group: info });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to fetch group info" }, { status: 500 });
  }
});
app.post("/create_org", async (c) => {
  const orgCode = c.req.query("orgCode");
  if (!orgCode || !jwt) {
    return c.json({ error: "Missing orgCode or JWT" }, { status: 400 });
  }
  try {
    const pinata = new PinataSDK({ pinataJwt: jwt });
    const newGroup = await pinata.groups.public.create({
      name: orgCode
    });
    return c.json({ group: newGroup });
  } catch (err) {
    console.error("Failed to create group:", err);
    return c.json({ error: "Failed to create organization" }, { status: 500 });
  }
});
app.get("/retrieve_file", async (c) => {
  const orgId = c.req.query("orgId");
  if (!orgId || !jwt) {
    return c.json({ error: "Missing orgId or JWT" }, { status: 400 });
  }
  try {
    const pinata = new PinataSDK({ pinataJwt: jwt });
    const filesResponse = await pinata.files.public.list().group(orgId);
    const files = filesResponse.files.map((f) => ({
      id: f.id,
      cid: f.cid,
      name: f.name,
      size: f.size,
      created_at: f.created_at,
      gateway_url: `${gateway}/ipfs/${f.cid}`
    }));
    return c.json({ files });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to retrieve files" }, { status: 500 });
  }
});
var src_default = app;
export {
  src_default as default
};
