# GoodFlicks

##[Live Link](http://www.goodflicks.co)

A social media website for finding, sharing and reviewing all your favorite movies!

## Features

* Search for real movies from a massive third-party database.
* Create your own custom libraries to keep track of your favorite films or those movies you're just dying to see.
* Write reviews for movies and give them a zero-to-five star rating.
* Follow your friends so you can see what they're watching.
* Don't see that super obscure movie you're looking for (doubtful...)? Add your own movie to our database. Make sure to upload a poster image!

## What's Under the Hood?

* Ruby on Rails infrastructure and authentication.
* Backbone.js interface enables a dynamic single-page application.
* jQuery UI allows for draggable and sortable items.
* Custom AJAX requests made to Rails controllers and the third-party API, [The Movie DB](https://www.themoviedb.org/documentation/api).
* Does not duplicate movie models on subsequent user requests.
* Automatic cloud file storage using AWS' S3 database.
* Users search supported by [pg_search](https://github.com/Casecommons/pg_search) gem.
* Clickable, auto-updating star ratings supported by [raty](https://github.com/wbotelhos/raty) gem.
* File upload supported by [paperclip](https://github.com/thoughtbot/paperclip) gem
* RSpec tests supported by [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers) gem.
