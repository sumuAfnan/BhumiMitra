from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class AdminOfficerDataTabTest(unittest.TestCase):
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

    def test_officer_data_tab(self):
        driver = self.driver
        wait = self.wait

        # Click Officer Data card
        officer_card = wait.until(EC.element_to_be_clickable((By.XPATH, "//p[text()='Officer Data']")))
        officer_card.click()
        time.sleep(3)

        # Check if Officer Management section loaded
        try:
            wait.until(EC.visibility_of_element_located((By.XPATH, "//h3[text()='Officer Management']")))
            print("✅ Officer Data tab loaded successfully")
        except:
            self.fail("❌ Officer Data tab did not load correctly")

        # Add a test officer
        role_select = driver.find_element(By.XPATH, "//select")
        email_input = driver.find_element(By.XPATH, "//input[@placeholder='Email']")
        password_input = driver.find_element(By.XPATH, "//input[@placeholder='Password']")
        add_button = driver.find_element(By.XPATH, "//button[text()='Add']")

        role_select.send_keys("Land Registry Officer")
        email_input.send_keys("test_officer@example.com")
        password_input.send_keys("12345")
        add_button.click()
        time.sleep(2)  # wait for list refresh

        # Check if officer appears in table
        try:
            officer_row = driver.find_element(By.XPATH, "//td[text()='test_officer@example.com']")
            print("✅ Test officer added successfully")
        except:
            self.fail("❌ Test officer was not added")

        # Delete the test officer
        delete_button = driver.find_element(By.XPATH, "//td[text()='test_officer@example.com']/following-sibling::td/button")
        delete_button.click()
        time.sleep(3)

        # Verify deletion
        officer_rows = driver.find_elements(By.XPATH, "//td[text()='test_officer@example.com']")
        self.assertEqual(len(officer_rows), 0, "❌ Test officer was not deleted")
        print("✅ Test officer deleted successfully")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Officer Data tab test completed successfully")

if __name__ == "__main__":
    unittest.main()
