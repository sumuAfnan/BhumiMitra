from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
import time

# ----------------------------- Configuration -----------------------------
admin_username = "Sumu"
admin_email = "samm181075@gmail.com"
admin_password = "12345"
login_url = "http://localhost:5173/loginAdmin"
nid_input = "1234597898"

# ----------------------------- Launch Chrome -----------------------------
driver = webdriver.Chrome(service=Service())
driver.maximize_window()
driver.get(login_url)
wait = WebDriverWait(driver,3)
actions = ActionChains(driver)

# ----------------------------- Login -----------------------------
try:
    wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(admin_username)
    driver.find_element(By.NAME, "email").send_keys(admin_email)
    driver.find_element(By.NAME, "password").send_keys(admin_password)
    driver.find_element(By.XPATH, "//button[text()='Login']").click()
    print("✅ Login button clicked")
except:
    print("❌ Login failed")

try:
    wait.until(EC.url_contains("/dashboard"))
    print("✅ Redirected to dashboard")
except:
    print("❌ Dashboard redirect failed")

# ----------------------------- Navigate Tabs -----------------------------
tabs = [
    ("User Data", "//span[text()='User Data']"),
    ("Officer Data", "//span[text()='Officer Data']"),
    ("Ownership Info", "//span[text()='Ownership Info']"),
    ("Citizens Question", "//span[text()='Citizens Question']")
]

for tab_name, xpath in tabs:
    try:
        tab = wait.until(EC.element_to_be_clickable((By.XPATH, xpath)))
        actions.move_to_element(tab).click().perform()
        print(f"✅ Navigated to {tab_name} tab")

        # Enter NID only in User Data tab
        if tab_name == "User Data":
            try:
                nid_input_element = wait.until(EC.visibility_of_element_located(
                    (By.XPATH, "//input[contains(@placeholder,'NID')]")
                ))
                nid_input_element.send_keys(nid_input)
                print(f"✅ Entered NID: {nid_input}")
            except:
                print("❌ NID input not found")
    except:
        print(f"❌ Could not navigate to {tab_name} tab")
    time.sleep(1)



# ----------------------------- Close Browser -----------------------------
time.sleep(1)
driver.quit()
print("✅ Admin Dashboard test completed successfully")
