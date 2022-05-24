
**HEAD**

`tail - displays last lines of a file`

**SYNOPSIS**

`tail [-r] [-q] [-c bytes | -n lines] [file ...]`

**DESCRIPTION**

```
tail file
  tail utility displays the last lines of the given file, by default count of lines are 10.
  
tail -n count file
  Output the last counted lines of the file.

tail -c bytes file
  Output the last bytes of the file.

tail -q file1 file2
  Suppresses printing of headers when multiple files are being examined.

tail -r file
  The -r option causes the input to be displayed in reverse order, by line.
```

***
***

**HEAD**

`head - displays first lines of a file`

**SYNOPSIS**

`head [-n lines | -c bytes] [file ...]`

**DESCRIPTION**

```
head file
  head utility displays the first lines of the given file, by default count of lines are 10.
  
head -n count file
  Output the first counted lines of the file.

head -c bytes file
  Output the first bytes of the file.
```