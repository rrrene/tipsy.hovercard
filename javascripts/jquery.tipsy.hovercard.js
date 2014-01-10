// tipsy.hovercard, twitter style hovercards for tipsy
// version 0.2
// (c) 2013 René Föhring rf@bamaru.de
// released under the MIT license

(function($) {
  $.fn.tipsyHoverCard = function(options) {
    var opts = $.extend({}, $.fn.tipsyHoverCard.defaults, options, $.fn.tipsyHoverCard.forcedOptions);
    $(this).tipsy(opts);
  
    function clearHideTimeout(ele) {
      if( ele.data('timeoutId') ) clearTimeout(ele.data('timeoutId'));
      ele.data('timeoutId', null);
    }
    function setHideTimeout(ele) {
      clearHideTimeout(ele);
      var options = ele.tipsy(opts).tipsy(true).options;
      var timeoutId = setTimeout(function() { $(ele).tipsy('hide'); }, options.delayOut);
      ele.data('timeoutId', timeoutId);
    }
    
    function clearShowTimeout(ele) {
      if( ele.data('timeoutId') ) clearTimeout(ele.data('timeoutId'));
      ele.data('timeoutId', null);
    }
    function setShowTimeout(ele) {
      clearHideTimeout(ele);
      var options = ele.tipsy(opts).tipsy(true).options;
      var timeoutId = setTimeout(function() { __show(ele); }, options.delayIn);
      ele.data('timeoutId', timeoutId);
    }
    
    function __show(ele) {
      clearHideTimeout(ele);
      ele.tipsy(opts).tipsy('show');
      
      var tip = ele.tipsy(true).$tip;
      tip.addClass('tipsy-hovercard');
      tip.data('tipsyAnchor', ele);
      tip.hover(tipEnter, tipLeave);
      ele.data('visible', true);
    }
    function hide(ele) {
      setHideTimeout(ele);
      ele.data('visible', false);
    }
    function show(ele) {
      setShowTimeout(ele);
      ele.data('visible', true);
    }
    
    function enter() {
      var a = $(this);
      var url = a.attr('data-url');
      if( url && !a.data('ajax-success') ) {
        $.ajax({
          url: url,
          dataType: "html",
          success: function(data){
            a.data('ajax-success', true);
            a.attr('title', data);
            if( a.data('visible') ) show(a);
          },
          error: function() {
            a.attr('title', 'Error loading '+url);
            if( a.data('visible') ) show(a);
          },
          failure: function(){
            a.attr('title', 'Failed to load '+url);
            if( a.data('visible') ) show(a);
          }
        });
      }
      show(a);
    }
    function leave() {
      hide($(this));
    }
    
    function tipEnter() {
      var a = $(this).data('tipsyAnchor');
      clearHideTimeout(a);
    }
    function tipLeave() {
      var a = $(this).data('tipsyAnchor');
      setHideTimeout(a);
    }

    $("body").on("mouseenter", this.selector, enter)
    $("body").on("mouseleave", this.selector, leave)

    return this;
  }
  $.fn.tipsyHoverCard.forcedOptions = {live: false, trigger: 'manual'};
  $.fn.tipsyHoverCard.defaults = {
    gravity: 'n',
    fallback: '...',
    html: true,
    delayIn: 500,
    delayOut: 0,
    opacity: 1
  };
})(jQuery);