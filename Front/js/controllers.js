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
            listarCadart();
            usuarioAtivo();
        }])

    .controller('usuarioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            textAreaUp();
            botaoFotoFakeCadart(1);
            usuarioLogado();
        }])

    .controller('cadastrarCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            mascarasCadart();
            verificarSenha();
            verificarTel();
            verificarCpf();
            saveFotoLS();
            textArea("descricaoCdt");
            textArea("projetosCdt");
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

    .controller('calendRioCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }])

    .controller('acontecendoHojeCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarEventoHoje();

        }])

    .controller('eventosEmPovoadosCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            preencherDadosLocalidade();
            selectLocalidade();
        }])

    .controller('administradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            listarEvento();
        }])

    .controller('cadastroEventoCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            saveFotoEventoLSCdt()
            textArea("descricaoAdm");
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
            saveFotoEventoLS();
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
    .controller('superAdministradorCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {

        }]);
 