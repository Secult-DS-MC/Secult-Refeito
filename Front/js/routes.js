angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('tabsController', {
                url: '/page1',
                templateUrl: 'templates/tabsController.html',
                abstract: true
            })

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

            .state('tabsController.calendario', {
                url: '/page12',
                views: {
                    'tab3': {
                        templateUrl: 'templates/calendario.html',
                        controller: 'calendarioCtrl'
                    }
                }
            })

            .state('tabsController.evento', {
                url: '/page13',
                views: {
                    'tab4': {
                        templateUrl: 'templates/evento.html',
                        controller: 'eventoCtrl'
                    }
                }
            })

            .state('cadastrar', {
                url: '/page14',
                templateUrl: 'templates/cadastrar.html',
                controller: 'cadastrarCtrl'

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


            .state('eventosEmPovoados', {
                url: '/page17',
                templateUrl: 'templates/eventosEmPovoados.html',
                controller: 'eventosEmPovoadosCtrl'
            })

            .state('acontecimentoAdm', {
                url: '/page18',
                templateUrl: 'templates/acontecimentoAdm.html',
                controller: 'acontecimentoAdmCtrl'
            })

            .state('cadastrarAcontecimentoAdm', {
                url: '/page19',
                templateUrl: 'templates/cadastrarAcontecimentoAdm.html',
                controller: 'cadastrarAcontecimentoAdmCtrl'
            })
            .state('alterarAcontecimentoAdm', {
                url: '/page20',
                templateUrl: 'templates/alterarAcontecimentoAdm.html',
                controller: 'alterarAcontecimentoAdmCtrl'
            })
            .state('infoEventoCalendario', {
                url: '/page21',
                templateUrl: 'templates/infoEventoCalendario.html',
                controller: 'infoEventoCalendarioCtrl'
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

            .state('autenticadosCadart', {
                url: '/page24',
                templateUrl: 'templates/autenticadosCadart.html',
                controller: 'autenticadosCadartCtrl'
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
            .state('cadastroArtista', {
                url: '/page28',
                templateUrl: 'templates/cadastroArtista.html',
                controller: 'cadastroArtistaCtrl'
            })
            .state('infoCadart', {
                url: '/page29',
                templateUrl: 'templates/infoCadart.html',
                controller: 'infoCadartCtrl'
            })

            .state('clonarAcontecimento', {
                url: '/page30',
                templateUrl: 'templates/clonarAcontecimento.html',
                controller: 'clonarAcontecimentoCtrl'
            })

        $urlRouterProvider.otherwise('/page1/page2')


    });