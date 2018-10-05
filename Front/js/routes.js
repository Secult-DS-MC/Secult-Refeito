angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider


            .state('tabsController.noticias', {
                url: '/page2',
                views: {
                    'tab2': {
                        templateUrl: 'templates/noticias.html',
                        controller: 'noticiasCtrl'
                    }
                }
            })

            .state('tabsController.cadart', {
                url: '/page3',
                views: {
                    'tab1': {
                        templateUrl: 'templates/cadart.html',
                        controller: 'cadartCtrl'
                    }
                }
            })

            .state('usuario', {
                url: '/page7',
                templateUrl: 'templates/usuario.html',
                controller: 'usuarioCtrl'

            })

            .state('cadastrar', {
                url: '/page14',
                templateUrl: 'templates/cadastrar.html',
                controller: 'cadastrarCtrl'

            })

            .state('tabsController', {
                url: '/page1',
                templateUrl: 'templates/tabsController.html',
                abstract: true
            })

            .state('login', {
                url: '/page15',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            .state('informacoes', {
                url: '/page16',
                templateUrl: 'templates/informacoes.html',
                controller: 'informacoesCtrl'
            })

            .state('cultura', {
                url: '/page8',
                templateUrl: 'templates/cultura.html',
                controller: 'culturaCtrl'
            })

            .state('agendaCultural', {
                url: '/page9',
                templateUrl: 'templates/agendaCultural.html',
                controller: 'agendaCulturalCtrl'
            })

            .state('editais', {
                url: '/page10',
                templateUrl: 'templates/editais.html',
                controller: 'editaisCtrl'
            })

            .state('turismo', {
                url: '/page11',
                templateUrl: 'templates/turismo.html',
                controller: 'turismoCtrl'
            })

            .state('tabsController.calendRio', {
                url: '/page12',
                views: {
                    'tab3': {
                        templateUrl: 'templates/calendRio.html',
                        controller: 'calendRioCtrl'
                    }
                }
            })

            .state('tabsController.acontecendoHoje', {
                url: '/page13',
                views: {
                    'tab4': {
                        templateUrl: 'templates/acontecendoHoje.html',
                        controller: 'acontecendoHojeCtrl'
                    }
                }
            })

            .state('eventosEmPovoados', {
                url: '/page17',
                templateUrl: 'templates/eventosEmPovoados.html',
                controller: 'eventosEmPovoadosCtrl'
            })

            .state('administrador', {
                url: '/page18',
                templateUrl: 'templates/administrador.html',
                controller: 'administradorCtrl'
            })

            .state('cadastroEvento', {
                url: '/page19',
                templateUrl: 'templates/cadastroEvento.html',
                controller: 'cadastroEventoCtrl'
            })
            .state('updateEvento', {
                url: '/page20',
                templateUrl: 'templates/updateEvento.html',
                controller: 'updateEventoCtrl'
            })
            .state('administradorOpcoes', {
                url: '/page22',
                templateUrl: 'templates/administradorOpcoes.html',
                controller: 'administradorOpcoesCtrl'
            })

            .state('autenticarCadart', {
                url: '/page23',
                templateUrl: 'templates/autenticarCadart.html',
                controller: 'autenticarCadartCtrl'
            })

            .state('informacoesNoticias', {
                url: '/page21',
                templateUrl: 'templates/informacoesNoticias.html',
                controller: 'informacoesNoticiasCtrl'
            })
            .state('cultTobiasCidade', {
                url: '/page25',
                templateUrl: 'templates/cultTobiasCidade.html',
                controller: 'cultTobiasCidadeCtrl'
            })
            .state('cultTobias', {
                url: '/page26',
                templateUrl: 'templates/cultTobias.html',
                controller: 'cultTobiasCtrl'
            })
            .state('superAdministrador', {
                url: '/page27',
                templateUrl: 'templates/superAdministrador.html',
                controller: 'superAdministradorCtrl'
            })
            .state('autenticadosCadart', {
                url: '/page24',
                templateUrl: 'templates/autenticadosCadart.html',
                controller: 'autenticadosCadartCtrl'
            });

        $urlRouterProvider.otherwise('/page1/page2')


    });