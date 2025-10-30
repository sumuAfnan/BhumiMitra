from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import unittest

class ApplicationVerificationFormTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 15)

    def test_verification_form(self):
        driver = self.driver
        wait = self.wait

        driver.get("http://localhost:5176/RegistryOfficer")
        print("\n🌐 Opened Registry Officer Portal page")

        # Wait for Applications Table to load
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        rows = driver.find_elements(By.XPATH, "//tbody/tr")
        assert len(rows) > 0, "No application rows found"
        first_app_id = rows[0].find_element(By.XPATH, "./td[1]").text
        print(f"✅ First Application ID: {first_app_id}")

        # Enter Application ID in Verification Form
        verify_input = driver.find_element(By.ID, "verifyAppId")
        verify_input.send_keys(first_app_id)
        time.sleep(2)  # wait for auto-fill

        # Check auto-filled Name and NID
        name_input = driver.find_element(By.ID, "verifyName")
        nid_input = driver.find_element(By.ID, "verifyNID")
        print(f"📄 Auto-filled Name: {name_input.get_attribute('value')}")
        print(f"📄 Auto-filled NID: {nid_input.get_attribute('value')}")

        assert name_input.get_attribute("value") != "", "Name field not auto-filled"
        assert nid_input.get_attribute("value") != "", "NID field not auto-filled"

        # Check Approve button state
        approve_btn = driver.find_element(By.XPATH, "//button[text()='Approve']")
        is_enabled = approve_btn.is_enabled()
        print(f"✅ Approve button enabled: {is_enabled}")

        # Check Already Approved message
        already_msg = driver.find_elements(By.XPATH, "//p[contains(text(),'Already approved')]")
        if already_msg:
            print(f"⚠ Already approved message displayed: {already_msg[0].text}")
        else:
            print("✅ No 'Already approved' message")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        print("✅ Browser closed and test finished")

if __name__ == "__main__":
    unittest.main()
