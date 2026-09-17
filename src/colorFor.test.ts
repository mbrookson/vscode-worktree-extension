import { strict as assert } from "assert";
import { colorFor } from "./colorFor";

// deterministic
assert.equal(colorFor("login-wt"), colorFor("login-wt"));
// different names → different colours (overwhelmingly likely)
assert.notEqual(colorFor("login-wt"), colorFor("main"));
// valid hex
assert.match(colorFor("anything"), /^#[0-9a-f]{6}$/);

console.log("ok");
