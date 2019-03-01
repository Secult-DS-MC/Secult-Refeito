angular.module('app.controllers', [])

    .controller('acontecimentoCtrl', function ($scope, $ionicActionSheet) {

        $scope.triggerActionSheet = function () {
            // Show the action sheet
            var showActionSheet = $ionicActionSheet.show({
                buttons: [
                    {text: 'Clonar'}
                ],

                destructiveText: 'Excluir',
                titleText: 'Opções',
                cancelText: 'Cancel',

                cancel: function () {
                    // add cancel code...
                },

                buttonClicked: function (index) {
                    if (index === 0) {
                        window.location.href = "#/page30";
                        preencherClonar(localStorage.getItem("idAcontecimento"));
                    }
                },

                destructiveButtonClicked: function () {
                    excluirAcontecimento(localStorage.getItem("idAcontecimento"));
                }
            });
        };
    })

    .controller('menuCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $('.fab-buttons').toggle();
        }])

    .controller('noticiasCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                setTimeout(function () {
                    $("#listaEventoNoticas").empty();
                    listarEventoNoticias();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            //listarPublicidade();
            listarEventoNoticias();
            verificarAdministrador();
        }])

    .controller('cadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                $('.pesquisa').parent().css('right', 'right: -22px!important;')

                setTimeout(function () {
                    $("#listaCadart").empty();
                    listarArtistas();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            $('.pesquisa').parent().css('right', '-22px!important')
            listarArtistas();
            usuarioAtivo();
            localStorage.setItem("Ativo", "Sim");
            setTimeout(function () {
                $(".cadastrar").css("height", tamanhoTela())
            }, 100)
        }])

    .controller('usuarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarArtes();
            botaoFotoFakeCadart(1);
            usuarioLogado();
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)
        }])

    .controller('cadastrarCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            mascarasCadart();
            verificarSenha();
            verificarTel();
            verificarCpf();
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)
            botaoFotoFakeCadart(2);

        }])

    .controller('loginCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            mudarCorbotaoEntrar();
        }])


    .controller('culturaCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams, $ionicSideMenuDelegate) {

        }])

    .controller('agendaCulturalCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('editaisCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('turismoCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('calendarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                setTimeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
        }])

    .controller('eventoCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefreshEvento = function () {
                setTimeout(function () {
                    $("#listaEventoHoje").empty();
                    listarEventoEvento();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            listarEventoEvento();
        }])

    .controller('eventosEmPovoadosCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            selectLocalidade('idLocalidade');
        }])

    .controller('acontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                setTimeout(function () {
                    $("#inicioListaEventoHoje").empty();
                    listarEventoFiltro('Todos');
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            listarEventoFiltro('Todos');
        }])

    .controller('cadastrarAcontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)

            selectLocalidade('localidadeAdm');
        }])

    .controller('administradorOpcoesCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('autenticarCadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                setTimeout(function () {
                    $("#listaCadartAutentiar").empty();
                    listarArtistasNaoAutenticados();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            listarArtistasNaoAutenticados();
        }])

    .controller('alterarAcontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)
            selectLocalidade('localidadeUp');

            localStorage.setItem("visibilidadeAcon", "n");

            $scope.emailNotificationChange = function () {
                localStorage.setItem("visibilidadeAcon", $scope.emailNotification.checked);
            };

            $scope.emailNotification = {checked: true};
        }])

    .controller('cultTobiasCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('autenticadosCadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                setTimeout(function () {
                    $("#listaCadartAdm").empty();
                    listarArtistasAutenticados();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            listarArtistasAutenticados();
        }])
    .controller('cultTobiasCidadeCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('artesCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            preencherArtes();
            setTimeout(function () {
                $('#nomeArte').text($("#idArtes option:Selected").text())

            }, 100)
            $('#idArtes').change(function () {

                $('#nomeArte').text($("#idArtes option:Selected").text())
                listarArtistasPorArte($("#idArtes").val())
            })
        }])
    .controller('infoArtistasPorArteCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('artistaCtrl', ['$scope', '$stateParams',

        function ($scope, $stateParams) {
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)
            botaoFotoFakeCadart(2);
            listarArtes()
        }])

    .controller('infoCadartCtrl', ['$scope', '$stateParams',
        function MyCtrl($scope, $ionicHistory) {
            $scope.myGoBack = function () {
                $ionicHistory.goBack();
            };
        }
    ])

    .controller('superAdministradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('clonarAcontecimentoCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            selectLocalidade('localidadeCl');
        }])
    .controller('infoArtistaCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('infoCalendarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])

    .controller('infoCalendarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])

    .controller('infoCalendarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])

    .controller('infoCalendarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])

    .controller('localidadeAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.doRefresh = function () {
                setTimeout(function () {
                    listarLocalidades();
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            listarLocalidades();
        }])

    .controller('cadastrarLocalidadeAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])

    .controller('alterarLocalidadeAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])

    .controller('arteCadastroCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])
    .controller('arteAtualizarCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }])
    .controller('arteAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarArtesAdm()
        }])


    .controller('infoAutenticarDesautenticarCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        }]);