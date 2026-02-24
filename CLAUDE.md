# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Node.js SDK for the Arta API (`@artaio/node-api`). Zero runtime dependencies — uses only the native Fetch API. Server-side only (requires private API key). Requires Node.js >= 18.

## Commands

```bash
npm run build          # Generate types from Zod schemas, then compile TypeScript
npm run build:types    # Regenerate lib/types.ts from schemas/index.ts
npm test               # Lint + unit tests
npm run test:unit      # Unit tests only (Jest with coverage)
npm run test:integration  # Integration tests (30s timeout)
npm run lint           # ESLint check
npm run lint:fix       # Prettier auto-format
```

Run a single test file:
```bash
npx jest ./test/endpoint/webhooks.test.ts
```

## Architecture

### Entry point and client setup

`lib/arta.ts` — The `Arta` class is the SDK entry point. It takes an API key, creates an `ArtaClient` (RestClient), and instantiates all endpoint classes. Each endpoint is a public property (e.g., `arta.shipments`, `arta.webhooks`).

`lib/ArtaClient.ts` — Implements `RestClient` interface. Handles auth headers, host configuration, User-Agent, and delegates HTTP to `FetchHttpClient`.

### Endpoint pattern

All endpoints live in `lib/endpoint/` and extend `DefaultEndpoint<T, U>` from `lib/endpoint/endpoint.ts`, which provides generic CRUD: `list()`, `listAll()`, `getById()`, `create()`, `update()`, `remove()`.

Endpoints customize behavior via:
- **`onReturn` callback** — passed to `DefaultEndpoint` constructor to enrich returned resources (e.g., adding bound methods like `request.cancel()`, or parsing numeric/date fields from strings)
- **Custom methods** — e.g., `WebhooksEndpoint` adds `ping()`, `getSecret()`, `resetSecret()`; `QuoteRequestsEndpoint` adds `cancel()`, `requireCustomQuotes()`

All date fields in API responses are converted to UTC via `convertDatesToUtc()` in `lib/utils.ts`.

### Type generation

Types are generated, not hand-written. The source of truth is Zod schemas in `schemas/index.ts`. Running `npm run build:types` uses `zod-to-ts` to generate `lib/types.ts`. Do not edit `lib/types.ts` directly — modify the Zod schemas and regenerate.

### HTTP layer

`lib/net/FetchHttpClient.ts` wraps native `fetch()` with timeout support (via `Promise.race`). `lib/net/RestClient.ts` defines the interface that `ArtaClient` implements.

### Exports

`lib/index.ts` re-exports the `Arta` class plus all endpoint-specific create/update body types. Consumer-facing types are in `lib/MetadataTypes.ts` and generated `lib/types.ts`.

## Testing

Tests use Jest with `ts-jest`. Unit tests in `test/` mirror the source structure. Integration tests in `test-integration/` hit a live API.

`test/endpoint/helper.ts` provides shared test utilities (`testGet`, `testCreate`, `testList`, `testUpdate`, `testDelete`, `getRestMock`) that set up a mock `RestClient` and verify endpoint methods call the correct HTTP methods/paths.

Endpoint tests follow a consistent pattern: create a mock RestClient via `getRestMock()`, instantiate the endpoint, and verify CRUD operations plus any custom methods.

## Conventions

- Conventional commits enforced via commitlint (husky `commit-msg` hook)
- Pre-commit hook runs `npm test`
- ESLint rules: no explicit `any`, consistent type imports, semicolons required
- Prettier: single quotes, 2-space indent, no tabs
- Zero-dependency policy: no runtime dependencies allowed
