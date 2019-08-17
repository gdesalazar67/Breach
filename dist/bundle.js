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
            alert('Lucky you! Your email is safe for now');
            searchInput.value = "Enter email";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkX2RhdGEuanMiXSwibmFtZXMiOlsiRGF0YSIsInNlYXJjaElucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiVmFsaWRhdGVFbWFpbCIsImVtYWlsIiwidGVzdCIsImFsZXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwibmV3VXJsIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsInJlcGxhY2UiLCJoaWJwQXBpS2V5Iiwia2V5SGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiaGlyb0RhdGEiLCJjaGlsZFBhcmVudERhdGEiLCJyZXN1bHRzVHJlZSIsImNhdGNoIiwiZXJyb3IiLCJjaGlsZFBhcmVudE9iamVjdCIsImNoaWxkIiwicGFyZW50IiwiZGV0YWlscyIsInVuZGVmaW5lZCIsImFycmF5Iiwicm9vdFBhcmVudCIsInB1c2giLCJtYXAiLCJicmVhY2giLCJ0eXBlIiwiZGF0YVN0cnVjdHVyZSIsImQzIiwic3RyYXRpZnkiLCJpZCIsImQiLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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QVg7QUFDQUosY0FBTUUsSUFBTixDQUFXUCxrQkFBa0JTLE9BQU8sYUFBUCxDQUFsQixFQUF5Q0EsT0FBTyxPQUFQLENBQXpDLENBQVg7QUFDQTtBQUNBQSxlQUFPLGFBQVAsRUFBc0JELEdBQXRCLENBQTBCLGdCQUFPO0FBQzdCSCxrQkFBTUUsSUFBTixDQUFXUCxrQkFBa0JVLElBQWxCLEVBQXdCRCxPQUFPLGFBQVAsQ0FBeEIsQ0FBWDtBQUNILFNBRkQ7QUFHSCxLQVBEOztBQVNBLFFBQUlFLGdCQUFnQkMsR0FBR0MsUUFBSCxHQUNuQkMsRUFEbUIsQ0FDaEIsVUFBU0MsQ0FBVCxFQUFXO0FBQUMsZUFBT0EsRUFBRWQsS0FBVDtBQUFnQixLQURaLEVBRW5CZSxRQUZtQixDQUVWLFVBQVNELENBQVQsRUFBVztBQUFDLGVBQU9BLEVBQUViLE1BQVQ7QUFBZ0IsS0FGbEIsRUFHbkJHLEtBSG1CLENBQXBCOztBQUtBLFdBQU9NLGFBQVA7QUFDSCxDQXBCTTs7QUF5QlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBvdmVydmlldyBvZiBjb2RlIHN0cnVjdHVyZSBpbnNwaXJlZCBieSBjYXRlbmEgZGV2ZWxvcGVkIGJ5IGNsZXJpY2wgZ2l0aHViXG4vL2NvcnMtYW55d2hlcmUgdXNlZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mzg3MTYzNy9uby1hY2Nlc3MtY29udHJvbC1hbGxvdy1vcmlnaW4taGVhZGVyLWlzLXByZXNlbnQtb24tdGhlLXJlcXVlc3RlZC1yZXNvdXJjZS13aGUvNDM4ODExNDFcbmltcG9ydCAqIGFzIERhdGEgZnJvbSBcIi4vc2VlZF9kYXRhXCI7XG4vLyBpbXBvcnQge3Jlc3VsdHNUcmVlfSBmcm9tIFwiLi9kZW5kcm9ncmFtXCI7XG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKVxuXG5cbmNvbnN0IFZhbGlkYXRlRW1haWwgPSAoZW1haWwpID0+e1xuICAgIGlmICgvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsNH0pKyQvLnRlc3QoZW1haWwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGFsZXJ0KFwiWW91IGhhdmUgZW50ZXJlZCBhbiBpbnZhbGlkIGVtYWlsIGFkZHJlc3MhXCIpXG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG5cbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50PT57XG4gICAgbGV0IGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgbGV0IG5ld1VybCA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9hcGkvdjMvYnJlYWNoZWRhY2NvdW50Lyc7XG4gICBcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgJiYgVmFsaWRhdGVFbWFpbChlbWFpbCkpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBlbWFpbCA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBlbWFpbCA9IGVtYWlsLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIG5ld1VybCArPSBlbWFpbCArIFwiP3RydW5jYXRlUmVzcG9uc2U9ZmFsc2VcIjtcbiAgICAgICAgXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgY29uc3QgaGlicEFwaUtleSA9ICcwM2E3OTQ1MjEzMjk0MzJiYWQxMmFmNWY1YmM2ZGIzZSc7XG4gICAgICAgIGxldCBrZXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAga2V5SGVhZGVycy5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG4gICAgICAgIFxuICAgICAgICBmZXRjaChuZXdVcmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiBrZXlIZWFkZXJzIH0pXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIGRhdGEpOyBcbiAgICAgICAgICAgIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTsgXG4gICAgICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiRW50ZXIgZW1haWxcIjsgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0x1Y2t5IHlvdSEgWW91ciBlbWFpbCBpcyBzYWZlIGZvciBub3cnKVxuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJFbnRlciBlbWFpbFwiOyBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGVhc2UgZW50ZXIgZW1haWxcIik7XG4gICAgfVxufSlcbiIsIi8vaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1EdnFlYVZTZTZLbyB1c2VkIGFzIHJlZmVyYW5jZSBmb3IgZDMgZGF0YSBzdHJ1Y3R1cmluZ1xuXG5cbmNvbnN0IGNoaWxkUGFyZW50T2JqZWN0ID0gKGNoaWxkLCBwYXJlbnQsIGRldGFpbHMgPSB1bmRlZmluZWQpID0+e1xuICAgIHJldHVybih7XG4gICAgICAgIFwiY2hpbGRcIjogY2hpbGQsXG4gICAgICAgIFwicGFyZW50XCI6IHBhcmVudCxcbiAgICAgICAgZGV0YWlscyxcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgY2hpbGRQYXJlbnREYXRhID0gKGVtYWlsLCBkYXRhKT0+e1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIGNvbnN0IHJvb3RQYXJlbnQgPSB7XCJjaGlsZFwiOiBlbWFpbCwgXCJwYXJlbnRcIjogXCJcIn07XG4gICAgYXJyYXkucHVzaChyb290UGFyZW50KTtcbiAgICBcbiAgICBkYXRhLm1hcChicmVhY2ggPT57XG4gICAgICAgIGFycmF5LnB1c2goY2hpbGRQYXJlbnRPYmplY3QoYnJlYWNoW1wiVGl0bGVcIl0sIGVtYWlsLCBicmVhY2hbXCJMb2dvUGF0aFwiXSkpO1xuICAgICAgICBhcnJheS5wdXNoKGNoaWxkUGFyZW50T2JqZWN0KGJyZWFjaFtcIkRlc2NyaXB0aW9uXCJdLCBicmVhY2hbXCJUaXRsZVwiXSkpO1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBicmVhY2hbXCJEYXRhQ2xhc3Nlc1wiXS5tYXAodHlwZSA9PntcbiAgICAgICAgICAgIGFycmF5LnB1c2goY2hpbGRQYXJlbnRPYmplY3QodHlwZSwgYnJlYWNoW1wiRGVzY3JpcHRpb25cIl0pKTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIFxuICAgIGxldCBkYXRhU3RydWN0dXJlID0gZDMuc3RyYXRpZnkoKVxuICAgIC5pZChmdW5jdGlvbihkKXtyZXR1cm4gZC5jaGlsZDt9KVxuICAgIC5wYXJlbnRJZChmdW5jdGlvbihkKXtyZXR1cm4gZC5wYXJlbnR9KVxuICAgIChhcnJheSk7XG4gICAgXG4gICAgcmV0dXJuIGRhdGFTdHJ1Y3R1cmU7XG59XG5cblxuXG5cbi8vIGV4cG9ydCBjb25zdCBkYXRhID0gW1xuLy8gICAgIHtcbi8vICAgICAgICAgXCJOYW1lXCI6IFwiSGF1dGVMb29rXCIsXG4vLyAgICAgICAgIFwiVGl0bGVcIjogXCJIYXV0ZUxvb2tcIixcbi8vICAgICAgICAgXCJEb21haW5cIjogXCJoYXV0ZWxvb2suY29tXCIsXG4vLyAgICAgICAgIFwiQnJlYWNoRGF0ZVwiOiBcIjIwMTgtMDgtMDdcIixcbi8vICAgICAgICAgXCJBZGRlZERhdGVcIjogXCIyMDE5LTAzLTIxVDIxOjU3OjMyWlwiLFxuLy8gICAgICAgICBcIk1vZGlmaWVkRGF0ZVwiOiBcIjIwMTktMDMtMjFUMjE6NTc6MzJaXCIsXG4vLyAgICAgICAgIFwiUHduQ291bnRcIjogMjg1MTA0NTksXG4vLyAgICAgICAgIFwiRGVzY3JpcHRpb25cIjogXCJJbiBtaWQtMjAxOCwgdGhlIGZhc2hpb24gc2hvcHBpbmcgc2l0ZSA8YSBocmVmPVxcXCJodHRwczovL3d3dy50aGVyZWdpc3Rlci5jby51ay8yMDE5LzAyLzExLzYyMF9taWxsaW9uX2hhY2tlZF9hY2NvdW50c19kYXJrX3dlYi9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj5IYXV0ZUxvb2sgd2FzIGFtb25nIGEgcmFmdCBvZiBzaXRlcyB0aGF0IHdlcmUgYnJlYWNoZWQgYW5kIHRoZWlyIGRhdGEgdGhlbiBzb2xkIGluIGVhcmx5LTIwMTk8L2E+LiBUaGUgZGF0YSBpbmNsdWRlZCBvdmVyIDI4IG1pbGxpb24gdW5pcXVlIGVtYWlsIGFkZHJlc3NlcyBhbG9uZ3NpZGUgbmFtZXMsIGdlbmRlcnMsIGRhdGVzIG9mIGJpcnRoIGFuZCBwYXNzd29yZHMgc3RvcmVkIGFzIGJjcnlwdCBoYXNoZXMuIFRoZSBkYXRhIHdhcyBwcm92aWRlZCB0byBISUJQIGJ5IDxhIGhyZWY9XFxcImh0dHBzOi8vZGVoYXNoZWQuY29tL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPmRlaGFzaGVkLmNvbTwvYT4uXCIsXG4vLyAgICAgICAgIFwiTG9nb1BhdGhcIjogXCJodHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9Db250ZW50L0ltYWdlcy9Qd25lZExvZ29zL0hhdXRlTG9vay5wbmdcIixcbi8vICAgICAgICAgXCJEYXRhQ2xhc3Nlc1wiOiBbXG4vLyAgICAgICAgICAgICBcIkRhdGVzIG9mIGJpcnRoXCIsXG4vLyAgICAgICAgICAgICBcIkVtYWlsIGFkZHJlc3Nlc1wiLFxuLy8gICAgICAgICAgICAgXCJHZW5kZXJzXCIsXG4vLyAgICAgICAgICAgICBcIkdlb2dyYXBoaWMgbG9jYXRpb25zXCIsXG4vLyAgICAgICAgICAgICBcIk5hbWVzXCIsXG4vLyAgICAgICAgICAgICBcIlBhc3N3b3Jkc1wiXG4vLyAgICAgICAgIF0sXG4vLyAgICAgICAgIFwiSXNWZXJpZmllZFwiOiB0cnVlLFxuLy8gICAgICAgICBcIklzRmFicmljYXRlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NlbnNpdGl2ZVwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1JldGlyZWRcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNTcGFtTGlzdFwiOiBmYWxzZVxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgICBcIk5hbWVcIjogXCJNeUZpdG5lc3NQYWxcIixcbi8vICAgICAgICAgXCJUaXRsZVwiOiBcIk15Rml0bmVzc1BhbFwiLFxuLy8gICAgICAgICBcIkRvbWFpblwiOiBcIm15Zml0bmVzc3BhbC5jb21cIixcbi8vICAgICAgICAgXCJCcmVhY2hEYXRlXCI6IFwiMjAxOC0wMi0wMVwiLFxuLy8gICAgICAgICBcIkFkZGVkRGF0ZVwiOiBcIjIwMTktMDItMjFUMTk6Mjg6NDZaXCIsXG4vLyAgICAgICAgIFwiTW9kaWZpZWREYXRlXCI6IFwiMjAxOS0wMi0yMVQyMDowMDo1NlpcIixcbi8vICAgICAgICAgXCJQd25Db3VudFwiOiAxNDM2MDYxNDcsXG4vLyAgICAgICAgIFwiRGVzY3JpcHRpb25cIjogXCJJbiBGZWJydWFyeSAyMDE4LCB0aGUgZGlldCBhbmQgZXhlcmNpc2Ugc2VydmljZSA8YSBocmVmPVxcXCJodHRwczovL2NvbnRlbnQubXlmaXRuZXNzcGFsLmNvbS9zZWN1cml0eS1pbmZvcm1hdGlvbi9GQVEuaHRtbFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPk15Rml0bmVzc1BhbCBzdWZmZXJlZCBhIGRhdGEgYnJlYWNoPC9hPi4gVGhlIGluY2lkZW50IGV4cG9zZWQgMTQ0IG1pbGxpb24gdW5pcXVlIGVtYWlsIGFkZHJlc3NlcyBhbG9uZ3NpZGUgdXNlcm5hbWVzLCBJUCBhZGRyZXNzZXMgYW5kIHBhc3N3b3JkcyBzdG9yZWQgYXMgU0hBLTEgYW5kIGJjcnlwdCBoYXNoZXMgKHRoZSBmb3JtZXIgZm9yIGVhcmxpZXIgYWNjb3VudHMsIHRoZSBsYXR0ZXIgZm9yIG5ld2VyIGFjY291bnRzKS4gSW4gMjAxOSwgPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudGhlcmVnaXN0ZXIuY28udWsvMjAxOS8wMi8xMS82MjBfbWlsbGlvbl9oYWNrZWRfYWNjb3VudHNfZGFya193ZWIvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+dGhlIGRhdGEgYXBwZWFyZWQgbGlzdGVkIGZvciBzYWxlIG9uIGEgZGFyayB3ZWIgbWFya2V0cGxhY2U8L2E+IChhbG9uZyB3aXRoIHNldmVyYWwgb3RoZXIgbGFyZ2UgYnJlYWNoZXMpIGFuZCBzdWJzZXF1ZW50bHkgYmVnYW4gY2lyY3VsYXRpbmcgbW9yZSBicm9hZGx5LiBUaGUgZGF0YSB3YXMgcHJvdmlkZWQgdG8gSElCUCBieSBhIHNvdXJjZSB3aG8gcmVxdWVzdGVkIGl0IHRvIGJlIGF0dHJpYnV0ZWQgdG8gJnF1b3Q7QmVuamFtaW5CbHVlQGV4cGxvaXQuaW0mcXVvdDsuXCIsXG4vLyAgICAgICAgIFwiTG9nb1BhdGhcIjogXCJodHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9Db250ZW50L0ltYWdlcy9Qd25lZExvZ29zL015Rml0bmVzc1BhbC5wbmdcIixcbi8vICAgICAgICAgXCJEYXRhQ2xhc3Nlc1wiOiBbXG4vLyAgICAgICAgICAgICBcIkVtYWlsIGFkZHJlc3Nlc1wiLFxuLy8gICAgICAgICAgICAgXCJJUCBhZGRyZXNzZXNcIixcbi8vICAgICAgICAgICAgIFwiUGFzc3dvcmRzXCIsXG4vLyAgICAgICAgICAgICBcIlVzZXJuYW1lc1wiXG4vLyAgICAgICAgIF0sXG4vLyAgICAgICAgIFwiSXNWZXJpZmllZFwiOiB0cnVlLFxuLy8gICAgICAgICBcIklzRmFicmljYXRlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NlbnNpdGl2ZVwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1JldGlyZWRcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNTcGFtTGlzdFwiOiBmYWxzZVxuLy8gICAgIH1cbi8vIF0iXSwic291cmNlUm9vdCI6IiJ9