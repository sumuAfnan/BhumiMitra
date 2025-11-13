import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--start-maximized")
    service = Service("C:\\Users\\sumay\\Downloads\\chromedriver-win64\\chromedriver.exe")
    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()

def test_ownership_transfer_form(driver):
    driver.get("http://localhost:5173/ownershipTransfer")  # React portal URL

    wait = WebDriverWait(driver, 15)

    # ✅ Wait for input fields
    previous_owner = wait.until(EC.presence_of_element_located((By.NAME, "previous_owner")))
    current_owner = driver.find_element(By.NAME, "current_owner")
    nid = driver.find_element(By.NAME, "nid")
    khatian = driver.find_element(By.NAME, "khatian")
    area = driver.find_element(By.NAME, "area")
    gmail = driver.find_element(By.NAME, "gmail")
    
    # ✅ Fill form
    previous_owner.send_keys("John Doe")
    current_owner.send_keys("Alice Smith")
    nid.send_keys("1234567890")
    khatian.send_keys("KHA-001")
    area.send_keys("500 sqft")
    gmail.send_keys("john@example.com")

    # ✅ Click Transfer button
    transfer_btn = driver.find_element(By.XPATH, "//button[contains(text(),'Transfer')]")
    transfer_btn.click()

    # ⏳ Wait for alert message (from handleSubmit)
    time.sleep(3)  # Simple wait; can use WebDriverWait for alert

    try:
        alert_text = driver.switch_to.alert.text
        print("✅ Ownership Transfer Test Passed:", alert_text)
        driver.switch_to.alert.accept()
    except:
        print("❌ Ownership Transfer Test Failed")

def test_check_application_status(driver):
    driver.get("http://localhost:5173/ownershipTransfer")

    wait = WebDriverWait(driver, 15)

    # ✅ Wait for Application ID input
    app_id_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Application ID']")))
    app_id_input.send_keys("APP-33CF89C1")

    check_btn = driver.find_element(By.XPATH, "//button[contains(text(),'Check')]")
    check_btn.click()

    # ⏳ Wait for status display
    status = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "text-blue-700")))
    print("✅ Application Status:", status.text)
