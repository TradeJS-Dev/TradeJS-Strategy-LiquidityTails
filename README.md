# @tradejs/strategy-liquidity-tails

TradeJS strategy plugin providing `LiquidityTails`.

## Strategy overview

`LiquidityTails` turns dominant candle wicks into persistent liquidity zones
and trades later rejections or retests. Zone age, touch order, retest distance,
rejection efficiency, and candle-body rules filter entries; structural stops,
R targets, and an optional one-step scale-in manage risk.

## Logic at a glance

![LiquidityTails strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-LiquidityTails/main/docs/strategy-logic.svg)

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

Publishing is triggered by a GitHub release and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow.

Keywords: ai, claude, codex.
