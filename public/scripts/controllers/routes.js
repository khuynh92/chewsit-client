//all route changes should hide page containers
var app = app || {};

page('/*', (ctx, next) => {
 $('.container').hide();
 $('.preferences-page').hide();
next();
});


page('/', app.restaurantView.initIndexView);
page('/form', app.form.init);
page('/display', app.resultsView.initDisplayResults);
page('/preferences', app.preferences.init);
page('/new', app.newUser.initView)
page('/login', app.loginView.init)
page.start();
