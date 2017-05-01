'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.grid = document.querySelector('[data-grid]');
    this.overlay = document.querySelector('[data-overlay]');
    this.overlayName = this.overlay.querySelector('[data-overlay-value]');

    this.state = "INITIAL";
    this.cards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    this.selectedValue = null;

    this.create();
  }

  _createClass(App, [{
    key: 'create',
    value: function create() {
      var list = "";

      this.cards.map(function (n) {
        list += '\n        <li class="Grid__item" data-value="' + n + '">\n          <span class="Grid__item__number" data-value="' + n + '">' + n + '</span>\n        </li>\n      ';
      });
      this.grid.innerHTML = list;
      this.bind();
    }
  }, {
    key: 'handleState',
    value: function handleState() {
      switch (this.state) {
        case "CHOSEN":
          this.showOverlay();
          break;
        case "REVEAL":
          this.reveal();
          break;
        case "RESET":
          this.reset();
          break;
      }
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this = this;

      this.grid.addEventListener('click', function (e) {
        _this.selectedValue = e.target.dataset.value;
        _this.state = "CHOSEN";
        _this.handleState();
      });

      this.overlay.addEventListener('click', function (e) {
        if (_this.state === "CHOSEN") {
          _this.state = "REVEAL";
          _this.handleState();
        } else {
          _this.state = "RESET";
          _this.handleState();
        }
      });
    }
  }, {
    key: 'showOverlay',
    value: function showOverlay() {
      this.overlay.classList.add("is-visible");
    }
  }, {
    key: 'reveal',
    value: function reveal() {
      this.overlayName.textContent = this.selectedValue;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.overlay.classList.remove("is-visible");
      this.overlayName.textContent = "";
    }
  }]);

  return App;
}();

document.addEventListener("DOMContentLoaded", function () {
  new App();
});