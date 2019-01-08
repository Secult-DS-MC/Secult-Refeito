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
            listarPublicidade();
            listarEventoNoticias();
            verificarAdministrador();
        }])

    .controller('cadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $("#listaCadart").empty();
            listarCadart()
            usuarioAtivo();
            localStorage.setItem("Ativo", "Sim");
            setTimeout(function () {
                $(".cadastrar").css("height", tamanhoTela())
            }, 100)
        }])

    .controller('usuarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
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

    .controller('informacoesCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

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
            listarEventosCalendario();

        }])

    .controller('eventoCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarEventoEvento();

        }])

    .controller('eventosEmPovoadosCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            preencherDadosLocalidade();
            selectLocalidade('idLocalidade');
        }])

    .controller('acontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarEventoFiltro('Todos')
        }])

    .controller('cadastrarAcontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)

            selectLocalidade('localidadeAdm');
            mostrarInputCadastroEvento();
        }])

    .controller('infoEventoCalendarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('administradorOpcoesCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('autenticarCadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('alterarAcontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            setTimeout(function () {
                salvaImagemImput()
            }, 1000)
            selectLocalidade('localidadeUp');
        }])

    .controller('cultTobiasCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('autenticadosCadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('cultTobiasCidadeCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('cadastroArtistaCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('infoCadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('superAdministradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('clonarAcontecimentoCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            selectLocalidade('localidadeCl');
        }])
