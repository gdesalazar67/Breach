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
        searchInput.classList.remove("invalid");
        return true;
    };

    loader(false);
    searchInput.value = "";
    searchInput.placeholder = "Invalid email address!";
    searchInput.classList.add("invalid");
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
        // testing(email);

        // //create header for fetch request 
        var hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        var keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            reConfigure(data);
            setEmail(email);
            displayZeroOrAreDiv(1);
            removeCards();
            createCards(data);
            displayChartCardsResults();
            buildChart(allMajorBreaches.concat(data.slice(0)));
            loader(false);
            scrollToDiv(document.querySelector(".toggle-container"));
        }).catch(function (error) {
            setEmail(email);
            noResult();
            loader(false);
            scrollToDiv(document.querySelector(".toggle-container"));
            searchInput.value = "";
            searchInput.placeholder = "Enter your email here...";
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJWYWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwibG9hZGVyIiwidmFsdWUiLCJwbGFjZWhvbGRlciIsImFkZCIsImV2ZW50Iiwia2V5IiwiZmV0Y2hEYXRhIiwiZm9ybVN1Ym1pdCIsImRlbW9TdWJtaXQiLCJuZXdVcmwiLCJyZXBsYWNlIiwiaGlicEFwaUtleSIsImtleUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVDb25maWd1cmUiLCJzZXRFbWFpbCIsImRpc3BsYXlaZXJvT3JBcmVEaXYiLCJyZW1vdmVDYXJkcyIsImNyZWF0ZUNhcmRzIiwiZGlzcGxheUNoYXJ0Q2FyZHNSZXN1bHRzIiwiYnVpbGRDaGFydCIsImFsbE1ham9yQnJlYWNoZXMiLCJjb25jYXQiLCJzbGljZSIsInNjcm9sbFRvRGl2IiwiY2F0Y2giLCJub1Jlc3VsdCIsInRlc3RpbmciLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdB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QUNBO0FBQ0FDLGVBQVdDLGlCQUFpQkMsTUFBakIsQ0FBd0JULEtBQUtVLEtBQUwsQ0FBVyxDQUFYLENBQXhCLENBQVg7QUFDQTtBQUNBL0IsV0FBTyxLQUFQO0FBQ0gsQ0FaRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gb3ZlcnZpZXcgb2YgY29kZSBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgY2F0ZW5hIGRldmVsb3BlZCBieSBjbGVyaWNsIGdpdGh1YlxuLy9jb3JzLWFueXdoZXJlIHVzZWQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM4NzE2Mzcvbm8tYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luLWhlYWRlci1pcy1wcmVzZW50LW9uLXRoZS1yZXF1ZXN0ZWQtcmVzb3VyY2Utd2hlLzQzODgxMTQxXG4vLyBpbXBvcnQgKiBhcyBEYXRhIGZyb20gXCIuL3NlZWRfZGF0YVwiO1xuXG5cbi8vL3dhdGNoIHdpbmRvdyBzaXplLy8vL1xuZnVuY3Rpb24gd2luZG93U2l6ZSgpIHtcblxuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IE1haW5CYW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wcm9taXNlZFwiKTtcblxuICAgIGlmICh3ID49IDU3NSkge1xuICAgICAgICBNYWluQmFubmVyVGV4dC5pbm5lckhUTUwgPSBcIkhBUyBZT1VSIE9OTElORSBJREVOVElUWSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFWRSBZT1UgQkVFTiBDT01QUk9NSVNFRD9cIjtcbiAgICB9O1xufTtcblxud2luZG93U2l6ZSgpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG5cbiAgICB3aW5kb3dTaXplKClcbn0pO1xuXG4vLy8vL1xuXG4vLy9kcm9wZG93biB0b2dnbGUvLy9cbmZ1bmN0aW9uIHRvcE5hdkljb25Ub2dnbGUoKSB7XG5cbiAgICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWRUb3BOYXZcIik7XG5cbiAgICBpZiAoeC5jbGFzc05hbWUgPT09IFwidG9wbmF2XCIpIHtcbiAgICAgICAgeC5jbGFzc05hbWUgKz0gXCIgcmVzcG9uc2l2ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHguY2xhc3NOYW1lID0gXCJ0b3BuYXZcIjtcbiAgICB9O1xufTtcbi8vLy8vXG5cblxuXG4vL29uIHJlZnJlc2ggc2Nyb2xsIHRvIHRvcCBvZiBwYWdlIFxud2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xufTtcblxuXG5cbi8vIHNlYXJjaCBpbnB1dCBmdW5jdGlvbnNcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKVxuXG5jb25zdCBWYWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PiB7XG5cbiAgICBpZiAoL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDR9KSskLy50ZXN0KGVtYWlsKSkge1xuICAgICAgICBzZWFyY2hJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG5cbiAgICBsb2FkZXIoZmFsc2UpXG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBcIkludmFsaWQgZW1haWwgYWRkcmVzcyFcIlxuICAgIHNlYXJjaElucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgIHJldHVybiBmYWxzZVxufTtcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xuXG4gICAgaWYoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpe1xuICAgICAgICBmZXRjaERhdGEoKTtcbiAgICB9O1xufSk7XG5cbmNvbnN0IGZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICBmZXRjaERhdGEoKTtcbn07XG5cbmNvbnN0IGRlbW9TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICBsZXQgZW1haWwgPSBcImhlbGxvMUBnbWFpbC5jb21cIjtcbiAgICBmZXRjaERhdGEoZW1haWwpO1xufTtcblxuY29uc3QgZmV0Y2hEYXRhID0gKGVtYWlsID0gbnVsbCkgPT4ge1xuXG4gICAgbG9hZGVyKHRydWUpO1xuICAgICBpZighZW1haWwpIGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG5cbiAgICAvL3NlbmQgcmVxdWVzdCB0byBjb3JzLWFueXdoZXJlIHRvIHNhdGlzZnkgQ09SUyBoZWFkZXIgcmVzdHJpY3Rpb25zIHdpdGgvb3V0IGJ1aWRpbmcgYmFjayBlbmRcbiAgICBsZXQgbmV3VXJsID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vaGF2ZWliZWVucHduZWQuY29tL2FwaS92My9icmVhY2hlZGFjY291bnQvJztcblxuICAgIGlmIChWYWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xuICAgICAgICBlbWFpbCA9IGVtYWlsLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIG5ld1VybCArPSBlbWFpbCArIFwiP3RydW5jYXRlUmVzcG9uc2U9ZmFsc2VcIjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vL2ZvciB0ZXN0aW5nIG9ubHkgXG4gICAgICAgIC8vIHRlc3RpbmcoZW1haWwpO1xuXG4gICAgICAgIC8vIC8vY3JlYXRlIGhlYWRlciBmb3IgZmV0Y2ggcmVxdWVzdCBcbiAgICAgICAgY29uc3QgaGlicEFwaUtleSA9ICcyYjA4NDQzNGU2MGU0N2M4OWY2OTA2ZmRiMWFmNjcxYyc7XG4gICAgICAgIGxldCBrZXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAga2V5SGVhZGVycy5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG5cbiAgICAgICAgZmV0Y2gobmV3VXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVycyB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJlQ29uZmlndXJlKGRhdGEpXG4gICAgICAgICAgICAgICAgc2V0RW1haWwoZW1haWwpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlaZXJvT3JBcmVEaXYoMSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FyZHMoKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVDYXJkcyhkYXRhKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q2hhcnRDYXJkc1Jlc3VsdHMoKTtcbiAgICAgICAgICAgICAgICBidWlsZENoYXJ0KGFsbE1ham9yQnJlYWNoZXMuY29uY2F0KGRhdGEuc2xpY2UoMCkpKTtcbiAgICAgICAgICAgICAgICBsb2FkZXIoZmFsc2UpOyAgXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9EaXYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtY29udGFpbmVyXCIpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHNldEVtYWlsKGVtYWlsKTtcbiAgICAgICAgICAgICAgICBub1Jlc3VsdCgpO1xuICAgICAgICAgICAgICAgIGxvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9EaXYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtY29udGFpbmVyXCIpKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgeW91ciBlbWFpbCBoZXJlLi4uXCI7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuXG5cbmNvbnN0IHRlc3RpbmcgPSAoZW1haWwpID0+IHtcbiAgICByZUNvbmZpZ3VyZShkYXRhKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgc2V0RW1haWwoZW1haWwpO1xuICAgIHJlbW92ZUNhcmRzKCk7XG4gICAgZGlzcGxheVplcm9PckFyZURpdigxKTtcbiAgICBjcmVhdGVDYXJkcyhkYXRhKTtcbiAgICBkaXNwbGF5Q2hhcnRDYXJkc1Jlc3VsdHMoKVxuICAgIC8vIGJ1aWxkQ2hhcnQoZGF0YS5jb25jYXQoYWxsTWFqb3JCcmVhY2hlcy5yZXZlcnNlKCkpKVxuICAgIGJ1aWxkQ2hhcnQoYWxsTWFqb3JCcmVhY2hlcy5jb25jYXQoZGF0YS5zbGljZSgwKSkpXG4gICAgLy8gYnVpbGRDaGFydChhbGxNYWpvckJyZWFjaGVzKVxuICAgIGxvYWRlcihmYWxzZSk7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=