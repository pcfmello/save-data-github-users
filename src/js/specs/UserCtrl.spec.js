describe('User Tests', () => {

    var UserCtrlTest;
    var userService;
    var userCtrl;
    var q;

    var user = { id: 1983, login: 'pcfmello', name: 'Paulo Cesar Ferreira de Mello', location: 'Florianópoli/SC - Brazil' };
    var projectList = [
        {
            "id": 80962448,
            "name": "aluracar",
            "description": "Application created on Alura Ionic class "
        },
        {
            "id": 98835644,
            "name": "aparecida-nutricao",
            "description": "Aparecida é uma nutricionista que resolveu melhorar os seus processos organizacionais e migrar os dados de seus clientes para um site, ao invés de ficar consultando tudo em antigas fichas de papel."
        },
        {
            "id": 86172061,
            "name": "avancando-com-angularjs-1.5",
            "description": "Um projeto do curso AngularJS 1.5 avançado da School of Net"
        }
    ];

    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.inject(($controller, $rootScope, _UserService_) => {
        userService = _UserService_;
        spyOn(userService, "getUserByUsername").and.callFake(
            function() {
                return { 
                    then: function(callback) {
                        return callback({ data: { username: 'pcfmello' }});
                    },
                    catch: function(callback) {
                        return callback({ error: 'error' })
                    }
                }
            }
        );

        spyOn(userService, "getUserProjects").and.callFake(
            function() {
                return { 
                    then: function(callback) {
                        return callback({ data: projectList });
                    },
                    catch: function(callback) {
                        return callback({ error: 'error' })
                    }
                }
            }
        );

        userCtrl = $rootScope.$new()
        $controller('UserCtrl', {
             '$scope': userCtrl
         });       
    }));
    
    it('Deve verificar se o controller está definido', () => 
        expect(userCtrl).toBeDefined());

    it('Deve mostrar mensagem de usuário não encontrado quando o mesmo não existir', () => {
        userService.getUserByUsername = jasmine.createSpy().and.callFake(() => {
            return { 
                then: function(callback) {
                    return callback({ data: { message: 'Not Found' }});
                },
                catch: function(callback) {
                    return callback({ error: 'error' })
                }
            }
        });
        
        userCtrl.getUserByUsername('nonononono');
        expect(userCtrl.user.message).toEqual('Not Found')
    });
        
    it('Deve verificar se o usuário retornado foi setado', () => {
        userCtrl.getUserByUsername('pcfmello');
        expect(userCtrl.user.username).toEqual('pcfmello');
    });

    it('Deve verificar se a lista está definida', () =>
        expect(userCtrl.userProjectList).toBeDefined());

    it('Deve verificar se o usuário possui projetos', () => {
        userCtrl.getUserProjects('pcfmello');
        expect(userCtrl.userProjectList.length).toBeGreaterThan(0);
    });

    it('Deve retornar a lista de projetos do usuário', () => {
        userCtrl.getUserProjects('pcfmello');
        expect(userCtrl.userProjectList).toEqual(projectList);
    });

    it('Deve verificar se o usuário não possui projetos', () => {
        userService.getUserProjects = jasmine.createSpy().and.callFake(() => {
            return { 
                then: function(callback) {
                    return callback({ data: [] });
                },
                catch: function(callback) {
                    return callback({ error: 'error' })
                }
            }
        }); 
        userCtrl.getUserProjects('nonono');
        expect(userCtrl.userProjectList).toEqual([]);

    });
});