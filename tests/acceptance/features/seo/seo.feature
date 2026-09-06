@seo
Feature: 🤖 SEO — Robots and Crawlers

  Scenario: 🤖 Home page has the robots noindex, nofollow meta tag
    Given the user is on home page
    Then the page should have a meta robots tag with content "noindex, nofollow"

  Scenario: 🤖 Questions page has the robots noindex, nofollow meta tag
    Given the user is on questions page
    Then the page should have a meta robots tag with content "noindex, nofollow"

  Scenario: 🤖 Question-themes page has the robots noindex, nofollow meta tag
    Given the user is on question-themes page
    Then the page should have a meta robots tag with content "noindex, nofollow"

  Scenario: 🤖 robots.txt blocks all crawlers
    Given the user is on home page
    Then the robots.txt file should block all crawlers
