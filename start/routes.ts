import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')

Route.group(() => {

  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')

  Route.group(() => {
    Route.get('/todo', 'TodosController.index')
    Route.post('/todo', 'TodosController.store')
    Route.patch('/todo/:id', 'TodosController.update')
  }).middleware('auth')

}).prefix('/v1/api')
