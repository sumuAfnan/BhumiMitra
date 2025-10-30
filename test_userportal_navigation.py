from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Setup Chrome
driver = webdriver.Chrome()
driver.maximize_window()
driver.get("http://localhost:5176/loginCitizen")

wait = WebDriverWait(driver, 10)

# Step 1️⃣ — Fill login form
username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
password = wait.until(EC.presence_of_element_located((By.NAME, "password")))

username.send_keys("Sumu")
email.send_keys("samm181075@gmail.com")
password.send_keys("12345")

# Step 2️⃣ — Click Login
driver.find_element(By.XPATH, "//button[text()='Login']").click()

# Step 3️⃣ — Handle possible alert
time.sleep(1)
try:
    alert = Alert(driver)
    print("⚠️ Alert found:", alert.text)
    alert.accept()
except:
    print("✅ No alert present")

# Step 4️⃣ — Wait for user portal page load
try:
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "grid")))
    print("✅ Dashboard loaded successfully")
except:
    print("❌ Dashboard not found")

# Step 5️⃣ — Check if service cards exist
try:
    cards = driver.find_elements(By.XPATH, "//div[contains(@class,'shadow-lg')]")
    if cards:
        print(f"✅ Found {len(cards)} service cards")
        for card in cards:
            print("-", card.text.strip())
    else:
        print("❌ No service cards found")
except:
    print("❌ Could not locate cards")

# Step 6️⃣ — Click “Land Registration” card
try:
    land_card = driver.find_element(By.XPATH, "//p[text()='Land Registration']")
    land_card.click()
    print("✅ Clicked on Land Registration card")

    # Wait for redirect to /portal
    wait.until(EC.url_contains("/portal"))
    print("✅ Redirected successfully to /portal")
except Exception as e:
    print("❌ Navigation to /portal failed:", e)

# Step 7️⃣ — Close browser
time.sleep(2)
driver.quit()
