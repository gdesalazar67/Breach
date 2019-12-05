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
        // console.log(data)
        // removeCards()
        // createCards(data)
        // displayResults()

        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        /////////////////

        // //create header for fetch request 
        var hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        var keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            // console.log(data)
            setEmail(email);
            createCards(data);
            displyaOnOff(1);
            loader(false);
            displayResults();
            // let hiroData = Data.childParentData(email, data);
            // sent data to tree building function
            // resultsTree(hiroData);
        }).catch(function (error) {
            setEmail(email);
            loader(false);
            noResult();
            alert("nothing returned");
            // svg.selectAll("*").remove();
            // noBreach.style.display = "block";
            searchInput.placeholder = "Enter your email here...";
        });
    };
};

// /results breach cards///
// const cards = document.getElementsByClassName("breach-card");

// add EventLister to each card
// for(let i = 0; i < cards.length; i++){
//     cards[i].addEventListener("click", event=>{
//         console.log("hi from click land")
//         let tag = event.target.closest(".card");
//         cardInfoExpander(tag);
//     });
// };

// let expandedCard = null

// const cardInfoExpander = (tag)=>{
//     if(tag.className === "card card-is-collapsed"){
//         if (expandedCard) expandedCard.className = "card card-is-collapsed";
//         tag.className = "card card-is-expanded";
//         expandedCard = tag;
//     }else{
//         tag.className = "card card-is-collapsed";
//         expandedCard =null;
//     };
// };


// console.log(cards)
/////

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieCIsImNsYXNzTmFtZSIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJWYWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJ0ZXN0IiwibG9hZGVyIiwiYWxlcnQiLCJldmVudCIsImtleSIsImZldGNoRGF0YSIsImZvcm1TdWJtaXQiLCJkZW1vU3VibWl0IiwidmFsdWUiLCJuZXdVcmwiLCJyZXBsYWNlIiwiaGlicEFwaUtleSIsImtleUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwic2V0RW1haWwiLCJjcmVhdGVDYXJkcyIsImRpc3BseWFPbk9mZiIsImRpc3BsYXlSZXN1bHRzIiwiY2F0Y2giLCJub1Jlc3VsdCIsInBsYWNlaG9sZGVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QyxJQUFKLEVBQVA7QUFBQSxTQURWLEVBRUtGLElBRkwsQ0FFVSxVQUFVRyxJQUFWLEVBQWdCO0FBQ2xCO0FBQ0FDLHFCQUFTdkIsS0FBVDtBQUNBd0Isd0JBQVlGLElBQVo7QUFDQUcseUJBQWEsQ0FBYjtBQUNBdkIsbUJBQU8sS0FBUDtBQUNBd0I7QUFDQTtBQUNBO0FBQ0E7QUFDSCxTQVpMLEVBYUtDLEtBYkwsQ0FhVyxpQkFBUztBQUNaSixxQkFBU3ZCLEtBQVQ7QUFDQUUsbUJBQU8sS0FBUDtBQUNBMEI7QUFDQXpCLGtCQUFNLGtCQUFOO0FBQ0E7QUFDQTtBQUNBTix3QkFBWWdDLFdBQVosR0FBMEIsMEJBQTFCO0FBQ0gsU0FyQkw7QUFzQkg7QUFDSixDQWpERDs7QUFxREE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLEsiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBvdmVydmlldyBvZiBjb2RlIHN0cnVjdHVyZSBpbnNwaXJlZCBieSBjYXRlbmEgZGV2ZWxvcGVkIGJ5IGNsZXJpY2wgZ2l0aHViXG4vL2NvcnMtYW55d2hlcmUgdXNlZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mzg3MTYzNy9uby1hY2Nlc3MtY29udHJvbC1hbGxvdy1vcmlnaW4taGVhZGVyLWlzLXByZXNlbnQtb24tdGhlLXJlcXVlc3RlZC1yZXNvdXJjZS13aGUvNDM4ODExNDFcbi8vIGltcG9ydCAqIGFzIERhdGEgZnJvbSBcIi4vc2VlZF9kYXRhXCI7XG5cblxuLy8vd2F0Y2ggd2luZG93IHNpemUvLy8vXG5mdW5jdGlvbiB3aW5kb3dTaXplKCkge1xuXG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgTWFpbkJhbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXByb21pc2VkXCIpO1xuXG4gICAgaWYgKHcgPj0gNTc1KSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFTIFlPVVIgT05MSU5FIElERU5USVRZIEJFRU4gQ09NUFJPTUlTRUQ/XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgTWFpbkJhbm5lclRleHQuaW5uZXJIVE1MID0gXCJIQVZFIFlPVSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH07XG59O1xuXG53aW5kb3dTaXplKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcblxuICAgIHdpbmRvd1NpemUoKVxufSk7XG5cbi8vLy8vXG5cbi8vL2Ryb3Bkb3duIHRvZ2dsZS8vL1xuZnVuY3Rpb24gdG9wTmF2SWNvblRvZ2dsZSgpIHtcblxuICAgIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZFRvcE5hdlwiKTtcblxuICAgIGlmICh4LmNsYXNzTmFtZSA9PT0gXCJ0b3BuYXZcIikge1xuICAgICAgICB4LmNsYXNzTmFtZSArPSBcIiByZXNwb25zaXZlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeC5jbGFzc05hbWUgPSBcInRvcG5hdlwiO1xuICAgIH1cbn07XG4vLy8vL1xuXG5cblxuLy9vbiByZWZyZXNoIHNjcm9sbCB0byB0b3Agb2YgcGFnZSBcbndpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn07XG5cblxuXG4vLyBzZWFyY2ggaW5wdXQgZnVuY3Rpb25zXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIilcblxuY29uc3QgVmFsaWRhdGVFbWFpbCA9IChlbWFpbCkgPT4ge1xuXG4gICAgaWYgKC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7Miw0fSkrJC8udGVzdChlbWFpbCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuXG4gICAgbG9hZGVyKGZhbHNlKVxuICAgIGFsZXJ0KFwiWW91IGhhdmUgZW50ZXJlZCBhbiBpbnZhbGlkIGVtYWlsIGFkZHJlc3MhXCIpO1xuICAgIHJldHVybiBmYWxzZVxufTtcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xuXG4gICAgaWYoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpe1xuICAgICAgICBmZXRjaERhdGEoKTtcbiAgICB9O1xufSk7XG5cbmNvbnN0IGZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICBmZXRjaERhdGEoKTtcbn07XG5cbmNvbnN0IGRlbW9TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICBsZXQgZW1haWwgPSBcImhlbGxvMUBnbWFpbC5jb21cIjtcbiAgICBmZXRjaERhdGEoZW1haWwpO1xufTtcblxuY29uc3QgZmV0Y2hEYXRhID0gKGVtYWlsID0gbnVsbCkgPT4ge1xuICAgIGxvYWRlcih0cnVlKTtcbiAgICAgaWYoIWVtYWlsKSBlbWFpbCA9IHNlYXJjaElucHV0LnZhbHVlO1xuXG4gICAgLy9zZW5kIHJlcXVlc3QgdG8gY29ycy1hbnl3aGVyZSB0byBzYXRpc2Z5IENPUlMgaGVhZGVyIHJlc3RyaWN0aW9ucyB3aXRoL291dCBidWlkaW5nIGJhY2sgZW5kXG4gICAgbGV0IG5ld1VybCA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9hcGkvdjMvYnJlYWNoZWRhY2NvdW50Lyc7XG5cbiAgICBpZiAoVmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcbiAgICAgICAgZW1haWwgPSBlbWFpbC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICBuZXdVcmwgKz0gZW1haWwgKyBcIj90cnVuY2F0ZVJlc3BvbnNlPWZhbHNlXCI7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9mb3IgdGVzdGluZyBvbmx5IFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAvLyByZW1vdmVDYXJkcygpXG4gICAgICAgIC8vIGNyZWF0ZUNhcmRzKGRhdGEpXG4gICAgICAgIC8vIGRpc3BsYXlSZXN1bHRzKClcblxuICAgICAgICAvLyBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgRGF0YS5kYXRhKTtcbiAgICAgICAgLy8gcmVzdWx0c1RyZWUoaGlyb0RhdGEpO1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIC8vY3JlYXRlIGhlYWRlciBmb3IgZmV0Y2ggcmVxdWVzdCBcbiAgICAgICAgY29uc3QgaGlicEFwaUtleSA9ICcyYjA4NDQzNGU2MGU0N2M4OWY2OTA2ZmRiMWFmNjcxYyc7XG4gICAgICAgIGxldCBrZXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAga2V5SGVhZGVycy5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG5cbiAgICAgICAgZmV0Y2gobmV3VXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVycyB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgc2V0RW1haWwoZW1haWwpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNhcmRzKGRhdGEpXG4gICAgICAgICAgICAgICAgZGlzcGx5YU9uT2ZmKDEpO1xuICAgICAgICAgICAgICAgIGxvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheVJlc3VsdHMoKTtcbiAgICAgICAgICAgICAgICAvLyBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gc2VudCBkYXRhIHRvIHRyZWUgYnVpbGRpbmcgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAvLyByZXN1bHRzVHJlZShoaXJvRGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBzZXRFbWFpbChlbWFpbCk7XG4gICAgICAgICAgICAgICAgbG9hZGVyKGZhbHNlKVxuICAgICAgICAgICAgICAgIG5vUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJub3RoaW5nIHJldHVybmVkXCIpO1xuICAgICAgICAgICAgICAgIC8vIHN2Zy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIC8vIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHlvdXIgZW1haWwgaGVyZS4uLlwiO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cblxuXG4vLyAvcmVzdWx0cyBicmVhY2ggY2FyZHMvLy9cbi8vIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJyZWFjaC1jYXJkXCIpO1xuXG4vLyBhZGQgRXZlbnRMaXN0ZXIgdG8gZWFjaCBjYXJkXG4vLyBmb3IobGV0IGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspe1xuLy8gICAgIGNhcmRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudD0+e1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImhpIGZyb20gY2xpY2sgbGFuZFwiKVxuLy8gICAgICAgICBsZXQgdGFnID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2FyZFwiKTtcbi8vICAgICAgICAgY2FyZEluZm9FeHBhbmRlcih0YWcpO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuLy8gbGV0IGV4cGFuZGVkQ2FyZCA9IG51bGxcblxuLy8gY29uc3QgY2FyZEluZm9FeHBhbmRlciA9ICh0YWcpPT57XG4vLyAgICAgaWYodGFnLmNsYXNzTmFtZSA9PT0gXCJjYXJkIGNhcmQtaXMtY29sbGFwc2VkXCIpe1xuLy8gICAgICAgICBpZiAoZXhwYW5kZWRDYXJkKSBleHBhbmRlZENhcmQuY2xhc3NOYW1lID0gXCJjYXJkIGNhcmQtaXMtY29sbGFwc2VkXCI7XG4vLyAgICAgICAgIHRhZy5jbGFzc05hbWUgPSBcImNhcmQgY2FyZC1pcy1leHBhbmRlZFwiO1xuLy8gICAgICAgICBleHBhbmRlZENhcmQgPSB0YWc7XG4vLyAgICAgfWVsc2V7XG4vLyAgICAgICAgIHRhZy5jbGFzc05hbWUgPSBcImNhcmQgY2FyZC1pcy1jb2xsYXBzZWRcIjtcbi8vICAgICAgICAgZXhwYW5kZWRDYXJkID1udWxsO1xuLy8gICAgIH07XG4vLyB9O1xuXG5cbi8vIGNvbnNvbGUubG9nKGNhcmRzKVxuLy8vLy8iXSwic291cmNlUm9vdCI6IiJ9