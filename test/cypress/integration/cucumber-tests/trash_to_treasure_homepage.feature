Feature:  Trash to Treasure Homepage

              I want to test
        @test
        Scenario: Verify title is displayed properly
            Given I go to trashtotreasure homepage
             Then I should see page title as "T2T"
              
        @test
        Scenario Outline: Verify Navbar displays Trash To Treasure
            Given I go to trashtotreasure homepage
             Then navbar should display "<message>"

        Examples:
                  | message           |
                  | Trash to Treasure |
