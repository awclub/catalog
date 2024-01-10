/*
  @license
	Rollup.js v4.9.4
	Sat, 06 Jan 2024 06:38:31 GMT - commit 18372035f167ec104280e1e91ef795e4f7033f1e

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
