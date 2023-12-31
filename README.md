# IndexedDB

## Introduction

IDB.js is an easy to use object that allows for local storage (not using localStorage) of large objects. It simplifies many of the "quirks" of indexedDB and operates somewhat like localStorage. It's not very flexible or effecient, but compensates for that shortcoming with raw simplicity. Please note that the IDB.get() function returns a promise and so must be called from an async function as described below.

## Installation

Simply copy and paste the IDB object into your project or do the same with the script below (I promise I'll try to keep the one on my server up to date if anything changes).

```
<script src="https://thorleach.net/IDB.js" type="application/javascript"></script>
```

## Examples

### Save the information to the indexedDB database

**Example1: Save String to IndexedDB** 
```
IDB.set("StringToSave","Here is a very long string");
```

**Example2: Save Object to IndexedDB** 
```
IDB.set("ObjectToSave",{id:"4a640a26-cc87-42b9-bdce-79fs98b18f41",createdAt:null,somethingElse:"value",otherThings:[0,1,2,3,4,5,6,7,8,9]});
```

**Example3: Save Object to IndexedDB** 
```
var exampleObject = {id:"4a640a26-cc87-42b9-bdce-79fs98b18f41",createdAt:null,somethingElse:"value",otherThings:[0,1,2,3,4,5,6,7,8,9]}
IDB.set("ObjectToSave",exampleObject);
```

### Retrieve the information from the indexedDB database

**Example1: Get function with Promise** 
```
async function exampleFN(){
    let str = await IDB.get("StringToSave");
    console.log(str);
}
exampleFN();
```

**Example2: Get function with Promise**
```
async function exampleFN(){
    let data = await IDB.get("ObjectToSave");
    console.log(data.id, data.createdAt, data.somethingElse, data.otherThings);
}
exampleFN();
```

**Example3: Get Function with Callback**
```
function exampleFN(){
    IDB.get("ObjectToSave",function(data){
        console.log(data.id, data.createdAt, data.somethingElse, data.otherThings);
    });
}
exampleFN();
```

### Remove the information from the indexedDB databse

**Example1: Remove Saved String**
```
IDB.remove("StringToSave");
```

**Example2: Remove Saved Object** 
```
IDB.remove("ObjectToSave");
```
