Feature: User saves a todo

    Scenario: Save a todo
        Given user opens the list
        When user adds save me to the list
        And user saves the list
        And user opens the list
        Then user should see save me in the list