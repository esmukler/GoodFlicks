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
description | text      |
poster_img  | string    |

## libraries
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null

## movie_adds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
library_id  | integer   | not null, foreign key (references libraries)
movie_id    | integer   | not null, foreign key (references movies)
num_stars   | integer   |
review      | text      |
is_public   | boolean   | not null


## friendships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
requester_id| integer   | not null, foreign key (references users)
requested_id| integer   | not null, foreign key (references users)
is_pending  | boolean   | not null
