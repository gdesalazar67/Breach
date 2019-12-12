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
    };
};
/////


//on refresh scroll to top of page 
window.onbeforeunload = function () {

    window.scrollTo(0, 0);
};

// search input functions
var searchInput = document.querySelector("#email");

var ValidateEmail = function ValidateEmail(email) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        return true;
    };

    loader(false);
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


    loader(true);
    if (!email) email = searchInput.value;

    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        /////////////////for testing only 
        testing(email);

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
        //         // console.log(data)
        //         // setEmail(email);
        //         // createCards(data)
        //         // displayZeroOrAreDiv(1);

        //         // buildChart(data)
        //         // loader(false);
        //         // displayChartCardsResults();
        //         // let hiroData = Data.childParentData(email, data);
        //         // sent data to tree building function
        //         // resultsTree(hiroData);
        //     })
        //     .catch(error => {
        //         setEmail(email);
        //         loader(false)
        //         noResult();
        //         // svg.selectAll("*").remove();
        //         // noBreach.style.display = "block";
        //         searchInput.value = ""
        //         searchInput.placeholder = "Enter your email here...";
        //     });
    };
};

var testing = function testing(email) {
    reConfigure(data);
    console.log(data);
    setEmail(email);
    removeCards();
    displayZeroOrAreDiv(1);
    createCards(data);
    displayChartCardsResults();
    // buildChart(data.concat(allMajorBreaches.reverse()))
    buildChart(allMajorBreaches.concat(data.slice(0)));
    // buildChart(allMajorBreaches)
    loader(false);
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJWYWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwibG9hZGVyIiwiYWxlcnQiLCJldmVudCIsImtleSIsImZldGNoRGF0YSIsImZvcm1TdWJtaXQiLCJkZW1vU3VibWl0IiwidmFsdWUiLCJuZXdVcmwiLCJyZXBsYWNlIiwidGVzdGluZyIsInJlQ29uZmlndXJlIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzZXRFbWFpbCIsInJlbW92ZUNhcmRzIiwiZGlzcGxheVplcm9PckFyZURpdiIsImNyZWF0ZUNhcmRzIiwiZGlzcGxheUNoYXJ0Q2FyZHNSZXN1bHRzIiwiYnVpbGRDaGFydCIsImFsbE1ham9yQnJlYWNoZXMiLCJjb25jYXQiLCJzbGljZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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Z0JBQVlDLElBQVo7QUFDQUMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0FHLGFBQVNqQixLQUFUO0FBQ0FrQjtBQUNBQyx3QkFBb0IsQ0FBcEI7QUFDQUMsZ0JBQVlOLElBQVo7QUFDQU87QUFDQTtBQUNBQyxlQUFXQyxpQkFBaUJDLE1BQWpCLENBQXdCVixLQUFLVyxLQUFMLENBQVcsQ0FBWCxDQUF4QixDQUFYO0FBQ0E7QUFDQXZCLFdBQU8sS0FBUDtBQUNILENBWkQsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIG92ZXJ2aWV3IG9mIGNvZGUgc3RydWN0dXJlIGluc3BpcmVkIGJ5IGNhdGVuYSBkZXZlbG9wZWQgYnkgY2xlcmljbCBnaXRodWJcbi8vY29ycy1hbnl3aGVyZSB1c2VkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzODcxNjM3L25vLWFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbi1oZWFkZXItaXMtcHJlc2VudC1vbi10aGUtcmVxdWVzdGVkLXJlc291cmNlLXdoZS80Mzg4MTE0MVxuLy8gaW1wb3J0ICogYXMgRGF0YSBmcm9tIFwiLi9zZWVkX2RhdGFcIjtcblxuXG4vLy93YXRjaCB3aW5kb3cgc2l6ZS8vLy9cbmZ1bmN0aW9uIHdpbmRvd1NpemUoKSB7XG5cbiAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBNYWluQmFubmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHJvbWlzZWRcIik7XG5cbiAgICBpZiAodyA+PSA1NzUpIHtcbiAgICAgICAgTWFpbkJhbm5lclRleHQuaW5uZXJIVE1MID0gXCJIQVMgWU9VUiBPTkxJTkUgSURFTlRJVFkgQkVFTiBDT01QUk9NSVNFRD9cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBNYWluQmFubmVyVGV4dC5pbm5lckhUTUwgPSBcIkhBVkUgWU9VIEJFRU4gQ09NUFJPTUlTRUQ/XCI7XG4gICAgfTtcbn07XG5cbndpbmRvd1NpemUoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuXG4gICAgd2luZG93U2l6ZSgpXG59KTtcblxuLy8vLy9cblxuLy8vZHJvcGRvd24gdG9nZ2xlLy8vXG5mdW5jdGlvbiB0b3BOYXZJY29uVG9nZ2xlKCkge1xuXG4gICAgdmFyIHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkVG9wTmF2XCIpO1xuXG4gICAgaWYgKHguY2xhc3NOYW1lID09PSBcInRvcG5hdlwiKSB7XG4gICAgICAgIHguY2xhc3NOYW1lICs9IFwiIHJlc3BvbnNpdmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4LmNsYXNzTmFtZSA9IFwidG9wbmF2XCI7XG4gICAgfTtcbn07XG4vLy8vL1xuXG5cblxuLy9vbiByZWZyZXNoIHNjcm9sbCB0byB0b3Agb2YgcGFnZSBcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn07XG5cblxuXG4vLyBzZWFyY2ggaW5wdXQgZnVuY3Rpb25zXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIilcblxuY29uc3QgVmFsaWRhdGVFbWFpbCA9IChlbWFpbCkgPT4ge1xuXG4gICAgaWYgKC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7Miw0fSkrJC8udGVzdChlbWFpbCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuXG4gICAgbG9hZGVyKGZhbHNlKVxuICAgIGFsZXJ0KFwiWW91IGhhdmUgZW50ZXJlZCBhbiBpbnZhbGlkIGVtYWlsIGFkZHJlc3MhXCIpO1xuICAgIHJldHVybiBmYWxzZVxufTtcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xuXG4gICAgaWYoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpe1xuICAgICAgICBmZXRjaERhdGEoKTtcbiAgICB9O1xufSk7XG5cbmNvbnN0IGZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICBmZXRjaERhdGEoKTtcbn07XG5cbmNvbnN0IGRlbW9TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICBsZXQgZW1haWwgPSBcImhlbGxvMUBnbWFpbC5jb21cIjtcbiAgICBmZXRjaERhdGEoZW1haWwpO1xufTtcblxuY29uc3QgZmV0Y2hEYXRhID0gKGVtYWlsID0gbnVsbCkgPT4ge1xuXG4gICAgbG9hZGVyKHRydWUpO1xuICAgICBpZighZW1haWwpIGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG5cbiAgICAvL3NlbmQgcmVxdWVzdCB0byBjb3JzLWFueXdoZXJlIHRvIHNhdGlzZnkgQ09SUyBoZWFkZXIgcmVzdHJpY3Rpb25zIHdpdGgvb3V0IGJ1aWRpbmcgYmFjayBlbmRcbiAgICBsZXQgbmV3VXJsID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL2FwaS92My9icmVhY2hlZGFjY291bnQvJztcblxuICAgIGlmIChWYWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xuICAgICAgICBlbWFpbCA9IGVtYWlsLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIG5ld1VybCArPSBlbWFpbCArIFwiP3RydW5jYXRlUmVzcG9uc2U9ZmFsc2VcIjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vL2ZvciB0ZXN0aW5nIG9ubHkgXG4gICAgICAgIHRlc3RpbmcoZW1haWwpO1xuXG4gICAgICAgIC8vIGxldCBoaXJvRGF0YSA9IERhdGEuY2hpbGRQYXJlbnREYXRhKGVtYWlsLCBEYXRhLmRhdGEpO1xuICAgICAgICAvLyByZXN1bHRzVHJlZShoaXJvRGF0YSk7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gLy9jcmVhdGUgaGVhZGVyIGZvciBmZXRjaCByZXF1ZXN0IFxuICAgICAgICAvLyBjb25zdCBoaWJwQXBpS2V5ID0gJzJiMDg0NDM0ZTYwZTQ3Yzg5ZjY5MDZmZGIxYWY2NzFjJztcbiAgICAgICAgLy8gbGV0IGtleUhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAvLyBrZXlIZWFkZXJzLmFwcGVuZCgnSGlicC1BcGktS2V5JywgaGlicEFwaUtleSlcblxuICAgICAgICAvLyBmZXRjaChuZXdVcmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiBrZXlIZWFkZXJzIH0pXG4gICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLy8gICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgLy8gICAgICAgICAvLyBzZXRFbWFpbChlbWFpbCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gY3JlYXRlQ2FyZHMoZGF0YSlcbiAgICAgICAgLy8gICAgICAgICAvLyBkaXNwbGF5WmVyb09yQXJlRGl2KDEpO1xuXG4gICAgICAgIC8vICAgICAgICAgLy8gYnVpbGRDaGFydChkYXRhKVxuICAgICAgICAvLyAgICAgICAgIC8vIGxvYWRlcihmYWxzZSk7XG4gICAgICAgIC8vICAgICAgICAgLy8gZGlzcGxheUNoYXJ0Q2FyZHNSZXN1bHRzKCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIGRhdGEpO1xuICAgICAgICAvLyAgICAgICAgIC8vIHNlbnQgZGF0YSB0byB0cmVlIGJ1aWxkaW5nIGZ1bmN0aW9uXG4gICAgICAgIC8vICAgICAgICAgLy8gcmVzdWx0c1RyZWUoaGlyb0RhdGEpO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIC8vICAgICAgICAgc2V0RW1haWwoZW1haWwpO1xuICAgICAgICAvLyAgICAgICAgIGxvYWRlcihmYWxzZSlcbiAgICAgICAgLy8gICAgICAgICBub1Jlc3VsdCgpO1xuICAgICAgICAvLyAgICAgICAgIC8vIHN2Zy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICAvLyAgICAgICAgIC8vIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIC8vICAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIC8vICAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHlvdXIgZW1haWwgaGVyZS4uLlwiO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgfTtcbn07XG5cblxuXG5jb25zdCB0ZXN0aW5nID0gKGVtYWlsKSA9PiB7XG4gICAgcmVDb25maWd1cmUoZGF0YSlcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHNldEVtYWlsKGVtYWlsKTtcbiAgICByZW1vdmVDYXJkcygpO1xuICAgIGRpc3BsYXlaZXJvT3JBcmVEaXYoMSk7XG4gICAgY3JlYXRlQ2FyZHMoZGF0YSk7XG4gICAgZGlzcGxheUNoYXJ0Q2FyZHNSZXN1bHRzKClcbiAgICAvLyBidWlsZENoYXJ0KGRhdGEuY29uY2F0KGFsbE1ham9yQnJlYWNoZXMucmV2ZXJzZSgpKSlcbiAgICBidWlsZENoYXJ0KGFsbE1ham9yQnJlYWNoZXMuY29uY2F0KGRhdGEuc2xpY2UoMCkpKVxuICAgIC8vIGJ1aWxkQ2hhcnQoYWxsTWFqb3JCcmVhY2hlcylcbiAgICBsb2FkZXIoZmFsc2UpO1xufTsiXSwic291cmNlUm9vdCI6IiJ9