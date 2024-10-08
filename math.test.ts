import { expect, test, describe } from "bun:test";


// Basic Testing, tests can be grouped together by using describe

// describe("arithmetic", () => {
//     test("2 + 2", () => {
//         expect(2 + 2).toBe(4);
//     });    

//     test("2 * 2", () => (
//         expect(2 * 2).toBe(4)
//     ));

//     // Tests can be Async too 
//     test("Async 2/2", async () => {
//         const result = await Promise.resolve(2 / 2);
//         expect(result).toEqual(1);
//     });

//     test("Alt Async 2/2", done => {
//         Promise.resolve(2 / 2).then(result => {
//             expect(result).toEqual(1);
//             done();
//         })
//     });


// });


// // Timeouts can be specified by passing a third number to test

// // describe("Timeouts", () => {
// //     test("wat", async () => {
// //         const data = await slowOperation(); // slow operation is a hypothetical slow operation
// //         expect(data).toBe(42);
// //     }, 500) // test has to run under 500 ms
// // });


// // When a test times out and processes spawned in the test via Bun.spawn, Bun.spawnSync, or node:child_process are not killed, they will be automatically killed and a message will be logged to the console.


// // Skip Individual Tests with test.skip

// test.skip("wat", () => {
//     //To-Do Fix this
//     expect(2 + 2).toBe(4);
// }); 

// // To-Do tests, Mark a test as todo with test.todo; These tests will run, and the test runner will expect them to fail -- if they pass, you will be prompted to mark them as a regular test

// test.todo("To-Do Test // Fix this", () => {
//     // myTestFunction()
// });


// Test only 

// To run a particular test or suite of tests use test.only() or describe.only(). Once declared, running bun test --only will only execute tests/suites that have been marked with .only(). Running bun test without the --only option with test.only() declared will result in all tests in the given suite being executed up to the test with .only(). describe.only() functions the same in both execution scenarios.

// test("test #1", () => {
//   // does not run
// });

// test.only("test #2", () => {
//   // runs
// });

// describe.only("only", () => {
//   test("test #3", () => {
//     // runs
//   });
// });


// The following command will only execute tests #2 and #3.
// bun test --only

// The following command will only execute tests #1, #2 and #3.
// bun test

// Test If - To run a test conditionally, use test.if(). The test will run if the condition is truthy. This is particularly useful for tests that should only run on specific architectures or operating systems.

// test.if(Math.random() > 0.5)("runs half the time", () => {
//     // ...
//   });
  
//   const macOS = process.arch === "darwin";
//   test.if(macOS)("runs on macOS", () => {
//     // runs if macOS
// });

// Test Each 

const cases = [
    [1, 2, 3],
    [3, 4, 7],
  ];
  
test.each(cases)("%p + %p should be %p", (a, b, expected) => {
    // runs once for each test case provided
    expect(a + b).toBe(expected); 
});