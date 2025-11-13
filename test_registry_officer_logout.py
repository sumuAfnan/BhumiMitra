from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import unittest

class RegistryOfficerLogoutAutoTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
     
        options = webdriver.ChromeOptions()
        cls.driver = webdriver.Chrome(options=options)
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 8)

    def test_registry_officer_logout_auto(self):
        driver = self.driver
        wait = self.wait

        #  Step 1: Open Dashboard page
        driver.get("http://localhost:5173/RegistryOfficer")
        print("\n Registry Officer Dashboard ")

        #  Step 2: Wait for Logout button (text case check)
        logout_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Log out') or contains(text(),'Logout')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", logout_btn)
        time.sleep(1)
        logout_btn.click()
        print(" Logout automatic click")

        #  Step 3: Wait for confirmation modal
        modal = wait.until(EC.visibility_of_element_located(
            (By.XPATH, "//div[contains(@class,'fixed') and .//h2[contains(text(),'Log Out')]]")
        ))
        print(" Logout Confirmation Modal see!")

        #  Step 4: Modal content verify
        title = driver.find_element(By.XPATH, "//h2").text
        msg = driver.find_element(By.XPATH, "//p[contains(text(),'Are you sure')]").text
        print(f" Modal Title: {title}")
        print(f" Modal Message: {msg}")

        #  Step 5: Auto click 'Yes, Log Out'
        yes_btn = driver.find_element(By.XPATH, "//button[contains(text(),'Yes, Log Out')]")
        driver.execute_script("arguments[0].scrollIntoView(true);", yes_btn)
        time.sleep(1)
        yes_btn.click()
        print(" 'Yes, Log Out' click done")

        #  Step 6: Verify redirect to login
        wait.until(EC.url_contains("login"))
        print(" Successfully Login page Redirect !")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print(" Browser End and Test End")

if __name__ == "__main__":
    unittest.main()
