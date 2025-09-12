

const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve("Operation was successful!");
    } else {
        reject("Operation failed.")
    }
    });

    myPromise
    .then((result) => {
    console.log(result);
    })

    .catch((error) => {
        console.error(error);
    });

    const myAsyncFunction = async () => {
        try {
            const result = await myPromise;
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetxhing data:", error)
        }
        };
    
async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const data = await response.json();
    console.log(data);
}

getData();
