//@ts-ignore file is not complete yet, do not have types for DOM modules yet
//@ts-nocheck file is not complete yet, do not have types for DOM modules yet

declare const __PORT__: number;

// Create WebSocket connection.
// deno-lint-ignore no-undef - location is valid on client
const socketUrl = `ws://${location.hostname}:${__PORT__}`;
const socket = new WebSocket(socketUrl);

// Connection opened
socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  if (event.data === "RELOAD") {
    // deno-lint-ignore no-undef - Turbolinks is valid on client
    if (typeof Turbolinks !== undefined && Turbolinks.supported) {
      // deno-lint-ignore no-undef - Turbolinks and window is valid on client
      Turbolinks.visit(window.location.pathname, { action: "replace" });
    } else {
      // deno-lint-ignore no-self-assign - Ensures the browser redirects to itself
      window.location.href = window.location.href;
    }
  }
});

// Listen for possible errors
socket.addEventListener("error", function (event) {
  console.log("WebSocket error: ", event);
});
