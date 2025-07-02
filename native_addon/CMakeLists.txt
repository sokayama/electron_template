cmake_minimum_required(VERSION 3.18)
project(myaddon LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)

# --------------------------------------------
# Electron に合わせたビルド環境
set(ELECTRON_VERSION "37.1.0")

# Electron 用の環境を CMake から設定
set(ENV{npm_config_target} "${ELECTRON_VERSION}")
set(ENV{npm_config_disturl} "https://electronjs.org/headers")
set(ENV{npm_config_runtime} "electron")
set(ENV{npm_config_arch} "x64")

# node-gyp configure を Electron 用に明示的に実行
execute_process(
  COMMAND npx node-gyp configure
  WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
)

# --------------------------------------------
# node-addon-api をローカル node_modules から取得
set(NODE_ADDON_API_DIR "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api")

# Electron 用のヘッダ / lib
set(NODE_HEADERS_DIR "$ENV{USERPROFILE}/AppData/Local/node-gyp/Cache/${ELECTRON_VERSION}/include/node")
set(NODE_LIB_PATH "$ENV{USERPROFILE}/AppData/Local/node-gyp/Cache/${ELECTRON_VERSION}/x64/node.lib")

# 確認用
message(STATUS "Using Electron headers at: ${NODE_HEADERS_DIR}")
message(STATUS "Using Electron node.lib at: ${NODE_LIB_PATH}")
message(STATUS "Using node-addon-api at: ${NODE_ADDON_API_DIR}")

# --------------------------------------------
file(GLOB SRC_FILES "src/*.cpp")

add_library(myaddon SHARED ${SRC_FILES})
set_target_properties(myaddon PROPERTIES PREFIX "" SUFFIX ".node")

target_include_directories(myaddon PRIVATE
    "${NODE_HEADERS_DIR}"
    "${NODE_ADDON_API_DIR}"
)

target_link_libraries(myaddon PRIVATE "${NODE_LIB_PATH}")
