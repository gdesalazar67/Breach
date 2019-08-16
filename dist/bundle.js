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


searchInput.addEventListener("keydown", function (event) {
    var email = void 0;
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (event.key === "Enter" && searchInput.value.length > 0) {
        event.preventDefault();
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        var hiroData = Data.childParentData(email, Data.data);
        //////////////////////////////////
        var hibpApiKey = '03a794521329432bad12af5f5bc6db3e';
        var keyHeaders = new Headers();
        debugger;
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {

            console.log(data);
        }).catch(function (error) {

            console.log(error);
        });

        ///////////////////////////////
        resultsTree(hiroData);
    } else {
        console.log("Please enter email");
    }
});

// const hibpApiKey = '[03a794521329432bad12af5f5bc6db3e]';
// let keyHeader = new Headers();
// keyHeader.append('Hibp-Api-Key', hibpApiKey)


// fetch(newUrl,{method: "GET", headers: keyHeader})
//     .then(res => res.json())
//     .then(function(data){

//        console.log(data)
//     })
//     .catch(error => {

//         console.log(error)
//     })


// api key 03a794521329432bad12af5f5bc6db3e
// hibp-api-key: [03a794521329432bad12af5f5bc6db3e]

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

var data = exports.data = [{
    "Name": "HauteLook",
    "Title": "HauteLook",
    "Domain": "hautelook.com",
    "BreachDate": "2018-08-07",
    "AddedDate": "2019-03-21T21:57:32Z",
    "ModifiedDate": "2019-03-21T21:57:32Z",
    "PwnCount": 28510459,
    "Description": "In mid-2018, the fashion shopping site <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">HauteLook was among a raft of sites that were breached and their data then sold in early-2019</a>. The data included over 28 million unique email addresses alongside names, genders, dates of birth and passwords stored as bcrypt hashes. The data was provided to HIBP by <a href=\"https://dehashed.com/\" target=\"_blank\" rel=\"noopener\">dehashed.com</a>.",
    "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/HauteLook.png",
    "DataClasses": ["Dates of birth", "Email addresses", "Genders", "Geographic locations", "Names", "Passwords"],
    "IsVerified": true,
    "IsFabricated": false,
    "IsSensitive": false,
    "IsRetired": false,
    "IsSpamList": false
}, {
    "Name": "MyFitnessPal",
    "Title": "MyFitnessPal",
    "Domain": "myfitnesspal.com",
    "BreachDate": "2018-02-01",
    "AddedDate": "2019-02-21T19:28:46Z",
    "ModifiedDate": "2019-02-21T20:00:56Z",
    "PwnCount": 143606147,
    "Description": "In February 2018, the diet and exercise service <a href=\"https://content.myfitnesspal.com/security-information/FAQ.html\" target=\"_blank\" rel=\"noopener\">MyFitnessPal suffered a data breach</a>. The incident exposed 144 million unique email addresses alongside usernames, IP addresses and passwords stored as SHA-1 and bcrypt hashes (the former for earlier accounts, the latter for newer accounts). In 2019, <a href=\"https://www.theregister.co.uk/2019/02/11/620_million_hacked_accounts_dark_web/\" target=\"_blank\" rel=\"noopener\">the data appeared listed for sale on a dark web marketplace</a> (along with several other large breaches) and subsequently began circulating more broadly. The data was provided to HIBP by a source who requested it to be attributed to &quot;BenjaminBlue@exploit.im&quot;.",
    "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/MyFitnessPal.png",
    "DataClasses": ["Email addresses", "IP addresses", "Passwords", "Usernames"],
    "IsVerified": true,
    "IsFabricated": false,
    "IsSensitive": false,
    "IsRetired": false,
    "IsSpamList": false
}];

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkX2RhdGEuanMiXSwibmFtZXMiOlsiRGF0YSIsInNlYXJjaElucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVtYWlsIiwibmV3VXJsIiwiZXZlbnQiLCJrZXkiLCJ2YWx1ZSIsImxlbmd0aCIsInByZXZlbnREZWZhdWx0IiwicmVwbGFjZSIsImhpcm9EYXRhIiwiY2hpbGRQYXJlbnREYXRhIiwiZGF0YSIsImhpYnBBcGlLZXkiLCJrZXlIZWFkZXJzIiwiSGVhZGVycyIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJyZXN1bHRzVHJlZSIsImNoaWxkUGFyZW50T2JqZWN0IiwiY2hpbGQiLCJwYXJlbnQiLCJkZXRhaWxzIiwidW5kZWZpbmVkIiwiYXJyYXkiLCJyb290UGFyZW50IiwicHVzaCIsIm1hcCIsImJyZWFjaCIsInR5cGUiLCJkYXRhU3RydWN0dXJlIiwiZDMiLCJzdHJhdGlmeSIsImlkIiwiZCIsInBhcmVudElkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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ZkcsS0FIZSxDQUFwQjs7QUFLQSxXQUFPTSxhQUFQO0FBQ0gsQ0FwQk0sQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIG92ZXJ2aWV3IG9mIGNvZGUgc3RydWN0dXJlIGluc3BpcmVkIGJ5IGNhdGVuYSBkZXZlbG9wZWQgYnkgY2xlcmljbCBnaXRodWJcbi8vY29ycy1hbnl3aGVyZSB1c2VkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzODcxNjM3L25vLWFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbi1oZWFkZXItaXMtcHJlc2VudC1vbi10aGUtcmVxdWVzdGVkLXJlc291cmNlLXdoZS80Mzg4MTE0MVxuaW1wb3J0ICogYXMgRGF0YSBmcm9tIFwiLi9zZWVkX2RhdGFcIjtcbi8vIGltcG9ydCB7cmVzdWx0c1RyZWV9IGZyb20gXCIuL2RlbmRyb2dyYW1cIjtcblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpXG5cblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQ9PntcbiAgICBsZXQgZW1haWw7XG4gICAgbGV0IG5ld1VybCA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9hcGkvdjMvYnJlYWNoZWRhY2NvdW50Lyc7XG4gICBcbiAgICBpZihldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBzZWFyY2hJbnB1dC52YWx1ZS5sZW5ndGggPiAwKXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZW1haWwgPSBlbWFpbC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICBuZXdVcmwgKz0gZW1haWwgKyBcIj90cnVuY2F0ZVJlc3BvbnNlPWZhbHNlXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgRGF0YS5kYXRhKTsgXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgY29uc3QgaGlicEFwaUtleSA9ICcwM2E3OTQ1MjEzMjk0MzJiYWQxMmFmNWY1YmM2ZGIzZSc7XG4gICAgICAgIGxldCBrZXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAga2V5SGVhZGVycy5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG4gICAgICAgIFxuICAgICAgICBmZXRjaChuZXdVcmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiBrZXlIZWFkZXJzIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgcmVzdWx0c1RyZWUoaGlyb0RhdGEpO1xuICAgIH1lbHNle1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBsZWFzZSBlbnRlciBlbWFpbFwiKTtcbiAgICB9XG59KVxuXG5cbi8vIGNvbnN0IGhpYnBBcGlLZXkgPSAnWzAzYTc5NDUyMTMyOTQzMmJhZDEyYWY1ZjViYzZkYjNlXSc7XG4vLyBsZXQga2V5SGVhZGVyID0gbmV3IEhlYWRlcnMoKTtcbi8vIGtleUhlYWRlci5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG5cblxuXG4vLyBmZXRjaChuZXdVcmwse21ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVyfSlcbi8vICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbi8vICAgICAudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgXG4vLyAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIFxuLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbi8vICAgICB9KVxuICAgICAgICBcblxuXG4vLyBhcGkga2V5IDAzYTc5NDUyMTMyOTQzMmJhZDEyYWY1ZjViYzZkYjNlXG4vLyBoaWJwLWFwaS1rZXk6IFswM2E3OTQ1MjEzMjk0MzJiYWQxMmFmNWY1YmM2ZGIzZV0iLCIvL2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9RHZxZWFWU2U2S28gdXNlZCBhcyByZWZlcmFuY2UgZm9yIGQzIGRhdGEgc3RydWN0dXJpbmdcblxuZXhwb3J0IGNvbnN0IGRhdGEgPSBbXG4gICAge1xuICAgICAgICBcIk5hbWVcIjogXCJIYXV0ZUxvb2tcIixcbiAgICAgICAgXCJUaXRsZVwiOiBcIkhhdXRlTG9va1wiLFxuICAgICAgICBcIkRvbWFpblwiOiBcImhhdXRlbG9vay5jb21cIixcbiAgICAgICAgXCJCcmVhY2hEYXRlXCI6IFwiMjAxOC0wOC0wN1wiLFxuICAgICAgICBcIkFkZGVkRGF0ZVwiOiBcIjIwMTktMDMtMjFUMjE6NTc6MzJaXCIsXG4gICAgICAgIFwiTW9kaWZpZWREYXRlXCI6IFwiMjAxOS0wMy0yMVQyMTo1NzozMlpcIixcbiAgICAgICAgXCJQd25Db3VudFwiOiAyODUxMDQ1OSxcbiAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkluIG1pZC0yMDE4LCB0aGUgZmFzaGlvbiBzaG9wcGluZyBzaXRlIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LnRoZXJlZ2lzdGVyLmNvLnVrLzIwMTkvMDIvMTEvNjIwX21pbGxpb25faGFja2VkX2FjY291bnRzX2Rhcmtfd2ViL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPkhhdXRlTG9vayB3YXMgYW1vbmcgYSByYWZ0IG9mIHNpdGVzIHRoYXQgd2VyZSBicmVhY2hlZCBhbmQgdGhlaXIgZGF0YSB0aGVuIHNvbGQgaW4gZWFybHktMjAxOTwvYT4uIFRoZSBkYXRhIGluY2x1ZGVkIG92ZXIgMjggbWlsbGlvbiB1bmlxdWUgZW1haWwgYWRkcmVzc2VzIGFsb25nc2lkZSBuYW1lcywgZ2VuZGVycywgZGF0ZXMgb2YgYmlydGggYW5kIHBhc3N3b3JkcyBzdG9yZWQgYXMgYmNyeXB0IGhhc2hlcy4gVGhlIGRhdGEgd2FzIHByb3ZpZGVkIHRvIEhJQlAgYnkgPGEgaHJlZj1cXFwiaHR0cHM6Ly9kZWhhc2hlZC5jb20vXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+ZGVoYXNoZWQuY29tPC9hPi5cIixcbiAgICAgICAgXCJMb2dvUGF0aFwiOiBcImh0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL0NvbnRlbnQvSW1hZ2VzL1B3bmVkTG9nb3MvSGF1dGVMb29rLnBuZ1wiLFxuICAgICAgICBcIkRhdGFDbGFzc2VzXCI6IFtcbiAgICAgICAgICAgIFwiRGF0ZXMgb2YgYmlydGhcIixcbiAgICAgICAgICAgIFwiRW1haWwgYWRkcmVzc2VzXCIsXG4gICAgICAgICAgICBcIkdlbmRlcnNcIixcbiAgICAgICAgICAgIFwiR2VvZ3JhcGhpYyBsb2NhdGlvbnNcIixcbiAgICAgICAgICAgIFwiTmFtZXNcIixcbiAgICAgICAgICAgIFwiUGFzc3dvcmRzXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJJc1ZlcmlmaWVkXCI6IHRydWUsXG4gICAgICAgIFwiSXNGYWJyaWNhdGVkXCI6IGZhbHNlLFxuICAgICAgICBcIklzU2Vuc2l0aXZlXCI6IGZhbHNlLFxuICAgICAgICBcIklzUmV0aXJlZFwiOiBmYWxzZSxcbiAgICAgICAgXCJJc1NwYW1MaXN0XCI6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiTmFtZVwiOiBcIk15Rml0bmVzc1BhbFwiLFxuICAgICAgICBcIlRpdGxlXCI6IFwiTXlGaXRuZXNzUGFsXCIsXG4gICAgICAgIFwiRG9tYWluXCI6IFwibXlmaXRuZXNzcGFsLmNvbVwiLFxuICAgICAgICBcIkJyZWFjaERhdGVcIjogXCIyMDE4LTAyLTAxXCIsXG4gICAgICAgIFwiQWRkZWREYXRlXCI6IFwiMjAxOS0wMi0yMVQxOToyODo0NlpcIixcbiAgICAgICAgXCJNb2RpZmllZERhdGVcIjogXCIyMDE5LTAyLTIxVDIwOjAwOjU2WlwiLFxuICAgICAgICBcIlB3bkNvdW50XCI6IDE0MzYwNjE0NyxcbiAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkluIEZlYnJ1YXJ5IDIwMTgsIHRoZSBkaWV0IGFuZCBleGVyY2lzZSBzZXJ2aWNlIDxhIGhyZWY9XFxcImh0dHBzOi8vY29udGVudC5teWZpdG5lc3NwYWwuY29tL3NlY3VyaXR5LWluZm9ybWF0aW9uL0ZBUS5odG1sXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+TXlGaXRuZXNzUGFsIHN1ZmZlcmVkIGEgZGF0YSBicmVhY2g8L2E+LiBUaGUgaW5jaWRlbnQgZXhwb3NlZCAxNDQgbWlsbGlvbiB1bmlxdWUgZW1haWwgYWRkcmVzc2VzIGFsb25nc2lkZSB1c2VybmFtZXMsIElQIGFkZHJlc3NlcyBhbmQgcGFzc3dvcmRzIHN0b3JlZCBhcyBTSEEtMSBhbmQgYmNyeXB0IGhhc2hlcyAodGhlIGZvcm1lciBmb3IgZWFybGllciBhY2NvdW50cywgdGhlIGxhdHRlciBmb3IgbmV3ZXIgYWNjb3VudHMpLiBJbiAyMDE5LCA8YSBocmVmPVxcXCJodHRwczovL3d3dy50aGVyZWdpc3Rlci5jby51ay8yMDE5LzAyLzExLzYyMF9taWxsaW9uX2hhY2tlZF9hY2NvdW50c19kYXJrX3dlYi9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj50aGUgZGF0YSBhcHBlYXJlZCBsaXN0ZWQgZm9yIHNhbGUgb24gYSBkYXJrIHdlYiBtYXJrZXRwbGFjZTwvYT4gKGFsb25nIHdpdGggc2V2ZXJhbCBvdGhlciBsYXJnZSBicmVhY2hlcykgYW5kIHN1YnNlcXVlbnRseSBiZWdhbiBjaXJjdWxhdGluZyBtb3JlIGJyb2FkbHkuIFRoZSBkYXRhIHdhcyBwcm92aWRlZCB0byBISUJQIGJ5IGEgc291cmNlIHdobyByZXF1ZXN0ZWQgaXQgdG8gYmUgYXR0cmlidXRlZCB0byAmcXVvdDtCZW5qYW1pbkJsdWVAZXhwbG9pdC5pbSZxdW90Oy5cIixcbiAgICAgICAgXCJMb2dvUGF0aFwiOiBcImh0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL0NvbnRlbnQvSW1hZ2VzL1B3bmVkTG9nb3MvTXlGaXRuZXNzUGFsLnBuZ1wiLFxuICAgICAgICBcIkRhdGFDbGFzc2VzXCI6IFtcbiAgICAgICAgICAgIFwiRW1haWwgYWRkcmVzc2VzXCIsXG4gICAgICAgICAgICBcIklQIGFkZHJlc3Nlc1wiLFxuICAgICAgICAgICAgXCJQYXNzd29yZHNcIixcbiAgICAgICAgICAgIFwiVXNlcm5hbWVzXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJJc1ZlcmlmaWVkXCI6IHRydWUsXG4gICAgICAgIFwiSXNGYWJyaWNhdGVkXCI6IGZhbHNlLFxuICAgICAgICBcIklzU2Vuc2l0aXZlXCI6IGZhbHNlLFxuICAgICAgICBcIklzUmV0aXJlZFwiOiBmYWxzZSxcbiAgICAgICAgXCJJc1NwYW1MaXN0XCI6IGZhbHNlXG4gICAgfVxuXVxuXG5jb25zdCBjaGlsZFBhcmVudE9iamVjdCA9IChjaGlsZCwgcGFyZW50LCBkZXRhaWxzID0gdW5kZWZpbmVkKSA9PntcbiAgICByZXR1cm4oe1xuICAgICAgICBcImNoaWxkXCI6IGNoaWxkLFxuICAgICAgICBcInBhcmVudFwiOiBwYXJlbnQsXG4gICAgICAgIGRldGFpbHMsXG4gICAgfSlcbn1cblxuXG5cblxuZXhwb3J0IGNvbnN0IGNoaWxkUGFyZW50RGF0YSA9IChlbWFpbCwgZGF0YSk9PntcbiAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICBjb25zdCByb290UGFyZW50ID0ge1wiY2hpbGRcIjogZW1haWwsIFwicGFyZW50XCI6IFwiXCJ9O1xuICAgIGFycmF5LnB1c2gocm9vdFBhcmVudCk7XG4gICAgXG4gICAgZGF0YS5tYXAoYnJlYWNoID0+e1xuICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KGJyZWFjaFtcIlRpdGxlXCJdLCBlbWFpbCwgYnJlYWNoW1wiTG9nb1BhdGhcIl0pKTtcbiAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdChicmVhY2hbXCJEZXNjcmlwdGlvblwiXSwgYnJlYWNoW1wiVGl0bGVcIl0pKTtcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAgYnJlYWNoW1wiRGF0YUNsYXNzZXNcIl0ubWFwKHR5cGUgPT57XG4gICAgICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KHR5cGUsIGJyZWFjaFtcIkRlc2NyaXB0aW9uXCJdKSk7XG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBcbiAgICBsZXQgZGF0YVN0cnVjdHVyZSA9IGQzLnN0cmF0aWZ5KClcbiAgICAgICAgLmlkKGZ1bmN0aW9uKGQpe3JldHVybiBkLmNoaWxkO30pXG4gICAgICAgIC5wYXJlbnRJZChmdW5jdGlvbihkKXtyZXR1cm4gZC5wYXJlbnR9KVxuICAgICAgICAoYXJyYXkpO1xuXG4gICAgcmV0dXJuIGRhdGFTdHJ1Y3R1cmU7XG59XG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9