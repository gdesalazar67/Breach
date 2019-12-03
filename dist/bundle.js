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


// overview of code structure inspired by catena developed by clericl github
//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
// import * as Data from "./seed_data";


///watch window size////
function windowSize() {
    var w = window.innerWidth;
    var MainBannerText = document.getElementById("compromised");
    if (w >= 575) {
        MainBannerText.innerHTML = "HAS YOUR ONLINE IDENTITY BEEN COMPROMISED?";
    } else {
        MainBannerText.innerHTML = "HAVE YOU BEEN COMPROMISED?";
    };
};

windowSize();

window.addEventListener("resize", function () {
    windowSize();
});

/////

///dropdown toggle///
function topNavIconToggle() {
    var x = document.getElementById("idTopNav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
};
/////

///results breach cards///
var cards = document.getElementsByClassName("breach-card");

// add EventLister to each card
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function (event) {
        console.log("hi from click land");
        var tag = event.target.closest(".card");
        cardInfoExpander(tag);
    });
};

var expandedCard = null;

var cardInfoExpander = function cardInfoExpander(tag) {
    if (tag.className === "card card-is-collapsed") {
        if (expandedCard) expandedCard.className = "card card-is-collapsed";
        tag.className = "card card-is-expanded";
        expandedCard = tag;
    } else {
        tag.className = "card card-is-collapsed";
        expandedCard = null;
    };
};

// console.log(cards)
/////

//on refresh scroll to top of page 
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

//select tag with id email
var searchInput = document.querySelector("#email");

// validate email
var ValidateEmail = function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true;
    }
    alert("You have entered an invalid email address!");
    return false;
};

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        fetchData();
    };
});

var formSubmit = function formSubmit() {
    fetchData();
};

var demoSubmit = function demoSubmit() {
    var email = "hello1@gmail.com";
    fetchData(email);
};

var fetchData = function fetchData() {
    var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


    if (!email) email = searchInput.value;

    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        /////////////////for testing only 
        displayResults();
        console.log(data);

        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        /////////////////

        // //create header for fetch request 
        // const hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        // let keyHeaders = new Headers();
        // keyHeaders.append('Hibp-Api-Key', hibpApiKey)

        // fetch(newUrl, { method: "GET", headers: keyHeaders })
        //     .then(res => res.json())
        //     .then(function (data) {
        //         console.log(data)
        //         let hiroData = Data.childParentData(email, data);
        //         //sent data to tree building function
        //         resultsTree(hiroData);
        //     })
        //     .catch(error => {
        //         svg.selectAll("*").remove();
        //         noBreach.style.display = "block";
        //         searchInput.value = "Enter email";
        //     });
    };
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsImNhcmRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwidGFnIiwiZXZlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2FyZEluZm9FeHBhbmRlciIsImV4cGFuZGVkQ2FyZCIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJWYWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwiYWxlcnQiLCJrZXkiLCJmZXRjaERhdGEiLCJmb3JtU3VibWl0IiwiZGVtb1N1Ym1pdCIsInZhbHVlIiwibmV3VXJsIiwicmVwbGFjZSIsImRpc3BsYXlSZXN1bHRzIiwiZGF0YSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMx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Q0FJLGNBQVVKLEtBQVY7QUFDRCxDQUhEOztBQUtBLElBQU1JLFlBQVksU0FBWkEsU0FBWSxHQUFnQjtBQUFBLFFBQWZKLEtBQWUsdUVBQVAsSUFBTzs7O0FBRTdCLFFBQUcsQ0FBQ0EsS0FBSixFQUFXQSxRQUFRSCxZQUFZVSxLQUFwQjs7QUFFWjtBQUNBLFFBQUlDLFNBQVMsd0ZBQWI7O0FBRUEsUUFBSVQsY0FBY0MsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCQSxnQkFBUUEsTUFBTVMsT0FBTixDQUFjLEtBQWQsRUFBcUIsRUFBckIsQ0FBUjtBQUNBRCxrQkFBVVIsUUFBUSx5QkFBbEI7O0FBRUE7QUFDQVU7QUFDQXZCLGdCQUFRQyxHQUFSLENBQVl1QixJQUFaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0osQ0F0Q0QsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIG92ZXJ2aWV3IG9mIGNvZGUgc3RydWN0dXJlIGluc3BpcmVkIGJ5IGNhdGVuYSBkZXZlbG9wZWQgYnkgY2xlcmljbCBnaXRodWJcbi8vY29ycy1hbnl3aGVyZSB1c2VkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzODcxNjM3L25vLWFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbi1oZWFkZXItaXMtcHJlc2VudC1vbi10aGUtcmVxdWVzdGVkLXJlc291cmNlLXdoZS80Mzg4MTE0MVxuLy8gaW1wb3J0ICogYXMgRGF0YSBmcm9tIFwiLi9zZWVkX2RhdGFcIjtcblxuXG4vLy93YXRjaCB3aW5kb3cgc2l6ZS8vLy9cbmZ1bmN0aW9uIHdpbmRvd1NpemUoKSB7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgTWFpbkJhbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXByb21pc2VkXCIpO1xuICAgIGlmICh3ID49IDU3NSkge1xuICAgICAgICBNYWluQmFubmVyVGV4dC5pbm5lckhUTUwgPSBcIkhBUyBZT1VSIE9OTElORSBJREVOVElUWSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFWRSBZT1UgQkVFTiBDT01QUk9NSVNFRD9cIjtcbiAgICB9O1xufTtcblxud2luZG93U2l6ZSgpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgd2luZG93U2l6ZSgpXG59KTtcblxuLy8vLy9cblxuLy8vZHJvcGRvd24gdG9nZ2xlLy8vXG5mdW5jdGlvbiB0b3BOYXZJY29uVG9nZ2xlKCkge1xuICAgIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZFRvcE5hdlwiKTtcbiAgICBpZiAoeC5jbGFzc05hbWUgPT09IFwidG9wbmF2XCIpIHtcbiAgICAgICAgeC5jbGFzc05hbWUgKz0gXCIgcmVzcG9uc2l2ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHguY2xhc3NOYW1lID0gXCJ0b3BuYXZcIjtcbiAgICB9XG59O1xuLy8vLy9cblxuLy8vcmVzdWx0cyBicmVhY2ggY2FyZHMvLy9cbmNvbnN0IGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJyZWFjaC1jYXJkXCIpO1xuXG4vLyBhZGQgRXZlbnRMaXN0ZXIgdG8gZWFjaCBjYXJkXG5mb3IobGV0IGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspe1xuICAgIGNhcmRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudD0+e1xuICAgICAgICBjb25zb2xlLmxvZyhcImhpIGZyb20gY2xpY2sgbGFuZFwiKVxuICAgICAgICBsZXQgdGFnID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2FyZFwiKTtcbiAgICAgICAgY2FyZEluZm9FeHBhbmRlcih0YWcpO1xuICAgIH0pO1xufTtcblxubGV0IGV4cGFuZGVkQ2FyZCA9IG51bGxcblxuY29uc3QgY2FyZEluZm9FeHBhbmRlciA9ICh0YWcpPT57XG4gICAgaWYodGFnLmNsYXNzTmFtZSA9PT0gXCJjYXJkIGNhcmQtaXMtY29sbGFwc2VkXCIpe1xuICAgICAgICBpZiAoZXhwYW5kZWRDYXJkKSBleHBhbmRlZENhcmQuY2xhc3NOYW1lID0gXCJjYXJkIGNhcmQtaXMtY29sbGFwc2VkXCI7XG4gICAgICAgIHRhZy5jbGFzc05hbWUgPSBcImNhcmQgY2FyZC1pcy1leHBhbmRlZFwiO1xuICAgICAgICBleHBhbmRlZENhcmQgPSB0YWc7XG4gICAgfWVsc2V7XG4gICAgICAgIHRhZy5jbGFzc05hbWUgPSBcImNhcmQgY2FyZC1pcy1jb2xsYXBzZWRcIjtcbiAgICAgICAgZXhwYW5kZWRDYXJkID1udWxsO1xuICAgIH07XG59O1xuXG5cbi8vIGNvbnNvbGUubG9nKGNhcmRzKVxuLy8vLy9cblxuLy9vbiByZWZyZXNoIHNjcm9sbCB0byB0b3Agb2YgcGFnZSBcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG59O1xuXG4vL3NlbGVjdCB0YWcgd2l0aCBpZCBlbWFpbFxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpXG5cbi8vIHZhbGlkYXRlIGVtYWlsXG5jb25zdCBWYWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PntcbiAgICBpZiAoL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDR9KSskLy50ZXN0KGVtYWlsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBhbGVydChcIllvdSBoYXZlIGVudGVyZWQgYW4gaW52YWxpZCBlbWFpbCBhZGRyZXNzIVwiKVxuICAgIHJldHVybiBmYWxzZVxufTtcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQ9PntcbiAgICBpZihldmVudC5rZXkgPT09IFwiRW50ZXJcIil7XG4gICAgICAgIGZldGNoRGF0YSgpO1xuICAgIH07XG59KTtcblxuY29uc3QgZm9ybVN1Ym1pdCA9ICgpPT57XG4gICAgZmV0Y2hEYXRhKCk7XG59O1xuXG5jb25zdCBkZW1vU3VibWl0ID0gKCk9PntcbiAgbGV0IGVtYWlsID0gXCJoZWxsbzFAZ21haWwuY29tXCI7XG4gIGZldGNoRGF0YShlbWFpbCk7XG59O1xuXG5jb25zdCBmZXRjaERhdGEgPSAoZW1haWwgPSBudWxsKT0+e1xuXG4gICAgIGlmKCFlbWFpbCkgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcblxuICAgIC8vc2VuZCByZXF1ZXN0IHRvIGNvcnMtYW55d2hlcmUgdG8gc2F0aXNmeSBDT1JTIGhlYWRlciByZXN0cmljdGlvbnMgd2l0aC9vdXQgYnVpZGluZyBiYWNrIGVuZFxuICAgIGxldCBuZXdVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vYXBpL3YzL2JyZWFjaGVkYWNjb3VudC8nO1xuXG4gICAgaWYgKFZhbGlkYXRlRW1haWwoZW1haWwpKSB7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vZm9yIHRlc3Rpbmcgb25seSBcbiAgICAgICAgZGlzcGxheVJlc3VsdHMoKVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuXG4gICAgICAgIC8vIGxldCBoaXJvRGF0YSA9IERhdGEuY2hpbGRQYXJlbnREYXRhKGVtYWlsLCBEYXRhLmRhdGEpO1xuICAgICAgICAvLyByZXN1bHRzVHJlZShoaXJvRGF0YSk7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gLy9jcmVhdGUgaGVhZGVyIGZvciBmZXRjaCByZXF1ZXN0IFxuICAgICAgICAvLyBjb25zdCBoaWJwQXBpS2V5ID0gJzJiMDg0NDM0ZTYwZTQ3Yzg5ZjY5MDZmZGIxYWY2NzFjJztcbiAgICAgICAgLy8gbGV0IGtleUhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAvLyBrZXlIZWFkZXJzLmFwcGVuZCgnSGlicC1BcGktS2V5JywgaGlicEFwaUtleSlcblxuICAgICAgICAvLyBmZXRjaChuZXdVcmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiBrZXlIZWFkZXJzIH0pXG4gICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLy8gICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgZGF0YSk7XG4gICAgICAgIC8vICAgICAgICAgLy9zZW50IGRhdGEgdG8gdHJlZSBidWlsZGluZyBmdW5jdGlvblxuICAgICAgICAvLyAgICAgICAgIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHN2Zy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICAvLyAgICAgICAgIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIC8vICAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIkVudGVyIGVtYWlsXCI7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=