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

//Event listener on #email tag for keydown on enter;
searchInput.addEventListener("keydown", function (event) {
    var email = searchInput.value;
    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (event.key === "Enter" && ValidateEmail(email)) {
        event.preventDefault();
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        ///////////////////for testing only 
        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        ///////////////////

        //create header for fetch request 
        var hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        var keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            //extract data needed 
            var hiroData = Data.childParentData(email, data);
            //sent data to tree building function
            resultsTree(hiroData);
        }).catch(function (error) {
            svg.selectAll("*").remove();
            noBreach.style.display = "block";
            searchInput.value = "Enter email";
        });
    };
});

var formSubmit = function formSubmit() {
    console.log("hello");
    var email = searchInput.value;
    //send request to cors-anywhere to satisfy CORS header restrictions with/out buiding back end
    var newUrl = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';

    if (ValidateEmail(email)) {
        email = searchInput.value;
        email = email.replace(/\s/g, '');
        newUrl += email + "?truncateResponse=false";

        ///////////////////for testing only 
        // let hiroData = Data.childParentData(email, Data.data);
        // resultsTree(hiroData);
        ///////////////////

        //create header for fetch request 
        var hibpApiKey = '2b084434e60e47c89f6906fdb1af671c';
        var keyHeaders = new Headers();
        keyHeaders.append('Hibp-Api-Key', hibpApiKey);

        fetch(newUrl, { method: "GET", headers: keyHeaders }).then(function (res) {
            return res.json();
        }).then(function (data) {
            //extract data needed 
            var hiroData = Data.childParentData(email, data);
            //sent data to tree building function
            resultsTree(hiroData);
        }).catch(function (error) {
            svg.selectAll("*").remove();
            noBreach.style.display = "block";
            searchInput.value = "Enter email";
        });
    };
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwic2Nyb2xsVG8iLCJzZWFyY2hJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlZhbGlkYXRlRW1haWwiLCJlbWFpbCIsInRlc3QiLCJhbGVydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsIm5ld1VybCIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJyZXBsYWNlIiwiaGlicEFwaUtleSIsImtleUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwiaGlyb0RhdGEiLCJEYXRhIiwiY2hpbGRQYXJlbnREYXRhIiwicmVzdWx0c1RyZWUiLCJjYXRjaCIsInN2ZyIsInNlbGVjdEFsbCIsInJlbW92ZSIsIm5vQnJlYWNoIiwic3R5bGUiLCJkaXNwbGF5IiwiZm9ybVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FB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SUFBVixFQUFnQjtBQUNsQjtBQUNBLGdCQUFJQyxXQUFXQyxLQUFLQyxlQUFMLENBQXFCdkIsS0FBckIsRUFBNEJvQixJQUE1QixDQUFmO0FBQ0E7QUFDQUksd0JBQVlILFFBQVo7QUFDSCxTQVBMLEVBUUtJLEtBUkwsQ0FRVyxpQkFBUztBQUNaQyxnQkFBSUMsU0FBSixDQUFjLEdBQWQsRUFBbUJDLE1BQW5CO0FBQ0FDLHFCQUFTQyxLQUFULENBQWVDLE9BQWYsR0FBeUIsT0FBekI7QUFDQW5DLHdCQUFZUSxLQUFaLEdBQW9CLGFBQXBCO0FBQ0gsU0FaTDtBQWFIO0FBQ0osQ0FwQ0QsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIG92ZXJ2aWV3IG9mIGNvZGUgc3RydWN0dXJlIGluc3BpcmVkIGJ5IGNhdGVuYSBkZXZlbG9wZWQgYnkgY2xlcmljbCBnaXRodWJcbi8vY29ycy1hbnl3aGVyZSB1c2VkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzODcxNjM3L25vLWFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbi1oZWFkZXItaXMtcHJlc2VudC1vbi10aGUtcmVxdWVzdGVkLXJlc291cmNlLXdoZS80Mzg4MTE0MVxuLy8gaW1wb3J0ICogYXMgRGF0YSBmcm9tIFwiLi9zZWVkX2RhdGFcIjtcblxuXG4vL29uIHJlZnJlc2ggc2Nyb2xsIHRvIHRvcCBvZiBwYWdlIFxud2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn07XG5cbi8vc2VsZWN0IHRhZyB3aXRoIGlkIGVtYWlsXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIilcblxuLy8gdmFsaWRhdGUgZW1haWxcbmNvbnN0IFZhbGlkYXRlRW1haWwgPSAoZW1haWwpID0+e1xuICAgIGlmICgvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsNH0pKyQvLnRlc3QoZW1haWwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGFsZXJ0KFwiWW91IGhhdmUgZW50ZXJlZCBhbiBpbnZhbGlkIGVtYWlsIGFkZHJlc3MhXCIpXG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG4vL0V2ZW50IGxpc3RlbmVyIG9uICNlbWFpbCB0YWcgZm9yIGtleWRvd24gb24gZW50ZXI7XG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudD0+e1xuICAgIGxldCBlbWFpbCA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgIC8vc2VuZCByZXF1ZXN0IHRvIGNvcnMtYW55d2hlcmUgdG8gc2F0aXNmeSBDT1JTIGhlYWRlciByZXN0cmljdGlvbnMgd2l0aC9vdXQgYnVpZGluZyBiYWNrIGVuZFxuICAgIGxldCBuZXdVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9oYXZlaWJlZW5wd25lZC5jb20vYXBpL3YzL2JyZWFjaGVkYWNjb3VudC8nO1xuICAgXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiICYmIFZhbGlkYXRlRW1haWwoZW1haWwpKXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZW1haWwgPSBlbWFpbC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICBuZXdVcmwgKz0gZW1haWwgKyBcIj90cnVuY2F0ZVJlc3BvbnNlPWZhbHNlXCI7XG5cbiAgICAgICAgXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9mb3IgdGVzdGluZyBvbmx5IFxuICAgICAgICAvLyBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgRGF0YS5kYXRhKTtcbiAgICAgICAgLy8gcmVzdWx0c1RyZWUoaGlyb0RhdGEpO1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgXG4gICAgICAgIC8vY3JlYXRlIGhlYWRlciBmb3IgZmV0Y2ggcmVxdWVzdCBcbiAgICAgICAgY29uc3QgaGlicEFwaUtleSA9ICcyYjA4NDQzNGU2MGU0N2M4OWY2OTA2ZmRiMWFmNjcxYyc7XG4gICAgICAgIGxldCBrZXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAga2V5SGVhZGVycy5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG4gICAgICAgIFxuICAgICAgICBmZXRjaChuZXdVcmwsIHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiBrZXlIZWFkZXJzIH0pXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy9leHRyYWN0IGRhdGEgbmVlZGVkIFxuICAgICAgICAgICAgbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIGRhdGEpOyBcbiAgICAgICAgICAgIC8vc2VudCBkYXRhIHRvIHRyZWUgYnVpbGRpbmcgZnVuY3Rpb25cbiAgICAgICAgICAgIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIkVudGVyIGVtYWlsXCI7IFxuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuXG5jb25zdCBmb3JtU3VibWl0ID0gKCk9PntcbiAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXG4gICAgbGV0IGVtYWlsID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgLy9zZW5kIHJlcXVlc3QgdG8gY29ycy1hbnl3aGVyZSB0byBzYXRpc2Z5IENPUlMgaGVhZGVyIHJlc3RyaWN0aW9ucyB3aXRoL291dCBidWlkaW5nIGJhY2sgZW5kXG4gICAgbGV0IG5ld1VybCA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL2hhdmVpYmVlbnB3bmVkLmNvbS9hcGkvdjMvYnJlYWNoZWRhY2NvdW50Lyc7XG5cbiAgICBpZiAoVmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcbiAgICAgICAgZW1haWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZW1haWwgPSBlbWFpbC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICBuZXdVcmwgKz0gZW1haWwgKyBcIj90cnVuY2F0ZVJlc3BvbnNlPWZhbHNlXCI7XG5cblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vZm9yIHRlc3Rpbmcgb25seSBcbiAgICAgICAgLy8gbGV0IGhpcm9EYXRhID0gRGF0YS5jaGlsZFBhcmVudERhdGEoZW1haWwsIERhdGEuZGF0YSk7XG4gICAgICAgIC8vIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vY3JlYXRlIGhlYWRlciBmb3IgZmV0Y2ggcmVxdWVzdCBcbiAgICAgICAgY29uc3QgaGlicEFwaUtleSA9ICcyYjA4NDQzNGU2MGU0N2M4OWY2OTA2ZmRiMWFmNjcxYyc7XG4gICAgICAgIGxldCBrZXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAga2V5SGVhZGVycy5hcHBlbmQoJ0hpYnAtQXBpLUtleScsIGhpYnBBcGlLZXkpXG5cbiAgICAgICAgZmV0Y2gobmV3VXJsLCB7IG1ldGhvZDogXCJHRVRcIiwgaGVhZGVyczoga2V5SGVhZGVycyB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vZXh0cmFjdCBkYXRhIG5lZWRlZCBcbiAgICAgICAgICAgICAgICBsZXQgaGlyb0RhdGEgPSBEYXRhLmNoaWxkUGFyZW50RGF0YShlbWFpbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgLy9zZW50IGRhdGEgdG8gdHJlZSBidWlsZGluZyBmdW5jdGlvblxuICAgICAgICAgICAgICAgIHJlc3VsdHNUcmVlKGhpcm9EYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIG5vQnJlYWNoLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIkVudGVyIGVtYWlsXCI7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=