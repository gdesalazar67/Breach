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
    buildChart(allMajorBreaches.reverse());
    // buildChart(allMajorBreaches)
    loader(false);
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJWYWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwibG9hZGVyIiwiYWxlcnQiLCJldmVudCIsImtleSIsImZldGNoRGF0YSIsImZvcm1TdWJtaXQiLCJkZW1vU3VibWl0IiwidmFsdWUiLCJuZXdVcmwiLCJyZXBsYWNlIiwidGVzdGluZyIsInJlQ29uZmlndXJlIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzZXRFbWFpbCIsInJlbW92ZUNhcmRzIiwiZGlzcGxheVplcm9PckFyZURpdiIsImNyZWF0ZUNhcmRzIiwiZGlzcGxheUNoYXJ0Q2FyZHNSZXN1bHRzIiwiYnVpbGRDaGFydCIsImFsbE1ham9yQnJlYWNoZXMiLCJyZXZlcnNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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SUFBWjtBQUNBQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDQUcsYUFBU2pCLEtBQVQ7QUFDQWtCO0FBQ0FDLHdCQUFvQixDQUFwQjtBQUNBQyxnQkFBWU4sSUFBWjtBQUNBTztBQUNBQyxlQUFXQyxpQkFBaUJDLE9BQWpCLEVBQVg7QUFDQTtBQUNBdEIsV0FBTyxLQUFQO0FBQ0gsQ0FYRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gb3ZlcnZpZXcgb2YgY29kZSBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgY2F0ZW5hIGRldmVsb3BlZCBieSBjbGVyaWNsIGdpdGh1YlxuLy9jb3JzLWFueXdoZXJlIHVzZWQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM4NzE2Mzcvbm8tYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luLWhlYWRlci1pcy1wcmVzZW50LW9uLXRoZS1yZXF1ZXN0ZWQtcmVzb3VyY2Utd2hlLzQzODgxMTQxXG4vLyBpbXBvcnQgKiBhcyBEYXRhIGZyb20gXCIuL3NlZWRfZGF0YVwiO1xuXG5cbi8vL3dhdGNoIHdpbmRvdyBzaXplLy8vL1xuZnVuY3Rpb24gd2luZG93U2l6ZSgpIHtcblxuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IE1haW5CYW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wcm9taXNlZFwiKTtcblxuICAgIGlmICh3ID49IDU3NSkge1xuICAgICAgICBNYWluQmFubmVyVGV4dC5pbm5lckhUTUwgPSBcIkhBUyBZT1VSIE9OTElORSBJREVOVElUWSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFWRSBZT1UgQkVFTiBDT01QUk9NSVNFRD9cIjtcbiAgICB9O1xufTtcblxud2luZG93U2l6ZSgpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG5cbiAgICB3aW5kb3dTaXplKClcbn0pO1xuXG4vLy8vL1xuXG4vLy9kcm9wZG93biB0b2dnbGUvLy9cbmZ1bmN0aW9uIHRvcE5hdkljb25Ub2dnbGUoKSB7XG5cbiAgICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWRUb3BOYXZcIik7XG5cbiAgICBpZiAoeC5jbGFzc05hbWUgPT09IFwidG9wbmF2XCIpIHtcbiAgICAgICAgeC5jbGFzc05hbWUgKz0gXCIgcmVzcG9uc2l2ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHguY2xhc3NOYW1lID0gXCJ0b3BuYXZcIjtcbiAgICB9O1xufTtcbi8vLy8vXG5cblxuXG4vL29uIHJlZnJlc2ggc2Nyb2xsIHRvIHRvcCBvZiBwYWdlIFxud2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xufTtcblxuXG5cbi8vIHNlYXJjaCBpbnB1dCBmdW5jdGlvbnNcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKVxuXG5jb25zdCBWYWxpZGF0ZUVtYWlsID0gKGVtYWlsKSA9PiB7XG5cbiAgICBpZiAoL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDR9KSskLy50ZXN0KGVtYWlsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG5cbiAgICBsb2FkZXIoZmFsc2UpXG4gICAgYWxlcnQoXCJZb3UgaGF2ZSBlbnRlcmVkIGFuIGludmFsaWQgZW1haWwgYWRkcmVzcyFcIik7XG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG5cbiAgICBpZihldmVudC5rZXkgPT09IFwiRW50ZXJcIil7XG4gICAgICAgIGZldGNoRGF0YSgpO1xuICAgIH07XG59KTtcblxuY29uc3QgZm9ybVN1Ym1pdCA9ICgpID0+IHtcblxuICAgIGZldGNoRGF0YSgpO1xufTtcblxuY29uc3QgZGVtb1N1Ym1pdCA9ICgpID0+IHtcblxuICAgIGxldCBlbWFpbCA9IFwiaGVsbG8xQGdtYWlsLmNvbVwiO1xuICAgIGZldGNoRGF0YShlbWFpbCk7XG59O1xuXG5jb25zdCBmZXRjaERhdGEgPSAoZW1haWwgPSBudWxsKSA9PiB7XG5cbiAgICBsb2FkZXIodHJ1ZSk7XG4gICAgIGlmKCFlbWFpbCkgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcblxuICAgIC8vc2VuZCByZXF1ZXN0IHRvIGNvcnMtYW55d2hlcmUgdG8gc2F0aXNmeSBDT1JTIGhlYWRlciByZXN0cmljdGlvbnMgd2l0aC9vdXQgYnVpZGluZyBiYWNrIGVuZFxuICAgIGxldCBuZXdVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vYXBpL3YzL2JyZWFjaGVkYWNjb3VudC8nO1xuXG4gICAgaWYgKFZhbGlkYXRlRW1haWwoZW1haWwpKSB7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vZm9yIHRlc3Rpbmcgb25seSBcbiAgICAgICAgdGVzdGluZyhlbWFpbCk7XG5cbiAgICAgICAgLy8gbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIERhdGEuZGF0YSk7XG4gICAgICAgIC8vIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICAvLyAvL2NyZWF0ZSBoZWFkZXIgZm9yIGZldGNoIHJlcXVlc3QgXG4gICAgICAgIC8vIGNvbnN0IGhpYnBBcGlLZXkgPSAnMmIwODQ0MzRlNjBlNDdjODlmNjkwNmZkYjFhZjY3MWMnO1xuICAgICAgICAvLyBsZXQga2V5SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIC8vIGtleUhlYWRlcnMuYXBwZW5kKCdIaWJwLUFwaS1LZXknLCBoaWJwQXBpS2V5KVxuXG4gICAgICAgIC8vIGZldGNoKG5ld1VybCwgeyBtZXRob2Q6IFwiR0VUXCIsIGhlYWRlcnM6IGtleUhlYWRlcnMgfSlcbiAgICAgICAgLy8gICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAvLyAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAvLyAgICAgICAgIC8vIHNldEVtYWlsKGVtYWlsKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBjcmVhdGVDYXJkcyhkYXRhKVxuICAgICAgICAvLyAgICAgICAgIC8vIGRpc3BsYXlaZXJvT3JBcmVEaXYoMSk7XG5cbiAgICAgICAgLy8gICAgICAgICAvLyBidWlsZENoYXJ0KGRhdGEpXG4gICAgICAgIC8vICAgICAgICAgLy8gbG9hZGVyKGZhbHNlKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBkaXNwbGF5Q2hhcnRDYXJkc1Jlc3VsdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgZGF0YSk7XG4gICAgICAgIC8vICAgICAgICAgLy8gc2VudCBkYXRhIHRvIHRyZWUgYnVpbGRpbmcgZnVuY3Rpb25cbiAgICAgICAgLy8gICAgICAgICAvLyByZXN1bHRzVHJlZShoaXJvRGF0YSk7XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gICAgICAgICBzZXRFbWFpbChlbWFpbCk7XG4gICAgICAgIC8vICAgICAgICAgbG9hZGVyKGZhbHNlKVxuICAgICAgICAvLyAgICAgICAgIG5vUmVzdWx0KCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gc3ZnLnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gbm9CcmVhY2guc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgLy8gICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgLy8gICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgeW91ciBlbWFpbCBoZXJlLi4uXCI7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICB9O1xufTtcblxuXG5cbmNvbnN0IHRlc3RpbmcgPSAoZW1haWwpID0+IHtcbiAgICByZUNvbmZpZ3VyZShkYXRhKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgc2V0RW1haWwoZW1haWwpO1xuICAgIHJlbW92ZUNhcmRzKCk7XG4gICAgZGlzcGxheVplcm9PckFyZURpdigxKTtcbiAgICBjcmVhdGVDYXJkcyhkYXRhKTtcbiAgICBkaXNwbGF5Q2hhcnRDYXJkc1Jlc3VsdHMoKVxuICAgIGJ1aWxkQ2hhcnQoYWxsTWFqb3JCcmVhY2hlcy5yZXZlcnNlKCkpXG4gICAgLy8gYnVpbGRDaGFydChhbGxNYWpvckJyZWFjaGVzKVxuICAgIGxvYWRlcihmYWxzZSk7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=