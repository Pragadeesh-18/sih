"use strict";



define('frontend/app', ['exports', 'frontend/resolver', 'ember-load-initializers', 'frontend/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define("frontend/components/chart-canvas", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),
    init() {
      this._super(...arguments);
      this.set("sensor", this.get("sensor"));
      this.set("chartId", this.get("chartId"));
      this.set("data", Ember.A());
      this.set("labels", Ember.A());
      this.set("residueData", Ember.A());
      this.set("residueLabel", Ember.A());
      this.set("clearCount", 0);
    },
    didInsertElement() {
      this._super(...arguments);
      this.set("ctx", document.getElementById(this.chartId).getContext("2d"));
      this.createChart();
      this.setupHoverEffect();
      this.set("intervalId", setInterval(() => this.addData(), 1000));
    },
    setupHoverEffect() {
      $(`#pausebutton-${this.sensor}`).on("mouseenter", () => {
        this.set("isPauseHovered", true);
      });

      $(`#pausebutton-${this.sensor}`).on("mouseleave", () => {
        this.set("isPauseHovered", false);
      });
    },
    willDestroyElement() {
      this._super(...arguments);
      clearInterval(this.get("intervalId"));
      if (this.chart) {
        this.chart.destroy();
      }
    },

    createChart() {
      this.chart = new Chart(this.get("ctx"), {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: [{
            label: "timestamp",
            data: this.data
          }]
        },
        options: {
          responsive: true,
          animations: {
            duration: 1000,
            easing: "linear"
          }
        }
      });
    },

    addData() {
      let records = this.store.peekAll("sensor-data")._arrangedContent;
      let data = records[records.length - 1].__data;
      if (this.isPauseHovered) {
        this.residueData.push(data[this.sensor]);
        this.residueLabel.push(data.timestamp);
        if (this.data.length > 30) {
          this.clearCount += 1;
        }
      } else {
        if (this.residueData.length != 0) {
          this.data.push(...this.residueData);
          this.labels.push(...this.residueLabel);
          this.residueData.clear();
          this.residueLabel.clear();
          if (this.clearCount > 0) {
            this.data.splice(0, this.clearCount);
            this.labels.splice(0, this.clearCount);
            this.set("clearCount", 0);
          }
        }
        if (this.data.length > 30) {
          this.data.shift();
          this.labels.shift();
        }
        this.data.push(data[this.sensor]);
        this.labels.push(data.timestamp);
        this.chart.update();
      }
    },
    actions: {
      clearChart() {
        this.data.clear();
        this.labels.clear();
      }
    },
    willDestroyElement() {
      this.data.clear();
      this.labels.clear();
      this.residueData.clear();
      this.residueLabel.clear();
    }
  });
});
define('frontend/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('frontend/helpers/app-version', ['exports', 'frontend/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('frontend/initializers/export-application-global', ['exports', 'frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('frontend/models/sensor-data', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        timestamp: _emberData.default.attr('date'),
        hallSensor: _emberData.default.attr('number'),
        Co2Sensor: _emberData.default.attr('number')
    });
});
define('frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('frontend/router', ['exports', 'frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('dashboard', { path: '/' });
    this.route('settings');
  });

  exports.default = Router;
});
define('frontend/routes/dashboard', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        serverEventHandler: Ember.inject.service('server-event-handler'),
        async model() {
            this.serverEventHandler.initiateSSE();
            return {};
        }
    });
});
define('frontend/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPISerializer.extend({});
});
define('frontend/serializers/sensor-data', ['exports', 'frontend/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({});
});
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("frontend/services/server-event-handler", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    store: Ember.inject.service(),
    url: "/sensor_stream/",
    eventSource: null,

    initiateSSE() {
      this.eventSource = new EventSource(this.url);
      this.eventSource.onmessage = event => {
        this.handleMessage(event.data);
      };

      this.eventSource.onerror = error => {
        console.error("SSE Error:", error);
      };
    },

    handleMessage(data) {
      let object = JSON.parse(data);
      this.get("store").push({
        data: [{
          id: "" + object.id,
          type: "sensor-data",
          attributes: {
            hallSensor: object.hall_sensor,
            Co2Sensor: object.co2_sensor,
            timestamp: object.timestamp
          }
        }]
      });
    }
  });
});
define("frontend/services/websocket-handler", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    store: Ember.inject.service(),
    socket: null,

    connect(url) {
      this.socket = new WebSocket(url);

      this.socket.onmessage = event => {
        this.handleMessage(event.data);
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      this.socket.onerror = error => {
        console.error("WebSocket error:", error);
      };
    },

    handleMessage(message) {
      const data = JSON.parse(message);

      if (data.type !== "Connection") {
        this.get("store").push({
          data: [{
            id: data.id.toString(),
            type: "sensor-data",
            attributes: {
              hallSensor: data.hall_sensor,
              Co2Sensor: data.co2_sensor,
              timestamp: data.timestamp
            }
          }]
        });
      } else {
        this.sendMessage({ status: "200" });
      }
    },

    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not open");
      }
    }
  });
});
define("frontend/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hZfs0nWm", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"nav-bar\"],false],[0,\"\\n\"],[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});
define("frontend/templates/components/chart-canvas", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zuTS1d6W", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"id\",\"chart\"],[8],[0,\"\\n  \"],[6,\"canvas\"],[11,\"id\",[20,\"chartId\"],null],[10,\"width\",\"50\"],[10,\"height\",\"10\"],[8],[9],[0,\"\\n  \"],[6,\"span\"],[3,\"action\",[[21,0,[]],\"clearChart\"]],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"button-52\"],[10,\"role\",\"button\"],[8],[0,\"Clear chart\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"span\"],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"button-52\"],[10,\"role\",\"button\"],[11,\"id\",[27,[\"pausebutton-\",[20,\"sensor\"]]]],[8],[0,\"Pause\\n      chart\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"style\"],[8],[0,\"\\n  #chart {margin-left: 80px} .button-52 { font-size: 16px; font-weight: 200;\\n  letter-spacing: 1px; padding: 13px 20px 13px; outline: 0; border: 1px solid\\n  black; cursor: pointer; position: relative; background-color: rgba(0, 0, 0,\\n  0); user-select: none; -webkit-user-select: none; touch-action: manipulation;\\n  margin: 10px;} .button-52:after { content: \\\"\\\"; background-color: #18c29c;\\n  width: 100%; z-index: -1; position: absolute; height: 100%; top: 7px; left:\\n  7px; transition: 0.2s; } .button-52:hover:after { top: 0px; left: 0px;}@media\\n  (min-width: 768px) { .button-52 { padding: 13px 50px 13px; } }\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/components/chart-canvas.hbs" } });
});
define("frontend/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PmUnxDyY", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[10,\"class\",\"navbar\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"navbar-container\"],[8],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"menu-list\"],[8],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"menu-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"dashboard\"],[[\"class\"],[\"menu-link\"]],{\"statements\":[[0,\"          \"],[6,\"i\"],[10,\"class\",\"fas fa-solid fa-table\"],[8],[9],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"menu-link-text\"],[8],[0,\"Dashboard\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"menu-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"settings\"],[[\"class\"],[\"menu-link\"]],{\"statements\":[[0,\"          \"],[6,\"i\"],[10,\"class\",\"fas fa-duotone fa-gear\"],[8],[9],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"menu-link-text\"],[8],[0,\"Settings\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"style\"],[8],[0,\"\\n  /*css variables*/ :root { --body-bg-color: #dce4e3; --green: #18c29c;\\n  --light-green: #8ed7c6; --light-grey: #dce4e3; --text-color: #084236; }\\n  /*reset*/ * { margin: 0; padding: 0; box-sizing: border-box; } button {\\n  border: none; outline: none; background: none; cursor: pointer; } input {\\n  border: none; outline: none; background: none; } a { text-decoration: none;\\n  color: inherit; } li { list-style: none; } /*body*/ body { background-color:\\n  var(--body-bg-color); color: var(--text-color); width: 100vw; height: auto;\\n  font-family: 'Poppins', sans-serif; position: relative; } /*navbar*/ .navbar {\\n  z-index: 2; width: 80px; max-width: 4rem; background-color: var(--green);\\n  height: 100vh; position: fixed; display: flex; flex-direction: column;\\n  justify-content: space-between; transition: all .3s ease; } .navbar\\n  .navbar-container { padding: 1rem; } /*logo*/ .navbar .navbar-container\\n  .navbar-logo-div { display: flex; align-items: center; justify-content:\\n  center; margin-bottom: 1.7rem; /* padding-left: 1rem; */ } .navbar\\n  .navbar-container .navbar-logo-div .navbar-toggler { transition: .2s\\n  ease-in-out; } .navbar .navbar-container .navbar-logo-div .navbar-toggler i {\\n  font-size: 1rem; } .navbar .navbar-container .navbar-logo-div\\n  .navbar-toggler:hover { color: var(--light-grey); } .navbar .navbar-container\\n  .navbar-logo-div .navbar-logo-link { display: none; } /*search*/ .navbar\\n  .navbar-search { width: 100%; background-image: url('../img/search.svg');\\n  background-repeat: no-repeat; background-color: var(--light-green);\\n  background-position: center; margin: 0 auto; /* background-position: 1rem\\n  0.7rem; */ padding: 1rem; /* padding-left: 3rem; */ border-radius: 10px;\\n  margin-bottom: 1.2rem; } #icon-search { position: absolute; color:\\n  var(--green); font-size: 1.2rem; top: 4.5rem; left: 1.4rem; } .navbar\\n  .navbar-search::placeholder { visibility: hidden; opacity: 0; } /*menu list*/\\n  .navbar .menu-list { display: flex; flex-direction: column; align-items:\\n  center; gap: 1.5rem; width: 100%; } .navbar .menu-list .menu-item { width:\\n  100%; } .navbar .menu-list .menu-item .menu-link{ display: flex; align-items:\\n  center; justify-content: center; gap: 0.7rem; transition: 0.2s ease-in-out;\\n  font-weight: 500; } .navbar .menu-list .menu-item .menu-link .menu-link-text{\\n  display: none; color: inherit; } .navbar .menu-list .menu-item\\n  .menu-link:hover, .navbar .menu-list .menu-item .menu-link:hover { color:\\n  var(--light-grey); } /*user information div*/ .navbar .user-container {\\n  background-color: var(--light-green); display: flex; align-items: center;\\n  justify-content: center; padding: 0.5rem 1rem; } .navbar .user-container\\n  .user-info { display: flex; align-items: center; gap: 0.4rem; display: none; }\\n  .navbar .user-container .user-info i { font-size: 1.2rem; } .navbar\\n  .user-container .user-info .user-details .user-name { font-size: 1.1rem;\\n  font-weight: light; } .navbar .user-container .user-info .user-details\\n  .user-occupation { font-size: 0.9rem; font-weight: lighter; }\\n  /*navbar.active*/ /*navbar.active navbar*/ .navbar.active { width: 350px;\\n  max-width: 20%; } /*navbar.active logo*/ .navbar.active .navbar-container\\n  .navbar-logo-div { justify-content: space-between; padding-left: 1rem; }\\n  .navbar.active .navbar-container .navbar-logo-div .navbar-logo-link { display:\\n  block; } /*navbar.active search input*/ .navbar.active .navbar-search {\\n  background-position: 1rem 0.7rem; padding: 1rem; padding-left: 3rem; }\\n  .navbar.active #icon-search { top: 5.1rem; left: 1.6rem; } .navbar.active\\n  .navbar-search::placeholder { visibility: visible; opacity: 1; }\\n  /*navbar.active menu*/ .navbar.active .menu-list { padding-left: 1rem; }\\n  .navbar.active .menu-list .menu-item .menu-link { justify-content: flex-start;\\n  } .navbar.active .menu-list .menu-item .menu-link .menu-link-text{ display:\\n  inline; } /*navbar.active user container*/ .navbar.active .user-container {\\n  justify-content: space-between; align-items: center; } .navbar.active\\n  .user-container .user-info { display: flex; } /*dashboard*/ .dashboard {\\n  width: auto; height: auto; margin-left: 5rem; } .navbar.active + .dashboard {\\n  margin-left: 22%; } /*media queries*/ @media only screen and (max-width:\\n  870px) { .navbar.active { max-width: 27%; } .navbar.active + .dashboard {\\n  margin-left: 30%; } } @media only screen and (max-width: 670px) {\\n  .navbar.active { min-width: 100%; } .navbar .navbar-container { position:\\n  relative; width: 100%; } .navbar .navbar-search { position: absolute;\\n  border-radius: 0; left: 0; } .navbar .menu-item { position: relative; top:\\n  4rem; } } @media only screen and (max-width: 350px) { .dashboard .title {\\n  font-size: 1.7rem; } }\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/components/nav-bar.hbs" } });
});
define("frontend/templates/dashboard", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CKd0b1cy", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"chart-canvas\",null,[[\"type\",\"sensor\",\"chartId\"],[\"line\",\"hallSensor\",\"chart1\"]]],false],[0,\"\\n\"],[1,[26,\"chart-canvas\",null,[[\"type\",\"sensor\",\"chartId\"],[\"line\",\"Co2Sensor\",\"chart2\"]]],false]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/dashboard.hbs" } });
});
define("frontend/templates/settings", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "t4/674lJ", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/settings.hbs" } });
});


define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0"});
}
//# sourceMappingURL=frontend.map
