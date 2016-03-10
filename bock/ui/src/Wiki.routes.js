angular.module('Wiki')

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/Home');

    $stateProvider

    .state('article', {
        title: '{{ $stateParams.articleTitle | formatTitle }}',
        url: '/:articleTitle',
        // url: '/{articleTitle:nonEncodedURL}',
        resolve: {
            articleData: function(WikiService, $stateParams) {
                var articleTitle = $stateParams.articleTitle || 'Home';
                return WikiService.getArticle(articleTitle);
            }
        },
        views: {
            '@': {
                templateUrl: 'article.html',
                controller: 'articleController',
                controllerAs: 'ac',
            },
            'lastModifiedInfo@': {
                templateUrl: 'last_modified.html',
                controller: 'articleController',
                controllerAs: 'ac'
            }
        }
    })

    .state('article.raw', {
        title: '{{ $stateParams.articleTitle | formatTitle }} - Source',
        url: '/raw',
        views: {
            '@': {
                templateUrl: 'raw_article.html',
                controller: 'articleController',
                controllerAs: 'ac'
            }
        }
    })

    .state('article.revisionList', {
        title: '{{ $stateParams.articleTitle | formatTitle }} - Revisions',
        url: '/revisions',
        views: {
            '@': {
                templateUrl: 'revisions.html',
                controller: 'revisionListController',
                controllerAs: 'rlc',
                resolve: {
                    listOfRevisions: function(WikiService, $stateParams) {
                        var articleTitle = $stateParams.articleTitle || 'Home';
                        return WikiService.getListOfRevisions(articleTitle);
                    }
                }
            }
        }
    })

    .state('article.revisionList.revision', {
        title: '{{ $stateParams.articleTitle | formatTitle }} - Revision {{ $stateParams.revisionID }}',
        url: '/:revisionID',
        resolve: {
            revision: function(WikiService, $stateParams) {
                var articleTitle = $stateParams.articleTitle || 'Home';
                return WikiService.getRevision(articleTitle, $stateParams.revisionID);
            }
        },
        views: {
            '@': {
                templateUrl: 'revision.html',
                controller: 'revisionController',
                controllerAs: 'rc'
            },
            'lastModifiedInfo@': {
                templateUrl: 'last_modified.html',
                controller: 'revisionController',
                controllerAs: 'rc'
            }
        }
    })

    .state('article.revisionList.revision.raw', {
        title: '{{ $stateParams.articleTitle | formatTitle }} - Source',
        url: '/raw_revision',
        views: {
            '@': {
                templateUrl: 'raw_revision.html',
                controller: 'revisionController',
                controllerAs: 'rc'
            },
            'lastModifiedInfo@': {
                templateUrl: 'last_modified.html',
                controller: 'revisionController',
                controllerAs: 'rc'
            }
        }
    })

    .state('article.compare', {
        title: '{{ $stateParams.articleTitle | formatTitle }} - Compare Revisions',
        url: '/compare?a&b',
        views: {
            '@': {
                templateUrl: 'compare.html',
                controller: 'compareController',
                controllerAs: 'cc',
                resolve: {
                    comparisonDiff: function(WikiService, $stateParams) {
                        var articleTitle = $stateParams.articleTitle || 'Home';
                        return WikiService.getCompareDiff(articleTitle, $stateParams.a, $stateParams.b);
                    }
                }
            }
        }
    })

    .state('articles', {
        title: 'List of Articles',
        url: '/articles',
        views: {
            '@': {
                templateUrl: 'articles.html',
                controller: 'articlesController',
                controllerAs: 'asc',
                resolve: {
                    listOfArticles: function(WikiService) {
                        return WikiService.getListOfArticles();
                    }
                }
            }
        }
    })

    .state('search', {
        title: 'Search - {{ $stateParams.query }}',
        url: '/search/:query',
        views: {
            '@': {
                templateUrl: 'search_results.html',
                controller: 'searchResultsController',
                controllerAs: 'src',
                resolve: {
                    searchResults: function(WikiService, $stateParams) {
                        return WikiService.getSearchResults($stateParams.query);
                    }
                }
            }
        }
    })

    .state('random', {
        title: 'Randomizing...',
        url: '/random'
    })

    .state('404', {
        title: 'Couldn\'t find that',
        templateUrl: '404.html'
    })

    .state('500', {
        title: 'Uh oh...',
        templateUrl: '500.html'
    })

    .state('noHome', {
        title: 'No Home',
        templateUrl: 'no_home.html'
    })

    ;
    
});