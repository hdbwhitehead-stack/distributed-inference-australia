/**
 * Scenario calculations for a distributed inference site. Inputs are annual
 * assumptions unless their names carry another unit. They are deliberately
 * pure so pages and tests can use the same arithmetic.
 */

export const HOURS_PER_YEAR = 8_760;

export interface EconomicsScenario {
  /** GPUs that can be sold to customers, rather than installed inventory. */
  installedSellableGpus: number;
  /** AUD earned for each accepted, completed billable GPU-hour. */
  realisedPricePerGpuHour: number;
  /** Facility draw at full operation. */
  facilityMw: number;
  powerAvailability: number;
  hardwareAvailability: number;
  demandOccupancy: number;
  schedulingEfficiency: number;
  successfulCompletionRate: number;
  /** AUD per MWh paid at this site. */
  deliveredElectricityPricePerMwh: number;
  /** AUD per MWh for the comparable central-site supply. */
  centralElectricityPricePerMwh: number;
  /** Upfront AUD required for the site. Reported, not annualised. */
  siteCapex: number;
  /** Recurring annual AUD excluding electricity and firm overflow. */
  siteOperatingCost: number;
  /** Purchase cost per sellable accelerator, in AUD. */
  acceleratorCapexPerGpu: number;
  acceleratorUsefulLifeYears: number;
  /** Annual AUD paid to firm capacity when the scenario requires overflow. */
  annualFirmOverflowCost: number;
}

export interface EconomicsResults {
  billableUtilisation: number;
  annualBillableGpuHours: number;
  annualFacilityMwh: number;
  revenue: number;
  electricityCost: number;
  deliveredElectricityCost: number;
  centralElectricityCost: number;
  annualPowerSavings: number;
  acceleratorDepreciation: number;
  grossContributionBeforeFinancing: number;
  revenuePerUtilisationPoint: number;
  breakEvenUtilisationLossPoints: number | null;
  totalAcceleratorCapex: number;
  totalUpfrontCapex: number;
}

export interface HardwareLifeScenario {
  /** Eligible compute equipment cost in AUD. */
  computeCapex: number;
  companyTaxRate: number;
  /** Prime-cost tax effective life. */
  taxEffectiveLifeYears: number;
  /** Period over which the same nominal deduction is compared. */
  operatingLifeYears: number;
  discountRate: number;
  /** Pre-tax annual cash contribution after the tax-life period. */
  annualTailPreTaxContribution: number;
}

export interface HardwareLifeResults {
  nominalTaxShield: number;
  presentValueTaxShieldOverTaxLife: number;
  presentValueTaxShieldOverOperatingLife: number;
  taxTimingPresentValueBenefit: number;
  tailYears: number;
  annualAfterTaxTailContribution: number;
  totalAfterTaxTailContribution: number;
}

export const referenceEconomicsScenario: EconomicsScenario = {
  installedSellableGpus: 500,
  realisedPricePerGpuHour: 6.5,
  facilityMw: 1,
  powerAvailability: 0.8,
  hardwareAvailability: 0.95,
  demandOccupancy: 0.7,
  schedulingEfficiency: 1,
  successfulCompletionRate: 0.95,
  deliveredElectricityPricePerMwh: 20,
  centralElectricityPricePerMwh: 70,
  siteCapex: 1_000_000,
  siteOperatingCost: 500_000,
  acceleratorCapexPerGpu: 50_000,
  acceleratorUsefulLifeYears: 4,
  annualFirmOverflowCost: 0,
};

export const referenceHardwareLifeScenario: HardwareLifeScenario = {
  computeCapex: 11_000_000,
  companyTaxRate: 0.25,
  taxEffectiveLifeYears: 4,
  operatingLifeYears: 9,
  discountRate: 0.1,
  annualTailPreTaxContribution: 1_000_000,
};

function assertFiniteNonNegative(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite, non-negative number.`);
  }
}

function assertRate(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new RangeError(`${name} must be between 0 and 1.`);
  }
}

function validateScenario(scenario: EconomicsScenario): void {
  const rates: Array<[string, number]> = [
    ['powerAvailability', scenario.powerAvailability],
    ['hardwareAvailability', scenario.hardwareAvailability],
    ['demandOccupancy', scenario.demandOccupancy],
    ['schedulingEfficiency', scenario.schedulingEfficiency],
    ['successfulCompletionRate', scenario.successfulCompletionRate],
  ];
  rates.forEach(([name, value]) => assertRate(name, value));

  const amounts: Array<[string, number]> = [
    ['installedSellableGpus', scenario.installedSellableGpus],
    ['realisedPricePerGpuHour', scenario.realisedPricePerGpuHour],
    ['facilityMw', scenario.facilityMw],
    ['deliveredElectricityPricePerMwh', scenario.deliveredElectricityPricePerMwh],
    ['centralElectricityPricePerMwh', scenario.centralElectricityPricePerMwh],
    ['siteCapex', scenario.siteCapex],
    ['siteOperatingCost', scenario.siteOperatingCost],
    ['acceleratorCapexPerGpu', scenario.acceleratorCapexPerGpu],
    ['annualFirmOverflowCost', scenario.annualFirmOverflowCost],
  ];
  amounts.forEach(([name, value]) => assertFiniteNonNegative(name, value));

  if (!Number.isFinite(scenario.acceleratorUsefulLifeYears) || scenario.acceleratorUsefulLifeYears <= 0) {
    throw new RangeError('acceleratorUsefulLifeYears must be a finite number above zero.');
  }
}

/**
 * Calculates annual economics. Site capex is shown as an upfront investment;
 * it is intentionally not deducted from an annual contribution figure.
 */
export function calculateEconomics(scenario: EconomicsScenario): EconomicsResults {
  validateScenario(scenario);

  const billableUtilisation =
    scenario.powerAvailability *
    scenario.hardwareAvailability *
    scenario.demandOccupancy *
    scenario.schedulingEfficiency *
    scenario.successfulCompletionRate;
  const annualBillableGpuHours =
    scenario.installedSellableGpus * HOURS_PER_YEAR * billableUtilisation;
  const annualFacilityMwh = scenario.facilityMw * HOURS_PER_YEAR * scenario.powerAvailability;
  const revenue = annualBillableGpuHours * scenario.realisedPricePerGpuHour;
  const deliveredElectricityCost = annualFacilityMwh * scenario.deliveredElectricityPricePerMwh;
  const electricityCost = deliveredElectricityCost + scenario.annualFirmOverflowCost;
  const centralElectricityCost = annualFacilityMwh * scenario.centralElectricityPricePerMwh;
  const annualPowerSavings = centralElectricityCost - electricityCost;
  const totalAcceleratorCapex = scenario.installedSellableGpus * scenario.acceleratorCapexPerGpu;
  const acceleratorDepreciation = totalAcceleratorCapex / scenario.acceleratorUsefulLifeYears;
  const grossContributionBeforeFinancing =
    revenue - electricityCost - scenario.siteOperatingCost - acceleratorDepreciation;
  const revenuePerUtilisationPoint =
    scenario.installedSellableGpus * HOURS_PER_YEAR * scenario.realisedPricePerGpuHour * 0.01;
  const breakEvenUtilisationLossPoints =
    revenuePerUtilisationPoint === 0 ? null : annualPowerSavings / revenuePerUtilisationPoint;

  return {
    billableUtilisation,
    annualBillableGpuHours,
    annualFacilityMwh,
    revenue,
    electricityCost,
    deliveredElectricityCost,
    centralElectricityCost,
    annualPowerSavings,
    acceleratorDepreciation,
    grossContributionBeforeFinancing,
    revenuePerUtilisationPoint,
    breakEvenUtilisationLossPoints,
    totalAcceleratorCapex,
    totalUpfrontCapex: scenario.siteCapex + totalAcceleratorCapex,
  };
}

function presentValueOfEqualAnnualAmounts(total: number, years: number, discountRate: number): number {
  const annualAmount = total / years;
  let presentValue = 0;
  for (let year = 1; year <= years; year += 1) {
    presentValue += annualAmount / ((1 + discountRate) ** year);
  }
  return presentValue;
}

/**
 * Separates a tax-depreciation timing benefit from the later operating tail.
 * This is an illustrative prime-cost comparison, not project tax advice.
 */
export function calculateHardwareLifeEconomics(scenario: HardwareLifeScenario): HardwareLifeResults {
  assertFiniteNonNegative('computeCapex', scenario.computeCapex);
  assertRate('companyTaxRate', scenario.companyTaxRate);
  assertFiniteNonNegative('discountRate', scenario.discountRate);
  assertFiniteNonNegative('annualTailPreTaxContribution', scenario.annualTailPreTaxContribution);

  if (!Number.isInteger(scenario.taxEffectiveLifeYears) || scenario.taxEffectiveLifeYears <= 0) {
    throw new RangeError('taxEffectiveLifeYears must be a positive whole number.');
  }
  if (!Number.isInteger(scenario.operatingLifeYears) || scenario.operatingLifeYears <= 0) {
    throw new RangeError('operatingLifeYears must be a positive whole number.');
  }

  const nominalTaxShield = scenario.computeCapex * scenario.companyTaxRate;
  const presentValueTaxShieldOverTaxLife = presentValueOfEqualAnnualAmounts(
    nominalTaxShield,
    scenario.taxEffectiveLifeYears,
    scenario.discountRate,
  );
  const presentValueTaxShieldOverOperatingLife = presentValueOfEqualAnnualAmounts(
    nominalTaxShield,
    scenario.operatingLifeYears,
    scenario.discountRate,
  );
  const tailYears = Math.max(scenario.operatingLifeYears - scenario.taxEffectiveLifeYears, 0);
  const annualAfterTaxTailContribution =
    scenario.annualTailPreTaxContribution * (1 - scenario.companyTaxRate);

  return {
    nominalTaxShield,
    presentValueTaxShieldOverTaxLife,
    presentValueTaxShieldOverOperatingLife,
    taxTimingPresentValueBenefit:
      presentValueTaxShieldOverTaxLife - presentValueTaxShieldOverOperatingLife,
    tailYears,
    annualAfterTaxTailContribution,
    totalAfterTaxTailContribution: annualAfterTaxTailContribution * tailYears,
  };
}
