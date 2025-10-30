from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time

# -----------------------------
# Config
# -----------------------------
admin_username = "Sumu"
admin_email = "samm181075@gmail.com"
admin_password = "12345"
login_url = "http://localhost:5174/loginAdmin"
nid_input = "1234567890"

# -----------------------------
# Launch Chrome
# -----------------------------
driver = webdriver.Chrome(service=Service())  # ChromeDriver in PATH
driver.maximize_window()
driver.get(login_url)
wait = WebDriverWait(driver, 70)

# -----------------------------
# Login
# -----------------------------
wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(admin_username)
driver.find_element(By.NAME, "email").send_keys(admin_email)
driver.find_element(By.NAME, "password").send_keys(admin_password)
driver.find_element(By.XPATH, "//button[text()='Login']").click()
print("✅ Login button clicked")

# Wait for dashboard
wait.until(EC.url_contains("/dashboard"))
print("✅ Redirected to dashboard")

# -----------------------------
# Settings Tab
# -----------------------------
driver.find_element(By.XPATH, "//span[text()='Settings']").click()
print("✅ Navigated to Settings tab")

try:
    name_input = wait.until(EC.visibility_of_element_located((By.NAME, "name")))
    name_input.clear()
    name_input.send_keys("Admin Updated")
    driver.find_element(By.XPATH, "//button[text()='Save Changes']").click()
    print("✅ Updated admin name and clicked Save")
except:
    print("❌ Could not update name or click Save button")

try:
    image_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='file']")))
    image_input.send_keys(r"C:\path\to\new_image.jpg")
    driver.find_element(By.XPATH, "//button[text()='Save Image']").click()
    print("✅ Uploaded and saved new profile image")
except:
    print("⚠️ Image upload skipped or not found")

# -----------------------------
# User Data Tab
# -----------------------------
driver.find_element(By.XPATH, "//span[text()='User Data']").click()
print("✅ Navigated to User Data tab")

try:
    nid_input_element = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//input[contains(@placeholder,'NID')]"))
    )
    nid_input_element.send_keys(nid_input)
    print(f"✅ Entered NID: {nid_input}")
except:
    print("❌ NID input not found. Check placeholder text in HTML.")

# -----------------------------
# Officer Data Tab
# -----------------------------
driver.find_element(By.XPATH, "//span[text()='Officer Data']").click()
print("✅ Navigated to Officer Data tab")
time.sleep(4)

# -----------------------------
# Ownership Info Tab
# -----------------------------
driver.find_element(By.XPATH, "//span[text()='Ownership Info']").click()
print("✅ Navigated to Ownership Info tab")
time.sleep(4)

# -----------------------------
# Citizens Question Tab
# -----------------------------
driver.find_element(By.XPATH, "//span[text()='Citizens Question']").click()
print("✅ Navigated to Citizens Question tab")
time.sleep()

# -----------------------------
# Logout
# -----------------------------
try:
    driver.find_element(By.XPATH, "//button[text()='Logout']").click()
    wait.until(EC.url_contains("/loginAdmin"))
    print("✅ Clicked Logout and confirmed redirect")
except:
    print("❌ Logout button not found or redirect failed")

# -----------------------------
# Close browser
# -----------------------------
time.sleep(8)
driver.quit()
print("✅ Admin Dashboard test completed successfully 🚀")
