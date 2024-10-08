import { describe, it, expect} from "bun:test";
import { decompose } from "../utils/decompose";
import fc from 'fast-check';

describe('decompose', () => {
    it('should produce an array such that the product equals the input', () => {
        fc.assert(
            fc.property(fc.integer({ min: 2, max: 2 ** 31 - 1}), (n) => {
                const factors = decompose(n);
                const productOfFactors = factors.reduce((a, b) => a * b, 1);
                return productOfFactors === n;
            })
        );
    });
});