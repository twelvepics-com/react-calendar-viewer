# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Changelogs

### [0.2.34] - 2024-12-13

* Fix contact address

### [0.2.33] - 2024-12-13

* Fix data type for translation function t

### [0.2.32] - 2024-11-30

* Adds a lock if a photo may only be opened on a certain day.

### [0.2.31] - 2024-11-30

* Add first version of photo set functionality (e.g. christmas calendar)

### [0.2.30] - 2024-04-01

* Remove location part

### [0.2.29] - 2024-03-31

* Adopt to location api version 0.1.59
* Add river length to properties
* Some jest unit test fixes

### [0.2.28] - 2024-03-16

* Adopt to location api version 0.1.58

### [0.2.27] - 2024-03-16

* Add zip code to location information

### [0.2.26] - 2024-03-11

* Add correct translation for runway

### [0.2.25] - 2024-03-11

* Add title, language, meta description changer

### [0.2.24] - 2024-03-11

* Add loader text to some current position search buttons and links
* Remove timeout

### [0.2.23] - 2024-03-11

* Add position determination modal.

### [0.2.22] - 2024-03-10

* Add translations for today's birthdays

### [0.2.21] - 2024-03-10

* Add direction request button to locations match items if user position is not known

### [0.2.20] - 2024-03-09

* Adopt location api search to version 0.1.53

### [0.2.19] - 2024-03-09

* Location text refactoring

### [0.2.18] - 2024-03-09

* Use the location search button to also renew current position or search with current position

### [0.2.17] - 2024-03-09

* Location search optimization on small devices

### [0.2.16] - 2024-03-09

* Disable compass collapsible on desktop devices

### [0.2.15] - 2024-03-09

* Add hyphen to text-30
* Add current language to html.lang
* Add compass to CollapsibleCard

### [0.2.14] - 2024-03-08

* Card Refactoring
* Add Airport details
* Add birthday modal
* Fix error handling on calendar pages
* Fix locations/countries switcher
* Add country page
* Add other links to location

### [0.2.13] - 2024-02-22

* Add next_places and Location refactoring

### [0.2.12] - 2024-02-19

* Change next places layout from table to flex
* Optimize layout for small mobile phones
* Refactoring SearchPerformance
* Color refactoring
* CSS refactoring
* Add CollapsibleCard with toggler
* Add CollapsibleCard
* Location structure refactoring

### [0.2.11] - 2024-02-19

* Add parsed feature classes

### [0.2.10] - 2024-02-19

* Add searched position

### [0.2.9] - 2024-02-19

* Add own position and position to search metrics

### [0.2.8] - 2024-02-19

* Add own position to the search form

### [0.2.7] - 2024-02-19

* Add translations to CoordinateDistanceDirection

### [0.2.6] - 2024-02-19

* Improve error output and information

### [0.2.5] - 2024-02-18

* Add calendar translation

### [0.2.4] - 2024-02-18

* Add language to location(s) search
* Add init parameter to FilterConfig getter

### [0.2.3] - 2024-02-18

* Fix language forwarding
* Add translations

### [0.2.2] - 2024-02-18

* SearchMetrics translations

### [0.2.1] - 2024-02-18

* Translate about and contact page
* Link refactoring on calendar pages

### [0.2.0] - 2024-02-18

* Add menu closer on mobile view
* Add compass callback to api call
* Add translations and activation of the Spanish and English language
  * First Spanish and English translations
  * Add language switcher
* Handle API errors
* Add next_places to own location link
* Link refactoring (no reload of the whole page anymore)
* Add new components
  * Add own Flag component
  * Add LinkV2 component (with current position search)
* Add wikipedia link to LocationCard
* Add API wrapper classes to have easy access to the API
  * Add jest unit tests
  * Add location test with current location (mock)
  * Increase jest performance
  * etc.
* Switch fully to Typescript (replace all vanilla javascript files)
  * Fix reactJS issues
  * Change index.js to index.tsx
  * Change App.js to App.tsx
  * Add missing types and fix all any types 
  * etc.
* Function refactoring
  * Move many functions to classes structure (architecture) 
* Api class refactoring
* Query refactoring
* Update npm packages
* Add wikipedia link with soft hyphens

### [0.1.20] - 2024-01-26

* Add pager

### [0.1.19] - 2024-01-23

* Add card area to location page (refactoring)
* Add the direction to location page
* Location mobile optimisations
* Add compass functionality
* Search form refactoring
* Add current position search button
* Add next places sort information
* Detect location or locations search according to given query (geoname id, coordinate search or other)
* HTML refactoring
* Add elevation and population to next places
* Add timezone to location page
* Add new configuration files
  * Add API types
  * Add types as separated file
* Adopt to location api 0.1.38
  * Read results from locations endpoint requests
* Add the first version of typescript
  * Migrate first files from js to typescript
  * etc.

### [0.1.18] - 2024-01-20

* Add user and location distance
* Component and function refactoring
* Location search refactoring
* Bind search API to search form
* API search refactoring
* Add location api version 0.1.34

### [0.1.17] - 2024-01-07

* Preparing the app for the Location API
* Customize the design of the About page

### [0.1.16] - 2023-12-29

* Format list elements - v2

### [0.1.15] - 2023-12-29

* Format list elements

### [0.1.14] - 2023-12-29

* Add favicons
* Remove react logo

### [0.1.13] - 2023-12-29

* Add docker compose setup
* Add CHANGELOG links to About page
* Add Twelvepics API to calendar page

### [0.1.12] - 2023-12-29

* Use raw api response from version request

### [0.1.11] - 2023-12-29

* Adapt to the new api structure from api version 0.1.19
* Add semver checker

### [0.1.10] - 2023-12-29

* Adjustments for the birthday and holiday version.

### [0.1.9] - 2023-12-23

* Add chapter what you see
* Add justify text
* Add line break to description

### [0.1.8] - 2023-12-23

* Add more mobile padding right and left
* Loader vs error refactoring
* Add ratio to images
* Add link to images
* Add fonts to react instead of loading from Google, etc.; Add Font Awesome to npm package, etc.
* Fix font path to fontello font
* Add image loader; Add header image to contain

### [0.1.7] - 2023-12-22

* Bootstrap layout refactoring
* Add the version to package.json
* The calendars and calendar view refactoring
* Add short title to the main page

### [0.1.6] - 2023-12-21

* Check existing holidays and birthdays before rendering; Calendar page refactoring

### [0.1.5] - 2023-12-21

* Add birthdays and holidays to calendar and image view

### [0.1.4] - 2023-12-18

* Adopt things to new api structure (image instead of title_image, calendar path without all

### [0.1.3] - 2023-12-18

* Change calendars to pages on calendar page
* Add bootstrap to npm packages
  * Remove cdn include
* Calendars page refactoring
* Fix api link on about page
* Fix image width on mobile devices
* Disable social links in footer

### [0.1.2] - 2023-12-17

* Fix image redirect

### [0.1.1] - 2023-12-17

* Add sass preprocessor

### [0.1.0] - 2023-12-17

* Initialize project using Create React App
* First changes; Add calendar overview; calendar page, about and contact page and more

## Add new version

```bash
# → Either change patch version
$ vendor/bin/version-manager --patch

# → Or change minor version
$ vendor/bin/version-manager --minor

# → Or change major version
$ vendor/bin/version-manager --major

# → Usually version changes are set in the main or master branch
$ git checkout master && git pull

# → Edit your CHANGELOG.md file
$ vi CHANGELOG.md

# → Commit your changes to your repo
$ git add CHANGELOG.md VERSION .env && git commit -m "Add version $(cat VERSION)" && git push

# → Tag your version
$ git tag -a "$(cat VERSION)" -m "Version $(cat VERSION)" && git push origin "$(cat VERSION)"
```
