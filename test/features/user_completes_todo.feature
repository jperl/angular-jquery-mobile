Feature: User completes a todo

    Scenario: Complete a todo
        Given user opens the list
        When user adds "complete me" to the list
        And user completes "complete me"
        And user saves the list
        Then user should not see "complete me" in the list