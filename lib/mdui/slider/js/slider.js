/**
 * =============================================================================
 * ************   Slider 滑块   ************
 * =============================================================================
 */

(function () {

  /**
   * 滑块的值变更后修改滑块样式
   * @param $slider
   */
  var updateValueStyle = function ($slider) {
    var data = $slider.data();

    var $track = data.$track;
    var $fill = data.$fill;
    var $thumb = data.$thumb;
    var $input = data.$input;
    var min = data.min;
    var max = data.max;
    var isDisabled = data.disabled;
    var isDiscrete = data.discrete;
    var $thumbText = data.$thumbText;
    var value = $input.val();
    var percent = (value - min) / (max - min) * 100;

    $fill.width(percent + '%');
    $track.width((100 - percent) + '%');

    if (isDisabled) {
      $fill.css('padding-right', '6px');
      $track.css('padding-left', '6px');
    }

    $thumb.css('left', percent + '%');

    if (isDiscrete) {
      $thumbText.text(value);
    }

    $slider[parseFloat(percent) === 0 ? 'addClass' : 'removeClass']('lavandula-slider-zero');
  };

  /**
   * 重新初始化
   * @param $slider
   */
  var reInit = function ($slider) {
    var $track = $('<div class="lavandula-slider-track"></div>');
    var $fill = $('<div class="lavandula-slider-fill"></div>');
    var $thumb = $('<div class="lavandula-slider-thumb"></div>');
    var $input = $slider.find('input[type="range"]');

    // 禁用状态
    var isDisabled = $input[0].disabled;
    $slider[isDisabled ? 'addClass' : 'removeClass']('lavandula-slider-disabled');

    // 重新填充 HTML
    $slider.find('.lavandula-slider-track').remove();
    $slider.find('.lavandula-slider-fill').remove();
    $slider.find('.lavandula-slider-thumb').remove();
    $slider.append($track).append($fill).append($thumb);

    // 间续型滑块
    var isDiscrete = $slider.hasClass('lavandula-slider-discrete');

    var $thumbText;
    if (isDiscrete) {
      $thumbText = $('<span></span>');
      $thumb.empty().append($thumbText);
    }

    $slider.data({
      $track: $track,
      $fill: $fill,
      $thumb: $thumb,
      $input: $input,
      min: $input.attr('min'),    // 滑块最小值
      max: $input.attr('max'),    // 滑块最大值
      disabled: isDisabled,       // 是否禁用状态
      discrete: isDiscrete,       // 是否是间续型滑块
      $thumbText: $thumbText,      // 间续型滑块的数值
    });

    // 设置默认值
    updateValueStyle($slider);
  };

  var rangeSelector = '.lavandula-slider input[type="range"]';

  $document

    // 滑动滑块事件
    .on('input change', rangeSelector, function () {
      var $slider = $(this).parent();
      updateValueStyle($slider);
    })

    // 开始触摸滑块事件
    .on(TouchHandler.start, rangeSelector, function (e) {
      if (!TouchHandler.isAllow(e)) {
        return;
      }

      TouchHandler.register(e);

      if (!this.disabled) {
        var $slider = $(this).parent();
        $slider.addClass('lavandula-slider-focus');
      }
    })

    // 结束触摸滑块事件
    .on(TouchHandler.end, rangeSelector, function (e) {
      if (!TouchHandler.isAllow(e)) {
        return;
      }

      if (!this.disabled) {
        var $slider = $(this).parent();
        $slider.removeClass('lavandula-slider-focus');
      }
    })

    .on(TouchHandler.unlock, rangeSelector, TouchHandler.register);

  /**
   * 重新初始化滑块（强制重新初始化）
   */
  lavandula.updateSliders = function () {
    $(arguments.length ? arguments[0] : '.lavandula-slider').each(function () {
      reInit($(this));
    });
  };

  $(function () {
    /**
     * 页面加载完后自动初始化（未初始化时，可以调用该方法初始化）
     */
    lavandula.mutation('.lavandula-slider', function () {
      reInit($(this));
    });
  });
})();
