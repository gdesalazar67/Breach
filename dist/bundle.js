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

// export const myFunction = () => {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// };


//on refresh scroll to top of page 
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

//select tag with id email
// overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
var searchInput = document.querySelector("#email");

// validate email
var ValidateEmail = function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true;
    }
    alert("You have entered an invalid email address!");
    return false;
};

//Event listener on #email tag for keydown on enter;
searchInput.addEventListener("keydown", function (event) {
    var email = searchInput.value;
    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (event.key === "Enter" && ValidateEmail(email)) {
        event.preventDefault();
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        //hide intro and no-breach
        var intro = document.getElementById("intro");
        intro.style.display = "none";

        var noBreach = document.getElementById("no-breach");
        noBreach.style.display = "none";

        ///////////////////for testing only 
        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        ///////////////////

        //create header for fetch request 
        var hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        var keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            //extract data needed 
            var hiroData = Data.childParentData(email, data);
            //sent data to tree building function
            resultsTree(hiroData);
        }).catch(function (error) {
            svg.selectAll("*").remove();
            noBreach.style.display = "block";
            searchInput.value = "Enter email";
        });
    };
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

//helper function to create child/parent obj
var childParentObject = function childParentObject(child, parent) {
    var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    return {
        "child": child,
        "parent": parent,
        details: details
    };
};

//convert json date into array of objects with child/parent info.
// Run array through D3.stratify function. D3 can now work with data. 
var childParentData = exports.childParentData = function childParentData(email, data) {
    var array = [];
    var rootParent = { "child": email, "parent": "", "details": [email] };
    array.push(rootParent);

    data.map(function (breach) {
        array.push(childParentObject(breach["Title"], email, [breach["Title"], breach["LogoPath"]]));
        array.push(childParentObject(breach["Description"], breach["Title"], ["Breach Info"]));
        breach["DataClasses"].map(function (type) {
            array.push(childParentObject(type, breach["Description"], ["Data Leaked"]));
        });
    });

    var dataStructure = d3.stratify().id(function (d) {
        return d.child;
    }).parentId(function (d) {
        return d.parent;
    })(array);

    return dataStructure;
};

///dummy data for testing purposes 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkX2RhdGEuanMiXSwibmFtZXMiOlsiRGF0YSIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlZhbGlkYXRlRW1haWwiLCJlbWFpbCIsInRlc3QiLCJhbGVydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsIm5ld1VybCIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJyZXBsYWNlIiwiaW50cm8iLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsIm5vQnJlYWNoIiwiaGlicEFwaUtleSIsImtleUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwiaGlyb0RhdGEiLCJjaGlsZFBhcmVudERhdGEiLCJyZXN1bHRzVHJlZSIsImNhdGNoIiwic3ZnIiwic2VsZWN0QWxsIiwicmVtb3ZlIiwiY2hpbGRQYXJlbnRPYmplY3QiLCJjaGlsZCIsInBhcmVudCIsImRldGFpbHMiLCJ1bmRlZmluZWQiLCJhcnJheSIsInJvb3RQYXJlbnQiLCJwdXNoIiwibWFwIiwiYnJlYWNoIiwidHlwZSIsImRhdGFTdHJ1Y3R1cmUiLCJkMyIsInN0cmF0aWZ5IiwiaWQiLCJkIiwicGFyZW50SWQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7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LGFBQVA7QUFDSCxDQW5CTTs7QUF1QlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIG92ZXJ2aWV3IG9mIGNvZGUgc3RydWN0dXJlIGluc3BpcmVkIGJ5IGNhdGVuYSBkZXZlbG9wZWQgYnkgY2xlcmljbCBnaXRodWJcbi8vY29ycy1hbnl3aGVyZSB1c2VkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzODcxNjM3L25vLWFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbi1oZWFkZXItaXMtcHJlc2VudC1vbi10aGUtcmVxdWVzdGVkLXJlc291cmNlLXdoZS80Mzg4MTE0MVxuaW1wb3J0ICogYXMgRGF0YSBmcm9tIFwiLi9zZWVkX2RhdGFcIjtcblxuLy8gZXhwb3J0IGNvbnN0IG15RnVuY3Rpb24gPSAoKSA9PiB7XG4vLyAgICAgdmFyIHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15VG9wbmF2XCIpO1xuLy8gICAgIGlmICh4LmNsYXNzTmFtZSA9PT0gXCJ0b3BuYXZcIikge1xuLy8gICAgICAgICB4LmNsYXNzTmFtZSArPSBcIiByZXNwb25zaXZlXCI7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgeC5jbGFzc05hbWUgPSBcInRvcG5hdlwiO1xuLy8gICAgIH1cbi8vIH07XG5cblxuLy9vbiByZWZyZXNoIHNjcm9sbCB0byB0b3Agb2YgcGFnZSBcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG59O1xuXG4vL3NlbGVjdCB0YWcgd2l0aCBpZCBlbWFpbFxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpXG5cbi8vIHZhbGlkYXRlIGVtYWlsXG5jb25zdCBWYWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PntcbiAgICBpZiAoL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDR9KSskLy50ZXN0KGVtYWlsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBhbGVydChcIllvdSBoYXZlIGVudGVyZWQgYW4gaW52YWxpZCBlbWFpbCBhZGRyZXNzIVwiKVxuICAgIHJldHVybiBmYWxzZVxufTtcblxuLy9FdmVudCBsaXN0ZW5lciBvbiAjZW1haWwgdGFnIGZvciBrZXlkb3duIG9uIGVudGVyO1xuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQ9PntcbiAgICBsZXQgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAvL3NlbmQgcmVxdWVzdCB0byBjb3JzLWFueXdoZXJlIHRvIHNhdGlzZnkgQ09SUyBoZWFkZXIgcmVzdHJpY3Rpb25zIHdpdGgvb3V0IGJ1aWRpbmcgYmFjayBlbmRcbiAgICBsZXQgbmV3VXJsID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL2FwaS92My9icmVhY2hlZGFjY291bnQvJztcbiAgIFxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBWYWxpZGF0ZUVtYWlsKGVtYWlsKSl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuXG4gICAgICAgIC8vaGlkZSBpbnRybyBhbmQgbm8tYnJlYWNoXG4gICAgICAgIGxldCBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW50cm9cIik7XG4gICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICBsZXQgbm9CcmVhY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vLWJyZWFjaFwiKTtcbiAgICAgICAgICAgIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vZm9yIHRlc3Rpbmcgb25seSBcbiAgICAgICAgLy8gbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIERhdGEuZGF0YSk7XG4gICAgICAgIC8vIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgIFxuICAgICAgICAvL2NyZWF0ZSBoZWFkZXIgZm9yIGZldGNoIHJlcXVlc3QgXG4gICAgICAgIGNvbnN0IGhpYnBBcGlLZXkgPSAnMmIwODQ0MzRlNjBlNDdjODlmNjkwNmZkYjFhZjY3MWMnO1xuICAgICAgICBsZXQga2V5SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGtleUhlYWRlcnMuYXBwZW5kKCdIaWJwLUFwaS1LZXknLCBoaWJwQXBpS2V5KVxuICAgICAgICBcbiAgICAgICAgZmV0Y2gobmV3VXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVycyB9KVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vZXh0cmFjdCBkYXRhIG5lZWRlZCBcbiAgICAgICAgICAgIGxldCBoaXJvRGF0YSA9IERhdGEuY2hpbGRQYXJlbnREYXRhKGVtYWlsLCBkYXRhKTsgXG4gICAgICAgICAgICAvL3NlbnQgZGF0YSB0byB0cmVlIGJ1aWxkaW5nIGZ1bmN0aW9uXG4gICAgICAgICAgICByZXN1bHRzVHJlZShoaXJvRGF0YSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBub0JyZWFjaC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJFbnRlciBlbWFpbFwiOyBcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsIi8vaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1EdnFlYVZTZTZLbyB1c2VkIGFzIHJlZmVyYW5jZSBmb3IgZDMgZGF0YSBzdHJ1Y3R1cmluZ1xuXG4vL2hlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQvcGFyZW50IG9ialxuY29uc3QgY2hpbGRQYXJlbnRPYmplY3QgPSAoY2hpbGQsIHBhcmVudCwgZGV0YWlscyA9IHVuZGVmaW5lZCkgPT57XG4gICAgcmV0dXJuKHtcbiAgICAgICAgXCJjaGlsZFwiOiBjaGlsZCxcbiAgICAgICAgXCJwYXJlbnRcIjogcGFyZW50LFxuICAgICAgICBkZXRhaWxzLFxuICAgIH0pXG59XG5cbi8vY29udmVydCBqc29uIGRhdGUgaW50byBhcnJheSBvZiBvYmplY3RzIHdpdGggY2hpbGQvcGFyZW50IGluZm8uXG4vLyBSdW4gYXJyYXkgdGhyb3VnaCBEMy5zdHJhdGlmeSBmdW5jdGlvbi4gRDMgY2FuIG5vdyB3b3JrIHdpdGggZGF0YS4gXG5leHBvcnQgY29uc3QgY2hpbGRQYXJlbnREYXRhID0gKGVtYWlsLCBkYXRhKT0+e1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IHJvb3RQYXJlbnQgPSB7XCJjaGlsZFwiOiBlbWFpbCwgXCJwYXJlbnRcIjogXCJcIiwgXCJkZXRhaWxzXCI6IFtlbWFpbF19O1xuICAgIGFycmF5LnB1c2gocm9vdFBhcmVudCk7XG4gICAgXG4gICAgZGF0YS5tYXAoYnJlYWNoID0+e1xuICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KGJyZWFjaFtcIlRpdGxlXCJdLCBlbWFpbCwgW2JyZWFjaFtcIlRpdGxlXCJdLCBicmVhY2hbXCJMb2dvUGF0aFwiXV0pKTtcbiAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdChicmVhY2hbXCJEZXNjcmlwdGlvblwiXSwgYnJlYWNoW1wiVGl0bGVcIl0sIFtcIkJyZWFjaCBJbmZvXCJdKSk7XG4gICAgICAgIGJyZWFjaFtcIkRhdGFDbGFzc2VzXCJdLm1hcCh0eXBlID0+e1xuICAgICAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdCh0eXBlLCBicmVhY2hbXCJEZXNjcmlwdGlvblwiXSwgW1wiRGF0YSBMZWFrZWRcIl0pKTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIFxuICAgIGxldCBkYXRhU3RydWN0dXJlID0gZDMuc3RyYXRpZnkoKVxuICAgIC5pZChmdW5jdGlvbihkKXtyZXR1cm4gZC5jaGlsZDt9KVxuICAgIC5wYXJlbnRJZChmdW5jdGlvbihkKXtyZXR1cm4gZC5wYXJlbnR9KVxuICAgIChhcnJheSk7XG4gICAgXG4gICAgcmV0dXJuIGRhdGFTdHJ1Y3R1cmU7XG59XG5cblxuXG4vLy9kdW1teSBkYXRhIGZvciB0ZXN0aW5nIHB1cnBvc2VzIFxuLy8gZXhwb3J0IGNvbnN0IGRhdGEgPSBbXG4vLyAgICAge1xuLy8gICAgICAgICBcIk5hbWVcIjogXCJIYXV0ZUxvb2tcIixcbi8vICAgICAgICAgXCJUaXRsZVwiOiBcIkhhdXRlTG9va1wiLFxuLy8gICAgICAgICBcIkRvbWFpblwiOiBcImhhdXRlbG9vay5jb21cIixcbi8vICAgICAgICAgXCJCcmVhY2hEYXRlXCI6IFwiMjAxOC0wOC0wN1wiLFxuLy8gICAgICAgICBcIkFkZGVkRGF0ZVwiOiBcIjIwMTktMDMtMjFUMjE6NTc6MzJaXCIsXG4vLyAgICAgICAgIFwiTW9kaWZpZWREYXRlXCI6IFwiMjAxOS0wMy0yMVQyMTo1NzozMlpcIixcbi8vICAgICAgICAgXCJQd25Db3VudFwiOiAyODUxMDQ1OSxcbi8vICAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkluIG1pZC0yMDE4LCB0aGUgZmFzaGlvbiBzaG9wcGluZyBzaXRlIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LnRoZXJlZ2lzdGVyLmNvLnVrLzIwMTkvMDIvMTEvNjIwX21pbGxpb25faGFja2VkX2FjY291bnRzX2Rhcmtfd2ViL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPkhhdXRlTG9vayB3YXMgYW1vbmcgYSByYWZ0IG9mIHNpdGVzIHRoYXQgd2VyZSBicmVhY2hlZCBhbmQgdGhlaXIgZGF0YSB0aGVuIHNvbGQgaW4gZWFybHktMjAxOTwvYT4uIFRoZSBkYXRhIGluY2x1ZGVkIG92ZXIgMjggbWlsbGlvbiB1bmlxdWUgZW1haWwgYWRkcmVzc2VzIGFsb25nc2lkZSBuYW1lcywgZ2VuZGVycywgZGF0ZXMgb2YgYmlydGggYW5kIHBhc3N3b3JkcyBzdG9yZWQgYXMgYmNyeXB0IGhhc2hlcy4gVGhlIGRhdGEgd2FzIHByb3ZpZGVkIHRvIEhJQlAgYnkgPGEgaHJlZj1cXFwiaHR0cHM6Ly9kZWhhc2hlZC5jb20vXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+ZGVoYXNoZWQuY29tPC9hPi5cIixcbi8vICAgICAgICAgXCJMb2dvUGF0aFwiOiBcImh0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL0NvbnRlbnQvSW1hZ2VzL1B3bmVkTG9nb3MvSGF1dGVMb29rLnBuZ1wiLFxuLy8gICAgICAgICBcIkRhdGFDbGFzc2VzXCI6IFtcbi8vICAgICAgICAgICAgIFwiRGF0ZXMgb2YgYmlydGhcIixcbi8vICAgICAgICAgICAgIFwiRW1haWwgYWRkcmVzc2VzXCIsXG4vLyAgICAgICAgICAgICBcIkdlbmRlcnNcIixcbi8vICAgICAgICAgICAgIFwiR2VvZ3JhcGhpYyBsb2NhdGlvbnNcIixcbi8vICAgICAgICAgICAgIFwiTmFtZXNcIixcbi8vICAgICAgICAgICAgIFwiUGFzc3dvcmRzXCJcbi8vICAgICAgICAgXSxcbi8vICAgICAgICAgXCJJc1ZlcmlmaWVkXCI6IHRydWUsXG4vLyAgICAgICAgIFwiSXNGYWJyaWNhdGVkXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzU2Vuc2l0aXZlXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzUmV0aXJlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NwYW1MaXN0XCI6IGZhbHNlXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICAgIFwiTmFtZVwiOiBcIk15Rml0bmVzc1BhbFwiLFxuLy8gICAgICAgICBcIlRpdGxlXCI6IFwiTXlGaXRuZXNzUGFsXCIsXG4vLyAgICAgICAgIFwiRG9tYWluXCI6IFwibXlmaXRuZXNzcGFsLmNvbVwiLFxuLy8gICAgICAgICBcIkJyZWFjaERhdGVcIjogXCIyMDE4LTAyLTAxXCIsXG4vLyAgICAgICAgIFwiQWRkZWREYXRlXCI6IFwiMjAxOS0wMi0yMVQxOToyODo0NlpcIixcbi8vICAgICAgICAgXCJNb2RpZmllZERhdGVcIjogXCIyMDE5LTAyLTIxVDIwOjAwOjU2WlwiLFxuLy8gICAgICAgICBcIlB3bkNvdW50XCI6IDE0MzYwNjE0Nyxcbi8vICAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkluIEZlYnJ1YXJ5IDIwMTgsIHRoZSBkaWV0IGFuZCBleGVyY2lzZSBzZXJ2aWNlIDxhIGhyZWY9XFxcImh0dHBzOi8vY29udGVudC5teWZpdG5lc3NwYWwuY29tL3NlY3VyaXR5LWluZm9ybWF0aW9uL0ZBUS5odG1sXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+TXlGaXRuZXNzUGFsIHN1ZmZlcmVkIGEgZGF0YSBicmVhY2g8L2E+LiBUaGUgaW5jaWRlbnQgZXhwb3NlZCAxNDQgbWlsbGlvbiB1bmlxdWUgZW1haWwgYWRkcmVzc2VzIGFsb25nc2lkZSB1c2VybmFtZXMsIElQIGFkZHJlc3NlcyBhbmQgcGFzc3dvcmRzIHN0b3JlZCBhcyBTSEEtMSBhbmQgYmNyeXB0IGhhc2hlcyAodGhlIGZvcm1lciBmb3IgZWFybGllciBhY2NvdW50cywgdGhlIGxhdHRlciBmb3IgbmV3ZXIgYWNjb3VudHMpLiBJbiAyMDE5LCA8YSBocmVmPVxcXCJodHRwczovL3d3dy50aGVyZWdpc3Rlci5jby51ay8yMDE5LzAyLzExLzYyMF9taWxsaW9uX2hhY2tlZF9hY2NvdW50c19kYXJrX3dlYi9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj50aGUgZGF0YSBhcHBlYXJlZCBsaXN0ZWQgZm9yIHNhbGUgb24gYSBkYXJrIHdlYiBtYXJrZXRwbGFjZTwvYT4gKGFsb25nIHdpdGggc2V2ZXJhbCBvdGhlciBsYXJnZSBicmVhY2hlcykgYW5kIHN1YnNlcXVlbnRseSBiZWdhbiBjaXJjdWxhdGluZyBtb3JlIGJyb2FkbHkuIFRoZSBkYXRhIHdhcyBwcm92aWRlZCB0byBISUJQIGJ5IGEgc291cmNlIHdobyByZXF1ZXN0ZWQgaXQgdG8gYmUgYXR0cmlidXRlZCB0byAmcXVvdDtCZW5qYW1pbkJsdWVAZXhwbG9pdC5pbSZxdW90Oy5cIixcbi8vICAgICAgICAgXCJMb2dvUGF0aFwiOiBcImh0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL0NvbnRlbnQvSW1hZ2VzL1B3bmVkTG9nb3MvTXlGaXRuZXNzUGFsLnBuZ1wiLFxuLy8gICAgICAgICBcIkRhdGFDbGFzc2VzXCI6IFtcbi8vICAgICAgICAgICAgIFwiRW1haWwgYWRkcmVzc2VzXCIsXG4vLyAgICAgICAgICAgICBcIklQIGFkZHJlc3Nlc1wiLFxuLy8gICAgICAgICAgICAgXCJQYXNzd29yZHNcIixcbi8vICAgICAgICAgICAgIFwiVXNlcm5hbWVzXCJcbi8vICAgICAgICAgXSxcbi8vICAgICAgICAgXCJJc1ZlcmlmaWVkXCI6IHRydWUsXG4vLyAgICAgICAgIFwiSXNGYWJyaWNhdGVkXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzU2Vuc2l0aXZlXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzUmV0aXJlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NwYW1MaXN0XCI6IGZhbHNlXG4vLyAgICAgfVxuLy8gXSJdLCJzb3VyY2VSb290IjoiIn0=