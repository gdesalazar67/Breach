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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWVkX2RhdGEuanMiXSwibmFtZXMiOlsiRGF0YSIsInNlYXJjaElucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiVmFsaWRhdGVFbWFpbCIsImVtYWlsIiwidGVzdCIsImFsZXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwibmV3VXJsIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsInJlcGxhY2UiLCJoaWJwQXBpS2V5Iiwia2V5SGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiaGlyb0RhdGEiLCJjaGlsZFBhcmVudERhdGEiLCJyZXN1bHRzVHJlZSIsImNhdGNoIiwiZXJyb3IiLCJjaGlsZFBhcmVudE9iamVjdCIsImNoaWxkIiwicGFyZW50IiwiZGV0YWlscyIsInVuZGVmaW5lZCIsImFycmF5Iiwicm9vdFBhcmVudCIsInB1c2giLCJtYXAiLCJicmVhY2giLCJ0eXBlIiwiZGF0YVN0cnVjdHVyZSIsImQzIiwic3RyYXRpZnkiLCJpZCIsImQiLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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LEVBQTNCLEVBQW5CO0FBQ0FpQyxVQUFNRSxJQUFOLENBQVdELFVBQVg7O0FBRUFkLFNBQUtnQixHQUFMLENBQVMsa0JBQVM7QUFDZEgsY0FBTUUsSUFBTixDQUFXUCxrQkFBa0JTLE9BQU8sT0FBUCxDQUFsQixFQUFtQ3JDLEtBQW5DLEVBQTBDcUMsT0FBTyxVQUFQLENBQTFDLENBQVg7QUFDQUosY0FBTUUsSUFBTixDQUFXUCxrQkFBa0JTLE9BQU8sYUFBUCxDQUFsQixFQUF5Q0EsT0FBTyxPQUFQLENBQXpDLENBQVg7QUFDQTtBQUNBQSxlQUFPLGFBQVAsRUFBc0JELEdBQXRCLENBQTBCLGdCQUFPO0FBQzdCSCxrQkFBTUUsSUFBTixDQUFXUCxrQkFBa0JVLElBQWxCLEVBQXdCRCxPQUFPLGFBQVAsQ0FBeEIsQ0FBWDtBQUNILFNBRkQ7QUFHSCxLQVBEOztBQVNBLFFBQUlFLGdCQUFnQkMsR0FBR0MsUUFBSCxHQUNmQyxFQURlLENBQ1osVUFBU0MsQ0FBVCxFQUFXO0FBQUMsZUFBT0EsRUFBRWQsS0FBVDtBQUFnQixLQURoQixFQUVmZSxRQUZlLENBRU4sVUFBU0QsQ0FBVCxFQUFXO0FBQUMsZUFBT0EsRUFBRWIsTUFBVDtBQUFnQixLQUZ0QixFQUdmRyxLQUhlLENBQXBCOztBQUtBLFdBQU9NLGFBQVA7QUFDSCxDQXBCTSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gb3ZlcnZpZXcgb2YgY29kZSBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgY2F0ZW5hIGRldmVsb3BlZCBieSBjbGVyaWNsIGdpdGh1YlxuLy9jb3JzLWFueXdoZXJlIHVzZWQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM4NzE2Mzcvbm8tYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luLWhlYWRlci1pcy1wcmVzZW50LW9uLXRoZS1yZXF1ZXN0ZWQtcmVzb3VyY2Utd2hlLzQzODgxMTQxXG5pbXBvcnQgKiBhcyBEYXRhIGZyb20gXCIuL3NlZWRfZGF0YVwiO1xuLy8gaW1wb3J0IHtyZXN1bHRzVHJlZX0gZnJvbSBcIi4vZGVuZHJvZ3JhbVwiO1xuXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIilcblxuXG5jb25zdCBWYWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PntcbiAgICBpZiAoL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDR9KSskLy50ZXN0KGVtYWlsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBhbGVydChcIllvdSBoYXZlIGVudGVyZWQgYW4gaW52YWxpZCBlbWFpbCBhZGRyZXNzIVwiKVxuICAgIHJldHVybiBmYWxzZVxufTtcblxuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudD0+e1xuICAgIGxldCBlbWFpbCA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgIGxldCBuZXdVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vYXBpL3YzL2JyZWFjaGVkYWNjb3VudC8nO1xuICAgXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiICYmIFZhbGlkYXRlRW1haWwoZW1haWwpKXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZW1haWwgPSBlbWFpbC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICBuZXdVcmwgKz0gZW1haWwgKyBcIj90cnVuY2F0ZVJlc3BvbnNlPWZhbHNlXCI7XG4gICAgICAgIFxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIGNvbnN0IGhpYnBBcGlLZXkgPSAnMDNhNzk0NTIxMzI5NDMyYmFkMTJhZjVmNWJjNmRiM2UnO1xuICAgICAgICBsZXQga2V5SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGtleUhlYWRlcnMuYXBwZW5kKCdIaWJwLUFwaS1LZXknLCBoaWJwQXBpS2V5KVxuICAgICAgICBcbiAgICAgICAgZmV0Y2gobmV3VXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVycyB9KVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCBoaXJvRGF0YSA9IERhdGEuY2hpbGRQYXJlbnREYXRhKGVtYWlsLCBkYXRhKTsgXG4gICAgICAgICAgICByZXN1bHRzVHJlZShoaXJvRGF0YSk7ICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGVhc2UgZW50ZXIgZW1haWxcIik7XG4gICAgfVxufSlcbiIsIi8vaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1EdnFlYVZTZTZLbyB1c2VkIGFzIHJlZmVyYW5jZSBmb3IgZDMgZGF0YSBzdHJ1Y3R1cmluZ1xuXG5cbmNvbnN0IGNoaWxkUGFyZW50T2JqZWN0ID0gKGNoaWxkLCBwYXJlbnQsIGRldGFpbHMgPSB1bmRlZmluZWQpID0+e1xuICAgIHJldHVybih7XG4gICAgICAgIFwiY2hpbGRcIjogY2hpbGQsXG4gICAgICAgIFwicGFyZW50XCI6IHBhcmVudCxcbiAgICAgICAgZGV0YWlscyxcbiAgICB9KVxufVxuXG5cbi8vIGV4cG9ydCBjb25zdCBkYXRhID0gW1xuLy8gICAgIHtcbi8vICAgICAgICAgXCJOYW1lXCI6IFwiSGF1dGVMb29rXCIsXG4vLyAgICAgICAgIFwiVGl0bGVcIjogXCJIYXV0ZUxvb2tcIixcbi8vICAgICAgICAgXCJEb21haW5cIjogXCJoYXV0ZWxvb2suY29tXCIsXG4vLyAgICAgICAgIFwiQnJlYWNoRGF0ZVwiOiBcIjIwMTgtMDgtMDdcIixcbi8vICAgICAgICAgXCJBZGRlZERhdGVcIjogXCIyMDE5LTAzLTIxVDIxOjU3OjMyWlwiLFxuLy8gICAgICAgICBcIk1vZGlmaWVkRGF0ZVwiOiBcIjIwMTktMDMtMjFUMjE6NTc6MzJaXCIsXG4vLyAgICAgICAgIFwiUHduQ291bnRcIjogMjg1MTA0NTksXG4vLyAgICAgICAgIFwiRGVzY3JpcHRpb25cIjogXCJJbiBtaWQtMjAxOCwgdGhlIGZhc2hpb24gc2hvcHBpbmcgc2l0ZSA8YSBocmVmPVxcXCJodHRwczovL3d3dy50aGVyZWdpc3Rlci5jby51ay8yMDE5LzAyLzExLzYyMF9taWxsaW9uX2hhY2tlZF9hY2NvdW50c19kYXJrX3dlYi9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIj5IYXV0ZUxvb2sgd2FzIGFtb25nIGEgcmFmdCBvZiBzaXRlcyB0aGF0IHdlcmUgYnJlYWNoZWQgYW5kIHRoZWlyIGRhdGEgdGhlbiBzb2xkIGluIGVhcmx5LTIwMTk8L2E+LiBUaGUgZGF0YSBpbmNsdWRlZCBvdmVyIDI4IG1pbGxpb24gdW5pcXVlIGVtYWlsIGFkZHJlc3NlcyBhbG9uZ3NpZGUgbmFtZXMsIGdlbmRlcnMsIGRhdGVzIG9mIGJpcnRoIGFuZCBwYXNzd29yZHMgc3RvcmVkIGFzIGJjcnlwdCBoYXNoZXMuIFRoZSBkYXRhIHdhcyBwcm92aWRlZCB0byBISUJQIGJ5IDxhIGhyZWY9XFxcImh0dHBzOi8vZGVoYXNoZWQuY29tL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPmRlaGFzaGVkLmNvbTwvYT4uXCIsXG4vLyAgICAgICAgIFwiTG9nb1BhdGhcIjogXCJodHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9Db250ZW50L0ltYWdlcy9Qd25lZExvZ29zL0hhdXRlTG9vay5wbmdcIixcbi8vICAgICAgICAgXCJEYXRhQ2xhc3Nlc1wiOiBbXG4vLyAgICAgICAgICAgICBcIkRhdGVzIG9mIGJpcnRoXCIsXG4vLyAgICAgICAgICAgICBcIkVtYWlsIGFkZHJlc3Nlc1wiLFxuLy8gICAgICAgICAgICAgXCJHZW5kZXJzXCIsXG4vLyAgICAgICAgICAgICBcIkdlb2dyYXBoaWMgbG9jYXRpb25zXCIsXG4vLyAgICAgICAgICAgICBcIk5hbWVzXCIsXG4vLyAgICAgICAgICAgICBcIlBhc3N3b3Jkc1wiXG4vLyAgICAgICAgIF0sXG4vLyAgICAgICAgIFwiSXNWZXJpZmllZFwiOiB0cnVlLFxuLy8gICAgICAgICBcIklzRmFicmljYXRlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NlbnNpdGl2ZVwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1JldGlyZWRcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNTcGFtTGlzdFwiOiBmYWxzZVxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgICBcIk5hbWVcIjogXCJNeUZpdG5lc3NQYWxcIixcbi8vICAgICAgICAgXCJUaXRsZVwiOiBcIk15Rml0bmVzc1BhbFwiLFxuLy8gICAgICAgICBcIkRvbWFpblwiOiBcIm15Zml0bmVzc3BhbC5jb21cIixcbi8vICAgICAgICAgXCJCcmVhY2hEYXRlXCI6IFwiMjAxOC0wMi0wMVwiLFxuLy8gICAgICAgICBcIkFkZGVkRGF0ZVwiOiBcIjIwMTktMDItMjFUMTk6Mjg6NDZaXCIsXG4vLyAgICAgICAgIFwiTW9kaWZpZWREYXRlXCI6IFwiMjAxOS0wMi0yMVQyMDowMDo1NlpcIixcbi8vICAgICAgICAgXCJQd25Db3VudFwiOiAxNDM2MDYxNDcsXG4vLyAgICAgICAgIFwiRGVzY3JpcHRpb25cIjogXCJJbiBGZWJydWFyeSAyMDE4LCB0aGUgZGlldCBhbmQgZXhlcmNpc2Ugc2VydmljZSA8YSBocmVmPVxcXCJodHRwczovL2NvbnRlbnQubXlmaXRuZXNzcGFsLmNvbS9zZWN1cml0eS1pbmZvcm1hdGlvbi9GQVEuaHRtbFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiPk15Rml0bmVzc1BhbCBzdWZmZXJlZCBhIGRhdGEgYnJlYWNoPC9hPi4gVGhlIGluY2lkZW50IGV4cG9zZWQgMTQ0IG1pbGxpb24gdW5pcXVlIGVtYWlsIGFkZHJlc3NlcyBhbG9uZ3NpZGUgdXNlcm5hbWVzLCBJUCBhZGRyZXNzZXMgYW5kIHBhc3N3b3JkcyBzdG9yZWQgYXMgU0hBLTEgYW5kIGJjcnlwdCBoYXNoZXMgKHRoZSBmb3JtZXIgZm9yIGVhcmxpZXIgYWNjb3VudHMsIHRoZSBsYXR0ZXIgZm9yIG5ld2VyIGFjY291bnRzKS4gSW4gMjAxOSwgPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudGhlcmVnaXN0ZXIuY28udWsvMjAxOS8wMi8xMS82MjBfbWlsbGlvbl9oYWNrZWRfYWNjb3VudHNfZGFya193ZWIvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCI+dGhlIGRhdGEgYXBwZWFyZWQgbGlzdGVkIGZvciBzYWxlIG9uIGEgZGFyayB3ZWIgbWFya2V0cGxhY2U8L2E+IChhbG9uZyB3aXRoIHNldmVyYWwgb3RoZXIgbGFyZ2UgYnJlYWNoZXMpIGFuZCBzdWJzZXF1ZW50bHkgYmVnYW4gY2lyY3VsYXRpbmcgbW9yZSBicm9hZGx5LiBUaGUgZGF0YSB3YXMgcHJvdmlkZWQgdG8gSElCUCBieSBhIHNvdXJjZSB3aG8gcmVxdWVzdGVkIGl0IHRvIGJlIGF0dHJpYnV0ZWQgdG8gJnF1b3Q7QmVuamFtaW5CbHVlQGV4cGxvaXQuaW0mcXVvdDsuXCIsXG4vLyAgICAgICAgIFwiTG9nb1BhdGhcIjogXCJodHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9Db250ZW50L0ltYWdlcy9Qd25lZExvZ29zL015Rml0bmVzc1BhbC5wbmdcIixcbi8vICAgICAgICAgXCJEYXRhQ2xhc3Nlc1wiOiBbXG4vLyAgICAgICAgICAgICBcIkVtYWlsIGFkZHJlc3Nlc1wiLFxuLy8gICAgICAgICAgICAgXCJJUCBhZGRyZXNzZXNcIixcbi8vICAgICAgICAgICAgIFwiUGFzc3dvcmRzXCIsXG4vLyAgICAgICAgICAgICBcIlVzZXJuYW1lc1wiXG4vLyAgICAgICAgIF0sXG4vLyAgICAgICAgIFwiSXNWZXJpZmllZFwiOiB0cnVlLFxuLy8gICAgICAgICBcIklzRmFicmljYXRlZFwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1NlbnNpdGl2ZVwiOiBmYWxzZSxcbi8vICAgICAgICAgXCJJc1JldGlyZWRcIjogZmFsc2UsXG4vLyAgICAgICAgIFwiSXNTcGFtTGlzdFwiOiBmYWxzZVxuLy8gICAgIH1cbi8vIF1cbmV4cG9ydCBjb25zdCBjaGlsZFBhcmVudERhdGEgPSAoZW1haWwsIGRhdGEpPT57XG4gICAgbGV0IGFycmF5ID0gW107XG4gICAgY29uc3Qgcm9vdFBhcmVudCA9IHtcImNoaWxkXCI6IGVtYWlsLCBcInBhcmVudFwiOiBcIlwifTtcbiAgICBhcnJheS5wdXNoKHJvb3RQYXJlbnQpO1xuICAgIFxuICAgIGRhdGEubWFwKGJyZWFjaCA9PntcbiAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdChicmVhY2hbXCJUaXRsZVwiXSwgZW1haWwsIGJyZWFjaFtcIkxvZ29QYXRoXCJdKSk7XG4gICAgICAgIGFycmF5LnB1c2goY2hpbGRQYXJlbnRPYmplY3QoYnJlYWNoW1wiRGVzY3JpcHRpb25cIl0sIGJyZWFjaFtcIlRpdGxlXCJdKSk7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGJyZWFjaFtcIkRhdGFDbGFzc2VzXCJdLm1hcCh0eXBlID0+e1xuICAgICAgICAgICAgYXJyYXkucHVzaChjaGlsZFBhcmVudE9iamVjdCh0eXBlLCBicmVhY2hbXCJEZXNjcmlwdGlvblwiXSkpO1xuICAgICAgICB9KVxuICAgIH0pXG4gICAgXG4gICAgbGV0IGRhdGFTdHJ1Y3R1cmUgPSBkMy5zdHJhdGlmeSgpXG4gICAgICAgIC5pZChmdW5jdGlvbihkKXtyZXR1cm4gZC5jaGlsZDt9KVxuICAgICAgICAucGFyZW50SWQoZnVuY3Rpb24oZCl7cmV0dXJuIGQucGFyZW50fSlcbiAgICAgICAgKGFycmF5KTtcblxuICAgIHJldHVybiBkYXRhU3RydWN0dXJlO1xufVxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==