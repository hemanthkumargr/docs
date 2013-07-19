In this tutorial, we will walk through creating database schema files and updating existing schema on an upgrade. The ant targets are in the site/build.xml.  Rather than having app create tables on startup, the ant scripts can create a schema, so you can load it manually.  The script can also generate alter table statements after an upgrade.  


# Create sql insert statements
With this method, you will be able to create sql statements from the existing code.
You do not need to have app or the database running.

## Prerequisites
- Configure build.properties, or ~/.build.properties to have the correct database connection and hibernate dialect settings.  These properties are used by ant build script to start up a separate jvm from the main app.
- $project must be compiled. 

##In your terminal
```
cd $project/site
ant build-create-sql

```

At the end of the run,  you'll get a output like so:

``` 
 [startAnt]      [echo] 
 [startAnt]      [echo]     	                         Files exported to target/sql/create
 [startAnt]      [echo]     	                    
 [startAnt] BUILD SUCCESSFUL
 [startAnt] Total time: 1 minute 13 seconds
 ```

For windows users, you may get some spurious warnings, but will finish eventually.

The files created will be in  $project/site/target/sql/create:

```
#in your terminal
ls $project/site/target/sql/create
total 232
-rw-r--r--  1 priyesh  staff  109502 Jul 15 10:43 MySQL5InnoDBDialect_blPU.sql
-rw-r--r--  1 priyesh  staff    1032 Jul 15 10:43 MySQL5InnoDBDialect_blSecurePU.sql
-rw-r--r--  1 priyesh  staff     367 Jul 15 10:43 MySQL5InnoDBDialect_blCMSStorage.sql
drwxr-xr-x  5 priyesh  staff     170 Jul 15 10:43 .
drwxr-xr-x  4 priyesh  staff     136 Jul 15 11:25 ..
```

When you load the above three sql files in the same database, you might get duplicate table errors, but you can safely ignore them. 

#	.
# Alter Statement creation after upgrade

After you upgrade the BLC to a newer version, you might have to create alter table statements.  BLC has has migration notes for major releases at [[fdf sf]], however if you are constantly updating to the SNAPSHOT release, you might want to create your alter statements. 

## Prerequisites
- Configure build.properties, or ~/.build.properties to have the correct database connection and hibernate dialect settings.  These properties are used by ant build script to start up a separate jvm from the main app.
- You will have to have the existing database up and running so the script can generate alter statements. 
- You will also have to update/checkout the application to the latest code.  You may have to update the pom files to get the latest code depending on how you're updating
- $project must be compiled. 


#in your terminal
```

cd $project/site
ant build-update-sql

```

At the end of the run,  you'll get a output like so:

``` 
 [startAnt]      [echo] 
 [startAnt]      [echo]     	                 Files exported to target/sql/update
 [startAnt]      [echo]     	            
 [startAnt] BUILD SUCCESSFUL
 [startAnt] Total time: 41 seconds
 ```

For windows users, you may get some spurious warnings, but will finish eventually.

The files created will be in  $project/site/target/sql/update:
#in your terminal
```
ls $project/site/target/sql/create
total 8
drwxr-xr-x  5 priyeshpatel  staff  170 Jul 15 12:43 ..
-rw-r--r--  1 priyeshpatel  staff    0 Jul 15 12:54 MySQL5InnoDBDialect_blSecurePU.sql
-rw-r--r--  1 priyeshpatel  staff   75 Jul 15 12:54 MySQL5InnoDBDialect_blPU.sql
-rw-r--r--  1 priyeshpatel  staff    0 Jul 15 12:54 MySQL5InnoDBDialect_blCMSStorage.sql
drwxr-xr-x  5 priyeshpatel  staff  170 Jul 15 12:54 .
```



#	.
# Optional Modify Ant script
Most cases you will not have to modify the ant script at all. If you are dependencies on BLC Modules, you will need to modify the ant script slightly to add the java agent in the ant target.
in the Ant targets, build-create-sql and build-update-sql, you will need to uncomment the follwing jvmarg line:

```
<jvmarg value="-javaagent:${spring.instrument.path}"/>
```



