Feature: User adds a todo

    Scenario: Add a todo
        Given user opens the list
        When user adds write a test to the list
        Then user should see write a test in the list