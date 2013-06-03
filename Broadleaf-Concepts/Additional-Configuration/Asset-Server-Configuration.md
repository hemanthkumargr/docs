# Asset Server Configuration

Broadleaf Commerce features a configurable and flexible asset server that provides fine-grain control over image assets. The asset server provides support for a number of file formats and provides a variety of configurable image effect filter operations that allow customization of visual appearance of served images. The server is also designed for high-performance operation and takes advantage of image caching to avoid repeating the same image operations across multiple requests.

###Supported Formats

While the asset server is capable of serving any binary file, image files are the only type that the asset server supports with filtering. The supported formats are: GIF, JPG, PNG, BMP and WBMP. The request caching feature is available for all files, image or not.

###Filter Operations Supported Out-Of-The-Box

The following filter operations are supported directly by Broadleaf Commerce:

1. Alter HSB - Change the color components of an image using the Hue/Saturation/Brightness color space
2. Alter RGB - Change the color components of an image using the standard Red/Green/Blue color space
3. Auto Levels RGB - Fix tonal range problems by equally distributing the tones from black to white (similar to auto-levels feature of Photoshop)
4. Crop - Perform a crop of a rectangular portion of the original image
5. Gaussian Blur - Add a blurring effect to the image
6. Resize - Increase or decrease the dimensions of the original image
7. Rotate - Rotate the image around a center axis any degree amount
8. Unsharp Mask - Add a high-quality sharpening effect to an image

###Working With An Asset

Assets are generally introduced into the system via the asset tab (part of the CMS module) in the Broadleaf Commerce admin tool. Once uploaded, assets are available for reference from anywhere in your Broadleaf Commerce implementation. This means you can refer to uploaded assets for your product and category media, in CMS managed structured content and pages, as well as direct url references from other locations - like a JSP page. The only important part is how the URL that references your image asset is structured, since information in this url is used by the asset server to retrieve (and in the case of images - manipulate) your uploaded files.

###URL Structure

By default, Broadleaf Commerce is configured to look for any url that contains an internal prefix (i.e. /cmsstatic/) somewhere in the request. Usage of this keyword is interpreted by the system as a request for a static asset, and is therefore routed to the asset server. Note, the "cmsstatic" value can be changed to another keyword if desired by editing the runtime environment value for the key "asset.server.url.prefix.internal". Please refer to the Runtime Environment Configuration documentation for more information.

The other key facet of the url that is required to retrieve an asset is the fullUrl property for the asset itself. When uploading an asset in the admin tool, the fullUrl field is made available for editing and you may enter any value that makes sense for your new asset. Note, if you leave the fullUrl value blank, the asset name from the file system on your computer will be used to deduce a fullUrl value.

When combined together, the internal prefix and the fullUrl form a URL capable of engaging the asset server and causing retrieval of the requested item. Here is a sample URL for retrieving an image called "test.jpg" from the asset server:

```text
http://localhost:8080/broadleafdemo/cmsstatic/test.jpg
```

**It is important to note that the internal prefix does not have to appear directly after your web context name.** In fact, it can be buried any level below the context name. This makes referencing assets easy, as you never have to worry about relative urls in your site or how deeply nested your current page is when you want to access the asset.

###Specifying Filter Effects

So far, we know how to reference an asset with a URL and receive back a version of the image that is identical to what was originally uploaded. But what if we want to tweak the image in some way - perhaps crop or rotate the image? This is achieved by specifying additional filter operations on the asset request URL. Filter request operations take the following form:

```text
[filter key]-[filter parameter]=[filter value]
```

By appending filter operations as request query parameters to the asset URL, we can identify an ordered list of operations for the asset server to perform on the image asset. Let's take a look at a few examples:

```text
http://localhost:8080/broadleafdemo/cmsstatic/test.jpg?rotate-rotate-amount=90
```

This example will rotate the image 90 degrees by calling on the filter whose key is "rotate" and pass a value of 90 to that filter's "rotate-amount" parameter. Here's a more complicated example:

```text
http://localhost:8080/broadleafdemo/cmsstatic/test.jpg?crop-x-amount=0&crop-y-amount=0&crop-width-amount=10&crop-height-amount=10
```

This example requires several parameters to achieve the full result, which is to crop the image to a specified, rectangular portion. Here, the crop will start in the upper left corner of the image and will span 10 pixels in width and height from that corner.

If the filter has no parameters, the filter key can be safely appended to the URL querystring without the filter parameter and filter value components:

```text
http://localhost:8080/broadleafdemo/cmsstatic/test.jpg?auto-levels-rgb
```

There are set parameters required for each of the different filter effects provided by Broadleaf Commerce. Please refer to the table below for a reference of the filters and parameters offered.

| Filter Key      | Filter Param       | Definition                                                                                                          | Default        |
| :---------------| :------------------| :-------------------------------------------------------------------------------------------------------------------| :--------------|
| alterhsb        | hue-amount         | The Float amount multiplier used to adjust the Hue component of the colorspace                                      |                |
|                 | saturation-amount  | The Float amount multiplier used to adjust the Saturation component of the colorspace                               |                |
|                 | brightness-amount  | The Float amount multiplier used to adjust the Brightness component of the colorspace                               |                |
| alterrgb        | red-amount         | The positive or negative Integer amount to add to the Red component of the colorspace                               |                |
|                 | green-amount       | The positive or negative Integer amount to add to the Green component of the colorspace                             |                |
|                 | blue-amount        | The positive or negative Integer amount to add to the Blue component of the colorspace                              |                |
| autolevelsrgb   | n/a                |                                                                                                                     |                |
| crop            | x-amount           | The positive Integer amount for the crop region starting point on the horizontal axis                               |                | 
|                 | y-amount           | The positive Integer amount for the crop region starting point on the vertical axis                                 |                |
|                 | width-amount       | The positive Integer amount for the width in pixels of the cropping region                                          |                |
|                 | height-amount      | The positive Integer amount for the height in pixels of the cropping region                                         |                | 
| gaussianblur    | kernel-size-amount | An Integer amount from 1 to 16 - this is one of two levers to tweak to increase the effect - try a value of 16 to start |            |
|                 | num-passes-amount  | An Integer amount greater than or equal to 1 that specifies the number of times the effect should be rendered using the current kernel size - more passes will increase the effect - try a value of 2 to start |          |
| resize          | width-amount       | The positive Integer value for the destination width for the resize effect                                          |                |
|                 | height-amount      | The positive Integer value for the destination height for the resize effect                                         |                |
|                 | high-quality       | true or false value specifying whether or not a high-quality resize should be attempted - high quality resize algorithms make multiple resize passes, rather than resizing the image in a single pass |  false   | 
|                 | maintain-aspect-ratio | true or false value specifying whether or not the original aspect ratio of the image is kept during the resize   | false          |
|                 | reduce-only        | true or false value specifying whether or not the resize should be allowed if the original image is smaller than the specified width and height amounts - this is useful for creating image thumbnails for a list of images of varying sizes | false       | 
| rotate          |  rotate-amount     | The Double value in degrees by which the image should be rotated                                                    |                |
| unsharpmask     | radius-amount      | An Integer amount from 1 to 16 used to define the scope of the effect - try a value of 7 to start                   |                | 
|                 | value-amount       | A positive Float value that describes the intensity of the effect - try a value of 3 to start                       |                |
 
##Named Operations

To achieve complex effects (or even simple effects, for that matter), using the approach described above can lead to some very complex and long URLs. Because of this, we have provided a feature that allows you to bundle up a list of filter operations under a single name, which you can use instead in your asset request URL. Before you can refer to the named operation in your URL, you first must configure it in your Spring application context.

###Configuring Named Operations

Named Operations are managed out-of-the-box in Broadleaf Commerce by the blStaticMapNamedOperationComponent bean. This bean is configured with a map of names to another map of filter operation parameters. Take a look at the default named operations defined in Broadleaf Commerce for use by the admin:

```xml
<bean id="blStaticMapNamedOperationComponent" class="org.broadleafcommerce.cms.file.service.operation.StaticMapNamedOperationComponent">
    <property name="namedOperations">
        <map>
            <entry key="smallAdminThumbnail">
                <map>
                    <entry key="resize-width-amount" value="20"/>
                    <entry key="resize-height-amount" value="20"/>
                    <entry key="resize-high-quality" value="false"/>
                    <entry key="resize-maintain-aspect-ratio" value="true"/>
                    <entry key="resize-reduce-only" value="true"/>
                </map>
            </entry>
            <entry key="largeAdminThumbnail">
                <map>
                    <entry key="resize-width-amount" value="60"/>
                    <entry key="resize-height-amount" value="60"/>
                    <entry key="resize-high-quality" value="false"/>
                    <entry key="resize-maintain-aspect-ratio" value="true"/>
                    <entry key="resize-reduce-only" value="true"/>
                </map>
            </entry>
        </map>
    </property>
</bean>
```

Here, in the config for blStaticMapNamedOperationComponent, we have defined two named operations that consolidate a number of resize parameters (we use these to generate the image thumbnails you see in the asset view in the admin tool). As a result, the asset request URL for the second entry, for example, is greatly shortened to something like:

```text
http://localhost:8080/broadleafdemo/cmsstatic/test.jpg?largeAdminThumbnail
```

##Adding Your Own Named Operation

blStaticMapNamedOperationComponent is managed as part of the Broadleaf Commerce merge process. This means that you can safely specify your own named operation for this bean without having to worry about repeating the definitions for the already defined internal Broadleaf Commerce named operations. In your own application context, you would merely define this bean and declare your own named operations. Here's an example named operation that uses the cropping example from earlier:

```xml
<bean id="blStaticMapNamedOperationComponent" class="org.broadleafcommerce.cms.file.service.operation.StaticMapNamedOperationComponent">
    <property name="namedOperations">
        <map>
            <entry key="myCrop">
                <map>
                    <entry key="crop-x-amount" value="0"/>
                    <entry key="crop-y-amount" value="0"/>
                    <entry key="crop-width-amount" value="10"/>
                    <entry key="crop-height-amount" value="10"/>
                </map>
            </entry>
        </map>
    </property>
</bean>
```

Your declared filter parameters need not be limited to a single filter. Just like before, you may declare as many filter operations as you like and they will be executed in order by the asset server.

Moreover, you can nest named operations inside other named operations. This provides a lot of flexibility when it comes to declaring base named operations and then tweaking those operations inside other named operations. Here's a sample of what that would look like:

```xml
<bean id="blStaticMapNamedOperationComponent" class="org.broadleafcommerce.cms.file.service.operation.StaticMapNamedOperationComponent">
    <property name="namedOperations">
        <map>
            <entry key="myCrop">
                <map>
                    <entry key="crop-x-amount" value="0"/>
                    <entry key="crop-y-amount" value="0"/>
                    <entry key="crop-width-amount" value="10"/>
                    <entry key="crop-height-amount" value="10"/>
                </map>
            </entry>
            <entry key="myCropAndBlur">
                <map>
                    <entry key="myCrop" value=""/>
                    <entry key="gaussianblur-kernel-size-amount" value="16"/>
                    <entry key="gaussianblur-num-passes-amount" value="2"/>
                </map>
            </entry>
        </map>
    </property>
</bean>
```

Finally, you can mix named operations and explicit filter operations directly in the URL. Any explicit filter operations declared in the URL will override any of the same filter operations declared in a named operation. Here's an example URL where we override an operation from the "myCropAndBlur" named operation we created above:

```text
http://localhost:8080/broadleafdemo/cmsstatic/test.jpg?myCropAndBlur&gaussianblur-num-passes-amount=5
```

##Advanced Usage

###Adding Your Own Named Operation Component

Broadleaf Commerce offers blStaticMapNamedOperationComponent which is an instance of StaticMapNamedOperationComponent. As discussed, this class provides named operations through a static map defined in the Spring application context. However, it is possible to provide a different implementation that manages named operations. In fact, several named operations components may be specified, each contributing named operation values, if desired. This can be useful if you would like to manage named operations outside of Spring, for example, using an administrative interface backed by a database. The only requirement for a named operation component is that is implement the NamedOperationComponent interface.

All named operation components are registered with the named operation manager. In your own application context, you may specify your custom named operation component as follows:

```xml
<bean id="blNamedOperationManager" class="org.broadleafcommerce.cms.file.service.operation.NamedOperationManagerImpl">
    <property name="namedOperationComponents">
        <list>
            <ref bean="blStaticMapNamedOperationComponent"/>
            <ref bean="myNamedOperationComponent"/>
        </list>
    </property>
</bean>
```

In this sample, myNamedOperationComponent is a reference to a bean that you have declared for your own NamedOperationComponent instance. Note, blNamedOperationManager is not included in the Broadleaf Commerce merge process, so if you want to continue to use the blStaticMapNamedOperationComponent in addition to your own component, then you must declare along with your component.

###Adding Your Own Image Filter

Additional filters may be custom coded and added to the image server. Filters have the following requirements:

1. Filters must extend BaseFilter
2. Filters will need to provide implementations of the buildOperation and filter methods as demanded by the BufferedImageOp and OperationBuilder interfaces
3. Filters should provide a public constructor that accepts the required parameters for the filter to function - RenderingHints should always be the last parameter of the constructor

Refer to source of any of the existing Broadleaf Commerce image filters in the org.broadleafcommerce.openadmin.server.service.artifact.image.effects.chain.filter package for inspiration.

For your filter to be recognized by the system, you must declare it in your Spring application context. Here is an example declaration:

```xml
<bean id="blImageEffectsManager" class="org.broadleafcommerce.openadmin.server.service.artifact.image.effects.chain.EffectsManager">
    <property name="filters">
        <map>
            <entry key="myFilter">
                <bean class="com.mycompany.MyFilter"/>
            </entry>
        </map>
    </property>
</bean>
```

No need to worry about not declaring the existing Broadleaf Commerce image filters. Your declaration will not overwrite the existing filters and they will continue to be available, in addition to your new filter.
