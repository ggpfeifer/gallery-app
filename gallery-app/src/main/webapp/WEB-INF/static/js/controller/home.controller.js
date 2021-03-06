
/**
 * Controller from home view
 */
app.controller('homeController', function($scope, imageService) {

    /**
     * list of image show in the grid
     */
    $scope.grid = [];

    $scope.siteData = {
        totalImages: 0,
        totalViews: 0,
        totalComments: 0,
        totalLikes: 0,
        totalUnlikes: 0
    };

    $scope.init = function () {
        _refreshImageGrid();
    };

    /**
     * load content in page
     */
    $scope.load = function () {
        _refreshImageGrid();
    };

    /***
     * refresh the image grid
     */
    var _refreshImageGrid = function () {
        imageService.getSiteData().then(function (data) {
            $scope.siteData = data;
        });
        imageService.getImages().then(function (data) {
            var grid = [], row = [], i;
            for (i = 0; i < data.length; i++) {
                row.push(data[i]);
                if (row.length === 4) {
                    grid.push(row);
                    row = [];
                }
            }
            for (i = (4 - row.length); i > 0; i--) {
                row.push({});
            }
            grid.push(row);
            $scope.grid = grid;
            console.log(grid);
        });
    }

});