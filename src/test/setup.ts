import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./server";

// Start MSW server before tests
beforeAll(() => server.listen());
// Reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished
afterAll(() => server.close());
