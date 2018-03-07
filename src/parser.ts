export enum ParseErrorCode {
    BlankInput,
    MissingCustomers,
    InvalidColorCount,
    InvalidPaintFormat,
    InvalidColor,
    CustomerPaintOutOfRange
}

export class ParseError extends Error {
    code: ParseErrorCode;

    constructor(message: string, code: ParseErrorCode) {
        super(message);
        this.code = code;
    }
}

type Type = "M" | " G";

interface Color {
    type: Type;
}

interface Paint {
    type: Type;
    color: number;
}

export interface Customer {
    paints: Paint[];
}

export class Order {
    colorCount: number;
    customers: Customer[];
    colors: Color[];

    constructor(colorCount: number, customers: Customer[]) {
        this.colorCount = colorCount;
        this.customers = customers;
        this.colors = [];
    }
}

export const parse = (input: string): Order => {
    input = input.trim();

    // validating input
    if (input.length === 0) {
        throw new ParseError("Blank input!", ParseErrorCode.BlankInput);
    }

    // stripping comments and trimming whitespace
    const results = input.split("\n").map((result) => {
        if (result.indexOf("#") === -1) {
            return result;
        }

        return result.split("#")[0];
    }).map((result) => result.trim());

    // validating the color count
    const colorCount = Number(results[0]);
    if (isNaN(colorCount)) {
        throw new ParseError("First line was NaN!", ParseErrorCode.InvalidColorCount);
    }

    // validating the list of customers
    if (results.length === 1) {
        throw new ParseError("A paint color count was provided but no customers!", ParseErrorCode.MissingCustomers);
    }

    // resolving customers
    const customers = results.slice(1).map((result, resultIndex) => {
        // validating the list of paints
        const paintResults = result.split(" ");
        if (paintResults.length % 2 > 0) {
            throw new ParseError("Invalid paint format!", ParseErrorCode.InvalidPaintFormat);
        }

        // resolving paints
        const paints: Paint[] = Array.from((new Array(paintResults.length / 2)).keys()).map((i) => {
            const currentIndex = i * 2;

            // validating the color choice
            const color = Number(paintResults[currentIndex]);
            if (isNaN(color)) {
                throw new ParseError(`Color at line ${resultIndex + 1} is NaN!`, ParseErrorCode.InvalidColor);
            }

            return <Paint>{
                color,
                type: paintResults[currentIndex + 1]
            };
        });

        return <Customer>{
            paints
        };
    });

    // validating each customer's paint
    const invalidCustomers = customers.filter((customer) => {
        return customer.paints.filter(
            (paint) => !(paint.color > 0 && paint.color <= colorCount)
        ).length > 0;
    });
    if (invalidCustomers.length > 0) {
        throw new ParseError(`Order has ${invalidCustomers.length} customers with invalid paint colors!`, ParseErrorCode.CustomerPaintOutOfRange);
    }

    return new Order(colorCount, customers);
};
