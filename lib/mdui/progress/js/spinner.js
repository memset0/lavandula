/**
 * =============================================================================
 * ************   Spinner 圆形进度条   ************
 * =============================================================================
 */

(function () {
  /**
   * layer 的 HTML 结构
   */
  var layerHTML = function () {
    var i = arguments.length ? arguments[0] : false;

    return '<div class="lavandula-spinner-layer ' + (i ? 'lavandula-spinner-layer-' + i : '') + '">' +
               '<div class="lavandula-spinner-circle-clipper lavandula-spinner-left">' +
             '<div class="lavandula-spinner-circle"></div>' +
             '</div>' +
             '<div class="lavandula-spinner-gap-patch">' +
               '<div class="lavandula-spinner-circle"></div>' +
             '</div>' +
             '<div class="lavandula-spinner-circle-clipper lavandula-spinner-right">' +
               '<div class="lavandula-spinner-circle"></div>' +
             '</div>' +
           '</div>';
  };

  /**
   * 填充 HTML
   * @param spinner
   */
  var fillHTML = function (spinner) {
    var $spinner = $(spinner);
    var layer;
    if ($spinner.hasClass('lavandula-spinner-colorful')) {
      layer = layerHTML('1') + layerHTML('2') + layerHTML('3') + layerHTML('4');
    } else {
      layer = layerHTML();
    }

    $spinner.html(layer);
  };

  /**
   * 页面加载完后自动填充 HTML 结构
   */
  $(function () {
    lavandula.mutation('.lavandula-spinner', function () {
      fillHTML(this);
    });
  });

  /**
   * 更新圆形进度条
   */
  lavandula.updateSpinners = function () {
    $(arguments.length ? arguments[0] : '.lavandula-spinner').each(function () {
      fillHTML(this);
    });
  };

})();
