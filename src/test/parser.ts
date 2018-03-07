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

    it("Should fail on non-even customer order", () => {
        const invalidFormatExample = fs.readFileSync("./test-fixtures/example-5-invalid-paint-format").toString();
        assert.throws(
            () => parse(invalidFormatExample),
            (err: ParseError) => err instanceof ParseError && err.code === ParseErrorCode.InvalidPaintFormat
        );
    });

    it("Should fail on invalid paint color", () => {
        const invalidColorExample = fs.readFileSync("./test-fixtures/example-6-invalid-paint-color").toString();
        assert.throws(
            () => parse(invalidColorExample),
            (err: ParseError) => err instanceof ParseError && err.code === ParseErrorCode.InvalidColor
        );
    });

    it("Should correctly parse plain customers", () => {
        const order = parse(palinExample);
        assert.equal(order.customers.length, 1);
        assert.deepEqual(order.customers, [<Customer>{
            paints: [{color: 1, type: "M"}]
        }]);
    });

    it("Should correctly parse complex customers", () => {
        const complexExample = fs.readFileSync("./test-fixtures/example-3-complex").toString();

        const order = parse(complexExample);
        assert.equal(order.customers.length, 3);
        assert.deepEqual(order.customers, <Customer[]>[
            {paints: [{color: 1, type: "M"}, {color: 3, type: "G"}, {color: 5, type: "G"}]},
            {paints: [{color: 2, type: "G"}, {color: 3, type: "M"}, {color: 4, type: "G"}]},
            {paints: [{color: 5, type: "M"}]}
        ]);
    });
});
