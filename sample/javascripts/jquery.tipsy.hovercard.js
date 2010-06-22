// tipsy.hovercard, twitter style hovercards for tipsy
// version 0.1
// (c) 2010 René Föhring rf@bamaru.de
// released under the MIT license

(function($) {
  $.fn.tipsyHoverCard = function(options) {
    var opts = $.extend({}, $.fn.tipsyHoverCard.defaults, options);
    this.tipsy(opts);
  
    function clearHideTimeout(ele) {
      if( ele.data('timeoutId') ) clearTimeout(ele.data('timeoutId'));
      ele.data('timeoutId', null);
    }
    function setHideTimeout(ele) {
      clearHideTimeout(ele);
      var options = ele.tipsy(true).options;
      var timeoutId = setTimeout(function() { $(ele).tipsy('hide'); }, options.hideDelay);
      ele.data('timeoutId', timeoutId);
    }
    
    function show(ele) {
      clearHideTimeout(ele);
      ele.tipsy('show');
      
      var tip = ele.tipsy('tip');
      tip.addClass('tipsy-hovercard');
      tip.data('tipsyAnchor', ele);
      tip.hover(tipEnter, tipLeave);
    }
    function hide(ele) {
      setHideTimeout(ele);
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
            show(a);
          },
          error: function() {
            a.attr('title', 'Error loading '+url);
            show(a);
          },
          failure: function(){
            a.attr('title', 'Failed to load '+url);
            show(a);
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

    if( $.fn.hoverIntent && opts.hoverIntent ) {
      // 'out' is called with a latency, even if 'timeout' is set to 0
      // therefore, we're using good ol' mouseleave for out-handling
      var config = $.extend({over: enter, out: function(){}}, opts.hoverIntentConfig);
      this.hoverIntent(config).mouseleave(leave);
    } else {
      this.hover(enter, leave);
    }
    return this;
  }
  
  $.fn.tipsyHoverCard.defaults = {
    gravity: 'n',
    trigger: 'manual', 
    fallback: '...',
    html: true,
    hideDelay: 300,
    opacity: 1,
    hoverIntent: true,
    hoverIntentConfig: {
      sensitivity: 3,
      interval: 300,
      timeout: 0
    }
  };
})(jQuery);