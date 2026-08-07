@seo
Feature: 🤖 SEO — Robots and Crawlers

  Scenario Outline: 🤖 Every page has the robots noindex, nofollow meta tag
    Given the user is on <page> page
    Then the page should have a meta robots tag with content "noindex, nofollow"

    Examples:
      | page            |
      | home            |
      | questions       |
      | question-themes |

  Scenario: 🤖 robots.txt blocks all crawlers
    Given the user is on home page
    Then the robots.txt file should block all crawlers
