<h1 align="center">Markdown Links</h1>

<img src="https://github.com/coderanac/SAP004-md-links/blob/master/assets-readme/render1593977676519.gif" width="100%" />

##  Instalation

```
npm instal --global https://github.com/coderanac/SAP004-md-links
```

##  Runner command

```
md-link [path] [options]
```
<p align="center">
  <img src="https://github.com/coderanac/SAP004-md-links/blob/master/assets-readme/carbon.png" />
</p>

## Usage in CLI

<b>Path</b> receive file or folder for search the links.
<i>Exemple:</i>

~~~
md-link myFolder/README.MD
~~~

~~~
md-link README.MD
~~~

### Options
`--validate` - this command validates the links.

~~~
md-link README.MD --validate
~~~
</br>

`--stats` - this command brings statistics about the links: how many are there and how many are unique.

~~~
md-link README.MD --stats
~~~
</br>

`--validate --stats` - this command brings statistics about validated links: how many are there and how many are unique, how many are broken or ok.

~~~
md-link README.MD --validate --stats
~~~

## Usage as API

<p align="center">
  <img src="https://github.com/coderanac/SAP004-md-links/blob/master/assets-readme/screenshot-mdlink-api.png" />
</p>

### Step by step

1 - Make a package require

~~~
const md = require('md-link');
~~~

2 - Choose the method you want to use.

## Reference API

We offer two: one that lists the links and the other that lists and validates.
<br/>

`getLinks` is a function that takes a `path` and returns an array of objects. This object has a link, title and file path.
</br>

`Path {STRING}` path receives a string that must have the path to a folder or file.
</br>

*You don't need the absolute path, the API solves the path.*
</br>

This command returns a list of the links found.

~~~
md.getLinks('README.MD');
~~~
<br/>

`getLinksWithValidation` is a function that takes a `path`. If the path is just a file it returns a promise, but if the path is just a folder it returns an array of promises.
</br>

`Path {STRING}` path receives a string that must have the path to a folder or file.
</br>

*You don't need the absolute path, the API solves the path.*
</br>

*When passing a folder, before resolving the promise you must go through the array and resolve each return*
</br>

This command returns a promise with the list of validated links. To handle the return, just do a then and log the response.

~~~
md.getLinksWithValidation('README.md')
~~~
