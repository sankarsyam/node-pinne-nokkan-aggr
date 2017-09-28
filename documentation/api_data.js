define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/{type}/{updatedProperty}",
    "title": "Aggregator Service",
    "name": "Flow_Trigger_Tests",
    "group": "Aggregator",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profileID",
            "description": "<p>Profile ID of Guest</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n  [ \"Give Guest Keys\" ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "filename": "routes/root.js",
    "groupTitle": "Aggregator"
  }
] });
