# IndexedDB
I finally got indexedDB to work!!!!!

## Introduction

IDB.js is an easy to use object that allows for local storage (not using localStorage) of large objects. It simplifies many of the "quirks" of indexedDB and operates somewhat like localStorage. It's not very flexible or effecient, but compensates for that shortcoming with raw simplicity. Please note that the IDB.get() function returns a promise and so be called from an async function as described below.

## Examples

### Save the information to the indexedDB database

**Example1:** ```IDB.set("StringToSave","Here is a very long string");```
**Example2:** ```IDB.set("ObjectToSave",{id:"4a640a26-cc87-42b9-bdce-79fs98b18f41",createdAt:null,somethingElse:"value",otherThings:[0,1,2,3,4,5,6,7,8,9]});```

### Retrieve the information from the indexedDB database

**Example1:** 
```
async function exampleFN(){
    let str = await IDB.get("StringToSave");
    console.log(str);
}
```

**Example2:**
```
async function exampleFN(){
    let data = await IDB.get("ObjectToSave");
    console.log(data.id, data.createdAt, data.somethingElse, data.otherThings);
}
```

### Remove the information from the indexedDB databse

**Example1:** ```IDB.remove("StringToSave");```
**Example2:** ```IDB.remove("ObjectToSave");```