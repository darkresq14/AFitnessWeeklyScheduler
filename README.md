# [AFitnessWeeklyScheduler](https://clinquant-gaufre-ad1506.netlify.app/)

Fitness Weekly Scheduler using Angular 14  
Hosted on Netlify: https://clinquant-gaufre-ad1506.netlify.app/

## Packages

Bootstrap 5  
RxJS  
Netlify-Builder Deploy

## To discuss

1. I needed to use "this.router.routeReuseStrategy.shouldReuseRoute = () => false;" in order to force reload page on params change. Otherwise all listeners on activities would get bugged.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
