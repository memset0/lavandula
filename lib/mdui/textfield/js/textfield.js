/**
 * =============================================================================
 * ************   Text Field 文本框   ************
 * =============================================================================
 */

(function () {

  var getProp = function (obj, prop) {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      obj[prop] !== undefined &&
      obj[prop]
    ) ? obj[prop] : false;
  };

  /**
   * 输入框事件
   * @param e
   */
  var inputEvent = function (e) {
    var input = e.target;
    var $input = $(input);
    var event = e.type;
    var value = $input.val();

    // reInit 为 true 时，需要重新初始化文本框
    var reInit = getProp(e.detail, 'reInit');

    // domLoadedEvent 为 true 时，为 DOM 加载完毕后自动触发的事件
    var domLoadedEvent = getProp(e.detail, 'domLoadedEvent');

    // 文本框类型
    var type = $input.attr('type') || '';
    if (['checkbox', 'button', 'submit', 'range', 'radio', 'image'].indexOf(type) >= 0) {
      return;
    }

    var $textField = $input.parent('.lavandula-textfield');

    // 输入框是否聚焦
    if (event === 'focus') {
      $textField.addClass('lavandula-textfield-focus');
    }

    if (event === 'blur') {
      $textField.removeClass('lavandula-textfield-focus');
    }

    // 输入框是否为空
    if (event === 'blur' || event === 'input') {
      $textField[(value && value !== '') ? 'addClass' : 'removeClass']('lavandula-textfield-not-empty');
    }

    // 输入框是否禁用
    $textField[input.disabled ? 'addClass' : 'removeClass']('lavandula-textfield-disabled');

    // 表单验证
    if ((event === 'input' || event === 'blur') && !domLoadedEvent) {
      if (input.validity) {
        var method = input.validity.valid ? 'removeClass' : 'addClass';
        $textField[method]('lavandula-textfield-invalid-html5');
      }
    }

    // textarea 高度自动调整
    if (e.target.nodeName.toLowerCase() === 'textarea') {

      // IE bug：textarea 的值仅为多个换行，不含其他内容时，textarea 的高度不准确
      //         此时，在计算高度前，在值的开头加入一个空格，计算完后，移除空格
      var inputValue = $input.val();
      var hasExtraSpace = false;
      if (inputValue.replace(/[\r\n]/g, '') === '') {
        $input.val(' ' + inputValue);
        hasExtraSpace = true;
      }

      // 设置 textarea 高度
      $input.height('');
      var height = $input.height();
      var scrollHeight = input.scrollHeight;

      if (scrollHeight > height) {
        $input.height(scrollHeight);
      }

      // 计算完，还原 textarea 的值
      if (hasExtraSpace) {
        $input.val(inputValue);
      }
    }

    // 实时字数统计
    if (reInit) {
      $textField
        .find('.lavandula-textfield-counter')
        .remove();
    }

    var maxlength = $input.attr('maxlength');
    if (maxlength) {
      if (reInit || domLoadedEvent) {
        $('<div class="lavandula-textfield-counter">' +
            '<span class="lavandula-textfield-counter-inputed"></span> / ' + maxlength +
          '</div>').appendTo($textField);
      }

      $textField.find('.lavandula-textfield-counter-inputed').text(value.length.toString());
    }

    // 含 帮助文本、错误提示、字数统计 时，增加文本框底部内边距
    if (
      $textField.find('.lavandula-textfield-helper').length ||
      $textField.find('.lavandula-textfield-error').length ||
      maxlength
    ) {
      $textField.addClass('lavandula-textfield-has-bottom');
    }
  };

  // 绑定事件
  $document.on('input focus blur', '.lavandula-textfield-input', { useCapture: true }, inputEvent);

  // 可展开文本框展开
  $document.on('click', '.lavandula-textfield-expandable .lavandula-textfield-icon', function () {
    $(this)

      // 展开文本框
      .parents('.lavandula-textfield')
      .addClass('lavandula-textfield-expanded')

      // 聚焦到输入框
      .find('.lavandula-textfield-input')[0].focus();
  });

  // 可展开文本框关闭
  $document.on('click', '.lavandula-textfield-expanded .lavandula-textfield-close', function () {
    $(this)

      // 关闭文本框
      .parents('.lavandula-textfield')
      .removeClass('lavandula-textfield-expanded')

      // 清空输入框
      .find('.lavandula-textfield-input')
      .val('');
  });

  /**
   * 通过 JS 更新了表单内容，需要重新进行表单处理
   * @param- 如果传入了 .lavandula-textfield 所在的 DOM 元素，则更新该文本框；否则，更新所有文本框
   */
  lavandula.updateTextFields = function () {
    $(arguments.length ? arguments[0] : '.lavandula-textfield').each(function () {
      $(this)
        .find('.lavandula-textfield-input')
        .trigger('input', {
          reInit: true,
        });
    });
  };
})();

$(function () {
  /**
   * 初始化文本框
   */
  lavandula.mutation('.lavandula-textfield', function () {
    $(this)
      .find('.lavandula-textfield-input')
      .trigger('input', {
        domLoadedEvent: true,
      });
  });
});
