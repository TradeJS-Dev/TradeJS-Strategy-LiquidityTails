import { defineStrategyPlugin } from "@tradejs/core/config";
import type { StrategyConfig, StrategyRegistryEntry } from "@tradejs/types";
import { config as liquidityTailsDefaultConfig } from "./LiquidityTails/config";
import { LiquidityTailsStrategyDefinition } from "./LiquidityTails/strategy";

export const strategyEntries: StrategyRegistryEntry[] = [
  LiquidityTailsStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  LiquidityTails: liquidityTailsDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { LiquidityTailsStrategyDefinition } from "./LiquidityTails/strategy";
export { liquidityTailsDefaultConfig };
export { liquidityTailsManifest } from "./LiquidityTails/manifest";
export { liquidityTailsAiAdapter } from "./LiquidityTails/adapters/ai";

export default defineStrategyPlugin({ strategyEntries });
