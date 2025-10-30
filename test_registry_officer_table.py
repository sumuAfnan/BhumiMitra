from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import unittest

class RegistryOfficerTableTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 15)

    def test_applications_table(self):
        driver = self.driver
        wait = self.wait

        driver.get("http://localhost:5173/RegistryOfficer")
        print("\n🌐 Opened Registry Officer Portal page")

        # Wait for Applications Table
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        print("✅ Applications Table loaded successfully")

        # Verify headers
        headers = [h.text for h in driver.find_elements(By.XPATH, "//th")]
        expected_headers = ["Application ID", "Name", "NID", "Status", "View"]
        assert headers == expected_headers, f"Headers mismatch: {headers}"
        print(f"✅ All column headers found: {headers}")

        # Wait for at least one row
        rows = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//tbody/tr")))
        print(f"✅ {len(rows)} application rows loaded")

        # ✅ Scroll to first "View" button and click
        first_view_btn = rows[0].find_element(By.XPATH, ".//button[contains(text(),'View')]")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", first_view_btn)
        time.sleep(5)
        first_view_btn.click()
        print("✅ Clicked first View button successfully")

        # Wait for Application Details section
        wait.until(EC.visibility_of_element_located((By.XPATH, "//h2[contains(text(),'Application Details')]")))
        print("✅ Application Details displayed after clicking View")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        print("✅ Browser closed and test finished")

if __name__ == "__main__":
    unittest.main()
