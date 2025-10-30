from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

class SelectedApplicationDetailsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 15)

    def test_selected_application_details(self):
        driver = self.driver
        wait = self.wait

        driver.get("http://localhost:5173/RegistryOfficer")
        print("\n🌐 Opened Registry Officer Portal page")

        # Click the first "View" button to display selectedApp
        first_view_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//tbody/tr[1]//button[contains(text(),'View')]"))
        )
        first_view_btn.click()
        print("✅ Clicked first 'View' button to display selected application details")

        # Wait for Selected Application Details section
        details_section = wait.until(
            EC.visibility_of_element_located((By.XPATH, "//h2[contains(text(),'Application Details')]/ancestor::div"))
        )
        print("✅ Selected Application Details section is visible")

        # Check each field
        fields = {
            "ID": ".//p[strong[text()='ID:']]",
            "Name": ".//p[strong[text()='Name:']]",
            "NID": ".//p[strong[text()='NID:']]",
            "Khatian": ".//p[strong[text()='Khatian:']]",
            "Land Area": ".//p[strong[text()='Land Area:']]",
            "Land Value": ".//p[strong[text()='Land Value:']]",
            "Status": ".//p[strong[text()='Status:']]"
        }

        print("\n📄 Application Details:")
        for key, xpath in fields.items():
            elem = details_section.find_element(By.XPATH, xpath)
            text = elem.text.replace(f"{key}:", "").strip()
            print(f"{key}: {text}")
            self.assertTrue(text, f"❌ {key} is empty!")

        # Check if "View Document" button exists
        try:
            view_doc_btn = details_section.find_element(By.XPATH, ".//button[contains(text(),'View Document')]")
            print("✅ 'View Document' button is present")
        except:
            print("ℹ️ No 'View Document' button found")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        print("✅ Browser closed and test finished")

if __name__ == "__main__":
    unittest.main()
