from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class AdminCitizensQuestionTest(unittest.TestCase):
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

    def test_citizens_question_tab(self):
        driver = self.driver
        wait = self.wait

        # Click Citizens Question card
        question_card = wait.until(EC.element_to_be_clickable((By.XPATH, "//p[text()='Citizens Question']")))
        question_card.click()
        time.sleep(1)

        # Check if Citizen Questions section loaded
        try:
            wait.until(EC.visibility_of_element_located((By.XPATH, "//h3[text()='Citizen Questions']")))
            print("✅ Citizens Question tab loaded successfully")
        except:
            self.fail("❌ Citizens Question tab did not load correctly")

        # Verify at least one question exists (optional)
        questions = driver.find_elements(By.XPATH, "//table//tbody/tr")
        if len(questions) > 0 and questions[0].text != "No questions found":
            print(f"✅ {len(questions)} questions displayed")
            
            # Delete the first question
            delete_button = driver.find_element(By.XPATH, "(//table//tbody/tr/td/button[text()='Delete'])[1]")
            delete_button.click()
            time.sleep(1)

            # Verify deletion
            updated_questions = driver.find_elements(By.XPATH, "//table//tbody/tr")
            self.assertNotEqual(len(updated_questions), len(questions), "❌ Question was not deleted")
            print("✅ Question deleted successfully")
        else:
            print("⚠️ No questions found to delete")

    @classmethod
    def tearDownClass(cls):
        time.sleep(1)
        cls.driver.quit()
        print("✅ Citizens Question tab test completed successfully")

if __name__ == "__main__":
    unittest.main()
