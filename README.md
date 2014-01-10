tipsy.hovercard - twitter style hovercards for tipsy
===============

DESCRIPTION
-----------

tipsy.hovercard provides twitter-like hovercards for tipsy, the facebook-styled
tooltip plugin for jQuery.

Examples: http://rrrene.github.io/tipsy.hovercard/


SOURCE:
-------

Hosted at GitHub; browse at:

  http://github.com/rrrene/tipsy.hovercard


DEPENDENCIES:
-------------

jQuery: http://jquery.com/

tipsy: http://onehackoranother.com/projects/jquery/tipsy


USAGE:
------

Copy the contents of lib to your javascripts folder and include them in your 
`<head>` section. Be sure to provide jQuery >= 1.4 and the tipsy plugin as well.

You can then use it like this:

    <a href="some.html" rel="tipsy" title="tipsy tooltip">example link</a>
    <a href="some.html" rel="hovercard" title="A tipsyHoverCard<br>(you can hover)">Hovercard example</a>
    <a href="some.html" rel="hovercard" title="loading..." data-url="some_info.html">Hovercard w/ AJAX Flavour</a>

    <script>
      jQuery(function ($) {
        $("*[rel=tipsy]").tipsy();
        $("*[rel=hovercard]").tipsyHoverCard();
      });
    </script>

