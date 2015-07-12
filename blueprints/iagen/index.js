var path                 = require('path');
var fs                   = require('fs-extra');
var RSVP                 = require('rsvp');
var buildNaming          = require('../../lib/utilities/entity').buildNaming;
var addIagenRoutes    = require('../../lib/utilities/iagen-routes-generator').addIagenRoutes;
var removeIagenRoutes = require('../../lib/utilities/iagen-routes-generator').removeIagenRoutes;

module.exports = {
  anonymousOptions: [
    'name',
    'attr:type'
  ],
  description: 'iagen an entire resource',
  invoke: function(name, operation, options) {
    var blueprint = this.lookupBlueprint(name);
    return blueprint[operation](options);
  },
  afterInstall: function(options) {
    this._addIagenRoutes(options);
    return RSVP.all([
      this.invoke('iagen-model', 'install', options),
      this.invoke('iagen-adapter', 'install', options),
      this.invoke('iagen-template', 'install', options),
      this.invoke('iagen-route', 'install', options),
      this.invoke('iagen-mixin', 'install', options),

    ]);
  },
  afterUninstall: function(options) {
    this._removeIagenRoutes(options);
    return RSVP.all([
      this.invoke('iagen-model', 'uninstall', options),
      this.invoke('iagen-adapter', 'uninstall', options),
      this.invoke('iagen-template', 'uninstall', options),
      this.invoke('iagen-route', 'uninstall', options),
      this.invoke('iagen-mixin', 'uninstall', options),

    ]);
  },
  _addIagenRoutes: function(options) {
    var routerFile = path.join(options.target, 'app', 'router.js');
    if (fs.existsSync(routerFile)) {
      var locals = buildNaming(options.entity.name);
      var status = addIagenRoutes(routerFile, locals);
      this._writeRouterStatus(status, 'green');
    }
  },
  _removeIagenRoutes: function(options) {
    var routerFile = path.join(options.target, 'app', 'router.js');
    if (fs.existsSync(routerFile)) {
      var locals = buildNaming(options.entity.name);
      var status = removeIagenRoutes(routerFile, locals);
      this._writeRouterStatus(status, 'red');
    }
  },
  _writeRouterStatus: function(status, operationColor) {
    var color = status === 'identical' ? 'yellow' : operationColor;

  }
}

