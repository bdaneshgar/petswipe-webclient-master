![alt tag](/readme-assets/images/logo-orange.png)

#"Tinder for adopting pets"


This project is a web application for PetSwipe, using Express and Parse. This application will include a login flow via Facebook, and the ability to search for pets pulled and stored in the background of the app. Information regarding adoption included upon liking a pet.

This app will work in tandem with the iOS app, PetSwipe:

Pets are found using the [Petfinder API](https://www.petfinder.com/developers/api-docs), and stored in a [Parse](https://parse.com/docs) database.

##Schemas

A `pet` object contains the following:

- **id** (String) Unique object id
- **createdAt** (Date) Date created
- **photoURL** (String) URL of pet's photo
- **type** (String) 'cat,' 'dog,' 'small & furry,' etc...
- **breed** (String) Breed of pet, or name if no breed given
- **age** (String) 'Baby,' 'Young,' 'Adult,' 'Senior'
- **gender** (String) 'M,' 'F'
- **zip** (String) Five-digit number
- **city** (String) City of pet
- **location** (GeoPoint) Latitude, Longitude
- **email** (String) Contact for adoption shelter
- **description** (String) Optional description of pet

Users are authenticated via Facebook.

A `user` will contain the following:

- **id** (String) Unique object id
- **username** (String) Unique string
- **likes** (Relation<pet>) Relation of pets swiped right
- **password** (String) Hidden and hashed user's password
- **authData** (authData) Authorization data given by Facebook
- **createdAt** (Date) Date created

##Wireframe

The following is a mockup flow chart of the app specs:

![alt tag](/readme-assets/wireframe/wireframe.jpg)


This is an alternate mockup with a different login flow I'm considering where user must log in before being able to access the site. This mockup also contains swiping left or right to indicate a pass or like:

![alt tag](/readme-assets/wireframe/alt-wireframe.jpg)


##Research Topics

- (1 point) Concatenation and minification of CSS and JavaScript files
- (3 points) Use a different database and database abstraction layer
- (1 point) Use a CSS framework throughout your site, use a reasonable amoutn of customization of the framework.
- (1 point) Pre-Built Express Project Template
- (4 points) External API - Parse, Petfinder