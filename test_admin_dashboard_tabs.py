from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time
import unittest

class AdminDashboardTabTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(service=Service())  # Ensure ChromeDriver in PATH
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 20)

        # Go to Admin Login page
        cls.driver.get("http://localhost:5176/loginAdmin")

        # Admin credentials
        cls.username = "Sumu"
        cls.email = "samm181075@gmail.com"
        cls.password = "12345"

        # Login
        cls.wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(cls.username)
        cls.driver.find_element(By.NAME, "email").send_keys(cls.email)
        cls.driver.find_element(By.NAME, "password").send_keys(cls.password)
        cls.driver.find_element(By.XPATH, "//button[text()='Login']").click()

        # Wait for dashboard heading
        cls.wait.until(EC.visibility_of_element_located((By.XPATH, "//h2[text()='Dashboard']")))

    def test_dashboard_tabs(self):
        driver = self.driver
        wait = self.wait

        # Use div[contains(., 'Card Text')] to target the card clickable div
        cards = {
            "userData": "//div[contains(., 'User Data')]",
            "officerData": "//div[contains(., 'Officer Data')]",
            "ownershipInfo": "//div[contains(., 'Ownership Info')]",
            "citizensQuestion": "//div[contains(., 'Citizens Question')]"
        }

        # Corresponding tab headings
        tabs = {
            "userData": "//h3[text()='User Data Management']",
            "officerData": "//h3[text()='Officer Management']",
            "ownershipInfo": "//h3[text()='Ownership Info Management']",
            "citizensQuestion": "//h3[text()='Citizen Questions']"
        }

        for key, card_xpath in cards.items():
            try:
                # Wait for the card div to be clickable and click
                card = wait.until(EC.element_to_be_clickable((By.XPATH, card_xpath)))
                card.click()

                # Wait until the correct tab heading is visible
                wait.until(EC.visibility_of_element_located((By.XPATH, tabs[key])))
                print(f"✅ {key} tab loaded successfully")

            except Exception as e:
                self.fail(f"❌ {key} tab did not load correctly: {e}")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Admin Dashboard tab tests completed successfully")


if __name__ == "__main__":
    unittest.main()
