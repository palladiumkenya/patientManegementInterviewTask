# patientManegementInterviewTask


### Installation ###

* type `https://github.com/sirBobz/patientManegementInterviewTask.git patientManegement` to clone the repository 
* type `patientManegement`
* type `composer install`
* type `composer update`
* copy *.env.example* to *.env*
* type `php artisan key:generate`to generate secure key in *.env* file
* if you use MySQL in *.env* file :
   * set DB_CONNECTION
   * set DB_DATABASE
   * set DB_USERNAME
   * set DB_PASSWORD
* if you use sqlite :
   * type `touch database/database.sqlite` to create the file
* type `php artisan migrate --seed` to create and populate tables
* edit *.env* for emails configuration

### Include ###

* [Styleshout](https://www.styleshout.com/) for front template
* [CKEditor](http://ckeditor.com) the great editor
* [Elfinder](https://github.com/Studio-42/elFinder) the nice file manager
* [Sweat Alert](http://t4t5.github.io/sweetalert/) for the cool alerts
* [AdminLTE](https://adminlte.io/themes/AdminLTE/index2.html) the great admin template
* [Gravatar](https://github.com/creativeorange/gravatar) the Gravatar package
* [Intervention Image](http://image.intervention.io/) for image manipulation
* [Email confirmation](https://github.com/bestmomo/laravel-email-confirmation) the package for email confirmation
* [Artisan language](https://github.com/bestmomo/laravel-artisan-language) the package for language strings management
* [Laravel debugbar](https://github.com/barryvdh/laravel-debugbar)
* [Etrepat baum](https://github.com/etrepat/baum) for comments management

### Features ###

* Home page
* Custom error pages 403, 404 and 503
* Authentication (registration, login, logout, password reset, mail confirmation, throttle)
* Users roles : administrator (all access), redactor (create and edit post, upload and use medias in personnal directory), and user (create comment in blog)
* Blog with nested comments
* Search in posts
* Tags on posts
* Contact us page
* Admin dashboard with users, posts, articles, medias, settings, notifications and comments
* Multi users medias gestion
* Localization (English, French and Chinese)
* Application tests
* Thumbs creation for images
* Notifications to send emails and notify redactors for new comments

### Tricks ###

To use application the database is seeding with users :

* Administrator : email = admin@admin.com, password = admin
* Department User : email = depart@depart.com, password = depart


### License ###

This example for Laravel is open-sourced software licensed under the MIT license