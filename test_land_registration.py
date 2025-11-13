from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, random, os

# Launch Chrome
driver = webdriver.Chrome()
driver.maximize_window()

# Go to Land Registration form page
driver.get("http://localhost:5174/land-form")
wait = WebDriverWait(driver, 20)  # Increased wait time to 20 seconds

# Generate random data for testing
rand_num = random.randint(1000, 9999)
full_name = f"Sumu Tester {rand_num}"
nid = f"1112{rand_num}"
khatian = f"KH-{rand_num}"
land_area = f"{rand_num} decimals"
land_value = str(rand_num * 1000)
district = list(["Dhaka", "Chittagong", "Khulna"])[rand_num % 3]
dag_number = f"DAG{rand_num}"
ownership_type = "Individual"
previous_owner = f"Owner {rand_num}"
purchase_date = "2025-10-14"
land_use = "Agriculture"
upazila = ""  # optional
address = f"House {rand_num}, Street X"
land_type = "Residential"
mobile = f"0171{rand_num}"
email = f"sumutest{rand_num}@gmail.com"

# Fill the form
wait.until(EC.presence_of_element_located((By.NAME, "fullName"))).send_keys(full_name)
driver.find_element(By.NAME, "nid").send_keys(nid)
driver.find_element(By.NAME, "khatian").send_keys(khatian)
driver.find_element(By.NAME, "landArea").send_keys(land_area)
driver.find_element(By.NAME, "landValue").send_keys(land_value)
driver.find_element(By.NAME, "district").send_keys(district)
driver.find_element(By.NAME, "dagNumber").send_keys(dag_number)
driver.find_element(By.NAME, "ownershipType").send_keys(ownership_type)
driver.find_element(By.NAME, "previousOwner").send_keys(previous_owner)
driver.find_element(By.NAME, "purchaseDate").send_keys(purchase_date)
driver.find_element(By.NAME, "landUse").send_keys(land_use)
driver.find_element(By.NAME, "address").send_keys(address)
driver.find_element(By.NAME, "landType").send_keys(land_type)
driver.find_element(By.NAME, "mobile").send_keys(mobile)
driver.find_element(By.NAME, "email").send_keys(email)

# Optional: Upload file if exists
file_path = os.path.abspath("test_document.pdf")
try:
    file_input = driver.find_element(By.NAME, "documents")
    if os.path.exists(file_path):
        file_input.send_keys(file_path)
        print(f"✅ Uploaded file: {file_path}")
    else:
        print("⚠️ Test file not found, skipping upload")
except:
    print("⚠️ File input not found, skipping upload")

# Submit form
driver.find_element(By.XPATH, "//button[text()='Submit']").click()
print("✅ Clicked Submit")

# Wait longer for alert
time.sleep(3)  # increased from 1 to 3 seconds
try:
    alert = Alert(driver)
    print("⚠️ Alert found:", alert.text)
    alert.accept()
except:
    print("✅ No alert popup found")

# End test
time.sleep(27)  # increased from 2 to 3 seconds
driver.quit()
print("✅ Land Registration form test completed")
