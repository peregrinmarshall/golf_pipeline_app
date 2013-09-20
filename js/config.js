var require = { 
  waitSeconds: 200,
  paths: {
    "jquery":     "jquery-1.10.1",
    "underscore": "underscore",
    "backbone":   "backkbone",
    "text":       "text",
    "tpl":        "tpl"
  },
  shim: {
    'backbone': {
      deps: ['jquery','underscore'],
      exports: 'Backbone'
    }
  }
};
