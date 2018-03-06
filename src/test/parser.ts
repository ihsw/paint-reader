import * as assert from "assert";

import { parse } from "../parser";

describe("Parser", () => {
    it("Should return the number of colors", () => {
        assert.equal(parse("5"), 5);
    });
});
