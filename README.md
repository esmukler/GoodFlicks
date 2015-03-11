# GoodFlicks

[Heroku link][heroku]

[heroku]: http://goodflicks.herokuapp.com

## Minimum Viable Product
GoodFlicks is a clone of Goodreads built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create/destroy sessions (log in/log out)
- [X] Add movies to the site
- [ ] Create libraries
- [ ] Add movies to libraries
- [ ] Rate movies
- [ ] Review movies
- [ ] Search for movies
- [ ] Add movies to the site
- [ ] "Friend" other users
- [ ] See a feed of movies their friends have rated


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User-Add Movie Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create their own
movies to be stored in the database. Users will be able to visit movie show
pages.

[Details][phase-one]

### Phase 2: Creating Libraries and Adding Movies (~1 days)
I will add API routes to serve movie data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to create libraries that will show up on their own user show page. They will be able to find movies from a movie index. They will then be able to add movies to individual libraries from an individual movie's show page. The user show page will have links to all a user's libraries and all movies contained in those libraries.
[Details][phase-two]

### Phase 3: Adding movie reviews and ratings (~1 days)
I will add more features to the user/movie relationship. When users add a movie to a library they will also be prompted to give the movie a star rating (by clicking on an image of stars under the movie's poster image) and write a text review of the movie. This information will appear next to the movie in the library and on the movie's show page.

[Details][phase-three]

### Phase 4: Search for Movies by Title (~2 days)
I want users to be able to search through a database of real movies to find exactly what they're looking for. Yet, I don't want to support a full database of all the data of all the movies in the world. So, in order to support a predictive search mechanism, I plan to download a database of JUST movie titles. Users will see a search bar on the top of their screen from any page in the site. A search request entered here will render a search view page that will display a sample of results. If a user clicks on a title from this page, the app will render a new show page using the information from a third-party API key. If the user decides to add this movie to a library, the movie will be saved to the database.

[Details][phase-four]

### Phase 5: Friendships (~2 days)
I will add a database table called "friendships" that will keep track of users "friends." I will add a feed view, accessible by the user's own show page that will show the most recently rated/reviewed movies by all of the user's friends. I will add a user search page that will allow the user to look up friends by username and go to that user's show page. On that page will be a "request friendship" button. By clicking this button, a friendship model will have been created between the two users. However, a boolean "pending" attribute will be default set to "false." On the requested user's feed page, a list of pending friendships will appear next to approve and deny buttons. Upon approval, that user's movie ratings will be added to their feed. Upon denial, the friendship model in the database will be destroyed.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Add more data for each movie (actors, year, etc.)
- [ ] Hover accents for star ratings, friend-ing, etc.
- [ ] Comments on other users' profiles, reviews or ratings
- [ ] Pagination/infinite scroll
- [ ] Logo that randomly displays a tagline of a famous movie quote
- [ ] Search by actor/director
- [ ] Predictive Search in the overhead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
