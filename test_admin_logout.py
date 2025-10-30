from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class AdminLogoutTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Initialize Chrome driver
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

        # Wait for dashboard to appear
        cls.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='Dashboard']")))
        time.sleep(1)  # ensure sidebar loaded

    def test_logout_flow(self):
        driver = self.driver
        wait = self.wait

        # Click Logout tab in sidebar
        logout_tab = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//div[contains(text(),'Logout')] | //h2[contains(text(),'Logout')]"))
        )
        logout_tab.click()
        time.sleep(0.5)

        # Wait for Logout content
        wait.until(EC.visibility_of_element_located((By.XPATH, "//h2[text()='Log Out']")))
        print("✅ Logout content displayed")

        # Click "Yes, Log Out"
        yes_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Yes, Log Out')]"))
        )
        yes_button.click()

        # Verify redirect to login page
        wait.until(EC.presence_of_element_located((By.XPATH, "//button[text()='Login']")))
        print("✅ Logout successful, redirected to login page")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Admin Logout test finished")

if __name__ == "__main__":
    unittest.main()
