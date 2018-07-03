# GtaChinaInternal

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

Before running `ng build --prod`, please ensure api url was configured correctly in file ./environments/environment.prod.ts

- Deploy to server (nginx)
  
  there are many different ways to deploy angular4 application to production server. 
  Basically, all you need to do just move the distributed package to your server and then you are good to go since the compiled 
  package only contains html/js/css files. (Distribution package could be created by ng build --prod --base-href=/path/to/package).
  
  But in some cases, you might want to deploy with server site engine such as nginx. 
  In this doc, a short introduction of deploying this application to nginx server was described.
   
  1. Ensure nginx have been installed.
  2. create file as _/etc/nginx/sites-available/gta-china-internal_, then place below information into the 
  file.
     
         server {
             listen 80 default_server;
             root /path/to/ist-nginx;
             index index.html index.htm;
             server_name localhost;
             location / {
                 try_files $uri $uri/ =404;
             }
         }   
  3. copy the config into sites-enabled:
  
          sudo ln /etc/nginx/sites-available/mooncake /etc/nginx/sites-enabled/mooncake
                 
  4. restart nginx with:_ 
              
          systemctrl restart nginx
      
