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

export const parse = (input: string): number => {
    const results = input.split("\n");
    if (results.length === 0) {
        throw new Error("Blank input!");
    }

    return Number(results[0]);
};
