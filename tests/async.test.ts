import { test, expect, describe } from "bun:test"
import { getData } from "../utils/get-data";

test("Fetch Country", async (done) => {
    Promise.resolve(getData("France")).then(country => {
        expect(country.name.common).toBe("France");
        done();
    });
});