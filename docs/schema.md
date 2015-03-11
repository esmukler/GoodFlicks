# Schema Information

## users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
username    | string    | not null, unique
pwd_digest  | string    | not null, unique

## movies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
year        | integer   |
director    | string    |
description | text      |
poster_img  | string    |

## libraries
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
movie_id    | integer   | not null, foreign key (references movies)
num_stars   | integer   |
body        | text      |
is_public   | boolean   | not null, default: true

## library_movies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
library_id  | integer   | not null, foreign key (references libs.)
movie_id    | integer   | not null, foreign key (references movies)


## friendships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
requester_id| integer   | not null, foreign key (references users)
requested_id| integer   | not null, foreign key (references users)
is_pending  | boolean   | not null
