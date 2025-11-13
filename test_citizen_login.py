from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


def test_citizen_login():
    options = Options()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-gpu")
    options.add_argument("--allow-file-access-from-files")
    options.add_argument("--disable-web-security")
    options.add_argument("--allow-running-insecure-content")

    service = Service("C:\\Users\\sumay\\Downloads\\chromedriver-win64\\chromedriver.exe")
    driver = webdriver.Chrome(service=service, options=options)

    driver.get("http://localhost:5173/loginCitizen")

    wait = WebDriverWait(driver, 15)

    username = wait.until(EC.presence_of_element_located((By.NAME, "username")))
    email = wait.until(EC.presence_of_element_located((By.NAME, "email")))
    password = wait.until(EC.presence_of_element_located((By.NAME, "password")))

    username.send_keys("Sumu")
    email.send_keys("samm181075@gmail.com")
    password.send_keys("12345")

    login_button = driver.find_element(By.XPATH, "//button[contains(text(),'Login')]")
    login_button.click()

    time.sleep(3)

    try:
        success_box = driver.find_element(By.CLASS_NAME, "text-green-700")
        print(" Login test passed:", success_box.text)
    except:
        driver.save_screenshot("citizen_login_failed.png")
        assert False, " Login test failed"

    driver.save_screenshot("citizen_login_test.png")
    driver.quit()
