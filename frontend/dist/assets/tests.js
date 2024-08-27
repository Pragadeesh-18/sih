'use strict';

define('frontend/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/chart-canvas.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/chart-canvas.js should pass ESLint\n\n11:22 - Use import { A } from \'@ember/array\'; instead of using Ember.A (ember/new-module-imports)\n12:24 - Use import { A } from \'@ember/array\'; instead of using Ember.A (ember/new-module-imports)\n13:29 - Use import { A } from \'@ember/array\'; instead of using Ember.A (ember/new-module-imports)\n14:30 - Use import { A } from \'@ember/array\'; instead of using Ember.A (ember/new-module-imports)\n28:5 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n28:5 - \'$\' is not defined. (no-undef)\n29:7 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n32:5 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n32:5 - \'$\' is not defined. (no-undef)\n33:7 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n45:22 - \'Chart\' is not defined. (no-undef)\n102:3 - Duplicate key \'willDestroyElement\'. (no-dupe-keys)');
  });

  QUnit.test('models/sensor-data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/sensor-data.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/sensor-data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/sensor-data.js should pass ESLint\n\n');
  });

  QUnit.test('services/server-event-handler.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/server-event-handler.js should pass ESLint\n\n16:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('services/websocket-handler.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/websocket-handler.js should pass ESLint\n\n16:7 - Unexpected console statement. (no-console)\n20:7 - Unexpected console statement. (no-console)\n50:7 - Unexpected console statement. (no-console)');
  });
});
define('frontend/tests/test-helper', ['frontend/app', 'frontend/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('frontend/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/sensor-data-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/sensor-data-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/sensor-data-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/sensor-data-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/server-event-handler-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/server-event-handler-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/websocket-handler-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/websocket-handler-test.js should pass ESLint\n\n');
  });
});
define('frontend/tests/unit/models/sensor-data-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | sensor data', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('sensor-data', {}));
      assert.ok(model);
    });
  });
});
define('frontend/tests/unit/routes/dashboard-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dashboard', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dashboard');
      assert.ok(route);
    });
  });
});
define('frontend/tests/unit/serializers/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor('application');

      assert.ok(serializer);
    });

    (0, _qunit.test)('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = Ember.run(() => store.createRecord('application', {}));

      let serializedRecord = record.serialize();

      assert.ok(serializedRecord);
    });
  });
});
define('frontend/tests/unit/serializers/sensor-data-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Serializer | sensor data', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor('sensor-data');

      assert.ok(serializer);
    });

    (0, _qunit.test)('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = Ember.run(() => store.createRecord('sensor-data', {}));

      let serializedRecord = record.serialize();

      assert.ok(serializedRecord);
    });
  });
});
define('frontend/tests/unit/services/server-event-handler-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | server_event_handler', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:server-event-handler');
      assert.ok(service);
    });
  });
});
define('frontend/tests/unit/services/websocket-handler-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | websocket-handler', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:websocket-handler');
      assert.ok(service);
    });
  });
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

require('frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
