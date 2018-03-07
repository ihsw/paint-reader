export enum ParseErrorCode {
    BlankInput,
    MissingCustomers,
    InvalidColorCount,
    InvalidPaintFormat,
    InvalidColor
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

export interface Customer {
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
    input = input.trim();

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
        throw new ParseError("A paint color count was provided but no customers!", ParseErrorCode.MissingCustomers);
    }

    const customers = results.slice(1).map((result, resultIndex) => {
        const paintResults = result.split(" ");
        if (paintResults.length % 2 > 0) {
            throw new ParseError("Invalid paint format!", ParseErrorCode.InvalidPaintFormat);
        }

        const paints: Paint[] = Array.from((new Array(paintResults.length / 2)).keys()).map((i) => {
            const currentIndex = i * 2;
            const color = Number(paintResults[currentIndex]);
            if (isNaN(color)) {
                throw new ParseError(`Color at line ${resultIndex + 1} is invalid!`, ParseErrorCode.InvalidColor);
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

    return new Order(colorCount, customers);
};
