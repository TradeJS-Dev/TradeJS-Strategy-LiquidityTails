import { createStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { config as DEFAULT_CONFIG, LiquidityTailsConfig } from "./config";
import { createLiquidityTailsCore } from "./core";
import { liquidityTailsManifest } from "./manifest";

export const LiquidityTailsStrategyDefinition: ValidatedStrategyRegistryEntry<LiquidityTailsConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createStrategyConfigParser({
      strategyName: "LiquidityTails",
      defaults: DEFAULT_CONFIG,
    }),
    createCore: createLiquidityTailsCore,
    manifest: liquidityTailsManifest,
  };
