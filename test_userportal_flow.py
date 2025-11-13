from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

# ---------------- Chrome Setup ----------------
driver = webdriver.Chrome()
driver.maximize_window()
driver.get("http://localhost:5173/loginCitizen")
wait = WebDriverWait(driver, 20)  
actions = ActionChains(driver)

# ---------------- Login ----------------
try:
    username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
    email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
    password = wait.until(EC.presence_of_element_located((By.NAME, "password")))

    username.send_keys("Sumu")
    email.send_keys("samm181075@gmail.com")
    password.send_keys("12345")

    driver.find_element(By.XPATH, "//button[text()='Login']").click()
    print(" Login submitted")
except Exception as e:
    print(" Login failed:", e)

# ---------------- Handle alert ----------------
time.sleep(1)
try:
    alert = Alert(driver)
    print(" Alert found:", alert.text)
    alert.accept()
except:
    print(" No alert present")

# ---------------- Wait for Dashboard ----------------
time.sleep(2)
try:
    dashboard = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "grid")))
    cards = dashboard.find_elements(By.XPATH, ".//div[contains(@class,'shadow-lg')]")
    if cards:
        print(f" Found {len(cards)} service cards")
        for card in cards:
            print("-", card.text.strip())
    else:
        print(" No service cards found")
except:
    print(" Dashboard/service cards not found")

# ---------------- Land Registration Navigation ----------------
try:
    land_card = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//div[contains(@class,'shadow-lg')][.//p[contains(text(),'Land Registration')]]")
    ))
    driver.execute_script("arguments[0].scrollIntoView(true);", land_card)
    actions.move_to_element(land_card).click().perform()
    wait.until(EC.url_contains("/portal"))
    print(" Land Registration card clicked and navigated to /portal")
except Exception as e:
    print(" Land Registration navigation failed:", e)

time.sleep(1)

# ---------------- Ownership Transfer Navigation ----------------
try:
    # Navigate back to dashboard first
    driver.get("http://localhost:5173/userportal")
    time.sleep(2)  # allow dashboard to render

    ownership_card = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//div[contains(@class,'shadow-lg')][.//p[contains(text(),'Ownership Transfer')]]")
    ))
    driver.execute_script("arguments[0].scrollIntoView(true);", ownership_card)
    actions.move_to_element(ownership_card).click().perform()
    wait.until(EC.url_contains("/OwnershipPortal"))
    print(" Ownership Transfer card clicked and navigated to /OwnershipPortal")
except Exception as e:
    print(" Ownership Transfer navigation failed:", e)


time.sleep(1)

# ---------------- Logout ----------------
try:
    # Navigate back to dashboard to find logout button
    driver.get("http://localhost:5173/userportal")
    logout_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Log out']"))
    )
    logout_button.click()
    print(" Logout button clicked")

    confirm_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Yes, Log Out']"))
    )
    confirm_button.click()
    print(" Logout confirmed automatically")
except Exception as e:
    print(" Logout button or confirmation not found:", e)

# ---------------- Close Browser ----------------
time.sleep(2)
driver.quit()
print(" Browser closed. All automatic steps completed.")
