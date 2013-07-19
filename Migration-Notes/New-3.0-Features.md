## Resource File Bundling

With Broadleaf 3.0, a new Thymeleaf processor has been added to improve serving JS and CSS resources. This processor will allow your development environment to continue functioning exactly as it currently does (meaning files will be loaded individually, not minified and not cached), but when in a production environment, the CSS files and JS files will be bundled according to your usage of the processors. 

For example, if you had a.js, b.js, and c.js in your project, they could be served as bundle-1234.js in production, where 1234 is an automatically generated version number for those files. This bundle file is then served with a cache length of ten years according to best practices for serving static content.

To take advantage of this bundling, you will want to change your various `<script src="..."></script>` lines to use the following syntax:

```xml
<blc:bundle name="bundle.js" 
            mapping-prefix="/js/"
            files="a.js,
                   b.js,
                   c.js" />
```

This will render:

```xml
<script type="text/javascript" src="/js/a.js"></script>
<script type="text/javascript" src="/js/b.js"></script>
<script type="text/javascript" src="/js/c.js"></script>
```

when the property `bundle.enabled` is set to false and

```xml
<script type="text/javascript" src="/js/bundle1234.js"></script>
```

when the property `bundle.enabled` is set to true.
