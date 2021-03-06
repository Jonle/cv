/**
 * 拉普拉斯描边
 */
define(function(require, exports, module) {
	var util = require('../utils/util'),
		Gray = require('./Gray').process;

	/**
	 * Laplace描边, 直接拿半径为1的卷积核做的卷积 - -
	 * @param {Array}  data   图像数据
	 * @param {Number} width  图像宽
	 * @param {Number} height 图像高
	 */
	var Laplace = function Laplace(data, width, height, boundaryFillColor) {
		boundaryFillColor = boundaryFillColor || 127;
		Gray(data);
		var _data = util.copyImageData(data);
		util.each.xDirection(data, width, 0, 0, width, height, function(i, x, y) {
			for (var n = 0; n < 3; n++) {
				data[i+n] = util.convolution(util.getImageConvolution(_data, width, height, x, y, n, 1, boundaryFillColor), [
					0, -1, 0,
					-1, 4, -1,
			        0, -1, 0
			    ], 1, 0);
			};
			// data[i+3] = 255;
		});
	}

	module.exports.process = Laplace;
});
