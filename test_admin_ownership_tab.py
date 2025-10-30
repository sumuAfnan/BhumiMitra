from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class AdminOwnershipTabTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Launch Chrome
        cls.driver = webdriver.Chrome(service=Service())  # Ensure ChromeDriver is in PATH
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 20)
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

    def test_ownership_tab(self):
        driver = self.driver
        wait = self.wait

        # Click Ownership Info card
        ownership_card = wait.until(EC.element_to_be_clickable((By.XPATH, "//p[text()='Ownership Info']")))
        ownership_card.click()
        time.sleep(1)

        # Check if Ownership Info Management section loaded
        try:
            wait.until(EC.visibility_of_element_located((By.XPATH, "//h3[text()='Ownership Info Management']")))
            print("✅ Ownership Info tab loaded successfully")
        except:
            self.fail("❌ Ownership Info tab did not load correctly")

        # Add a test ownership record
        prev_owner = driver.find_element(By.XPATH, "//input[@placeholder='Previous Owner']")
        curr_owner = driver.find_element(By.XPATH, "//input[@placeholder='Current Owner']")
        area_input = driver.find_element(By.XPATH, "//input[@placeholder='Area (in acres)']")
        khatian_input = driver.find_element(By.XPATH, "//input[@placeholder='Khatian Number']")
        add_button = driver.find_element(By.XPATH, "//button[text()='Add']")

        prev_owner.send_keys("John Doe")
        curr_owner.send_keys("Jane Doe")
        area_input.send_keys("2.5")
        khatian_input.send_keys("KHT123")
        add_button.click()
        time.sleep(2)  # wait for table refresh

        # Verify record appears in table
        try:
            record_row = driver.find_element(By.XPATH, "//td[text()='KHT123']")
            print("✅ Test ownership record added successfully")
        except:
            self.fail("❌ Test ownership record was not added")

        # SEARCH TEST - Previous Owner
        search_input = driver.find_element(By.XPATH, "//input[@placeholder='Search by Owner or Khatian']")
        search_input.clear()
        search_input.send_keys("John Doe")
        time.sleep(1)
        search_result_prev = driver.find_elements(By.XPATH, "//td[text()='John Doe']")
        self.assertGreater(len(search_result_prev), 0, "❌ Search by Previous Owner failed")
        print("✅ Search by Previous Owner works")

        # SEARCH TEST - Current Owner
        search_input.clear()
        search_input.send_keys("Jane Doe")
        time.sleep(1)
        search_result_curr = driver.find_elements(By.XPATH, "//td[text()='Jane Doe']")
        self.assertGreater(len(search_result_curr), 0, "❌ Search by Current Owner failed")
        print("✅ Search by Current Owner works")

        # SEARCH TEST - Khatian Number
        search_input.clear()
        search_input.send_keys("KHT123")
        time.sleep(1)
        search_result_kht = driver.find_elements(By.XPATH, "//td[text()='KHT123']")
        self.assertGreater(len(search_result_kht), 0, "❌ Search by Khatian failed")
        print("✅ Search by Khatian works")

        # Delete the test record
        delete_button = driver.find_element(By.XPATH, "//td[text()='KHT123']/following-sibling::td/button")
        delete_button.click()
        time.sleep(2)

        # Verify deletion
        rows = driver.find_elements(By.XPATH, "//td[text()='KHT123']")
        self.assertEqual(len(rows), 0, "❌ Test ownership record was not deleted")
        print("✅ Test ownership record deleted successfully")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Ownership Info tab test completed successfully")

if __name__ == "__main__":
    unittest.main()
