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
function topNavIconToggle(y) {
    y.classList.toggle("change");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvd1NpemUiLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIk1haW5CYW5uZXJUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b3BOYXZJY29uVG9nZ2xlIiwieSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIngiLCJjbGFzc05hbWUiLCJvbmJlZm9yZXVubG9hZCIsInNjcm9sbFRvIiwic2VhcmNoSW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwiVmFsaWRhdGVFbWFpbCIsImVtYWlsIiwidGVzdCIsInJlbW92ZSIsImxvYWRlciIsInZhbHVlIiwicGxhY2Vob2xkZXIiLCJhZGQiLCJldmVudCIsImtleSIsImZldGNoRGF0YSIsImZvcm1TdWJtaXQiLCJkZW1vU3VibWl0IiwibmV3VXJsIiwicmVwbGFjZSIsImhpYnBBcGlLZXkiLCJrZXlIZWFkZXJzIiwiSGVhZGVycyIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInJlQ29uZmlndXJlIiwic2V0RW1haWwiLCJkaXNwbGF5WmVyb09yQXJlRGl2IiwicmVtb3ZlQ2FyZHMiLCJjcmVhdGVDYXJkcyIsImRpc3BsYXlDaGFydENhcmRzUmVzdWx0cyIsImJ1aWxkQ2hhcnQiLCJhbGxNYWpvckJyZWFjaGVzIiwiY29uY2F0Iiwic2xpY2UiLCJzY3JvbGxUb0RpdiIsImNhdGNoIiwibm9SZXN1bHQiLCJ0ZXN0aW5nIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFD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RSxhQUFTMUIsS0FBVDtBQUNBNEI7QUFDQUQsd0JBQW9CLENBQXBCO0FBQ0FFLGdCQUFZTCxJQUFaO0FBQ0FNO0FBQ0E7QUFDQUMsZUFBV0MsaUJBQWlCQyxNQUFqQixDQUF3QlQsS0FBS1UsS0FBTCxDQUFXLENBQVgsQ0FBeEIsQ0FBWDtBQUNBO0FBQ0EvQixXQUFPLEtBQVA7QUFDSCxDQVpELEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBvdmVydmlldyBvZiBjb2RlIHN0cnVjdHVyZSBpbnNwaXJlZCBieSBjYXRlbmEgZGV2ZWxvcGVkIGJ5IGNsZXJpY2wgZ2l0aHViXG4vL2NvcnMtYW55d2hlcmUgdXNlZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mzg3MTYzNy9uby1hY2Nlc3MtY29udHJvbC1hbGxvdy1vcmlnaW4taGVhZGVyLWlzLXByZXNlbnQtb24tdGhlLXJlcXVlc3RlZC1yZXNvdXJjZS13aGUvNDM4ODExNDFcbi8vIGltcG9ydCAqIGFzIERhdGEgZnJvbSBcIi4vc2VlZF9kYXRhXCI7XG5cblxuLy8vd2F0Y2ggd2luZG93IHNpemUvLy8vXG5mdW5jdGlvbiB3aW5kb3dTaXplKCkge1xuXG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgTWFpbkJhbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXByb21pc2VkXCIpO1xuXG4gICAgaWYgKHcgPj0gNTc1KSB7XG4gICAgICAgIE1haW5CYW5uZXJUZXh0LmlubmVySFRNTCA9IFwiSEFTIFlPVVIgT05MSU5FIElERU5USVRZIEJFRU4gQ09NUFJPTUlTRUQ/XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgTWFpbkJhbm5lclRleHQuaW5uZXJIVE1MID0gXCJIQVZFIFlPVSBCRUVOIENPTVBST01JU0VEP1wiO1xuICAgIH07XG59O1xuXG53aW5kb3dTaXplKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcblxuICAgIHdpbmRvd1NpemUoKVxufSk7XG5cbi8vLy8vXG5cbi8vL2Ryb3Bkb3duIHRvZ2dsZS8vL1xuZnVuY3Rpb24gdG9wTmF2SWNvblRvZ2dsZSh5KSB7XG4gICAgeS5jbGFzc0xpc3QudG9nZ2xlKFwiY2hhbmdlXCIpO1xuICAgIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZFRvcE5hdlwiKTtcblxuICAgIGlmICh4LmNsYXNzTmFtZSA9PT0gXCJ0b3BuYXZcIikge1xuICAgICAgICB4LmNsYXNzTmFtZSArPSBcIiByZXNwb25zaXZlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeC5jbGFzc05hbWUgPSBcInRvcG5hdlwiO1xuICAgIH07XG59O1xuLy8vLy9cblxuXG5cbi8vb24gcmVmcmVzaCBzY3JvbGwgdG8gdG9wIG9mIHBhZ2UgXG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG59O1xuXG5cblxuLy8gc2VhcmNoIGlucHV0IGZ1bmN0aW9uc1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpXG5cbmNvbnN0IFZhbGlkYXRlRW1haWwgPSAoZW1haWwpID0+IHtcblxuICAgIGlmICgvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsNH0pKyQvLnRlc3QoZW1haWwpKSB7XG4gICAgICAgIHNlYXJjaElucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcblxuICAgIGxvYWRlcihmYWxzZSlcbiAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IFwiSW52YWxpZCBlbWFpbCBhZGRyZXNzIVwiXG4gICAgc2VhcmNoSW5wdXQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG5cbiAgICBpZihldmVudC5rZXkgPT09IFwiRW50ZXJcIil7XG4gICAgICAgIGZldGNoRGF0YSgpO1xuICAgIH07XG59KTtcblxuY29uc3QgZm9ybVN1Ym1pdCA9ICgpID0+IHtcblxuICAgIGZldGNoRGF0YSgpO1xufTtcblxuY29uc3QgZGVtb1N1Ym1pdCA9ICgpID0+IHtcblxuICAgIGxldCBlbWFpbCA9IFwiaGVsbG8xQGdtYWlsLmNvbVwiO1xuICAgIGZldGNoRGF0YShlbWFpbCk7XG59O1xuXG5jb25zdCBmZXRjaERhdGEgPSAoZW1haWwgPSBudWxsKSA9PiB7XG5cbiAgICBsb2FkZXIodHJ1ZSk7XG4gICAgIGlmKCFlbWFpbCkgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcblxuICAgIC8vc2VuZCByZXF1ZXN0IHRvIGNvcnMtYW55d2hlcmUgdG8gc2F0aXNmeSBDT1JTIGhlYWRlciByZXN0cmljdGlvbnMgd2l0aC9vdXQgYnVpZGluZyBiYWNrIGVuZFxuICAgIGxldCBuZXdVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vYXBpL3YzL2JyZWFjaGVkYWNjb3VudC8nO1xuXG4gICAgaWYgKFZhbGlkYXRlRW1haWwoZW1haWwpKSB7XG4gICAgICAgIGVtYWlsID0gZW1haWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgbmV3VXJsICs9IGVtYWlsICsgXCI/dHJ1bmNhdGVSZXNwb25zZT1mYWxzZVwiO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vZm9yIHRlc3Rpbmcgb25seSBcbiAgICAgICAgLy8gdGVzdGluZyhlbWFpbCk7XG5cbiAgICAgICAgLy8gLy9jcmVhdGUgaGVhZGVyIGZvciBmZXRjaCByZXF1ZXN0IFxuICAgICAgICBjb25zdCBoaWJwQXBpS2V5ID0gJzJiMDg0NDM0ZTYwZTQ3Yzg5ZjY5MDZmZGIxYWY2NzFjJztcbiAgICAgICAgbGV0IGtleUhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBrZXlIZWFkZXJzLmFwcGVuZCgnSGlicC1BcGktS2V5JywgaGlicEFwaUtleSlcblxuICAgICAgICBmZXRjaChuZXdVcmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiBrZXlIZWFkZXJzIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmVDb25maWd1cmUoZGF0YSlcbiAgICAgICAgICAgICAgICBzZXRFbWFpbChlbWFpbCk7XG4gICAgICAgICAgICAgICAgZGlzcGxheVplcm9PckFyZURpdigxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJkcygpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNhcmRzKGRhdGEpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlDaGFydENhcmRzUmVzdWx0cygpO1xuICAgICAgICAgICAgICAgIGJ1aWxkQ2hhcnQoYWxsTWFqb3JCcmVhY2hlcy5jb25jYXQoZGF0YS5zbGljZSgwKSkpO1xuICAgICAgICAgICAgICAgIGxvYWRlcihmYWxzZSk7ICBcbiAgICAgICAgICAgICAgICBzY3JvbGxUb0Rpdihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1jb250YWluZXJcIikpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgc2V0RW1haWwoZW1haWwpO1xuICAgICAgICAgICAgICAgIG5vUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgbG9hZGVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb0Rpdihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1jb250YWluZXJcIikpO1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciB5b3VyIGVtYWlsIGhlcmUuLi5cIjtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5cblxuY29uc3QgdGVzdGluZyA9IChlbWFpbCkgPT4ge1xuICAgIHJlQ29uZmlndXJlKGRhdGEpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICBzZXRFbWFpbChlbWFpbCk7XG4gICAgcmVtb3ZlQ2FyZHMoKTtcbiAgICBkaXNwbGF5WmVyb09yQXJlRGl2KDEpO1xuICAgIGNyZWF0ZUNhcmRzKGRhdGEpO1xuICAgIGRpc3BsYXlDaGFydENhcmRzUmVzdWx0cygpXG4gICAgLy8gYnVpbGRDaGFydChkYXRhLmNvbmNhdChhbGxNYWpvckJyZWFjaGVzLnJldmVyc2UoKSkpXG4gICAgYnVpbGRDaGFydChhbGxNYWpvckJyZWFjaGVzLmNvbmNhdChkYXRhLnNsaWNlKDApKSlcbiAgICAvLyBidWlsZENoYXJ0KGFsbE1ham9yQnJlYWNoZXMpXG4gICAgbG9hZGVyKGZhbHNlKTtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==