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
        console.log('clssname matches');
        console.log(expandedCard);
        if (expandedCard) expandedCard.className = "card card-is-collapsed";
        tag.className = "card card-is-expanded";
        expandedCard = tag;
    } else {
        tag.className = "card card-is-collapsed";
        expandedCard = null;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsImNhcmRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwidGFnIiwiZXZlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2FyZEluZm9FeHBhbmRlciIsImV4cGFuZGVkQ2FyZCIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJWYWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwiYWxlcnQiLCJrZXkiLCJmZXRjaERhdGEiLCJmb3JtU3VibWl0IiwiZGVtb1N1Ym1pdCIsInZhbHVlIiwibmV3VXJsIiwicmVwbGFjZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixF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U0FBYkEsVUFBYSxHQUFJO0FBQ3JCLFFBQUlOLFFBQVEsa0JBQVo7QUFDQUksY0FBVUosS0FBVjtBQUNELENBSEQ7O0FBS0EsSUFBTUksWUFBWSxTQUFaQSxTQUFZLEdBQWdCO0FBQUEsUUFBZkosS0FBZSx1RUFBUCxJQUFPOzs7QUFFN0IsUUFBRyxDQUFDQSxLQUFKLEVBQVdBLFFBQVFILFlBQVlVLEtBQXBCOztBQUVaO0FBQ0EsUUFBSUMsU0FBUyx3RkFBYjs7QUFFQSxRQUFJVCxjQUFjQyxLQUFkLENBQUosRUFBMEI7QUFDdEJBLGdCQUFRQSxNQUFNUyxPQUFOLENBQWMsS0FBZCxFQUFxQixFQUFyQixDQUFSO0FBQ0FELGtCQUFVUixRQUFRLHlCQUFsQjs7QUFFQTs7QUFFQWIsZ0JBQVFDLEdBQVIsQ0FBWXNCLElBQVo7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSixDQXRDRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gb3ZlcnZpZXcgb2YgY29kZSBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgY2F0ZW5hIGRldmVsb3BlZCBieSBjbGVyaWNsIGdpdGh1YlxuLy9jb3JzLWFueXdoZXJlIHVzZWQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM4NzE2Mzcvbm8tYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luLWhlYWRlci1pcy1wcmVzZW50LW9uLXRoZS1yZXF1ZXN0ZWQtcmVzb3VyY2Utd2hlLzQzODgxMTQxXG4vLyBpbXBvcnQgKiBhcyBEYXRhIGZyb20gXCIuL3NlZWRfZGF0YVwiO1xuXG5cbi8vL3dhdGNoIHdpbmRvdyBzaXplLy8vL1xuZnVuY3Rpb24gd2luZG93U2l6ZSgpIHtcbiAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBNYWluQmFubmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHJvbWlzZWRcIik7XG4gICAgaWYgKHcgPj0gNTc1KSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFTIFlPVVIgT05MSU5FIElERU5USVRZIEJFRU4gQ09NUFJPTUlTRUQ/XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgTWFpbkJhbm5lclRleHQuaW5uZXJIVE1MID0gXCJIQVZFIFlPVSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH07XG59O1xuXG53aW5kb3dTaXplKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICB3aW5kb3dTaXplKClcbn0pO1xuXG4vLy8vL1xuXG4vLy9kcm9wZG93biB0b2dnbGUvLy9cbmZ1bmN0aW9uIHRvcE5hdkljb25Ub2dnbGUoKSB7XG4gICAgdmFyIHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkVG9wTmF2XCIpO1xuICAgIGlmICh4LmNsYXNzTmFtZSA9PT0gXCJ0b3BuYXZcIikge1xuICAgICAgICB4LmNsYXNzTmFtZSArPSBcIiByZXNwb25zaXZlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeC5jbGFzc05hbWUgPSBcInRvcG5hdlwiO1xuICAgIH1cbn07XG4vLy8vL1xuXG4vLy9yZXN1bHRzIGJyZWFjaCBjYXJkcy8vL1xuY29uc3QgY2FyZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnJlYWNoLWNhcmRcIik7XG5cbi8vIGFkZCBFdmVudExpc3RlciB0byBlYWNoIGNhcmRcbmZvcihsZXQgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKyl7XG4gICAgY2FyZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50PT57XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGkgZnJvbSBjbGljayBsYW5kXCIpXG4gICAgICAgIGxldCB0YWcgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5jYXJkXCIpO1xuICAgICAgICBjYXJkSW5mb0V4cGFuZGVyKHRhZyk7XG4gICAgfSk7XG59O1xuXG5sZXQgZXhwYW5kZWRDYXJkID0gbnVsbFxuXG5jb25zdCBjYXJkSW5mb0V4cGFuZGVyID0gKHRhZyk9PntcbiAgICBpZih0YWcuY2xhc3NOYW1lID09PSBcImNhcmQgY2FyZC1pcy1jb2xsYXBzZWRcIil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbHNzbmFtZSBtYXRjaGVzJylcbiAgICAgICAgY29uc29sZS5sb2coZXhwYW5kZWRDYXJkKVxuICAgICAgICBpZiAoZXhwYW5kZWRDYXJkKSBleHBhbmRlZENhcmQuY2xhc3NOYW1lID0gXCJjYXJkIGNhcmQtaXMtY29sbGFwc2VkXCI7XG4gICAgICAgIHRhZy5jbGFzc05hbWUgPSBcImNhcmQgY2FyZC1pcy1leHBhbmRlZFwiO1xuICAgICAgICBleHBhbmRlZENhcmQgPSB0YWc7XG4gICAgfWVsc2V7XG4gICAgICAgIHRhZy5jbGFzc05hbWUgPSBcImNhcmQgY2FyZC1pcy1jb2xsYXBzZWRcIlxuICAgICAgICBleHBhbmRlZENhcmQgPW51bGxcbiAgICB9XG59XG5cblxuLy8gY29uc29sZS5sb2coY2FyZHMpXG4vLy8vL1xuXG4vL29uIHJlZnJlc2ggc2Nyb2xsIHRvIHRvcCBvZiBwYWdlIFxud2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn07XG5cbi8vc2VsZWN0IHRhZyB3aXRoIGlkIGVtYWlsXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIilcblxuLy8gdmFsaWRhdGUgZW1haWxcbmNvbnN0IFZhbGlkYXRlRW1haWwgPSAoZW1haWwpID0+e1xuICAgIGlmICgvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsNH0pKyQvLnRlc3QoZW1haWwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGFsZXJ0KFwiWW91IGhhdmUgZW50ZXJlZCBhbiBpbnZhbGlkIGVtYWlsIGFkZHJlc3MhXCIpXG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudD0+e1xuICAgIGlmKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKXtcbiAgICAgICAgZmV0Y2hEYXRhKCk7XG4gICAgfTtcbn0pO1xuXG5jb25zdCBmb3JtU3VibWl0ID0gKCk9PntcbiAgICBmZXRjaERhdGEoKTtcbn07XG5cbmNvbnN0IGRlbW9TdWJtaXQgPSAoKT0+e1xuICBsZXQgZW1haWwgPSBcImhlbGxvMUBnbWFpbC5jb21cIjtcbiAgZmV0Y2hEYXRhKGVtYWlsKTtcbn07XG5cbmNvbnN0IGZldGNoRGF0YSA9IChlbWFpbCA9IG51bGwpPT57XG5cbiAgICAgaWYoIWVtYWlsKSBlbWFpbCA9IHNlYXJjaElucHV0LnZhbHVlO1xuXG4gICAgLy9zZW5kIHJlcXVlc3QgdG8gY29ycy1hbnl3aGVyZSB0byBzYXRpc2Z5IENPUlMgaGVhZGVyIHJlc3RyaWN0aW9ucyB3aXRoL291dCBidWlkaW5nIGJhY2sgZW5kXG4gICAgbGV0IG5ld1VybCA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9hcGkvdjMvYnJlYWNoZWRhY2NvdW50Lyc7XG5cbiAgICBpZiAoVmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcbiAgICAgICAgZW1haWwgPSBlbWFpbC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICBuZXdVcmwgKz0gZW1haWwgKyBcIj90cnVuY2F0ZVJlc3BvbnNlPWZhbHNlXCI7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9mb3IgdGVzdGluZyBvbmx5IFxuXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgICAgICAgLy8gbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIERhdGEuZGF0YSk7XG4gICAgICAgIC8vIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICAvLyAvL2NyZWF0ZSBoZWFkZXIgZm9yIGZldGNoIHJlcXVlc3QgXG4gICAgICAgIC8vIGNvbnN0IGhpYnBBcGlLZXkgPSAnMmIwODQ0MzRlNjBlNDdjODlmNjkwNmZkYjFhZjY3MWMnO1xuICAgICAgICAvLyBsZXQga2V5SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIC8vIGtleUhlYWRlcnMuYXBwZW5kKCdIaWJwLUFwaS1LZXknLCBoaWJwQXBpS2V5KVxuXG4gICAgICAgIC8vIGZldGNoKG5ld1VybCwgeyBtZXRob2Q6IFwiR0VUXCIsIGhlYWRlcnM6IGtleUhlYWRlcnMgfSlcbiAgICAgICAgLy8gICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAvLyAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAvLyAgICAgICAgIGxldCBoaXJvRGF0YSA9IERhdGEuY2hpbGRQYXJlbnREYXRhKGVtYWlsLCBkYXRhKTtcbiAgICAgICAgLy8gICAgICAgICAvL3NlbnQgZGF0YSB0byB0cmVlIGJ1aWxkaW5nIGZ1bmN0aW9uXG4gICAgICAgIC8vICAgICAgICAgcmVzdWx0c1RyZWUoaGlyb0RhdGEpO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIC8vICAgICAgICAgc3ZnLnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gICAgICAgIC8vICAgICAgICAgbm9CcmVhY2guc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgLy8gICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiRW50ZXIgZW1haWxcIjtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==