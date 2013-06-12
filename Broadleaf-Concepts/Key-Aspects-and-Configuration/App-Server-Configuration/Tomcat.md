# Tomcat

This is extremely similar to the current configuration in Jetty. In site/pom.xml you will see the following plugin defined for Jetty:

```xml
<plugin>
    <groupId>org.mortbay.jetty</groupId>
    <artifactId>maven-jetty-plugin</artifactId>
    <version>6.1.22</version>
    <configuration>
        <webAppSourceDirectory>${webappDirectory}</webAppSourceDirectory>
        <contextPath>/mycompany</contextPath>
        <stopPort>9966</stopPort>
        <stopKey>foo</stopKey>
        <connectors>
            <connector implementation="org.mortbay.jetty.nio.SelectChannelConnector">
                <port>8080</port>
                <maxIdleTime>60000</maxIdleTime>
            </connector>
        </connectors>
    </configuration>
</plugin>
```

You can either replace this plugin or just add an additional plugin below:

```xml
<plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <!-- for Tomcat 7, change to tomcat7-maven-plugin -->
    <artifactId>tomcat6-maven-plugin</artifactId>
    <version>2.0-beta-1</version>
    <configuration>
        <path>/mycompany</path>
        <warSourceDirectory>${webappDirectory}</warSourceDirectory>
        <port>8080</port>
    </configuration>
</plugin>
```

You can then optionally modify build.xml to add a new ant task for this:

```xml
<target name="tomcat-demo" depends="start-db">
    <delete dir="war/WEB-INF/lib"/>
    <artifact:mvn mavenHome="${maven.home}" fork="true" jvmargs="-DbroadleafCoreDirectory=${broadleafCoreDirectory} -DbroadleafWorkspaceDirectory=${broadleafWorkspaceDirectory} -XX:MaxPermSize=256M -Xmx512M">
        <arg value="compile"/>
        <arg value="war:exploded"/>
        <arg value="tomcat6:run-war"/>
    </artifact:mvn>
</target>
```

For admin, the configuration is similar but you would change the ```port``` to ```8081```. For more information on this plugin, check out the [plugin documentation](http://tomcat.apache.org/maven-plugin-2.0-SNAPSHOT/run-mojo-features.html).
