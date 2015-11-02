'use strict';

describe('Controller: MainCtrl', function() {
    var MainCtrl,
        scope,
        q,
        deferred,
        mockUserService,
        mockPostService;

    // load the controller's module
    beforeEach(module('friendsFeedApp'));

    // mock user John
    var john = {
        _id: 1,
        name: {
            first: 'John',
            last: 'Doe'
        },
        email: 'aprettyemail@gmail.com',
        friends: [],
        posts: [{
            content: 'A post from John',
            createdOn: Date.now
        }, {
            content: 'Another post from John',
            createdOn: Date.now
        }]
    };

    // mock user Mary
    var mary = {
        _id: 2,
        name: {
            first: 'Mary',
            last: 'Parker'
        },
        email: 'anotherprettyemail@gmail.com',
        friends: [],
        posts: [{
            content: 'A post from Mary',
            createdOn: Date.now
        }]
    };

    // make John and Mary friends
    john.friends.push(mary);
    mary.friends.push(john);

    var allUsers = [john, mary];

    // helper function to find by ID
    function findById(collection, id) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i]._id === id) {
                return collection[i];
            }
        }
    }

    beforeEach(function() {

        mockUserService = {
            all: function() {
                deferred = q.defer();

                deferred.resolve(allUsers);
                return deferred.promise;
            },
            get: function(userId) {
                deferred = q.defer();
                var user = findById(allUsers, userId);
                deferred.resolve(user);
                return deferred.promise;
            }

        };

        mockPostService = {
            all: function(userId) {
                deferred = q.defer();

                var user = findById(allUsers, userId);

                var grabFromUsers = [];
                var posts = [];

                for (var i = 0; i < user.friends.length; i++) {
                    grabFromUsers.push(user.friends[i]._id);
                }


                for (i = 0; i < grabFromUsers.length; i++) {
                    var friend = findById(allUsers, grabFromUsers[i]);
                    posts = posts.concat(friend.posts);
                }

                posts = posts.concat(user.posts);

                deferred.resolve(posts);

                return deferred.promise;
            },
            add: function(newPost) {
                deferred = q.defer();
                newPost.createdOn = Date.now;
                deferred.resolve(newPost);

                return deferred.promise;
            }
        };

    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            UserService: mockUserService,
            PostService: mockPostService
        });
    }));

    it('should have loaded 2 users initially', function() {
        scope.$apply();
        expect(scope.users.length).toBe(2);
    });

    it('should be able to pick a user', function() {
        scope.$apply();
        scope.pickUser(mary);
        scope.$apply();
        expect(scope.user._id).toBe(2);
    });

    it('a user can see posts from friends and their own', function() {
        scope.$apply();
        scope.pickUser(mary);
        scope.$apply();
        expect(scope.posts.length).toBe(3);
    });

    it('cannot add a new empty post', function() {
        scope.$apply();
        scope.pickUser(mary);
        scope.$apply();
        var beforeTrialPosts = scope.posts.length;
        scope.addPost();
        var afterTrialPosts = scope.posts.length;

        expect(beforeTrialPosts === afterTrialPosts).toBe(true);
    });

    it('can add a non-empty post', function() {
        scope.$apply();
        scope.pickUser(mary);
        scope.$apply();
        var beforeTrialPosts = scope.posts.length;
        scope.post.content = 'A new post';
        scope.$apply();
        scope.addPost();
        scope.$apply();
        var afterTrialPosts = scope.posts.length;

        expect(afterTrialPosts - beforeTrialPosts).toBe(1);
    });

    it('post is reset after saving', function() {
        scope.$apply();
        scope.pickUser(mary);
        scope.$apply();
        scope.post.content = 'A new post';
        scope.$apply();
        scope.addPost();
        scope.$apply();

        expect(scope.post.content === '').toBeTruthy();
    });

});