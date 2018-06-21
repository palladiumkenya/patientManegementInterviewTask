# patientManegementInterviewTask



###Minimum Requeirements 
* php >=5.6.4

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
* type `php artisan migrate --seed` to create and populate tables
* edit *.env* for emails configuration

### Included packages ###

* [xethron/migrations-generator] for Automatically generating migrations from an existing database schema.
* [jrean/laravel-user-verification] to handle a user verification and validate the e-mail
* [reliese/laravel] Laravel Components for models generation 
* [AdminLTE](https://adminlte.io/themes/AdminLTE/index2.html) the great admin template

### Features ###


* Authentication (registration, login, logout, password reset, mail confirmation, throttle)
* Blog with nested comments
* Admin dashboard with users,  settings
* Multi users medias gestion
* Localization (English, French and Chinese)

### Tricks ###

To use application the database is seeding with users :

* Administrator : email = admin@admin.com, password = admin
* Department User : email = depart@depart.com, password = depart


### License ###

This example for Laravel is open-sourced software licensed under the MIT license