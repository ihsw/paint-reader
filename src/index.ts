import getStdin from "get-stdin";
import * as process from "process";

import { parse, Order, ParseError, ParseErrorCode } from "./parser";

(async () => {
    let order: Order;
    try {
        order = parse(await getStdin());
    } catch (err) {
        if (!(err instanceof ParseError)) {
            console.error(err.message);
            process.exit(1);

            return;
        }

        if (err.code === ParseErrorCode.OverlappingPaintType) {
            console.error("No solution exists");
        } else {
            console.error(err.message);
        }

        process.exit(1);

        return;
    }

    const output: string[] = Object.keys(order.colors).map((key) => {
        return order.colors[Number(key)];
    });
    console.log(output.join(" "));
})();
