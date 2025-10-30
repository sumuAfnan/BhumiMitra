from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time
import os

class AdminProfileTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(service=Service())
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 20)

        # Open login page
        cls.driver.get("http://localhost:5176/loginAdmin")

        # Login credentials
        cls.username = "Sumu"
        cls.email = "samm181075@gmail.com"
        cls.password = "12345"

        # Fill login form
        cls.wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(cls.username)
        cls.driver.find_element(By.NAME, "email").send_keys(cls.email)
        cls.driver.find_element(By.NAME, "password").send_keys(cls.password)
        cls.driver.find_element(By.XPATH, "//button[text()='Login']").click()

        # Wait until dashboard is loaded
        cls.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='Dashboard']")))
        time.sleep(1)

    def test_profile_update(self):
        driver = self.driver
        wait = self.wait

        # Navigate to Profile tab if needed
        profile_tab = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//div[contains(text(),'Profile')] | //h2[contains(text(),'Profile')]"))
        )
        profile_tab.click()
        time.sleep(1)

        # Change admin name
        name_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Admin Name']")))
        name_input.clear()
        name_input.send_keys("Sumu Updated")

        # Upload profile image (make sure image path exists)
        img_input = driver.find_element(By.XPATH, "//input[@type='file']")
        img_path = os.path.abspath("sample_profile.jpg")  # replace with your image
        img_input.send_keys(img_path)

        # Click Save Changes
        save_btn = driver.find_element(By.XPATH, "//button[contains(text(),'Save Changes')]")
        driver.execute_script("arguments[0].scrollIntoView(true);", save_btn)
        time.sleep(0.5)
        save_btn.click()

        # Verify success message
        success_msg = wait.until(EC.visibility_of_element_located((By.XPATH, "//p[contains(text(),'success')]")))
        print("✅ Profile updated:", success_msg.text)

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Admin Profile test finished")

if __name__ == "__main__":
    unittest.main()
