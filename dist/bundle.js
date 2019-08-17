/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _seed_data = __webpack_require__(/*! ./seed_data */ "./src/seed_data.js");

var Data = _interopRequireWildcard(_seed_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import {resultsTree} from "./dendrogram";

var searchInput = document.querySelector("#email"); // overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141


var ValidateEmail = function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true;
    }
    alert("You have entered an invalid email address!");
    return false;
};

searchInput.addEventListener("keydown", function (event) {
    var email = searchInput.value;
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (event.key === "Enter" && ValidateEmail(email)) {
        event.preventDefault();
        // email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        //////////////////////////////////
        var hibpApiKey = '03a794521329432bad12af5f5bc6db3e';
        var keyHeaders = new Headers();
        debugger;
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            debugger;
            console.log(data);
            var hiroData = Data.childParentData(email, data);
            resultsTree(hiroData);
            searchInput.value = "Enter email";
        }).catch(function (error) {

            console.log(error);
        });

        ///////////////////////////////
    } else {
        console.log("Please enter email");
    }
});

/***/ }),

/***/ "./src/seed_data.js":
/*!**************************!*\
  !*** ./src/seed_data.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//https://www.youtube.com/watch?v=DvqeaVSe6Ko used as referance for d3 data structuring


var childParentObject = function childParentObject(child, parent) {
    var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    return {
        "child": child,
        "parent": parent,
        details: details
    };
};

var childParentData = exports.childParentData = function childParentData(email, data) {
    var array = [];
    var rootParent = { "child": email, "parent": "" };
    array.push(rootParent);

    data.map(function (breach) {
        array.push(childParentObject(breach["Title"], email, breach["LogoPath"]));
        array.push(childParentObject(breach["Description"], breach["Title"]));
        debugger;
        breach["DataClasses"].map(function (type) {
            array.push(childParentObject(type, breach["Description"]));
        });
    });

    var dataStructure = d3.stratify().id(function (d) {
        return d.child;
    }).parentId(function (d) {
        return d.parent;
    })(array);

    return dataStructure;
};

// export const data = [
//     {
//         "Name": "HauteLook",
//         "Title": "HauteLook",
//         "Domain": "hautelook.com",
//         "BreachDate": "2018-08-07",
//         "AddedDate": "2019-03-21T21:57:32Z",
//         "ModifiedDate": "2019-03-21T21:57:32Z",
//         "PwnCount": 28510459,
//         "Description": "In mid-2018, the fashion shopping site <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">HauteLook was among a raft of sites that were breached and their data then sold in early-2019</a>. The data included over 28 million unique email addresses alongside names, genders, dates of birth and passwords stored as bcrypt hashes. The data was provided to HIBP by <a href=\"https://dehashed.com/\" target=\"_blank\" rel=\"noopener\">dehashed.com</a>.",
//         "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/HauteLook.png",
//         "DataClasses": [
//             "Dates of birth",
//             "Email addresses",
//             "Genders",
//             "Geographic locations",
//             "Names",
//             "Passwords"
//         ],
//         "IsVerified": true,
//         "IsFabricated": false,
//         "IsSensitive": false,
//         "IsRetired": false,
//         "IsSpamList": false
//     },
//     {
//         "Name": "MyFitnessPal",
//         "Title": "MyFitnessPal",
//         "Domain": "myfitnesspal.com",
//         "BreachDate": "2018-02-01",
//         "AddedDate": "2019-02-21T19:28:46Z",
//         "ModifiedDate": "2019-02-21T20:00:56Z",
//         "PwnCount": 143606147,
//         "Description": "In February 2018, the diet and exercise service <a href=\"https://content.myfitnesspal.com/security-information/FAQ.html\" target=\"_blank\" rel=\"noopener\">MyFitnessPal suffered a data breach</a>. The incident exposed 144 million unique email addresses alongside usernames, IP addresses and passwords stored as SHA-1 and bcrypt hashes (the former for earlier accounts, the latter for newer accounts). In 2019, <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">the data appeared listed for sale on a dark web marketplace</a> (along with several other large breaches) and subsequently began circulating more broadly. The data was provided to HIBP by a source who requested it to be attributed to &quot;BenjaminBlue@exploit.im&quot;.",
//         "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/MyFitnessPal.png",
//         "DataClasses": [
//             "Email addresses",
//             "IP addresses",
//             "Passwords",
//             "Usernames"
//         ],
//         "IsVerified": true,
//         "IsFabricated": false,
//         "IsSensitive": false,
//         "IsRetired": false,
//         "IsSpamList": false
//     }
// ]

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkX2RhdGEuanMiXSwibmFtZXMiOlsiRGF0YSIsInNlYXJjaElucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiVmFsaWRhdGVFbWFpbCIsImVtYWlsIiwidGVzdCIsImFsZXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwibmV3VXJsIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsInJlcGxhY2UiLCJoaWJwQXBpS2V5Iiwia2V5SGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiaGlyb0RhdGEiLCJjaGlsZFBhcmVudERhdGEiLCJyZXN1bHRzVHJlZSIsImNhdGNoIiwiZXJyb3IiLCJjaGlsZFBhcmVudE9iamVjdCIsImNoaWxkIiwicGFyZW50IiwiZGV0YWlscyIsInVuZGVmaW5lZCIsImFycmF5Iiwicm9vdFBhcmVudCIsInB1c2giLCJtYXAiLCJicmVhY2giLCJ0eXBlIiwiZGF0YVN0cnVjdHVyZSIsImQzIiwic3RyYXRpZnkiLCJpZCIsImQiLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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LEVBQXlDQSxPQUFPLE9BQVAsQ0FBekMsQ0FBWDtBQUNBO0FBQ0FBLGVBQU8sYUFBUCxFQUFzQkQsR0FBdEIsQ0FBMEIsZ0JBQU87QUFDN0JILGtCQUFNRSxJQUFOLENBQVdQLGtCQUFrQlUsSUFBbEIsRUFBd0JELE9BQU8sYUFBUCxDQUF4QixDQUFYO0FBQ0gsU0FGRDtBQUdILEtBUEQ7O0FBU0EsUUFBSUUsZ0JBQWdCQyxHQUFHQyxRQUFILEdBQ25CQyxFQURtQixDQUNoQixVQUFTQyxDQUFULEVBQVc7QUFBQyxlQUFPQSxFQUFFZCxLQUFUO0FBQWdCLEtBRFosRUFFbkJlLFFBRm1CLENBRVYsVUFBU0QsQ0FBVCxFQUFXO0FBQUMsZUFBT0EsRUFBRWIsTUFBVDtBQUFnQixLQUZsQixFQUduQkcsS0FIbUIsQ0FBcEI7O0FBS0EsV0FBT00sYUFBUDtBQUNILENBcEJNOztBQXlCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIG92ZXJ2aWV3IG9mIGNvZGUgc3RydWN0dXJlIGluc3BpcmVkIGJ5IGNhdGVuYSBkZXZlbG9wZWQgYnkgY2xlcmljbCBnaXRodWJcbi8vY29ycy1hbnl3aGVyZSB1c2VkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzODcxNjM3L25vLWFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbi1oZWFkZXItaXMtcHJlc2VudC1vbi10aGUtcmVxdWVzdGVkLXJlc291cmNlLXdoZS80Mzg4MTE0MVxuaW1wb3J0ICogYXMgRGF0YSBmcm9tIFwiLi9zZWVkX2RhdGFcIjtcbi8vIGltcG9ydCB7cmVzdWx0c1RyZWV9IGZyb20gXCIuL2RlbmRyb2dyYW1cIjtcblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpXG5cblxuY29uc3QgVmFsaWRhdGVFbWFpbCA9IChlbWFpbCkgPT57XG4gICAgaWYgKC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7Miw0fSkrJC8udGVzdChlbWFpbCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgYWxlcnQoXCJZb3UgaGF2ZSBlbnRlcmVkIGFuIGludmFsaWQgZW1haWwgYWRkcmVzcyFcIilcbiAgICByZXR1cm4gZmFsc2Vcbn07XG5cblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQ9PntcbiAgICBsZXQgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICBsZXQgbmV3VXJsID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL2FwaS92My9icmVhY2hlZGFjY291bnQvJztcbiAgIFxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBWYWxpZGF0ZUVtYWlsKGVtYWlsKSl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuICAgICAgICBcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICBjb25zdCBoaWJwQXBpS2V5ID0gJzAzYTc5NDUyMTMyOTQzMmJhZDEyYWY1ZjViYzZkYjNlJztcbiAgICAgICAgbGV0IGtleUhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBrZXlIZWFkZXJzLmFwcGVuZCgnSGlicC1BcGktS2V5JywgaGlicEFwaUtleSlcbiAgICAgICAgXG4gICAgICAgIGZldGNoKG5ld1VybCwgeyBtZXRob2Q6IFwiR0VUXCIsIGhlYWRlcnM6IGtleUhlYWRlcnMgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgZGF0YSk7IFxuICAgICAgICAgICAgcmVzdWx0c1RyZWUoaGlyb0RhdGEpOyBcbiAgICAgICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJFbnRlciBlbWFpbFwiICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxlYXNlIGVudGVyIGVtYWlsXCIpO1xuICAgIH1cbn0pXG4iLCIvL2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9RHZxZWFWU2U2S28gdXNlZCBhcyByZWZlcmFuY2UgZm9yIGQzIGRhdGEgc3RydWN0dXJpbmdcblxuXG5jb25zdCBjaGlsZFBhcmVudE9iamVjdCA9IChjaGlsZCwgcGFyZW50LCBkZXRhaWxzID0gdW5kZWZpbmVkKSA9PntcbiAgICByZXR1cm4oe1xuICAgICAgICBcImNoaWxkXCI6IGNoaWxkLFxuICAgICAgICBcInBhcmVudFwiOiBwYXJlbnQsXG4gICAgICAgIGRldGFpbHMsXG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGNoaWxkUGFyZW50RGF0YSA9IChlbWFpbCwgZGF0YSk9PntcbiAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICBjb25zdCByb290UGFyZW50ID0ge1wiY2hpbGRcIjogZW1haWwsIFwicGFyZW50XCI6IFwiXCJ9O1xuICAgIGFycmF5LnB1c2gocm9vdFBhcmVudCk7XG4gICAgXG4gICAgZGF0YS5tYXAoYnJlYWNoID0+e1xuICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KGJyZWFjaFtcIlRpdGxlXCJdLCBlbWFpbCwgYnJlYWNoW1wiTG9nb1BhdGhcIl0pKTtcbiAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdChicmVhY2hbXCJEZXNjcmlwdGlvblwiXSwgYnJlYWNoW1wiVGl0bGVcIl0pKTtcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAgYnJlYWNoW1wiRGF0YUNsYXNzZXNcIl0ubWFwKHR5cGUgPT57XG4gICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KHR5cGUsIGJyZWFjaFtcIkRlc2NyaXB0aW9uXCJdKSk7XG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBcbiAgICBsZXQgZGF0YVN0cnVjdHVyZSA9IGQzLnN0cmF0aWZ5KClcbiAgICAuaWQoZnVuY3Rpb24oZCl7cmV0dXJuIGQuY2hpbGQ7fSlcbiAgICAucGFyZW50SWQoZnVuY3Rpb24oZCl7cmV0dXJuIGQucGFyZW50fSlcbiAgICAoYXJyYXkpO1xuICAgIFxuICAgIHJldHVybiBkYXRhU3RydWN0dXJlO1xufVxuXG5cblxuXG4vLyBleHBvcnQgY29uc3QgZGF0YSA9IFtcbi8vICAgICB7XG4vLyAgICAgICAgIFwiTmFtZVwiOiBcIkhhdXRlTG9va1wiLFxuLy8gICAgICAgICBcIlRpdGxlXCI6IFwiSGF1dGVMb29rXCIsXG4vLyAgICAgICAgIFwiRG9tYWluXCI6IFwiaGF1dGVsb29rLmNvbVwiLFxuLy8gICAgICAgICBcIkJyZWFjaERhdGVcIjogXCIyMDE4LTA4LTA3XCIsXG4vLyAgICAgICAgIFwiQWRkZWREYXRlXCI6IFwiMjAxOS0wMy0yMVQyMTo1NzozMlpcIixcbi8vICAgICAgICAgXCJNb2RpZmllZERhdGVcIjogXCIyMDE5LTAzLTIxVDIxOjU3OjMyWlwiLFxuLy8gICAgICAgICBcIlB3bkNvdW50XCI6IDI4NTEwNDU5LFxuLy8gICAgICAgICBcIkRlc2NyaXB0aW9uXCI6IFwiSW4gbWlkLTIwMTgsIHRoZSBmYXNoaW9uIHNob3BwaW5nIHNpdGUgPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudGhlcmVnaXN0ZXIuY28udWsvMjAxOS8wMi8xMS82MjBfbWlsbGlvbl9oYWNrZWRfYWNjb3VudHNfZGFya193ZWIvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+SGF1dGVMb29rIHdhcyBhbW9uZyBhIHJhZnQgb2Ygc2l0ZXMgdGhhdCB3ZXJlIGJyZWFjaGVkIGFuZCB0aGVpciBkYXRhIHRoZW4gc29sZCBpbiBlYXJseS0yMDE5PC9hPi4gVGhlIGRhdGEgaW5jbHVkZWQgb3ZlciAyOCBtaWxsaW9uIHVuaXF1ZSBlbWFpbCBhZGRyZXNzZXMgYWxvbmdzaWRlIG5hbWVzLCBnZW5kZXJzLCBkYXRlcyBvZiBiaXJ0aCBhbmQgcGFzc3dvcmRzIHN0b3JlZCBhcyBiY3J5cHQgaGFzaGVzLiBUaGUgZGF0YSB3YXMgcHJvdmlkZWQgdG8gSElCUCBieSA8YSBocmVmPVxcXCJodHRwczovL2RlaGFzaGVkLmNvbS9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj5kZWhhc2hlZC5jb208L2E+LlwiLFxuLy8gICAgICAgICBcIkxvZ29QYXRoXCI6IFwiaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vQ29udGVudC9JbWFnZXMvUHduZWRMb2dvcy9IYXV0ZUxvb2sucG5nXCIsXG4vLyAgICAgICAgIFwiRGF0YUNsYXNzZXNcIjogW1xuLy8gICAgICAgICAgICAgXCJEYXRlcyBvZiBiaXJ0aFwiLFxuLy8gICAgICAgICAgICAgXCJFbWFpbCBhZGRyZXNzZXNcIixcbi8vICAgICAgICAgICAgIFwiR2VuZGVyc1wiLFxuLy8gICAgICAgICAgICAgXCJHZW9ncmFwaGljIGxvY2F0aW9uc1wiLFxuLy8gICAgICAgICAgICAgXCJOYW1lc1wiLFxuLy8gICAgICAgICAgICAgXCJQYXNzd29yZHNcIlxuLy8gICAgICAgICBdLFxuLy8gICAgICAgICBcIklzVmVyaWZpZWRcIjogdHJ1ZSxcbi8vICAgICAgICAgXCJJc0ZhYnJpY2F0ZWRcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNTZW5zaXRpdmVcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNSZXRpcmVkXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzU3BhbUxpc3RcIjogZmFsc2Vcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgICAgXCJOYW1lXCI6IFwiTXlGaXRuZXNzUGFsXCIsXG4vLyAgICAgICAgIFwiVGl0bGVcIjogXCJNeUZpdG5lc3NQYWxcIixcbi8vICAgICAgICAgXCJEb21haW5cIjogXCJteWZpdG5lc3NwYWwuY29tXCIsXG4vLyAgICAgICAgIFwiQnJlYWNoRGF0ZVwiOiBcIjIwMTgtMDItMDFcIixcbi8vICAgICAgICAgXCJBZGRlZERhdGVcIjogXCIyMDE5LTAyLTIxVDE5OjI4OjQ2WlwiLFxuLy8gICAgICAgICBcIk1vZGlmaWVkRGF0ZVwiOiBcIjIwMTktMDItMjFUMjA6MDA6NTZaXCIsXG4vLyAgICAgICAgIFwiUHduQ291bnRcIjogMTQzNjA2MTQ3LFxuLy8gICAgICAgICBcIkRlc2NyaXB0aW9uXCI6IFwiSW4gRmVicnVhcnkgMjAxOCwgdGhlIGRpZXQgYW5kIGV4ZXJjaXNlIHNlcnZpY2UgPGEgaHJlZj1cXFwiaHR0cHM6Ly9jb250ZW50Lm15Zml0bmVzc3BhbC5jb20vc2VjdXJpdHktaW5mb3JtYXRpb24vRkFRLmh0bWxcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj5NeUZpdG5lc3NQYWwgc3VmZmVyZWQgYSBkYXRhIGJyZWFjaDwvYT4uIFRoZSBpbmNpZGVudCBleHBvc2VkIDE0NCBtaWxsaW9uIHVuaXF1ZSBlbWFpbCBhZGRyZXNzZXMgYWxvbmdzaWRlIHVzZXJuYW1lcywgSVAgYWRkcmVzc2VzIGFuZCBwYXNzd29yZHMgc3RvcmVkIGFzIFNIQS0xIGFuZCBiY3J5cHQgaGFzaGVzICh0aGUgZm9ybWVyIGZvciBlYXJsaWVyIGFjY291bnRzLCB0aGUgbGF0dGVyIGZvciBuZXdlciBhY2NvdW50cykuIEluIDIwMTksIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LnRoZXJlZ2lzdGVyLmNvLnVrLzIwMTkvMDIvMTEvNjIwX21pbGxpb25faGFja2VkX2FjY291bnRzX2Rhcmtfd2ViL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPnRoZSBkYXRhIGFwcGVhcmVkIGxpc3RlZCBmb3Igc2FsZSBvbiBhIGRhcmsgd2ViIG1hcmtldHBsYWNlPC9hPiAoYWxvbmcgd2l0aCBzZXZlcmFsIG90aGVyIGxhcmdlIGJyZWFjaGVzKSBhbmQgc3Vic2VxdWVudGx5IGJlZ2FuIGNpcmN1bGF0aW5nIG1vcmUgYnJvYWRseS4gVGhlIGRhdGEgd2FzIHByb3ZpZGVkIHRvIEhJQlAgYnkgYSBzb3VyY2Ugd2hvIHJlcXVlc3RlZCBpdCB0byBiZSBhdHRyaWJ1dGVkIHRvICZxdW90O0JlbmphbWluQmx1ZUBleHBsb2l0LmltJnF1b3Q7LlwiLFxuLy8gICAgICAgICBcIkxvZ29QYXRoXCI6IFwiaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vQ29udGVudC9JbWFnZXMvUHduZWRMb2dvcy9NeUZpdG5lc3NQYWwucG5nXCIsXG4vLyAgICAgICAgIFwiRGF0YUNsYXNzZXNcIjogW1xuLy8gICAgICAgICAgICAgXCJFbWFpbCBhZGRyZXNzZXNcIixcbi8vICAgICAgICAgICAgIFwiSVAgYWRkcmVzc2VzXCIsXG4vLyAgICAgICAgICAgICBcIlBhc3N3b3Jkc1wiLFxuLy8gICAgICAgICAgICAgXCJVc2VybmFtZXNcIlxuLy8gICAgICAgICBdLFxuLy8gICAgICAgICBcIklzVmVyaWZpZWRcIjogdHJ1ZSxcbi8vICAgICAgICAgXCJJc0ZhYnJpY2F0ZWRcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNTZW5zaXRpdmVcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNSZXRpcmVkXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzU3BhbUxpc3RcIjogZmFsc2Vcbi8vICAgICB9XG4vLyBdIl0sInNvdXJjZVJvb3QiOiIifQ==