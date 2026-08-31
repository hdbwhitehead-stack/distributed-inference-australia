import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateEconomics,
  calculateHardwareLifeEconomics,
  referenceEconomicsScenario,
  referenceHardwareLifeScenario,
} from '../src/lib/economics.ts';

const closeTo = (actual: number | null, expected: number, tolerance = 1e-6) => {
  if (actual === null) throw new Error('expected a numeric result');
  assert.ok(Math.abs(actual - expected) <= tolerance, `expected ${actual} to be within ${tolerance} of ${expected}`);
};

test('matches the documented reference power-price sensitivity', () => {
  const results = calculateEconomics(referenceEconomicsScenario);

  closeTo(results.billableUtilisation, 0.5054, 1e-8);
  closeTo(results.annualPowerSavings, 350_400);
  closeTo(results.revenuePerUtilisationPoint, 284_700);
  closeTo(results.breakEvenUtilisationLossPoints, 1.23077, 1e-4);
});

test('compounds each billable-utilisation stage and applies firm overflow', () => {
  const results = calculateEconomics({
    ...referenceEconomicsScenario,
    powerAvailability: 0.5,
    hardwareAvailability: 0.8,
    demandOccupancy: 0.5,
    schedulingEfficiency: 0.75,
    successfulCompletionRate: 0.5,
    annualFirmOverflowCost: 10_000,
  });

  closeTo(results.billableUtilisation, 0.075, 1e-8);
  assert.equal(results.annualFacilityMwh, 4_380);
  assert.equal(results.deliveredElectricityCost, 87_600);
  assert.equal(results.electricityCost, 97_600);
  assert.equal(results.annualPowerSavings, 209_000);
});

test('keeps upfront site capex out of annual contribution and rejects invalid rates', () => {
  const results = calculateEconomics(referenceEconomicsScenario);
  assert.equal(results.totalUpfrontCapex, 26_000_000);
  closeTo(
    results.grossContributionBeforeFinancing,
    results.revenue - results.electricityCost - results.acceleratorDepreciation - referenceEconomicsScenario.siteOperatingCost,
  );
  assert.throws(() => calculateEconomics({ ...referenceEconomicsScenario, demandOccupancy: 1.01 }), RangeError);
});

test('separates tax timing from the accelerator operating tail', () => {
  const results = calculateHardwareLifeEconomics(referenceHardwareLifeScenario);

  assert.equal(results.nominalTaxShield, 2_750_000);
  closeTo(results.presentValueTaxShieldOverTaxLife, 2_179_282.49, 0.01);
  closeTo(results.presentValueTaxShieldOverOperatingLife, 1_759_701.72, 0.01);
  closeTo(results.taxTimingPresentValueBenefit, 419_580.77, 0.01);
  assert.equal(results.tailYears, 5);
  assert.equal(results.annualAfterTaxTailContribution, 750_000);
  assert.equal(results.totalAfterTaxTailContribution, 3_750_000);
});

test('rejects invalid hardware-life assumptions', () => {
  assert.throws(
    () => calculateHardwareLifeEconomics({ ...referenceHardwareLifeScenario, companyTaxRate: 1.01 }),
    RangeError,
  );
  assert.throws(
    () => calculateHardwareLifeEconomics({ ...referenceHardwareLifeScenario, taxEffectiveLifeYears: 4.5 }),
    RangeError,
  );
});
