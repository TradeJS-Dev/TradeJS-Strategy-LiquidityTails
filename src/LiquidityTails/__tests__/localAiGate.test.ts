import type { AiPayload, Direction, Signal } from "@tradejs/types";
import { liquidityTailsAiAdapter } from "../adapters/ai";

const evaluate = ({
  direction,
  top5PctAboveMa20,
  diMinus,
}: {
  direction: Direction;
  top5PctAboveMa20?: number;
  diMinus?: number;
}) =>
  liquidityTailsAiAdapter.postProcessLocalAnalysis?.({
    signal: {
      direction,
      prices: { takeProfitPrice: 110, stopLossPrice: 95 },
    } as Signal,
    payload: {
      additionalIndicators: {
        baseContext: {
          relative: {
            marketBreadths: {
              top5:
                top5PctAboveMa20 == null
                  ? {}
                  : { pctAboveMa20: top5PctAboveMa20 },
            },
          },
          regime: {
            trend: {
              adx: diMinus == null ? {} : { diMinus },
            },
          },
        },
      },
    } as AiPayload,
    analysis: { direction, quality: 5 },
  });

describe("LiquidityTails H2B local AI gate", () => {
  it.each<Direction>(["LONG", "SHORT"])(
    "approves %s at the frozen inclusive boundaries",
    (direction) => {
      expect(
        evaluate({ direction, top5PctAboveMa20: 0.5, diMinus: 13.3743 }),
      ).toEqual(
        expect.objectContaining({
          direction,
          quality: 4,
          approved: true,
          gateDecision: "approved",
        }),
      );
    },
  );

  it("rejects breadth below the frozen boundary", () => {
    expect(
      evaluate({
        direction: "LONG",
        top5PctAboveMa20: 0.499999,
        diMinus: 13.3743,
      }),
    ).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });

  it("rejects DI-minus above the exact unrounded boundary", () => {
    expect(
      evaluate({
        direction: "SHORT",
        top5PctAboveMa20: 0.5,
        diMinus: 13.37431,
      }),
    ).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });

  it.each([
    { top5PctAboveMa20: undefined, diMinus: 13.3743 },
    { top5PctAboveMa20: 0.5, diMinus: undefined },
  ])("fails closed when required context is missing", (context) => {
    expect(evaluate({ direction: "LONG", ...context })).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });
});
