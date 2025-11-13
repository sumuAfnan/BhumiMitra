# Filename: test_admin_login.py

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# -----------------------------
# 🔹 Config (Change as per your admin account)
# -----------------------------
admin_username = "Sumu"
admin_email = "samm181075@gmail.com"
admin_password = "12345"
login_url = "http://localhost:5173/loginAdmin"

# -----------------------------
# 🔹 Launch Chrome Browser
# -----------------------------
driver = webdriver.Chrome()
driver.maximize_window()
driver.get(login_url)
wait = WebDriverWait(driver, 10)

# -----------------------------
# 🔹 Fill Login form
# -----------------------------
wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(admin_username)
driver.find_element(By.NAME, "email").send_keys(admin_email)
driver.find_element(By.NAME, "password").send_keys(admin_password)

# -----------------------------
# 🔹 Click Login button
# -----------------------------
driver.find_element(By.XPATH, "//button[text()='Login']").click()
print("✅ Clicked Login")

# -----------------------------
# 🔹 Wait for success message
# -----------------------------
time.sleep(1)
try:
    success_msg = wait.until(
        EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Login Successful')]"))
    )
    print("✅ Success message:", success_msg.text)
except:
    print("⚠️ Success message not found, checking redirect")

# -----------------------------
# 🔹 Check if redirected to dashboard
# -----------------------------
try:
    wait.until(EC.url_contains("/dashboard"))
    print("✅ Redirected to /dashboard successfully")
except:
    print("❌ Did not redirect to /dashboard")

# -----------------------------
# 🔹 Close browser
# -----------------------------
time.sleep(2)
driver.quit()
print("✅ Admin login test completed")
