const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

//uses of debounc

debounce(()=>{
    console.log('debounce')
},1000)
