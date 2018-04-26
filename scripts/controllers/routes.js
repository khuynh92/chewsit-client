//all route changes should hide page containers
var app = app || {};

page('/*', (ctx, next) => {
 $('.container').hide();
next();
});

page('/', () => $('#home-view').fadeToggle(1500));
page('/test', () => app.restaurant.fetch(app.test.initView));


page.start();