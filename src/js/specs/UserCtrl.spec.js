describe('User Controller Tests', () => {

    let UserCtrlTest;
    let userService;
    let userCtrl;
    let q;
    let projectList;
    const githubTestUser = 'octocat';

    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.inject(($controller, $rootScope, _UserService_) => {
        userService = _UserService_;
        userCtrl = $rootScope.$new();
        projectList = [
            {
                id: 18221276,
                name: "git-consortium",
                full_name: "octocat/git-consortium",
            },
            {
                id: 20978623,
                name: "hello-worId",
                full_name: "octocat/hello-worId",
            },
            {
                id: 1296269,
                name: "Hello-World",
                full_name: "octocat/Hello-World",
            }
        ];

        spyOn(userService, "getUserByUsername").and.callFake(() => {
            return { 
                then: (callback) => callback({ data: { username: githubTestUser }}),
                catch: (callback) => callback({ error: 'error' })
            }
        });

        spyOn(userService, "getUserProjects").and.callFake(() => {
            return { 
                then: (callback) => callback({ data: projectList }),
                catch: (callback) => callback({ error: 'error' })
            }
        });

        $controller('UserCtrl', {
             '$scope': userCtrl
         });       
    }));
    
    it('Deve verificar se o controller está definido', () => 
        expect(userCtrl).toBeDefined());

    it('Deve mostrar mensagem não encontrado quando o usuário não existir', () => {
        userService.getUserByUsername = jasmine.createSpy().and.callFake(() => {
            return { 
                then: (callback) => callback({ data: { message: 'Not Found' }}),
                catch: (callback) => callback({ error: 'error' })
            }
        });
        userCtrl.getUserByUsername('nonononono');
        expect(userCtrl.user.message).toEqual('Not Found')
    });
        
    it('Deve verificar se o usuário retornado foi setado', () => {
        userCtrl.getUserByUsername(githubTestUser);
        expect(userCtrl.user.username).toEqual(githubTestUser);
    });

    it('Deve verificar se a lista está definida', () =>
        expect(userCtrl.userProjectList).toBeDefined());

    it('Deve verificar se o usuário possui projetos', () => {
        userCtrl.getUserProjects(githubTestUser);
        expect(userCtrl.userProjectList.length).toBeGreaterThan(0);
    });

    it('Deve retornar a lista de projetos do usuário', () => {
        userCtrl.getUserProjects(githubTestUser);
        expect(userCtrl.userProjectList).toEqual(projectList);
    });

    it('Deve verificar se o usuário não possui projetos', () => {
        userService.getUserProjects = jasmine.createSpy().and.callFake(() => {
            return { 
                then: (callback) => callback({ data: [] }),
                catch: (callback) => callback({ error: 'error' })
            }
        }); 
        userCtrl.getUserProjects('nonono');
        expect(userCtrl.userProjectList).toEqual([]);

    });
});