//all route changes should hide page containers
var app = app || {};

page('/*', (ctx, next) => {
 $('.container').hide();
 $('.preferences-page').hide();
next();
});

<<<<<<< HEAD
page('/', app.restaurantView.initIndexView);
page('/form', () => app.restaurantView.initFormView());
page('/display', () => app.restaurant.fetch(app.restaurantView.initDisplayView));


page.start();
=======
page('/', () => $('#home-view').fadeToggle(1500));
page('/display', () => app.restaurant.fetch(app.test.initView));
page('/test', () => app.form.init());
page('/preferences', () => app.preferences.initView());
page.start();
>>>>>>> 4f2b884f00305a1ce0e0cb1b5ee51cc8daeec888
