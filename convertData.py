import csv
import json

# List of unique dealership locations
locations = [
    "Agra", "Ahmedabad", "Allahabad", "Ambala Cantt", "Amritsar", "Aurangabad", "Bangalore", "Bhopal",
    "Bhubaneswar", "Bulandshahar", "Chandigarh", "Chennai", "Coimbatore", "Dak. Kannada", "Dehradun", "Delhi",
    "Deoghar", "Dharwad", "Ernakulam", "Faizabad", "Faridabad", "Ghaziabad", "Goa", "Gorakhpur", "Gurgaon",
    "Guwahati", "Haldwani", "Hyderabad", "Indore", "Jaipur", "Jalandhar", "Jamshedpur", "Kanpur", "Karnal",
    "Kharar", "Kheda", "Kolkata", "Kollam", "Kota", "Lucknow", "Ludhiana", "Mangalore", "Meerut", "Mirzapur",
    "Mohali", "Mumbai", "Muzaffurpur", "Mysore", "Nagpur", "Nashik", "Navi Mumbai", "Noida", "Panchkula",
    "Panvel", "Patna", "Pimpri-Chinchwad", "Pune", "Purnea", "Raipur", "Ranchi", "Ranga Reddy", "Rohtak",
    "Roorkee", "Rudrapur", "Salem", "Samastipur", "Siliguri", "Surat", "Thane", "Udupi", "Unnao", "Vadodara",
    "Valsad", "Varanasi", "Warangal", "Yamunanagar", "Zirakpur"
]

# Generate dealerships with IDs
dealerships = [
    {"dealer_id": idx + 1, "location": loc, "name": f"{loc} Auto Sales", "inventory": []}
    for idx, loc in enumerate(locations)
]

# Track unique car IDs
car_id_counter = 1

def get_dealer_id(location):
    for dealer in dealerships:
        if dealer["location"] == location:
            return dealer["dealer_id"]
    return None

def transform_car_data(car):
    global car_id_counter
    dealer_id = get_dealer_id(car["Location"])
    transformed_car = {
        "car_id": car_id_counter,
        "make": car["Make"],
        "model": car["Model"],
        "year": int(car["Year"]),
        "price": int(car["Price"]),
        "mileage": int(car["Kilometer"]),
        "features": {
            "fuel_type": car["Fuel Type"],
            "transmission": car["Transmission"],
            "owner": car["Owner"],
            "seller_type": car["Seller Type"],
            "engine": car["Engine"],
            "max_power": car["Max Power"],
            "max_torque": car["Max Torque"],
            "drivetrain": car["Drivetrain"],
            "dimensions": {
                "length": int(float(car["Length"])) if car["Length"].strip() else 0,
                "width": int(float(car["Width"])) if car["Width"].strip() else 0,
                "height": int(float(car["Height"])) if car["Height"].strip() else 0
            },
            "seating_capacity": int(float(car["Seating Capacity"])) if car["Seating Capacity"].strip() else 0,
            "fuel_tank_capacity": int(float(car["Fuel Tank Capacity"])) if car["Fuel Tank Capacity"].strip() else 0
        },
        "location": car["Location"],
        "color": car["Color"],
        "dealer_id": dealer_id
    }
    car_id_counter += 1
    return transformed_car

# Load data from CSV
cars_data = []
with open("cars_data.csv", "r", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        car = transform_car_data(row)
        cars_data.append(car)
        if car["dealer_id"]:
            for dealer in dealerships:
                if dealer["dealer_id"] == car["dealer_id"]:
                    dealer["inventory"].append(car["car_id"])
                    break

# Save transformed data
with open("cars_transformed.json", "w", encoding="utf-8") as json_file:
    json.dump(cars_data, json_file, indent=4)

with open("dealerships.json", "w", encoding="utf-8") as json_file:
    json.dump(dealerships, json_file, indent=4)

print("Transformation complete. Check cars_transformed.json and dealerships.json")
