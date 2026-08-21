# @tradejs/strategy-liquidity-tails

TradeJS strategy plugin providing `LiquidityTails`.

## Strategy overview

`LiquidityTails` turns dominant candle wicks into persistent liquidity zones
and trades later rejections or retests. Zone age, touch order, retest distance,
rejection efficiency, and candle-body rules filter entries; structural stops,
R targets, and an optional one-step scale-in manage risk.

## Logic at a glance

![LiquidityTails strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-LiquidityTails/main/docs/strategy-logic.svg)

## Signal on an example chart

A dominant lower wick first creates persistent liquidity memory; only a later qualified retest and rejection turns that zone into a LONG signal.

![LiquidityTails signal on an illustrative ticker chart](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-LiquidityTails/main/docs/signal-example.svg)

The illustration is schematic, not market data. Exact thresholds, confirmation
rules, and risk parameters come from the active TradeJS strategy config.

## Install

```bash
yarn add @tradejs/strategy-liquidity-tails
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-liquidity-tails"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is beta-first and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow. A relevant push publishes a unique
prerelease and moves the npm `beta` tag only after the repository checks pass
and the published tarball imports successfully in a clean npm consumer. The
current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.

## Runtime host contract

All `@tradejs/*` runtime packages are peer dependencies. The consuming TradeJS Project owns their exact installed versions and package manifest, so this package never loads a hidden nested engine, types package, indicator package, or Strategy Kit. Repository builds use matching dev dependencies only.
