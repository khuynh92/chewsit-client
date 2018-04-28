//all route changes should hide page containers
var app = app || {};

page('/*', (ctx, next) => {
 $('.container').hide();
 $('.preferences-page').hide();
next();
});


page('/', app.restaurantView.initIndexView);
page('/form', () => app.restaurantView.initFormView());
page('/display', () => app.restaurant.fetch(app.restaurantView.initDisplayView));


page.start();

// page('/', () => $('#home-view').fadeToggle(1500));
// page('/display', () => app.restaurant.fetch(app.test.initView));
// page('/test', () => app.form.init());
// page('/preferences', () => app.preferences.initView());
// page.start();
