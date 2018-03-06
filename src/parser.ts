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
        throw new Error("Blank input!");
    }

    const results = input.split("\n").map((result) => {
        if (result.indexOf("#") === -1) {
            return result;
        }

        return result.split("#")[0];
    }).map((result) => result.trim());

    const colorCount = Number(results[0]);
    if (isNaN(colorCount)) {
        throw new Error("First line was NaN!");
    }

    return new Order(colorCount, []);
};
