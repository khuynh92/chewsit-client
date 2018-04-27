//all route changes should hide page containers
var app = app || {};

page('/*', (ctx, next) => {
 $('.container').hide();
next();
});

page('/', app.restaurantView.initIndexView);
page('/form', () => app.restaurantView.initFormView());
page('/display', () => app.restaurant.fetch(app.restaurantView.initDisplayView));


page.start();