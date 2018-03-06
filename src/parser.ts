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

    const results = input.split("\n");
    return new Order(Number(results[0]), []);
};
