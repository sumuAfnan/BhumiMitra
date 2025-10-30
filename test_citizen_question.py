from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import unittest
import time

class CitizenQuestionTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Initialize Chrome Driver
        cls.driver = webdriver.Chrome(service=Service())
        cls.driver.maximize_window()
        cls.wait = WebDriverWait(cls.driver, 20)

        # Open the Citizen FAQ page
        cls.driver.get("http://localhost:5176/faq")  # ✅ Adjust path if your FAQ route is different
        time.sleep(2)

    def test_submit_question(self):
        driver = self.driver
        wait = self.wait

        # ✅ Step 1: Scroll to form
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")
        time.sleep(1)

        # ✅ Step 2: Type a new question
        textarea = wait.until(
            EC.presence_of_element_located((By.XPATH, "//textarea[@placeholder='Type your question here...']"))
        )
        textarea.clear()
        textarea.send_keys("How can I update my land tax record?")

        # ✅ Step 3: Click the Submit button
        submit_button = driver.find_element(By.XPATH, "//button[contains(text(),'Submit')]")
        driver.execute_script("arguments[0].scrollIntoView(true);", submit_button)
        time.sleep(0.5)
        submit_button.click()

        # ✅ Step 4: Wait for success message
        success_msg = wait.until(
            EC.visibility_of_element_located((By.XPATH, "//*[contains(text(),'Your question has been submitted successfully!')]"))
        )
        print("✅ Question submitted successfully →", success_msg.text)

    @classmethod
    def tearDownClass(cls):
        time.sleep(2)
        cls.driver.quit()
        print("✅ Citizen question submission test completed successfully")

if __name__ == "__main__":
    unittest.main()
