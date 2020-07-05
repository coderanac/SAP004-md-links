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

## Usage

<b>Path</b> receive file or folder for search the links.
<i>Exemple:</i>

~~~
md-link myFolder/README.MD
~~~

~~~
md-link README.MD
~~~

## Options
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
