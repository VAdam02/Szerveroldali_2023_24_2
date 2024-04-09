const {readdir : readDir, readFile, writeFile} = require('fs/promises');

readDir("./files")
.then(names => {
    console.log(names);

    let output = [];
    let promises = [];    

    for (const name of names) {
        promises.push(
            readFile("./files/" + name, {encoding: 'utf-8'})
            .then(file => {
                output.push(file);
                console.log(file);
            })
        )
    }

    Promise.all(promises)
    .then(() => {
        writeFile('./concat.txt', output.join('\n'))
        .then(() => {
            console.log('finished');
        });
    })
})