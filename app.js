/**
 * ==============================================================================
 * CAR PRICE PREDICTOR - JAVASCRIPT AI INFERENCE ENGINE
 * ==============================================================================
 * Rule-Based Expert System (Zero ML Frameworks, Pure Heuristic Algorithms)
 * Author: College Lab Web Project
 * ==============================================================================
 */

// ==============================================================================
// 1. AI KNOWLEDGE BASE (Brand Benchmarks & Presets)
// ==============================================================================

const BRAND_TIER_BASE_PRICES = {
  "MARUTI SUZUKI": 650000,
  "MARUTI": 650000,
  "HYUNDAI": 750000,
  "TATA": 800000,
  "RENAULT": 600000,
  "NISSAN": 650000,
  "HONDA": 950000,
  "TOYOTA": 1200000,
  "MAHINDRA": 1100000,
  "VOLKSWAGEN": 1000000,
  "SKODA": 1050000,
  "KIA": 1000000,
  "MG": 1200000,
  "FORD": 750000,
  "BMW": 3500000,
  "MERCEDES-BENZ": 3800000,
  "MERCEDES": 3800000,
  "AUDI": 3400000,
  "VOLVO": 3200000,
  "JAGUAR": 4000000,
};

const DEFAULT_BASE_PRICE = 700000;
const CURRENT_YEAR = new Date().getFullYear();

// Preset Demo Scenarios
const PRESETS = {
  swift: {
    brand: "Maruti Suzuki",
    model: "Swift VXi",
    year: 2018,
    km: 45000,
    fuel: "Petrol",
    owners: 2,
    customPrice: null
  },
  creta: {
    brand: "Hyundai",
    model: "Creta SX",
    year: 2021,
    km: 35000,
    fuel: "Diesel",
    owners: 1,
    customPrice: null
  },
  innova: {
    brand: "Toyota",
    model: "Innova Crysta",
    year: 2020,
    km: 40000,
    fuel: "Diesel",
    owners: 1,
    customPrice: 1600000
  },
  nexon_ev: {
    brand: "Tata",
    model: "Nexon EV Max",
    year: 2023,
    km: 18000,
    fuel: "Electric",
    owners: 1,
    customPrice: 1550000
  },
  city_cng: {
    brand: "Honda",
    model: "City V",
    year: 2019,
    km: 65000,
    fuel: "CNG",
    owners: 1,
    customPrice: null
  },
  bmw: {
    brand: "BMW",
    model: "330i M Sport",
    year: 2022,
    km: 22000,
    fuel: "Petrol",
    owners: 1,
    customPrice: 4600000
  }
};

// ==============================================================================
// 2. AI INFERENCE ENGINE (Rule Execution Functions)
// ==============================================================================

/**
 * AI Rule 1: Determine Base Market Price from Brand Knowledge Base.
 */
function getBasePrice(brand, model, customBasePrice = null) {
  if (customBasePrice && customBasePrice > 0) {
    return {
      price: customBasePrice,
      desc: `User-specified original ex-showroom price: ₹${formatINR(customBasePrice)}`,
      impactText: `₹${formatINR(customBasePrice)}`,
      impactClass: "highlight-cyan",
      icon: "fa-tag",
      iconClass: "icon-blue"
    };
  }

  const cleanBrand = (brand || "").trim().toUpperCase();
  if (BRAND_TIER_BASE_PRICES[cleanBrand]) {
    const baseVal = BRAND_TIER_BASE_PRICES[cleanBrand];
    return {
      price: baseVal,
      desc: `Matched knowledge base benchmark for '${brand}': ₹${formatINR(baseVal)}`,
      impactText: `₹${formatINR(baseVal)}`,
      impactClass: "highlight-cyan",
      icon: "fa-building",
      iconClass: "icon-blue"
    };
  }

  return {
    price: DEFAULT_BASE_PRICE,
    desc: `Brand not indexed. Applied baseline benchmark: ₹${formatINR(DEFAULT_BASE_PRICE)}`,
    impactText: `₹${formatINR(DEFAULT_BASE_PRICE)}`,
    impactClass: "highlight-cyan",
    icon: "fa-car",
    iconClass: "icon-blue"
  };
}

/**
 * AI Rule 2: Heuristic Age Depreciation.
 */
function calculateAgeDepreciation(basePrice, manufacturingYear) {
  const age = Math.max(0, CURRENT_YEAR - manufacturingYear);
  let pct = 0;

  if (age === 0) {
    pct = 0.05; // Current year exit depreciation
  } else if (age === 1) {
    pct = 0.15;
  } else if (age <= 5) {
    pct = 0.15 + (age - 1) * 0.08;
  } else if (age <= 10) {
    pct = 0.15 + 4 * 0.08 + (age - 5) * 0.05;
  } else {
    pct = 0.15 + 4 * 0.08 + 5 * 0.05 + (age - 10) * 0.03;
  }

  pct = Math.min(0.80, pct);
  const amount = basePrice * pct;

  return {
    amount,
    pct,
    age,
    desc: `Vehicle is ${age} yr(s) old. Applied ${(pct * 100).toFixed(1)}% age depreciation curve.`,
    impactText: `- ₹${formatINR(amount)}`,
    impactClass: "highlight-orange",
    icon: "fa-calendar-minus",
    iconClass: "icon-orange"
  };
}

/**
 * AI Rule 3: Heuristic Mileage Depreciation.
 */
function calculateMileageDepreciation(basePrice, kmDriven) {
  let pct = 0;
  let label = "";

  if (kmDriven <= 20000) {
    pct = 0.02;
    label = "Low mileage (< 20k km)";
  } else if (kmDriven <= 50000) {
    pct = 0.06;
    label = "Moderate mileage (20k - 50k km)";
  } else if (kmDriven <= 100000) {
    pct = 0.12;
    label = "Average mileage (50k - 100k km)";
  } else if (kmDriven <= 150000) {
    pct = 0.20;
    label = "High mileage (100k - 150k km)";
  } else {
    pct = 0.28;
    label = "Very high wear (> 150k km)";
  }

  const amount = basePrice * pct;

  return {
    amount,
    pct,
    label,
    desc: `${label}: Applied ${(pct * 100).toFixed(1)}% odometer wear deduction.`,
    impactText: `- ₹${formatINR(amount)}`,
    impactClass: "highlight-red",
    icon: "fa-gauge-high",
    iconClass: "icon-red"
  };
}

/**
 * AI Rule 4: Fuel Type Market Adjustment.
 */
function calculateFuelAdjustment(currentVal, fuelType) {
  const fuel = (fuelType || "").trim().toUpperCase();
  let adjustment = 0;
  let desc = "";
  let impactText = "0% (Baseline)";
  let impactClass = "highlight-cyan";

  if (fuel === "DIESEL") {
    adjustment = currentVal * 0.05;
    desc = "Diesel powertrain: High torque & highway reliability demand (+5% value adjustment).";
    impactText = `+ ₹${formatINR(adjustment)}`;
    impactClass = "highlight-green";
  } else if (fuel === "PETROL") {
    adjustment = 0;
    desc = "Petrol engine: Standard industry baseline benchmark (0% adjustment).";
    impactText = "± ₹0";
    impactClass = "highlight-cyan";
  } else if (fuel === "CNG") {
    adjustment = -(currentVal * 0.03);
    desc = "CNG kit: High running economy with minor engine load adjustment (-3% adjustment).";
    impactText = `- ₹${formatINR(Math.abs(adjustment))}`;
    impactClass = "highlight-yellow";
  } else if (fuel === "ELECTRIC" || fuel === "EV") {
    adjustment = currentVal * 0.08;
    desc = "Electric Vehicle (EV): Modern eco-friendly green tech premium (+8% value adjustment).";
    impactText = `+ ₹${formatINR(adjustment)}`;
    impactClass = "highlight-green";
  } else if (fuel === "HYBRID") {
    adjustment = currentVal * 0.06;
    desc = "Hybrid Powertrain: Dual-fuel efficiency and low emission premium (+6% value adjustment).";
    impactText = `+ ₹${formatINR(adjustment)}`;
    impactClass = "highlight-green";
  } else {
    desc = `Standard fuel configuration '${fuelType}' (0% adjustment).`;
  }

  return {
    adjustment,
    desc,
    impactText,
    impactClass,
    icon: "fa-gas-pump",
    iconClass: "icon-green"
  };
}

/**
 * AI Rule 5: Ownership History Penalty.
 */
function calculateOwnerDepreciation(currentVal, owners) {
  let pct = 0;
  let desc = "";
  let impactText = "0% Penalty";
  let impactClass = "highlight-green";

  if (owners <= 1) {
    pct = 0.0;
    desc = "Single Owner (1st Hand): High market confidence & documented service history.";
    impactText = "0% Penalty";
    impactClass = "highlight-green";
  } else if (owners === 2) {
    pct = 0.07;
    desc = "Second Owner (2nd Hand): Standard secondary market transfer discount (-7%).";
    impactText = `- ₹${formatINR(currentVal * pct)}`;
    impactClass = "highlight-yellow";
  } else if (owners === 3) {
    pct = 0.15;
    desc = "Third Owner (3rd Hand): Higher maintenance ambiguity discount (-15%).";
    impactText = `- ₹${formatINR(currentVal * pct)}`;
    impactClass = "highlight-orange";
  } else {
    pct = 0.25;
    desc = `Multiple Owners (${owners} owners): Significant resale discount (-25%).`;
    impactText = `- ₹${formatINR(currentVal * pct)}`;
    impactClass = "highlight-red";
  }

  const penaltyAmount = currentVal * pct;

  return {
    penaltyAmount,
    pct,
    desc,
    impactText,
    impactClass,
    icon: "fa-users",
    iconClass: "icon-yellow"
  };
}

/**
 * Main AI Evaluation Pipeline
 */
function evaluateCarPrice(brand, model, year, km, fuel, owners, customPrice = null) {
  // Step 1: Base Price
  const baseObj = getBasePrice(brand, model, customPrice);
  const basePrice = baseObj.price;

  // Step 2: Age Depreciation
  const ageObj = calculateAgeDepreciation(basePrice, year);
  const priceAfterAge = Math.max(basePrice * 0.15, basePrice - ageObj.amount);

  // Step 3: Mileage Depreciation
  const kmObj = calculateMileageDepreciation(basePrice, km);
  const priceAfterKm = Math.max(basePrice * 0.10, priceAfterAge - kmObj.amount);

  // Step 4: Fuel Adjustment
  const fuelObj = calculateFuelAdjustment(priceAfterKm, fuel);
  const priceAfterFuel = priceAfterKm + fuelObj.adjustment;

  // Step 5: Ownership History Penalty
  const ownerObj = calculateOwnerDepreciation(priceAfterFuel, owners);
  let finalPrice = priceAfterFuel - ownerObj.penaltyAmount;

  // Safety floor
  const minResidualValue = basePrice * 0.08;
  let floorApplied = false;
  if (finalPrice < minResidualValue) {
    finalPrice = minResidualValue;
    floorApplied = true;
  }

  const retentionPct = Math.min(100, Math.max(5, (finalPrice / basePrice) * 100));

  return {
    basePrice,
    finalPrice: Math.round(finalPrice),
    retentionPct: retentionPct.toFixed(1),
    floorApplied,
    steps: [
      { title: "1. Base Benchmark Value", ...baseObj },
      { title: "2. Vehicle Age Depreciation", ...ageObj },
      { title: "3. Odometer Wear Deduction", ...kmObj },
      { title: "4. Fuel Type Adjustment", ...fuelObj },
      { title: "5. Ownership History Factor", ...ownerObj }
    ],
    summary: {
      brand: brand || "Car",
      model: model || "Model",
      year: parseInt(year),
      age: ageObj.age,
      km: parseFloat(km),
      fuel,
      owners: parseInt(owners)
    }
  };
}

// ==============================================================================
// 3. UI FORMATTERS & HELPERS
// ==============================================================================

/**
 * Formats a number into standard Indian numbering system (e.g. 1,93,440)
 */
function formatINR(num) {
  if (isNaN(num)) return "0";
  const str = Math.round(num).toString();
  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== "") {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return lastThree;
}

/**
 * Returns formatted Lakhs representation (e.g. 1.93 Lakhs)
 */
function formatLakhs(num) {
  const lakhs = num / 100000;
  return `Approx. ₹ ${lakhs.toFixed(2)} Lakhs INR`;
}

// ==============================================================================
// 4. DOM CONTROLLER & REAL-TIME EVENT HANDLERS
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const brandSelect = document.getElementById("brand-select");
  const modelInput = document.getElementById("model-input");
  const yearSlider = document.getElementById("year-slider");
  const yearDisplay = document.getElementById("year-display");
  const ageBadge = document.getElementById("age-badge");
  const maxYearTick = document.getElementById("max-year-tick");

  const kmSlider = document.getElementById("km-slider");
  const kmDisplay = document.getElementById("km-display");
  const kmCategoryBadge = document.getElementById("km-category-badge");
  const quickChips = document.querySelectorAll(".quick-chip");

  const fuelGroup = document.getElementById("fuel-group");
  const ownerGroup = document.getElementById("owner-group");

  const customPriceToggle = document.getElementById("custom-price-toggle");
  const customPriceContainer = document.getElementById("custom-price-container");
  const customPriceInput = document.getElementById("custom-price-input");

  const btnRecalculate = document.getElementById("btn-recalculate");
  const btnReset = document.getElementById("btn-reset");

  // Output elements
  const resultCarTitle = document.getElementById("result-car-title");
  const resultCarSubtitle = document.getElementById("result-car-subtitle");
  const finalPriceFormatted = document.getElementById("final-price-formatted");
  const finalPriceLakhs = document.getElementById("final-price-lakhs");
  const metricBasePrice = document.getElementById("metric-base-price");
  const metricRetention = document.getElementById("metric-retention");
  const metricResaleTier = document.getElementById("metric-resale-tier");
  const retentionBarPct = document.getElementById("retention-bar-pct");
  const retentionProgressFill = document.getElementById("retention-progress-fill");
  const waterfallContainer = document.getElementById("waterfall-container");
  const insightsList = document.getElementById("insights-list");
  const aiStatusNote = document.getElementById("ai-status-note");

  // Presets & Modal
  const presetChips = document.querySelectorAll(".preset-chip");
  const rulesModal = document.getElementById("rules-modal");
  const btnOpenRules = document.getElementById("btn-open-rules");
  const btnCloseRules = document.getElementById("btn-close-rules");
  const btnCloseRulesBottom = document.getElementById("btn-close-rules-bottom");
  const btnPrintReport = document.getElementById("btn-print-report");

  // Set current year on slider bounds
  if (yearSlider) {
    yearSlider.max = CURRENT_YEAR;
    if (maxYearTick) maxYearTick.textContent = CURRENT_YEAR;
  }

  // Helper to get selected radio in segmented controls
  function getSelectedFuel() {
    const checked = fuelGroup.querySelector("input[name='fuel']:checked");
    return checked ? checked.value : "Petrol";
  }

  function getSelectedOwners() {
    const checked = ownerGroup.querySelector("input[name='owners']:checked");
    return checked ? parseInt(checked.value) : 1;
  }

  // Sync year slider UI
  function updateYearUI() {
    const val = parseInt(yearSlider.value);
    yearDisplay.textContent = val;
    const age = Math.max(0, CURRENT_YEAR - val);
    ageBadge.textContent = age === 0 ? "Brand New (0 Yrs)" : `Age: ${age} Year${age > 1 ? "s" : ""}`;
  }

  // Sync km slider UI
  function updateKmUI() {
    const val = parseInt(kmSlider.value);
    kmDisplay.textContent = formatINR(val);

    if (val <= 20000) {
      kmCategoryBadge.textContent = "Minimal Wear (<20k)";
      kmCategoryBadge.className = "badge-tag badge-cyan";
    } else if (val <= 50000) {
      kmCategoryBadge.textContent = "Moderate Wear (20k-50k)";
      kmCategoryBadge.className = "badge-tag badge-cyan";
    } else if (val <= 100000) {
      kmCategoryBadge.textContent = "Average Wear (50k-100k)";
      kmCategoryBadge.className = "badge-tag";
    } else if (val <= 150000) {
      kmCategoryBadge.textContent = "High Wear (100k-150k)";
      kmCategoryBadge.className = "badge-tag highlight-yellow";
    } else {
      kmCategoryBadge.textContent = "Heavy Wear (>150k)";
      kmCategoryBadge.className = "badge-tag highlight-red";
    }

    // Update active quick chip if matches
    quickChips.forEach(chip => {
      const chipKm = parseInt(chip.dataset.km);
      if (Math.abs(chipKm - val) < 5000) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });
  }

  // Main UI update trigger
  function updateValuation() {
    const brand = brandSelect.value;
    const model = modelInput.value.trim() || "Model";
    const year = parseInt(yearSlider.value);
    const km = parseFloat(kmSlider.value);
    const fuel = getSelectedFuel();
    const owners = getSelectedOwners();
    
    let customPrice = null;
    if (customPriceToggle.checked && customPriceInput.value) {
      customPrice = parseFloat(customPriceInput.value);
    }

    // Run AI Engine
    const result = evaluateCarPrice(brand, model, year, km, fuel, owners, customPrice);

    // Update Headings
    resultCarTitle.textContent = `${brand} ${model}`;
    resultCarSubtitle.textContent = `${year} Model • ${formatINR(km)} km • ${fuel} • ${owners === 1 ? "1st Owner" : owners + "nd/rd Owner"}`;

    // Hero Price
    finalPriceFormatted.textContent = formatINR(result.finalPrice);
    finalPriceLakhs.textContent = formatLakhs(result.finalPrice);

    // Metrics Bar
    metricBasePrice.textContent = `₹ ${formatINR(result.basePrice)}`;
    metricRetention.textContent = `${result.retentionPct}%`;

    // Resale Tier
    const ret = parseFloat(result.retentionPct);
    if (ret >= 60) {
      metricResaleTier.textContent = "High Retention";
      metricResaleTier.className = "metric-val highlight-green";
    } else if (ret >= 35) {
      metricResaleTier.textContent = "Healthy Resale";
      metricResaleTier.className = "metric-val highlight-cyan";
    } else if (ret >= 20) {
      metricResaleTier.textContent = "Fair Value";
      metricResaleTier.className = "metric-val highlight-yellow";
    } else {
      metricResaleTier.textContent = "Heavy Drop";
      metricResaleTier.className = "metric-val highlight-red";
    }

    // Retention Progress Bar
    retentionBarPct.textContent = `${result.retentionPct}%`;
    retentionProgressFill.style.width = `${result.retentionPct}%`;

    // Render Waterfall Breakdown
    waterfallContainer.innerHTML = "";
    result.steps.forEach(step => {
      const item = document.createElement("div");
      item.className = "waterfall-item";
      item.innerHTML = `
        <div class="wf-left">
          <div class="wf-icon ${step.iconClass}">
            <i class="fa-solid ${step.icon}"></i>
          </div>
          <div class="wf-title-group">
            <h5>${step.title}</h5>
            <p>${step.desc}</p>
          </div>
        </div>
        <div class="wf-impact ${step.impactClass}">
          ${step.impactText}
        </div>
      `;
      waterfallContainer.appendChild(item);
    });

    // Safety Note
    if (result.floorApplied) {
      aiStatusNote.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation highlight-yellow"></i>
        <span>Residual floor reached (8% scrap value applied). Car price cannot depreciate further.</span>
      `;
    } else {
      aiStatusNote.innerHTML = `
        <i class="fa-solid fa-shield-halved"></i>
        <span>All AI heuristic constraints and market residual safety factors validated.</span>
      `;
    }

    // Dynamic AI Insights
    insightsList.innerHTML = `
      <li>
        <i class="fa-solid fa-circle-info highlight-cyan"></i>
        <span><strong>Age Analysis:</strong> At ${result.summary.age} year(s) old, the vehicle retains ~${(100 - (result.steps[1].pct * 100)).toFixed(0)}% of its core baseline shell value.</span>
      </li>
      <li>
        <i class="fa-solid fa-circle-check highlight-green"></i>
        <span><strong>Usage Health:</strong> Running an average of ${(km / Math.max(1, result.summary.age)).toFixed(0)} km/year is ${km / Math.max(1, result.summary.age) < 12000 ? "well within healthy driving limits." : "higher than standard urban usage."}</span>
      </li>
      <li>
        <i class="fa-solid fa-tag highlight-yellow"></i>
        <span><strong>Fuel & Market Match:</strong> ${fuel} configuration provides ${fuel === "Diesel" || fuel === "Electric" || fuel === "Hybrid" ? "a positive resale appreciation boost." : "standard market liquidity."}</span>
      </li>
    `;
  }

  // --------------------------------------------------------------------------
  // Event Listeners for Interactive Controls
  // --------------------------------------------------------------------------

  // Sliders
  yearSlider.addEventListener("input", () => {
    updateYearUI();
    updateValuation();
  });

  kmSlider.addEventListener("input", () => {
    updateKmUI();
    updateValuation();
  });

  // Inputs
  brandSelect.addEventListener("change", updateValuation);
  modelInput.addEventListener("input", updateValuation);
  customPriceInput.addEventListener("input", updateValuation);

  // Quick Mileage Chips
  quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      kmSlider.value = chip.dataset.km;
      updateKmUI();
      updateValuation();
    });
  });

  // Segmented Buttons (Fuel & Owners)
  fuelGroup.querySelectorAll(".segment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      fuelGroup.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const radio = btn.querySelector("input");
      if (radio) radio.checked = true;
      updateValuation();
    });
  });

  ownerGroup.querySelectorAll(".segment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      ownerGroup.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const radio = btn.querySelector("input");
      if (radio) radio.checked = true;
      updateValuation();
    });
  });

  // Toggle Custom Ex-showroom Price
  customPriceToggle.addEventListener("change", () => {
    if (customPriceToggle.checked) {
      customPriceContainer.classList.remove("hidden");
    } else {
      customPriceContainer.classList.add("hidden");
      customPriceInput.value = "";
    }
    updateValuation();
  });

  // Recalculate & Reset
  btnRecalculate.addEventListener("click", () => {
    btnRecalculate.classList.add("pulse");
    setTimeout(() => btnRecalculate.classList.remove("pulse"), 400);
    updateValuation();
  });

  btnReset.addEventListener("click", () => {
    loadPreset("swift");
  });

  // --------------------------------------------------------------------------
  // Presets Loader
  // --------------------------------------------------------------------------
  function loadPreset(key) {
    const data = PRESETS[key];
    if (!data) return;

    brandSelect.value = data.brand;
    modelInput.value = data.model;
    yearSlider.value = data.year;
    kmSlider.value = data.km;

    // Fuel Radio
    fuelGroup.querySelectorAll(".segment-btn").forEach(btn => {
      const radio = btn.querySelector("input");
      if (radio && radio.value === data.fuel) {
        btn.classList.add("active");
        radio.checked = true;
      } else {
        btn.classList.remove("active");
      }
    });

    // Owner Radio
    ownerGroup.querySelectorAll(".segment-btn").forEach(btn => {
      const radio = btn.querySelector("input");
      if (radio && parseInt(radio.value) === data.owners) {
        btn.classList.add("active");
        radio.checked = true;
      } else {
        btn.classList.remove("active");
      }
    });

    // Custom Price
    if (data.customPrice) {
      customPriceToggle.checked = true;
      customPriceContainer.classList.remove("hidden");
      customPriceInput.value = data.customPrice;
    } else {
      customPriceToggle.checked = false;
      customPriceContainer.classList.add("hidden");
      customPriceInput.value = "";
    }

    // Active chip highlight
    presetChips.forEach(chip => {
      if (chip.dataset.preset === key) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });

    updateYearUI();
    updateKmUI();
    updateValuation();
  }

  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      loadPreset(chip.dataset.preset);
    });
  });

  // --------------------------------------------------------------------------
  // Modal Handlers (AI Rulebook & Viva Guide)
  // --------------------------------------------------------------------------
  function openModal() {
    rulesModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    rulesModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  btnOpenRules.addEventListener("click", openModal);
  btnCloseRules.addEventListener("click", closeModal);
  btnCloseRulesBottom.addEventListener("click", closeModal);
  rulesModal.addEventListener("click", (e) => {
    if (e.target === rulesModal) closeModal();
  });

  // Print/Export
  btnPrintReport.addEventListener("click", () => {
    window.print();
  });

  // Initial Load
  updateYearUI();
  updateKmUI();
  updateValuation();
});
