#!/bin/bash

rm -rf dist \
&& mkdir dist \
&& cp .npmignore dist/.npmignore \
&& cp package.json dist/package.json \
&& cp LICENSE.md dist/LICENSE.md \
&& npm run build \
\
&& mv dist/guards/* dist \
&& rmdir dist/guards \
\
&& mv dist/model/* dist \
&& rmdir dist/model \
\
&& mv dist/providers/* dist \
&& rmdir dist/providers \
\
&& mv dist/services/* dist \
&& rmdir dist/services \
