Broadleaf follows a paradigm that is very similar to the [popular nvie model](http://nvie.com/posts/a-successful-git-branching-model/) for managing our code in GitHub.

The `master` branch will always represent the latest GA release. We never check code directly into the master branch -- code changes in master are always the result of a merge from somewhere else.

The `develop` branch is what we generally work on day to day and holds the latest code. Naturally, it is very possible that this branch is unstable -- we do not generally recommend basing any Broadleaf projects off of the develop branch.

We also have support branches, which generally take the form `BroadleafCommerce-2.0.0-M1-x`. For example, this branch always contains exactly what can be found in the latest M1-x release. These branches are generally considered relatively stable and are released either when we have a new feature to be tested by the community or bug fixes.

Finally, we have feature branches, which do not necessarily adhere to any specific naming strategy. These are typically only used when several of us need to collaborae on a large feature that may disrupt code in the develop branch.
