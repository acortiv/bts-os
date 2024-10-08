import { sleep, serve} from "bun";
import { getData } from "./utils/getData";

// This is a basic HTTP Server without Async

// serve({
//     fetch(req) {
//         // return new Response("Bun!");
//         const url = new URL(req.url);
//         if (url.pathname === '/') return new Response("Home Page!");
//         if (url.pathname === "/blog") return new Response("This is the blog page!");
//         return new Response("404!");
//     },
// })


// Now let's take it a step further

// serve({
//    async fetch(req) {
//         const start = performance.now();
//         await sleep(10);
//         const end = performance.now();
//         return new Response(`Slept for ${end - start}ms`)
//     },
// });


// Pretty easy, right?  Now, let's take a look at promises and building out a more robust API

// We can also return a fetch to an external API think something like Spotify or Amazon

// serve({
//     async fetch(req) {
//         const url = new URL(req.url)
//         if (url.pathname === "/") return new Response("This is the landing page!");
//         return fetch("https://example.com");
//     }
// })


// Pulling IP from the request
// You can access the server argument from the fetch handler; it is the second argument passed to it

// const server = serve({
//     fetch(req, server) {
//         const ip = server.requestIP(req);
//         return new Response(`Your IP is ${ip}`);
//     }
// })


// Lets take a look at static routes for server optimization by serving static Response objects

// serve({
//     static: {
//         "/api/health-check": new Response("All good!"),
//         "/": new Response("Landing Page"),
//         // Serve a file by buffering it in memory
//         // "/index.html": new Response(await Bun.file("./index").bytes(), {
//         //     headers: {
//         //         "Content-Type": "text/html",
//         //     },
//         // }),
//         // "/favicon.ico": new Response(await Bun.file("./favicon.ico").bytes(), {
//         //     headers: {
//         //         "Content-Type": "image/x-icon",
//         //     },
//         // }),

//         // Static Route with custom headers
//         "/api/time": new Response(new Date().toISOString(), {
//             headers: {
//                 "X-Custom-Header": "Bun!"
//             },
//         }),
//         // serve JSON
//         "/api/version.json": Response.json({version: "1.0.0"}),
//     },
//     fetch(req, server) {
//         const ip = server.requestIP(req);
//         return new Response(`Your IP is: ${ip}`);
//     },
// });


// Static route responses are cached for the lifetime of the server object.  To reload static routes, call server.reload(options)

// const server = serve({
//     static: {
//         "/api/time": new Response(new Date().toISOString()),
//     },

//     fetch(req) {
//         return new Response("404!");
//     },
// });

// setInterval(() => {
//     server.reload({
//         static: {
//             "/api/time": new Response(new Date().toISOString()),
//         },

//         fetch(req) {
//             return new Response("404!");
//         },
//     });
// }, 1000);

// Reloading static routes only impact the next request. In-flight requests continue to use the old static routes. After in-flight requests to old static routes are finished, the old static routes are freed from memory.


// To simplify error handling, static routes do not support streaming response bodies from ReadableStream or an AsyncIterator. Fortunately, you can still buffer the response in memory first:

// const time = await fetch("https://api.example.com/v1/data");
// // Buffer the response in memory first.
// const blob = await time.blob();

// const server = Bun.serve({
//   static: {
//     "/api/data": new Response(blob),
//   },

//   fetch(req) {
//     return new Response("404!");
//   },
// });  


// Dang that stuff was really boring, let's start looking at changing the Portname and Hostname now and going to dev/prod

// const server = serve({
//     port: 8080, // For a random port set this to 0
//     // hostname: "mydomain.com",
//     fetch(req) {
//         return new Response("404!");
//     },
// });


// Error Handling -- Almost done with the basics

// const server = serve({
//     development: true,
//     fetch(req) {
//         throw new Error("Whoops!");
//     },
// });


// Server Side Errors - To handle server-side errors, implement an error handler. This function should return a Response to serve to the client when an error occurs. This response will supersede Bun's default error page in development mode.

// serve({
//     fetch(req) {
//         throw new Error("Uh Oh... You did something wrong!")
//     },
//     error(error) {
//         return new Response(`<pre>${error}\n${error.stack}</pre>`, {
//             headers: {
//                 "Content-Type": "text/html"
//             },
//         });
//     },
// });


// use serve() returns a server object, to stop the server call the .stop() method

// const server = Bun.serve({
//     fetch() {
//       return new Response("Bun!");
//     },
// });
  
// server.stop();


// Idle Timeout - maximum amount of time a connection is allowed to be idle before the server closes it; a connection is considered idling if there is no data sent or received

// Bun.serve({
//     // 10 seconds:
//     idleTimeout: 10,
  
//     fetch(req) {
//       return new Response("Bun!");
//     },
// });


// Streaming files - To stream files, return a response object with a BunFile object as the body 

// const server = serve({
//     fetch(req) {
//         return new Response(Bun.file('/example.tst'));
//     },
// });

// You can send part of a file using the slice(start, end) method on the Bun.file object.  This automatically sets the Content-Range and Content-Length headers on the response objects

// serve({
//     fetch(req) {
//       // parse `Range` header
//       const [start = 0, end = Infinity] = req.headers
//         .get("Range") // Range: bytes=0-100
//         .split("=") // ["Range: bytes", "0-100"]
//         .at(-1) // "0-100"
//         .split("-") // ["0", "100"]
//         .map(Number); // [0, 100]
  
//       // return a slice of the file
//       const bigFile = Bun.file("./big-video.mp4");
//       return new Response(bigFile.slice(start, end));
//     },
// });

// console.log("Hello World!");

const server = serve({
    port: 8080,
    async fetch(req) {
        const url = new URL(req.url);
        switch (url.pathname) {
            case '/':
                switch (req.method) {
                    case "GET":
                        return new Response("Landing Page!");
                    default:
                        return new Response("Method not allowed", { status: 405 });
                }
            case '/api':
                switch (req.method) {
                    case "GET":
                        return new Response("This is the API");
                    default:
                        return new Response("Method not allowed", { status: 405});
                }
            case '/country':
                switch(req.method) {
                    case "POST":
                        const countryReq = await req.json();
                        const reqName = countryReq.name;
                        try {
                            const countryName = await getData(reqName);
                            return new Response(countryName.name.common);
                        } catch (e) {
                            if (e instanceof(Error)) {
                                return new Response(e.message);
                            } else {
                                return new Response("Unknown Error!");
                            }
                        }                       
                    default:
                        return new Response("Method is not allowed", { status: 405 });
                }                    
            case '/user':
                switch (req.method) {
                    case "GET":
                        return new Response("Users");
                    case "POST":
                        return new Response("User Created");
                    default:
                        return new Response("Method not allowed", { status: 405});
                } 
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);