'use strict';

function asyncTask() {
    return new Promise((resolve, reject) => {

        let randNumber = Math.random();

        //resolve/reject promise after 2 seconds
        setTimeout(() => {
            if (randNumber > 0.5) 
                resolve('Promise resolved ' + randNumber);
           else 
                reject(new Error('Promise rejected ' + randNumber));
        }, 2000);


    });
}


function makeMeLookSync(fnGenerator) {

  function loop(result)  {

    console.log('check if iterator done');
    console.log(result);

    if(!result.done) {
        
        result.value
        .then(res =>
            loop(iterator.next(res))
        )
        .catch(err =>
            loop(iterator.throw(err))
        );

    }

  };
    
  let iterator = fnGenerator();
  loop(iterator.next());
  
};

makeMeLookSync(function* () {

    try {
        let result = yield asyncTask();
        console.log('asyncTask result = ' + result);
    } catch (err) {
        console.log('asyncTask err = ' + err.message);
    }  

});