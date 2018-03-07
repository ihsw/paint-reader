import * as assert from "assert";
import * as fs from "fs";

import { parse, ParseError, ParseErrorCode, Customer } from "../parser";

describe("Parser", () => {
    const palinExample = fs.readFileSync("./test-fixtures/example-1-plain").toString();

    it("Should return the number of colors", () => {
        assert.equal(parse(palinExample).colorCount, 1);
    });

    it("Should fail on color count but no customers", () => {
        assert.throws(
            () => parse("5"),
            (err: ParseError) => err instanceof ParseError && err.code === ParseErrorCode.MissingCustomers
        );
    });

    it("Should fail on invalid input", () => {
        assert.throws(
            () => parse(""),
            (err: ParseError) => err instanceof ParseError && err.code === ParseErrorCode.BlankInput
        );
    });

    it("Should strip comments from the input", () => {
        const commentsExample = fs.readFileSync("./test-fixtures/example-2-with-comments").toString();
        assert.equal(parse(commentsExample).colorCount, 1);
    });

    it("Should fail on NaN as first input", () => {
        const invalidNanExample = fs.readFileSync("./test-fixtures/example-4-invalid-nan").toString();
        assert.throws(
            () => parse(invalidNanExample),
            (err: ParseError) => err instanceof ParseError && err.code === ParseErrorCode.InvalidColorCount
        );
    });

    it.only("Should return customers", () => {
        const order = parse(palinExample);
        assert.equal(order.customers.length, 1);
        assert.deepEqual(order.customers, [<Customer>{
            paints: [{color: 1, type: "M"}]
        }]);
    });
});
