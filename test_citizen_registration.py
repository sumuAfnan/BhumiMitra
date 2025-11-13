
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, random

# Launch Chrome
driver = webdriver.Chrome()
driver.maximize_window()

# Step 1 — Go to registration page
driver.get("http://localhost:5173/register")
wait = WebDriverWait(driver, 10)

# Step 2️ — Prepare test data
rand_num = random.randint(1000, 9999)
full_name = f"Sumu Tester {rand_num}"
nid = "2424"  # fixed NID
email = f"sumutest{rand_num}@gmail.com"
username = f"sumu{rand_num}"
password = "12345"
mobile = f"0171{rand_num}"

# Step 3️ — Fill form fields
wait.until(EC.presence_of_element_located((By.NAME, "fullName"))).send_keys(full_name)
driver.find_element(By.NAME, "nid").send_keys(nid)
driver.find_element(By.NAME, "email").send_keys(email)
driver.find_element(By.NAME, "username").send_keys(username)
driver.find_element(By.NAME, "password").send_keys(password)
driver.find_element(By.NAME, "mobile").send_keys(mobile)

# Step 4️ — Submit form
driver.find_element(By.XPATH, "//button[text()='Register']").click()
print(" Clicked on Register button")

# Step 5️ — Handle multiple alerts (if any)
time.sleep(1)
for _ in range(2):  # Try to handle up to 2 alerts safely
    try:
        alert = Alert(driver)
        print(" Alert found:", alert.text)
        alert.accept()
        time.sleep(1)
    except:
        print(" No more alerts found")
        break

# Step 6️ — Optional wait to observe result
time.sleep(2)
print(" Registration test completed successfully")

# Step 7️ — Close browser
driver.quit()
