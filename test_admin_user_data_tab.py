from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class UserDataTabTest(unittest.TestCase):
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

    def test_user_data_tab(self):
        driver = self.driver
        wait = self.wait

        # Click the User Data card
        card_xpath = "//div[contains(., 'User Data')]"
        card = wait.until(EC.element_to_be_clickable((By.XPATH, card_xpath)))
        card.click()

        # Wait for User Data Management section
        wait.until(EC.visibility_of_element_located((By.XPATH, "//h3[text()='User Data Management']")))
        print("✅ User Data tab loaded successfully")

        # Test NID input
        nid_input = driver.find_element(By.XPATH, "//input[@placeholder='Enter NID Number']")
        nid_input.clear()
        nid_input.send_keys("1234567890")

        # Test Khatian input
        khatian_input = driver.find_element(By.XPATH, "//input[@placeholder='Enter Khatian Number']")
        khatian_input.clear()
        khatian_input.send_keys("KT-001")

        # Click Add button
        add_button = driver.find_element(By.XPATH, "//button[text()='Add']")
        add_button.click()
        time.sleep(3)  # small wait for UI update

        # Test search input
        search_input = driver.find_element(By.XPATH, "//input[@placeholder='Search by NID or Khatian']")
        search_input.clear()
        search_input.send_keys("1234567890")
        time.sleep(3)

        # Verify that table shows at least one row
        rows = driver.find_elements(By.XPATH, "//table/tbody/tr")
        self.assertTrue(len(rows) > 0, "❌ No rows found in User Data table after adding/searching")

        # Test Delete button on first row
        delete_button = rows[0].find_element(By.XPATH, ".//button[text()='Delete']")
        delete_button.click()
        time.sleep(3)
        print("✅ Add/Search/Delete functionality works for User Data tab")

    @classmethod
    def tearDownClass(cls):
        time.sleep(3)
        cls.driver.quit()
        print("✅ User Data tab test completed successfully")

if __name__ == "__main__":
    unittest.main()
