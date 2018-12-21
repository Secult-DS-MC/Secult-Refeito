angular.module('app.controllers', [])

    .controller('menuCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $('.fab-buttons').toggle();
        }])

    .controller('noticiasCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
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
            },100)
        }])

    .controller('usuarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            botaoFotoFakeCadart(1);
            usuarioLogado();
            setTimeout(function () {
                salvaImagemImput()
            },1000)
        }])

    .controller('cadastrarCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            mascarasCadart();
            verificarSenha();
            verificarTel();
            verificarCpf();
            setTimeout(function () {
                salvaImagemImput()
            },1000)
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
        function ($scope, $stateParams, $ionicSideMenuDelegate)  {

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
            selectLocalidade();
        }])

    .controller('acontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarEventoFiltro('Todos');
        }])

    .controller('cadastrarAcontecimentoAdmCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
        setTimeout(function () {
            salvaImagemImput()
        },1000)

            selectLocalidadeCadastro();
            mostrarInputCadastroEvento();
        }])

    .controller('informacoesNoticiasCtrl', ['$scope', '$stateParams',
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
            },1000)
            selectLocalidadeUp();
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

    .controller('testesCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('infoCadartCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('superAdministradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }]);
 