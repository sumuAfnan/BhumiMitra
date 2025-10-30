from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class AdminSettingsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Launch Chrome
        cls.driver = webdriver.Chrome(service=Service())  # Ensure ChromeDriver is in PATH
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 20)

        # Open admin login page
        cls.driver.get("http://localhost:5176/loginAdmin")  # Update if needed

        # Admin credentials
        cls.username = "Sumu"
        cls.email = "samm181075@gmail.com"
        cls.password = "12345"

        # Login
        cls.wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(cls.username)
        cls.driver.find_element(By.NAME, "email").send_keys(cls.email)
        cls.driver.find_element(By.NAME, "password").send_keys(cls.password)
        cls.driver.find_element(By.XPATH, "//button[text()='Login']").click()

        # Wait for dashboard
        cls.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='Dashboard']")))

    def test_update_admin_credentials(self):
        driver = self.driver
        wait = self.wait

        # Click Settings tab
        settings_tab = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Settings')]"))
        )
        settings_tab.click()
        time.sleep(1)

        # Wait for form
        wait.until(EC.presence_of_element_located((By.XPATH, "//form")))

        # Locate input fields
        username_input = driver.find_element(By.XPATH, "//input[@placeholder='Username']")
        password_input = driver.find_element(By.XPATH, "//input[@placeholder='Enter new password']")
        save_button = driver.find_element(By.XPATH, "//button[text()='Save Changes']")

        # Update credentials
        username_input.clear()
        username_input.send_keys("TestAdmin")
        password_input.clear()
        password_input.send_keys("Test12345")
        save_button.click()
        time.sleep(1)  # wait for React to render success message

        # Wait for success message
        success_msg = wait.until(
            EC.visibility_of_element_located(
                (By.XPATH, "//p[contains(text(),'Admin Username and Password updated successfully')]")
            )
        )

        self.assertIn("updated successfully", success_msg.text)
        print("✅ Admin credentials updated successfully")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Settings tab test completed successfully")

if __name__ == "__main__":
    unittest.main()
