"""
================================================================================
                    CAR PRICE PREDICTOR USING RULE-BASED AI
================================================================================
Author: College Python Lab Project
Domain: Artificial Intelligence (Rule-Based Expert System / Heuristic Algorithm)
Description:
    Predicts the approximate resale market price of a used car based on
    expert-defined heuristics, market depreciation curves, and condition
    factors without needing complex machine learning training datasets.
================================================================================
"""

import sys
import datetime

# Ensure safe UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


# ==============================================================================
# AI KNOWLEDGE BASE (Rules and Market Benchmarks)
# ==============================================================================
# In Rule-Based AI, the "Knowledge Base" contains domain knowledge and benchmark
# prices gathered from domain experts or historical market averages.

BRAND_TIER_BASE_PRICES = {
    # Economy / Mass Market Brands
    "MARUTI SUZUKI": 650000,
    "MARUTI": 650000,
    "HYUNDAI": 750000,
    "TATA": 800000,
    "RENAULT": 600000,
    "NISSAN": 650000,
    
    # Mid-Range / Premium Segment
    "HONDA": 950000,
    "TOYOTA": 1200000,
    "MAHINDRA": 1100000,
    "VOLKSWAGEN": 1000000,
    "SKODA": 1050000,
    "KIA": 1000000,
    "MG": 1200000,
    "FORD": 750000,
    
    # Luxury Segment
    "BMW": 3500000,
    "MERCEDES-BENZ": 3800000,
    "MERCEDES": 3800000,
    "AUDI": 3400000,
    "VOLVO": 3200000,
    "JAGUAR": 4000000,
}

DEFAULT_BASE_PRICE = 700000  # Default benchmark for any other unspecified brand

CURRENT_YEAR = datetime.date.today().year


# ==============================================================================
# AI INFERENCE ENGINE (Rule-Based Decision Logic)
# ==============================================================================
# The "Inference Engine" applies IF-THEN heuristic rules on user inputs to
# calculate the price step-by-step.

def get_base_price(brand: str, model: str, custom_base_price: float = None) -> tuple:
    """
    AI Rule 1: Determine Base Market Price from Brand Knowledge Base.
    """
    clean_brand = brand.strip().upper()
    if custom_base_price and custom_base_price > 0:
        return custom_base_price, f"User-specified original ex-showroom price: Rs. {custom_base_price:,.2f}"
    
    if clean_brand in BRAND_TIER_BASE_PRICES:
        base_val = BRAND_TIER_BASE_PRICES[clean_brand]
        explanation = f"Matched knowledge base benchmark for '{clean_brand.title()}': Rs. {base_val:,.2f}"
        return base_val, explanation
    else:
        explanation = f"Brand '{brand.title()}' not in standard tier index. Applied default benchmark: Rs. {DEFAULT_BASE_PRICE:,.2f}"
        return DEFAULT_BASE_PRICE, explanation


def calculate_age_depreciation(base_price: float, manufacturing_year: int) -> tuple:
    """
    AI Rule 2: Heuristic Age Depreciation.
    - Year 1: ~15% depreciation (initial registration + showroom exit)
    - Years 2 to 5: ~8% per year
    - Years 6 to 10: ~5% per year
    - Years 10+: ~3% per year
    - Max age depreciation capped at 80% to retain core residual asset value.
    """
    age = max(0, CURRENT_YEAR - manufacturing_year)
    
    if age == 0:
        depreciation_pct = 0.05  # Brand new car within same year
    elif age == 1:
        depreciation_pct = 0.15
    elif 2 <= age <= 5:
        depreciation_pct = 0.15 + (age - 1) * 0.08
    elif 6 <= age <= 10:
        depreciation_pct = 0.15 + (4 * 0.08) + (age - 5) * 0.05
    else:
        depreciation_pct = 0.15 + (4 * 0.08) + (5 * 0.05) + (age - 10) * 0.03

    depreciation_pct = min(0.80, depreciation_pct)
    depreciation_amount = base_price * depreciation_pct
    
    explanation = (f"Vehicle age is {age} year(s). Applied {depreciation_pct * 100:.1f}% age "
                   f"depreciation (-Rs. {depreciation_amount:,.2f}).")
    return depreciation_amount, depreciation_pct, explanation


def calculate_mileage_depreciation(base_price: float, km_driven: float) -> tuple:
    """
    AI Rule 3: Heuristic Mileage/Odometer Wear Depreciation.
    - 0 to 20,000 km: Minimal wear (2%)
    - 20,001 to 50,000 km: Moderate wear (6%)
    - 50,001 to 100,000 km: Average wear (12%)
    - 100,001 to 150,000 km: High wear (20%)
    - > 150,000 km: Heavy wear (28%)
    """
    if km_driven <= 20000:
        pct = 0.02
        category = "Low mileage (< 20,000 km)"
    elif km_driven <= 50000:
        pct = 0.06
        category = "Moderate mileage (20k - 50k km)"
    elif km_driven <= 100000:
        pct = 0.12
        category = "Average mileage (50k - 100k km)"
    elif km_driven <= 150000:
        pct = 0.20
        category = "High mileage (100k - 150k km)"
    else:
        pct = 0.28
        category = "Very high mileage (> 150k km)"
        
    depreciation_amount = base_price * pct
    explanation = f"{category}: Applied {pct * 100:.1f}% mileage depreciation (-Rs. {depreciation_amount:,.2f})."
    return depreciation_amount, pct, explanation


def calculate_fuel_adjustment(current_value: float, fuel_type: str) -> tuple:
    """
    AI Rule 4: Fuel Type Market Adjustment.
    - Diesel: High torque / durability demand (+5% value retention)
    - Petrol: Standard baseline benchmark (0% change)
    - CNG: High fuel efficiency but slight engine wear / tank space (-3% adjustment)
    - Electric: Modern eco-friendly premium (+8% value adjustment)
    - Hybrid: Modern dual-fuel efficiency premium (+6% value adjustment)
    """
    fuel = fuel_type.strip().upper()
    
    if fuel == "DIESEL":
        adjustment = current_value * 0.05
        explanation = "Diesel engine: High torque & highway demand (+5% value adjustment)."
    elif fuel == "PETROL":
        adjustment = 0.0
        explanation = "Petrol engine: Standard baseline benchmark (0% adjustment)."
    elif fuel == "CNG":
        adjustment = - (current_value * 0.03)
        explanation = "CNG kit: High economy but minor engine wear discount (-3% adjustment)."
    elif fuel in ["ELECTRIC", "EV"]:
        adjustment = current_value * 0.08
        explanation = "Electric Vehicle (EV): Modern eco-friendly premium (+8% value adjustment)."
    elif fuel == "HYBRID":
        adjustment = current_value * 0.06
        explanation = "Hybrid Powertrain: Modern dual-fuel efficiency premium (+6% value adjustment)."
    else:
        adjustment = 0.0
        explanation = f"Standard fuel classification '{fuel_type}' (0% adjustment)."
        
    return adjustment, explanation


def calculate_owner_depreciation(current_value: float, owners: int) -> tuple:
    """
    AI Rule 5: Ownership History Penalty.
    - 1st Owner: Pristine single-hand maintenance (0% penalty)
    - 2nd Owner: 7% reduction
    - 3rd Owner: 15% reduction
    - 4th or more Owners: 25% heavy reduction
    """
    if owners <= 1:
        pct = 0.0
        explanation = "Single Owner (1st Hand): High market trust (0% penalty)."
    elif owners == 2:
        pct = 0.07
        explanation = "Second Owner (2nd Hand): Moderate ownership transfer discount (-7%)."
    elif owners == 3:
        pct = 0.15
        explanation = "Third Owner (3rd Hand): Higher wear & maintenance uncertainty discount (-15%)."
    else:
        pct = 0.25
        explanation = f"Multiple Owners ({owners} owners): Severe resale value reduction (-25%)."
        
    penalty_amount = current_value * pct
    return penalty_amount, explanation


# ==============================================================================
# MAIN PREDICTION PIPELINE
# ==============================================================================

def predict_car_price(brand: str, model: str, year: int, km_driven: float, 
                      fuel_type: str, owners: int, custom_base_price: float = None) -> dict:
    """
    Combines all AI rules in sequence to evaluate the final estimated car price.
    Returns a dictionary containing the final price and calculation breakdown.
    """
    # Step 1: Base Price Benchmark
    base_price, step1_desc = get_base_price(brand, model, custom_base_price)
    
    # Step 2: Age Depreciation
    age_dep, age_pct, step2_desc = calculate_age_depreciation(base_price, year)
    price_after_age = max(base_price * 0.15, base_price - age_dep)
    
    # Step 3: Mileage Depreciation
    km_dep, km_pct, step3_desc = calculate_mileage_depreciation(base_price, km_driven)
    price_after_km = max(base_price * 0.10, price_after_age - km_dep)
    
    # Step 4: Fuel Adjustment
    fuel_adj, step4_desc = calculate_fuel_adjustment(price_after_km, fuel_type)
    price_after_fuel = price_after_km + fuel_adj
    
    # Step 5: Owner History Adjustment
    owner_dep, step5_desc = calculate_owner_depreciation(price_after_fuel, owners)
    final_price = price_after_fuel - owner_dep
    
    # Final sanity checks (Car always retains a minimum residual scrap/parts value of 8% of base price)
    min_residual_value = base_price * 0.08
    if final_price < min_residual_value:
        final_price = min_residual_value
        final_note = f"Price reached floor limit. Set to minimum residual asset value (Rs. {min_residual_value:,.2f})."
    else:
        final_note = "All AI heuristic constraints and market factors evaluated successfully."
        
    return {
        "base_price": base_price,
        "final_price": round(final_price, 2),
        "steps": [
            ("1. Base Price Benchmark", step1_desc),
            ("2. Vehicle Age Depreciation", step2_desc),
            ("3. Mileage / Odometer Wear", step3_desc),
            ("4. Fuel Type Adjustment", step4_desc),
            ("5. Ownership History Factor", step5_desc),
        ],
        "final_note": final_note,
        "input_summary": {
            "Brand": brand.title(),
            "Model": model.title(),
            "Year": year,
            "Age": CURRENT_YEAR - year,
            "Kilometers": f"{km_driven:,.0f} km",
            "Fuel": fuel_type.title(),
            "Previous Owners": owners
        }
    }


# ==============================================================================
# USER INPUT HELPERS WITH VALIDATION
# ==============================================================================

def get_valid_string(prompt: str, allow_empty: bool = False) -> str:
    """Prompts user for non-empty text input."""
    while True:
        val = input(prompt).strip()
        if val or allow_empty:
            return val
        print("  [!] Error: Input cannot be blank. Please try again.")


def get_valid_int(prompt: str, min_val: int, max_val: int) -> int:
    """Prompts user for integer within a valid range."""
    while True:
        raw = input(prompt).strip()
        try:
            val = int(raw)
            if min_val <= val <= max_val:
                return val
            print(f"  [!] Error: Please enter a number between {min_val} and {max_val}.")
        except ValueError:
            print("  [!] Error: Invalid number format. Please enter an integer.")


def get_valid_float(prompt: str, min_val: float, max_val: float) -> float:
    """Prompts user for float within a valid range."""
    while True:
        raw = input(prompt).strip()
        try:
            val = float(raw)
            if min_val <= val <= max_val:
                return val
            print(f"  [!] Error: Please enter a value between {min_val:,.0f} and {max_val:,.0f}.")
        except ValueError:
            print("  [!] Error: Invalid numeric format. Please enter a valid number.")


def get_valid_fuel_type() -> str:
    """Prompts user to select a valid fuel option."""
    fuel_options = {
        "1": "Petrol",
        "2": "Diesel",
        "3": "CNG",
        "4": "Electric",
        "5": "Hybrid"
    }
    print("  Fuel Type Options:")
    for k, v in fuel_options.items():
        print(f"    [{k}] {v}")
    while True:
        choice = input("  Select Fuel Type (1-5 or name): ").strip().title()
        if choice in fuel_options:
            return fuel_options[choice]
        elif choice in fuel_options.values():
            return choice
        print("  [!] Error: Please select a valid option (1, 2, 3, 4, or 5).")


# ==============================================================================
# USER INTERFACE AND DISPLAY
# ==============================================================================

def print_banner():
    """Prints the application header banner."""
    print("\n" + "=" * 70)
    print("        AI-POWERED USED CAR PRICE PREDICTOR")
    print("         (Heuristic Rule-Based Expert System)")
    print("=" * 70)
    print("This system uses Rule-Based AI to estimate used car resale prices")
    print("based on industry depreciation heuristics without machine learning.")
    print("=" * 70 + "\n")


def display_results(result: dict):
    """Displays the predicted price and transparent step-by-step AI explanation."""
    inputs = result["input_summary"]
    
    print("\n" + "-" * 70)
    print("                    VEHICLE DETAILS SUMMARY")
    print("-" * 70)
    for key, value in inputs.items():
        print(f"  * {key:<18}: {value}")
    
    lakh_val = result['final_price'] / 100000.0
    print("\n" + "=" * 70)
    print(f"   PREDICTED SELLING PRICE: Rs. {result['final_price']:,.2f} INR")
    print(f"   (Approx. Rs. {lakh_val:.2f} Lakhs)")
    print("=" * 70)
    
    print("\nAI INFERENCE BREAKDOWN & EXPLANATION:")
    print("-" * 70)
    for step_title, step_desc in result["steps"]:
        print(f"  {step_title}")
        print(f"    -> {step_desc}\n")
    print(f"  Status Note: {result['final_note']}")
    print("-" * 70 + "\n")


def main():
    """Main execution loop for user interactions."""
    print_banner()
    
    while True:
        print("Please enter the car details below:")
        print("-" * 40)
        
        brand = get_valid_string("1. Enter Car Brand (e.g. Maruti Suzuki, Hyundai, Honda, Toyota): ")
        model = get_valid_string("2. Enter Car Model (e.g. Swift, City, Creta, Innova): ")
        
        year = get_valid_int(
            f"3. Enter Manufacturing Year (1990 to {CURRENT_YEAR}): ", 
            min_val=1990, 
            max_val=CURRENT_YEAR
        )
        
        km_driven = get_valid_float(
            "4. Enter Total Kilometers Driven (0 to 500,000 km): ", 
            min_val=0.0, 
            max_val=500000.0
        )
        
        fuel_type = get_valid_fuel_type()
        
        owners = get_valid_int(
            "5. Enter Number of Previous Owners (1 to 10): ", 
            min_val=1, 
            max_val=10
        )
        
        # Optional: Ask if user knows exact original ex-showroom price
        custom_price_choice = input(
            "\nDo you know the original ex-showroom new price? (y/N, press Enter to use AI default): "
        ).strip().lower()
        
        custom_base_price = None
        if custom_price_choice in ["y", "yes"]:
            custom_base_price = get_valid_float(
                "  Enter Original New Price in Rs. (e.g. 850000): ",
                min_val=50000.0,
                max_val=20000000.0
            )

        print("\n[AI] Running Rule-Based Inference Engine...")
        result = predict_car_price(
            brand=brand,
            model=model,
            year=year,
            km_driven=km_driven,
            fuel_type=fuel_type,
            owners=owners,
            custom_base_price=custom_base_price
        )
        
        display_results(result)
        
        # Option to predict another car
        again = input("Would you like to predict another car price? (y/N): ").strip().lower()
        if again not in ["y", "yes"]:
            print("\nThank you for using the AI Car Price Predictor! Goodbye.\n")
            break
        print("\n" + "=" * 70 + "\n")


if __name__ == "__main__":
    main()
