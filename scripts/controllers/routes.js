//all route changes should hide page containers
var app = app || {};

page('/*', (ctx, next) => {
 $('.container').hide();
next();
});

page('/', () => $('#home-view').fadeToggle(1500));
page('/display', () => app.restaurant.fetch(app.test.initView));
page('/test', () => app.form.init());

page.start();