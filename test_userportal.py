from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.maximize_window()
driver.get("http://localhost:5176/loginCitizen")
wait = WebDriverWait(driver, 10)

# Input fields
username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
password = wait.until(EC.presence_of_element_located((By.NAME, "password")))

# Fill data
username.send_keys("Sumu")
email.send_keys("samm181075@gmail.com")
password.send_keys("12345")

# Click Login
driver.find_element(By.XPATH, "//button[text()='Login']").click()

# Handle alert if any
time.sleep(1)
try:
    alert = Alert(driver)
    print("⚠️ Alert found:", alert.text)
    alert.accept()
except:
    print("No alert present")

# Wait for dashboard safely
time.sleep(2)
try:
    dashboard = driver.find_element(By.CLASS_NAME, "grid")
    cards = dashboard.find_elements(By.XPATH, ".//div[contains(@class,'shadow-lg')]")
    if cards:
        print(f" Found {len(cards)} service cards")
        for card in cards:
            print("-", card.text.strip())
    else:
        print(" No service cards found")
except:
    print(" Dashboard/service cards not found")

# Logout button
# Click Logout button
try:
    logout_button = driver.find_element(By.XPATH, "//button[text()='Log out']")
    print("✅ Logout button found")
    logout_button.click()

    # Wait for confirmation button safely
    confirm_button = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Yes, Log Out']"))
    )
    confirm_button.click()
    print(" Logout confirmed")
except:
    print(" Logout button or confirmation not found")


time.sleep(2)
driver.quit()
