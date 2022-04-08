# countLines

A CLI to count all lines in a directory

## Installation

```
deno install --allow-read --name countLines https://deno.land/x/countlines/mod.ts
```

## Usage

### Count all lines in the current directory

```
countLines .
```

### Ignore empty lines

```
countLines --ignore-empty-lines .
```

### Ignore sub directories

```
countLines --ignore-sub-directories .
```

### Passing an ignore pattern

#### Ignore the .git directory

```
countLines --ignore-pattern "\.git" .
```

#### Ignore more than one directory

Here, we ignore the `.git` and the `cov_profile` directory:

**Attention! If you pass something containing `|`, you have to pass put it in
`'"..."'`**

```
countLines --ignore-pattern '"\.git|cov_profile"' .
```

#### Ignore Typescript files

```
countLines --ignore-pattern "\.ts$" .
```
