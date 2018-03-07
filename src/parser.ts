export enum ParseErrorCode {
    BlankInput,
    MissingOrders,
    InvalidColorCount
}

export class ParseError extends Error {
    code: ParseErrorCode;

    constructor(message: string, code: ParseErrorCode) {
        super(message);
        this.code = code;
    }
}

type Type = "M" | " G";

interface Paint {
    type: Type;
    color: number;
}

interface Customer {
    paints: Paint[];
}

export class Order {
    colorCount: number;
    customers: Customer[];

    constructor(colorCount: number, customers: Customer[]) {
        this.colorCount = colorCount;
        this.customers = customers;
    }
}

export const parse = (input: string): Order => {
    if (input.length === 0) {
        throw new ParseError("Blank input!", ParseErrorCode.BlankInput);
    }

    const results = input.split("\n").map((result) => {
        if (result.indexOf("#") === -1) {
            return result;
        }

        return result.split("#")[0];
    }).map((result) => result.trim());

    const colorCount = Number(results[0]);
    if (isNaN(colorCount)) {
        throw new ParseError("First line was NaN!", ParseErrorCode.InvalidColorCount);
    }

    if (results.length === 1) {
        throw new ParseError("A paint color count was provided but no orders!", ParseErrorCode.MissingOrders);
    }

    return new Order(colorCount, []);
};
