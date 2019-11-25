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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkX2RhdGEuanMiXSwibmFtZXMiOlsiRGF0YSIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlZhbGlkYXRlRW1haWwiLCJlbWFpbCIsInRlc3QiLCJhbGVydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsIm5ld1VybCIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJyZXBsYWNlIiwiaW50cm8iLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsIm5vQnJlYWNoIiwiaGlicEFwaUtleSIsImtleUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwiaGlyb0RhdGEiLCJjaGlsZFBhcmVudERhdGEiLCJyZXN1bHRzVHJlZSIsImNhdGNoIiwic3ZnIiwic2VsZWN0QWxsIiwicmVtb3ZlIiwiY2hpbGRQYXJlbnRPYmplY3QiLCJjaGlsZCIsInBhcmVudCIsImRldGFpbHMiLCJ1bmRlZmluZWQiLCJhcnJheSIsInJvb3RQYXJlbnQiLCJwdXNoIiwibWFwIiwiYnJlYWNoIiwidHlwZSIsImRhdGFTdHJ1Y3R1cmUiLCJkMyIsInN0cmF0aWZ5IiwiaWQiLCJkIiwicGFyZW50SWQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBvdmVydmlldyBvZiBjb2RlIHN0cnVjdHVyZSBpbnNwaXJlZCBieSBjYXRlbmEgZGV2ZWxvcGVkIGJ5IGNsZXJpY2wgZ2l0aHViXG4vL2NvcnMtYW55d2hlcmUgdXNlZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mzg3MTYzNy9uby1hY2Nlc3MtY29udHJvbC1hbGxvdy1vcmlnaW4taGVhZGVyLWlzLXByZXNlbnQtb24tdGhlLXJlcXVlc3RlZC1yZXNvdXJjZS13aGUvNDM4ODExNDFcbmltcG9ydCAqIGFzIERhdGEgZnJvbSBcIi4vc2VlZF9kYXRhXCI7XG5cbi8vb24gcmVmcmVzaCBzY3JvbGwgdG8gdG9wIG9mIHBhZ2UgXG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xufVxuXG4vL3NlbGVjdCB0YWcgd2l0aCBpZCBlbWFpbFxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpXG5cbi8vIHZhbGlkYXRlIGVtYWlsXG5jb25zdCBWYWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PntcbiAgICBpZiAoL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDR9KSskLy50ZXN0KGVtYWlsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBhbGVydChcIllvdSBoYXZlIGVudGVyZWQgYW4gaW52YWxpZCBlbWFpbCBhZGRyZXNzIVwiKVxuICAgIHJldHVybiBmYWxzZVxufTtcblxuLy9FdmVudCBsaXN0ZW5lciBvbiAjZW1haWwgdGFnIGZvciBrZXlkb3duIG9uIGVudGVyO1xuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQ9PntcbiAgICBsZXQgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAvL3NlbmQgcmVxdWVzdCB0byBjb3JzLWFueXdoZXJlIHRvIHNhdGlzZnkgQ09SUyBoZWFkZXIgcmVzdHJpY3Rpb25zIHdpdGgvb3V0IGJ1aWRpbmcgYmFjayBlbmRcbiAgICBsZXQgbmV3VXJsID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL2FwaS92My9icmVhY2hlZGFjY291bnQvJztcbiAgIFxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBWYWxpZGF0ZUVtYWlsKGVtYWlsKSl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuXG4gICAgICAgIC8vaGlkZSBpbnRybyBhbmQgbm8tYnJlYWNoXG4gICAgICAgIGxldCBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW50cm9cIik7XG4gICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICBsZXQgbm9CcmVhY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vLWJyZWFjaFwiKTtcbiAgICAgICAgICAgIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vZm9yIHRlc3Rpbmcgb25seSBcbiAgICAgICAgLy8gbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIERhdGEuZGF0YSk7XG4gICAgICAgIC8vIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgIFxuICAgICAgICAvL2NyZWF0ZSBoZWFkZXIgZm9yIGZldGNoIHJlcXVlc3QgXG4gICAgICAgIGNvbnN0IGhpYnBBcGlLZXkgPSAnMmIwODQ0MzRlNjBlNDdjODlmNjkwNmZkYjFhZjY3MWMnO1xuICAgICAgICBsZXQga2V5SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGtleUhlYWRlcnMuYXBwZW5kKCdIaWJwLUFwaS1LZXknLCBoaWJwQXBpS2V5KVxuICAgICAgICBcbiAgICAgICAgZmV0Y2gobmV3VXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVycyB9KVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vZXh0cmFjdCBkYXRhIG5lZWRlZCBcbiAgICAgICAgICAgIGxldCBoaXJvRGF0YSA9IERhdGEuY2hpbGRQYXJlbnREYXRhKGVtYWlsLCBkYXRhKTsgXG4gICAgICAgICAgICAvL3NlbnQgZGF0YSB0byB0cmVlIGJ1aWxkaW5nIGZ1bmN0aW9uXG4gICAgICAgICAgICByZXN1bHRzVHJlZShoaXJvRGF0YSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBub0JyZWFjaC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJFbnRlciBlbWFpbFwiOyBcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiIsIi8vaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1EdnFlYVZTZTZLbyB1c2VkIGFzIHJlZmVyYW5jZSBmb3IgZDMgZGF0YSBzdHJ1Y3R1cmluZ1xuXG4vL2hlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQvcGFyZW50IG9ialxuY29uc3QgY2hpbGRQYXJlbnRPYmplY3QgPSAoY2hpbGQsIHBhcmVudCwgZGV0YWlscyA9IHVuZGVmaW5lZCkgPT57XG4gICAgcmV0dXJuKHtcbiAgICAgICAgXCJjaGlsZFwiOiBjaGlsZCxcbiAgICAgICAgXCJwYXJlbnRcIjogcGFyZW50LFxuICAgICAgICBkZXRhaWxzLFxuICAgIH0pXG59XG5cbi8vY29udmVydCBqc29uIGRhdGUgaW50byBhcnJheSBvZiBvYmplY3RzIHdpdGggY2hpbGQvcGFyZW50IGluZm8uXG4vLyBSdW4gYXJyYXkgdGhyb3VnaCBEMy5zdHJhdGlmeSBmdW5jdGlvbi4gRDMgY2FuIG5vdyB3b3JrIHdpdGggZGF0YS4gXG5leHBvcnQgY29uc3QgY2hpbGRQYXJlbnREYXRhID0gKGVtYWlsLCBkYXRhKT0+e1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IHJvb3RQYXJlbnQgPSB7XCJjaGlsZFwiOiBlbWFpbCwgXCJwYXJlbnRcIjogXCJcIiwgXCJkZXRhaWxzXCI6IFtlbWFpbF19O1xuICAgIGFycmF5LnB1c2gocm9vdFBhcmVudCk7XG4gICAgXG4gICAgZGF0YS5tYXAoYnJlYWNoID0+e1xuICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KGJyZWFjaFtcIlRpdGxlXCJdLCBlbWFpbCwgW2JyZWFjaFtcIlRpdGxlXCJdLCBicmVhY2hbXCJMb2dvUGF0aFwiXV0pKTtcbiAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdChicmVhY2hbXCJEZXNjcmlwdGlvblwiXSwgYnJlYWNoW1wiVGl0bGVcIl0sIFtcIkJyZWFjaCBJbmZvXCJdKSk7XG4gICAgICAgIGJyZWFjaFtcIkRhdGFDbGFzc2VzXCJdLm1hcCh0eXBlID0+e1xuICAgICAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdCh0eXBlLCBicmVhY2hbXCJEZXNjcmlwdGlvblwiXSwgW1wiRGF0YSBMZWFrZWRcIl0pKTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIFxuICAgIGxldCBkYXRhU3RydWN0dXJlID0gZDMuc3RyYXRpZnkoKVxuICAgIC5pZChmdW5jdGlvbihkKXtyZXR1cm4gZC5jaGlsZDt9KVxuICAgIC5wYXJlbnRJZChmdW5jdGlvbihkKXtyZXR1cm4gZC5wYXJlbnR9KVxuICAgIChhcnJheSk7XG4gICAgXG4gICAgcmV0dXJuIGRhdGFTdHJ1Y3R1cmU7XG59XG5cblxuXG4vLy9kdW1teSBkYXRhIGZvciB0ZXN0aW5nIHB1cnBvc2VzIFxuLy8gZXhwb3J0IGNvbnN0IGRhdGEgPSBbXG4vLyAgICAge1xuLy8gICAgICAgICBcIk5hbWVcIjogXCJIYXV0ZUxvb2tcIixcbi8vICAgICAgICAgXCJUaXRsZVwiOiBcIkhhdXRlTG9va1wiLFxuLy8gICAgICAgICBcIkRvbWFpblwiOiBcImhhdXRlbG9vay5jb21cIixcbi8vICAgICAgICAgXCJCcmVhY2hEYXRlXCI6IFwiMjAxOC0wOC0wN1wiLFxuLy8gICAgICAgICBcIkFkZGVkRGF0ZVwiOiBcIjIwMTktMDMtMjFUMjE6NTc6MzJaXCIsXG4vLyAgICAgICAgIFwiTW9kaWZpZWREYXRlXCI6IFwiMjAxOS0wMy0yMVQyMTo1NzozMlpcIixcbi8vICAgICAgICAgXCJQd25Db3VudFwiOiAyODUxMDQ1OSxcbi8vICAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkluIG1pZC0yMDE4LCB0aGUgZmFzaGlvbiBzaG9wcGluZyBzaXRlIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LnRoZXJlZ2lzdGVyLmNvLnVrLzIwMTkvMDIvMTEvNjIwX21pbGxpb25faGFja2VkX2FjY291bnRzX2Rhcmtfd2ViL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPkhhdXRlTG9vayB3YXMgYW1vbmcgYSByYWZ0IG9mIHNpdGVzIHRoYXQgd2VyZSBicmVhY2hlZCBhbmQgdGhlaXIgZGF0YSB0aGVuIHNvbGQgaW4gZWFybHktMjAxOTwvYT4uIFRoZSBkYXRhIGluY2x1ZGVkIG92ZXIgMjggbWlsbGlvbiB1bmlxdWUgZW1haWwgYWRkcmVzc2VzIGFsb25nc2lkZSBuYW1lcywgZ2VuZGVycywgZGF0ZXMgb2YgYmlydGggYW5kIHBhc3N3b3JkcyBzdG9yZWQgYXMgYmNyeXB0IGhhc2hlcy4gVGhlIGRhdGEgd2FzIHByb3ZpZGVkIHRvIEhJQlAgYnkgPGEgaHJlZj1cXFwiaHR0cHM6Ly9kZWhhc2hlZC5jb20vXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+ZGVoYXNoZWQuY29tPC9hPi5cIixcbi8vICAgICAgICAgXCJMb2dvUGF0aFwiOiBcImh0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL0NvbnRlbnQvSW1hZ2VzL1B3bmVkTG9nb3MvSGF1dGVMb29rLnBuZ1wiLFxuLy8gICAgICAgICBcIkRhdGFDbGFzc2VzXCI6IFtcbi8vICAgICAgICAgICAgIFwiRGF0ZXMgb2YgYmlydGhcIixcbi8vICAgICAgICAgICAgIFwiRW1haWwgYWRkcmVzc2VzXCIsXG4vLyAgICAgICAgICAgICBcIkdlbmRlcnNcIixcbi8vICAgICAgICAgICAgIFwiR2VvZ3JhcGhpYyBsb2NhdGlvbnNcIixcbi8vICAgICAgICAgICAgIFwiTmFtZXNcIixcbi8vICAgICAgICAgICAgIFwiUGFzc3dvcmRzXCJcbi8vICAgICAgICAgXSxcbi8vICAgICAgICAgXCJJc1ZlcmlmaWVkXCI6IHRydWUsXG4vLyAgICAgICAgIFwiSXNGYWJyaWNhdGVkXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzU2Vuc2l0aXZlXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzUmV0aXJlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NwYW1MaXN0XCI6IGZhbHNlXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICAgIFwiTmFtZVwiOiBcIk15Rml0bmVzc1BhbFwiLFxuLy8gICAgICAgICBcIlRpdGxlXCI6IFwiTXlGaXRuZXNzUGFsXCIsXG4vLyAgICAgICAgIFwiRG9tYWluXCI6IFwibXlmaXRuZXNzcGFsLmNvbVwiLFxuLy8gICAgICAgICBcIkJyZWFjaERhdGVcIjogXCIyMDE4LTAyLTAxXCIsXG4vLyAgICAgICAgIFwiQWRkZWREYXRlXCI6IFwiMjAxOS0wMi0yMVQxOToyODo0NlpcIixcbi8vICAgICAgICAgXCJNb2RpZmllZERhdGVcIjogXCIyMDE5LTAyLTIxVDIwOjAwOjU2WlwiLFxuLy8gICAgICAgICBcIlB3bkNvdW50XCI6IDE0MzYwNjE0Nyxcbi8vICAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkluIEZlYnJ1YXJ5IDIwMTgsIHRoZSBkaWV0IGFuZCBleGVyY2lzZSBzZXJ2aWNlIDxhIGhyZWY9XFxcImh0dHBzOi8vY29udGVudC5teWZpdG5lc3NwYWwuY29tL3NlY3VyaXR5LWluZm9ybWF0aW9uL0ZBUS5odG1sXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+TXlGaXRuZXNzUGFsIHN1ZmZlcmVkIGEgZGF0YSBicmVhY2g8L2E+LiBUaGUgaW5jaWRlbnQgZXhwb3NlZCAxNDQgbWlsbGlvbiB1bmlxdWUgZW1haWwgYWRkcmVzc2VzIGFsb25nc2lkZSB1c2VybmFtZXMsIElQIGFkZHJlc3NlcyBhbmQgcGFzc3dvcmRzIHN0b3JlZCBhcyBTSEEtMSBhbmQgYmNyeXB0IGhhc2hlcyAodGhlIGZvcm1lciBmb3IgZWFybGllciBhY2NvdW50cywgdGhlIGxhdHRlciBmb3IgbmV3ZXIgYWNjb3VudHMpLiBJbiAyMDE5LCA8YSBocmVmPVxcXCJodHRwczovL3d3dy50aGVyZWdpc3Rlci5jby51ay8yMDE5LzAyLzExLzYyMF9taWxsaW9uX2hhY2tlZF9hY2NvdW50c19kYXJrX3dlYi9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj50aGUgZGF0YSBhcHBlYXJlZCBsaXN0ZWQgZm9yIHNhbGUgb24gYSBkYXJrIHdlYiBtYXJrZXRwbGFjZTwvYT4gKGFsb25nIHdpdGggc2V2ZXJhbCBvdGhlciBsYXJnZSBicmVhY2hlcykgYW5kIHN1YnNlcXVlbnRseSBiZWdhbiBjaXJjdWxhdGluZyBtb3JlIGJyb2FkbHkuIFRoZSBkYXRhIHdhcyBwcm92aWRlZCB0byBISUJQIGJ5IGEgc291cmNlIHdobyByZXF1ZXN0ZWQgaXQgdG8gYmUgYXR0cmlidXRlZCB0byAmcXVvdDtCZW5qYW1pbkJsdWVAZXhwbG9pdC5pbSZxdW90Oy5cIixcbi8vICAgICAgICAgXCJMb2dvUGF0aFwiOiBcImh0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL0NvbnRlbnQvSW1hZ2VzL1B3bmVkTG9nb3MvTXlGaXRuZXNzUGFsLnBuZ1wiLFxuLy8gICAgICAgICBcIkRhdGFDbGFzc2VzXCI6IFtcbi8vICAgICAgICAgICAgIFwiRW1haWwgYWRkcmVzc2VzXCIsXG4vLyAgICAgICAgICAgICBcIklQIGFkZHJlc3Nlc1wiLFxuLy8gICAgICAgICAgICAgXCJQYXNzd29yZHNcIixcbi8vICAgICAgICAgICAgIFwiVXNlcm5hbWVzXCJcbi8vICAgICAgICAgXSxcbi8vICAgICAgICAgXCJJc1ZlcmlmaWVkXCI6IHRydWUsXG4vLyAgICAgICAgIFwiSXNGYWJyaWNhdGVkXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzU2Vuc2l0aXZlXCI6IGZhbHNlLFxuLy8gICAgICAgICBcIklzUmV0aXJlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NwYW1MaXN0XCI6IGZhbHNlXG4vLyAgICAgfVxuLy8gXSJdLCJzb3VyY2VSb290IjoiIn0=