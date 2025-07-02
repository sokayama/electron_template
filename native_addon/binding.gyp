{
  "targets": [
    {
      "target_name": "myaddon",
      "sources": [ "src/addon.cpp" ],
      "include_dirs": [
        "node_modules/node-addon-api"
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}
