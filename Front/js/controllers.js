angular.module('app.controllers', [])

    .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


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

    .controller('administradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarEventoFiltro('Todos');
        }])

    .controller('cadastroEventoCtrl', ['$scope', '$stateParams',
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

    .controller('updateEventoCtrl', ['$scope', '$stateParams',
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
    .controller('testeCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])
    .controller('superAdministradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }]);
 