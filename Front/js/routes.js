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

            .state('tabsController.infoArtista', {
                url: '/page35',
                views: {
                    'tab1':{
                        templateUrl: 'templates/infoArtista.html',
                        controller: 'infoArtistaCtrl'
                    }
                }
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

            .state('tabsController.infoCalendario', {
                url: '/page21',
                views: {
                    'tab3': {
                        templateUrl: 'templates/infoCalendario.html',
                        controller: 'infoCalendarioCtrl'
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

            .state('artes', {
                url: '/page16',
                templateUrl: 'templates/artes.html',
                controller: 'artesCtrl'
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
            .state('infoCalendario', {
                url: '/page21',
                templateUrl: 'templates/infoCalendario.html',
                controller: 'infoCalendarioCtrl'
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
            .state('artista', {
                url: '/page28',
                templateUrl: 'templates/artista.html',
                controller: 'artistaCtrl'
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
            .state('infoAutenticarDesautenticar', {
                url: '/page31',
                templateUrl: 'templates/infoAutenticarDesautenticar.html',
                controller: 'infoAutenticarDesautenticarCtrl'
            })

            .state('localidadeAdm', {
                url: '/page32',
                templateUrl: 'templates/localidadeAdm.html',
                controller: 'localidadeAdmCtrl'
            })

            .state('cadastrarLocalidade', {
                url: '/page33',
                templateUrl: 'templates/cadastrarLocalidade.html',
                controller: 'cadastrarLocalidadeAdmCtrl'
            })

            .state('alterarLocalidade', {
                url: '/page35',
                templateUrl: 'templates/alterarLocalidade.html',
                controller: 'alterarLocalidadeAdmCtrl'
            })

            .state('infoArtistasPorArte', {
                url: '/page34',
                templateUrl: 'templates/infoArtistasPorArte.html',
                controller: 'infoArtistasPorArteCtrl'
            })


        $urlRouterProvider.otherwise('/page1/page2')
    });