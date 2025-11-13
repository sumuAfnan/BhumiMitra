import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

dashboard_url = "http://localhost:5173/dashboard"  
image_path = "C:/Users/sumay/OneDrive/Desktop/sumu.jpg" 

driver = webdriver.Chrome(service=Service())
driver.maximize_window()
wait = WebDriverWait(driver, 5)

try:
    driver.get(dashboard_url)
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='file']")))
    print("✅ Dashboard loaded")

    # ---------------- Upload Image ----------------
    profile_input = driver.find_element(By.XPATH, "//input[@type='file']")
    profile_input.send_keys(image_path)
    print(f"✅ Image path sent: {image_path}")

    # ---------------- Save Changes ----------------
    save_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Save Changes']")))
    save_button.click()
    print("✅ Save Changes clicked")

    time.sleep(2)
    print("✅ Admin image updated successfully")

finally:
    driver.quit()
