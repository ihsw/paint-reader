import * as assert from "assert";

import { parse } from "../parser";

describe("Parser", () => {
    it("Should return the number of colors", () => {
        assert.equal(parse("5").colorCount, 5);
    });

    it("Should fail on invalid input", () => {
        assert.throws(() => parse(""));
    });

    it("Should strip comments from the input", () => {
        assert.equal(parse("5 # test").colorCount, 5);
    });
});
