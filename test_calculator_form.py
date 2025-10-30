from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import unittest

class CalculatorFormTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 15)

    def test_calculator_form(self):
        driver = self.driver
        wait = self.wait

        driver.get("http://localhost:5176/RegistryOfficer")
        print("\n🌐 Opened Registry Officer Portal page")

        # Wait for table and get first application ID
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        rows = driver.find_elements(By.XPATH, "//tbody/tr")
        assert len(rows) > 0, "No application rows found"
        first_app_id = rows[0].find_element(By.XPATH, "./td[1]").text
        print(f"✅ First Application ID: {first_app_id}")

        # Enter Application ID in Calculator Form
        calc_input = driver.find_element(By.ID, "calcAppId")
        calc_input.send_keys(first_app_id)
        time.sleep(2)  # wait for auto calculation

        # Check Stamp Duty, VAT, and Total Fee
        stamp_duty = driver.find_element(By.ID, "stampDuty").get_attribute("value")
        vat = driver.find_element(By.ID, "vat").get_attribute("value")
        total_fee = driver.find_element(By.ID, "totalFee").get_attribute("value")

        print(f"📄 Stamp Duty: {stamp_duty}")
        print(f"📄 VAT: {vat}")
        print(f"📄 Total Registration Fee: {total_fee}")

        assert stamp_duty != "", "Stamp Duty not calculated"
        assert vat != "", "VAT not calculated"
        assert total_fee != "", "Total Fee not calculated"

        # Check Send button state
        send_btn = driver.find_element(By.XPATH, "//button[text()='Send']")
        is_enabled = send_btn.is_enabled()
        print(f"✅ Send button enabled: {is_enabled}")

        # If fee is already sent, check warning message
        already_msg = driver.find_elements(By.XPATH, "//p[contains(text(),'Already amount sent')]")
        if already_msg:
            print(f"⚠ Already sent message displayed: {already_msg[0].text}")
        else:
            print("✅ No 'Already amount sent' message")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        print("✅ Browser closed and test finished")

if __name__ == "__main__":
    unittest.main()
