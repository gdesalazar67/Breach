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


//cors-anywhere used https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141

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

var chartDisplayed = null;

var chartResize = function chartResize(dataSet) {
    buildChart(dataSet);
};

windowSize();

window.addEventListener("resize", function () {

    windowSize();

    if (chartDisplayed) {
        chartResize(allMajorBreaches.concat(apiData));
    };
});
/////

function topNavIconToggle(y) {
    y.classList.toggle("change");
    var x = document.getElementById("idTopNav");

    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    };
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// search input functions
var searchInput = document.querySelector("#email");

var setEmailPlaceHolder = function setEmailPlaceHolder() {
    searchInput.value = "";
    searchInput.placeholder = "Enter your email here...";
};

var ValidateEmail = function ValidateEmail(email) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        searchInput.classList.remove("invalid");
        return true;
    };

    loader(false);
    searchInput.value = "";
    searchInput.placeholder = "Invalid email address!";
    searchInput.classList.add("invalid");
    return false;
};

var formSubmit = function formSubmit() {

    fetchData();
};

var demoSubmit = function demoSubmit() {

    var email = "hello1@gmail.com";
    fetchData(email);
};

var toogleContainer = document.querySelector(".toggle-container");

var apiData = null;

var fetchData = function fetchData() {
    var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


    loader(true);
    if (!email) email = searchInput.value;

    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        // //create header for fetch request 
        var hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        var keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            reConfigure(data);
            apiData = data;
            setEmail(email);
            displayZeroOrAreDiv(1);
            removeCards();
            createCards(data);
            displayChartCardsResults();
            buildChart(allMajorBreaches.concat(data));
            loader(false);
            scrollToDiv(toogleContainer);
            setEmailPlaceHolder();
        }).catch(function (error) {
            console.log("404 is what HIBP returns when email has no associated breach results, it's a good thing");
            setEmail(email);
            noResult();
            loader(false);
            scrollToDiv(toogleContainer);
            setEmailPlaceHolder();
        });
    };
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImNoYXJ0RGlzcGxheWVkIiwiY2hhcnRSZXNpemUiLCJkYXRhU2V0IiwiYnVpbGRDaGFydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhbGxNYWpvckJyZWFjaGVzIiwiY29uY2F0IiwiYXBpRGF0YSIsInRvcE5hdkljb25Ub2dnbGUiLCJ5IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRFbWFpbFBsYWNlSG9sZGVyIiwidmFsdWUiLCJwbGFjZWhvbGRlciIsIlZhbGlkYXRlRW1haWwiLCJlbWFpbCIsInRlc3QiLCJyZW1vdmUiLCJsb2FkZXIiLCJhZGQiLCJmb3JtU3VibWl0IiwiZmV0Y2hEYXRhIiwiZGVtb1N1Ym1pdCIsInRvb2dsZUNvbnRhaW5lciIsIm5ld1VybCIsInJlcGxhY2UiLCJoaWJwQXBpS2V5Iiwia2V5SGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJyZUNvbmZpZ3VyZSIsInNldEVtYWlsIiwiZGlzcGxheVplcm9PckFyZURpdiIsInJlbW92ZUNhcmRzIiwiY3JlYXRlQ2FyZHMiLCJkaXNwbGF5Q2hhcnRDYXJkc1Jlc3VsdHMiLCJzY3JvbGxUb0RpdiIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsIm5vUmVzdWx0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FB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QVkseUZBQVo7QUFDQVIscUJBQVN2QixLQUFUO0FBQ0FnQztBQUNBN0IsbUJBQU8sS0FBUDtBQUNBeUIsd0JBQVlwQixlQUFaO0FBQ0FaO0FBQ0gsU0F0Qkw7QUF1Qkg7QUFDSixDQXpDRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy9jb3JzLWFueXdoZXJlIHVzZWQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM4NzE2Mzcvbm8tYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luLWhlYWRlci1pcy1wcmVzZW50LW9uLXRoZS1yZXF1ZXN0ZWQtcmVzb3VyY2Utd2hlLzQzODgxMTQxXG5cbi8vL3dhdGNoIHdpbmRvdyBzaXplLy8vL1xuZnVuY3Rpb24gd2luZG93U2l6ZSgpIHtcblxuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IE1haW5CYW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wcm9taXNlZFwiKTtcblxuICAgIGlmICh3ID49IDU3NSkge1xuICAgICAgICBNYWluQmFubmVyVGV4dC5pbm5lckhUTUwgPSBcIkhBUyBZT1VSIE9OTElORSBJREVOVElUWSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFWRSBZT1UgQkVFTiBDT01QUk9NSVNFRD9cIjtcbiAgICB9O1xufTtcblxubGV0IGNoYXJ0RGlzcGxheWVkID0gbnVsbDtcblxuY29uc3QgY2hhcnRSZXNpemUgPSAoZGF0YVNldCkgPT4ge1xuICAgIGJ1aWxkQ2hhcnQoZGF0YVNldClcbn07XG5cbndpbmRvd1NpemUoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuXG4gICAgd2luZG93U2l6ZSgpO1xuXG4gICAgaWYgKGNoYXJ0RGlzcGxheWVkKXtcbiAgICAgICAgY2hhcnRSZXNpemUoYWxsTWFqb3JCcmVhY2hlcy5jb25jYXQoYXBpRGF0YSkpO1xuICAgIH07XG59KTtcbi8vLy8vXG5cbmZ1bmN0aW9uIHRvcE5hdkljb25Ub2dnbGUoeSkge1xuICAgIHkuY2xhc3NMaXN0LnRvZ2dsZShcImNoYW5nZVwiKTtcbiAgICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWRUb3BOYXZcIik7XG5cbiAgICBpZiAoeC5jbGFzc05hbWUgPT09IFwidG9wbmF2XCIpIHtcbiAgICAgICAgeC5jbGFzc05hbWUgKz0gXCIgcmVzcG9uc2l2ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHguY2xhc3NOYW1lID0gXCJ0b3BuYXZcIjtcbiAgICB9O1xufTtcblxud2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn07XG5cblxuXG4vLyBzZWFyY2ggaW5wdXQgZnVuY3Rpb25zXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIilcblxuY29uc3Qgc2V0RW1haWxQbGFjZUhvbGRlciA9ICgpID0+e1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJcIlxuICAgIHNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciB5b3VyIGVtYWlsIGhlcmUuLi5cIjtcbn07XG5cbmNvbnN0IFZhbGlkYXRlRW1haWwgPSAoZW1haWwpID0+IHtcblxuICAgIGlmICgvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsNH0pKyQvLnRlc3QoZW1haWwpKSB7XG4gICAgICAgIHNlYXJjaElucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcblxuICAgIGxvYWRlcihmYWxzZSlcbiAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW52YWxpZCBlbWFpbCBhZGRyZXNzIVwiXG4gICAgc2VhcmNoSW5wdXQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG5jb25zdCBmb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgZmV0Y2hEYXRhKCk7XG59O1xuXG5jb25zdCBkZW1vU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgbGV0IGVtYWlsID0gXCJoZWxsbzFAZ21haWwuY29tXCI7XG4gICAgZmV0Y2hEYXRhKGVtYWlsKTtcbn07XG5cbmNvbnN0IHRvb2dsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLWNvbnRhaW5lclwiKTtcblxubGV0IGFwaURhdGEgPSBudWxsO1xuXG5jb25zdCBmZXRjaERhdGEgPSAoZW1haWwgPSBudWxsKSA9PiB7XG5cbiAgICBsb2FkZXIodHJ1ZSk7XG4gICAgIGlmKCFlbWFpbCkgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcblxuICAgIC8vc2VuZCByZXF1ZXN0IHRvIGNvcnMtYW55d2hlcmUgdG8gc2F0aXNmeSBDT1JTIGhlYWRlciByZXN0cmljdGlvbnMgd2l0aC9vdXQgYnVpZGluZyBiYWNrIGVuZFxuICAgIGxldCBuZXdVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vYXBpL3YzL2JyZWFjaGVkYWNjb3VudC8nO1xuXG4gICAgaWYgKFZhbGlkYXRlRW1haWwoZW1haWwpKSB7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuICAgICAgIFxuICAgICAgICAvLyAvL2NyZWF0ZSBoZWFkZXIgZm9yIGZldGNoIHJlcXVlc3QgXG4gICAgICAgIGNvbnN0IGhpYnBBcGlLZXkgPSAnMmIwODQ0MzRlNjBlNDdjODlmNjkwNmZkYjFhZjY3MWMnO1xuICAgICAgICBsZXQga2V5SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGtleUhlYWRlcnMuYXBwZW5kKCdIaWJwLUFwaS1LZXknLCBoaWJwQXBpS2V5KVxuXG4gICAgICAgIGZldGNoKG5ld1VybCwgeyBtZXRob2Q6IFwiR0VUXCIsIGhlYWRlcnM6IGtleUhlYWRlcnMgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZUNvbmZpZ3VyZShkYXRhKVxuICAgICAgICAgICAgICAgIGFwaURhdGEgPSBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RW1haWwoZW1haWwpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlaZXJvT3JBcmVEaXYoMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FyZHMoKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVDYXJkcyhkYXRhKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q2hhcnRDYXJkc1Jlc3VsdHMoKTtcbiAgICAgICAgICAgICAgICBidWlsZENoYXJ0KGFsbE1ham9yQnJlYWNoZXMuY29uY2F0KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBsb2FkZXIoZmFsc2UpOyAgXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9EaXYodG9vZ2xlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBzZXRFbWFpbFBsYWNlSG9sZGVyKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjQwNCBpcyB3aGF0IEhJQlAgcmV0dXJucyB3aGVuIGVtYWlsIGhhcyBubyBhc3NvY2lhdGVkIGJyZWFjaCByZXN1bHRzLCBpdCdzIGEgZ29vZCB0aGluZ1wiKVxuICAgICAgICAgICAgICAgIHNldEVtYWlsKGVtYWlsKTtcbiAgICAgICAgICAgICAgICBub1Jlc3VsdCgpO1xuICAgICAgICAgICAgICAgIGxvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9EaXYodG9vZ2xlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBzZXRFbWFpbFBsYWNlSG9sZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=