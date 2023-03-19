const getTasksXHR = () => new Promise( (resolve, reject) => {
    url = "https://intership-liga.ru/tasks"
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);
    xhr.send();
})

const getTasksFetch = async () => await fetch("https://intership-liga.ru/tasks", {
    method: "GET"
})

const getTasks = async () => {
    console.log("GET /tasks")

    try {
        const res = await getTasksXHR()
        console.log("XHR loaded!")
        console.log(JSON.parse(res))
    } catch (err) {
        console.log("XHR error!")
        console.log("Status:", err)
    }
    
    try {
        const res = await (await getTasksFetch()).json()
        console.log("Fetch loaded!")
        console.log(res)
    } catch (err) {
        console.log("Fetch error!")
        console.log("Status:", err)
    }
}


const postTasksXHR = () => new Promise( (resolve, reject) => {
    url = "https://intership-liga.ru/tasks"
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);
    xhr.send(JSON.stringify({
        "name": "Nick",
        "info": "some info",
        "isImportant": false
    }));
})

const postTasksFetch = async () => await fetch("https://intership-liga.ru/tasks", {
    method: "POST",
    body: JSON.stringify({
        "name": "Nick",
        "info": "some info",
        "isImportant": false
    }),
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const postTasks = async () => {
    console.log("POST /tasks")
    let resultId
    try {
        const res = await postTasksXHR()
        resultId = JSON.parse(res).id
        console.log("XHR loaded!")
        console.log(JSON.parse(res))
    } catch (err) {
        console.log("XHR error!")
        console.log("Status:", err)
    }
    
    try {
        const res = await (await postTasksFetch()).json()
        console.log("Fetch loaded!")
        console.log(res)
    } catch (err) {
        console.log("Fetch error!")
        console.log("Status:", err)
    }

    return resultId
}


const getTaskIdXHR = (id) => new Promise( (resolve, reject) => {
    url = "https://intership-liga.ru/tasks/" + id
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);
    xhr.send();
})

const getTaskIdFetch = async (id) => await fetch("https://intership-liga.ru/tasks/" + id, {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const getTaskId = async (id) => {
    console.log("GET /tasks/{id}")

    try {
        const res = await getTaskIdXHR(id)
        console.log("XHR loaded!")
        console.log(JSON.parse(res))
    } catch (err) {
        console.log("XHR error!")
        console.log("Status:", err)
    }
    
    try {
        const res = await (await getTaskIdFetch(id)).json()
        console.log("Fetch loaded!")
        console.log(res)
    } catch (err) {
        console.log("Fetch error!")
        console.log("Status:", err)
    }
}


const patchTaskIdXHR = (id) => new Promise( (resolve, reject) => {
    url = "https://intership-liga.ru/tasks/" + id
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', url, true);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);
    xhr.send(JSON.stringify({
        "name": "Nick 111",
        "info": "some info 123",
        "isImportant": false
    }));
})

const patchTaskIdFetch = async (id) => await fetch("https://intership-liga.ru/tasks/" + id, {
    method: 'PATCH',
    body: JSON.stringify({
        "name": "Nick 123",
        "info": "some info",
        "isImportant": true
    }),
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const patchTaskId = async (id) => {
    console.log("PATCH /tasks/{id}")

    try {
        const res = await patchTaskIdXHR(id)
        console.log("XHR loaded!")
        console.log(JSON.parse(res))
    } catch (err) {
        console.log("XHR error!")
        console.log("Status:", err)
    }
    
    try {
        const res = await (await patchTaskIdFetch(id)).json()
        console.log("Fetch loaded!")
        console.log(res)
    } catch (err) {
        console.log("Fetch error!")
        console.log("Status:", err)
    }
}


const deleteTaskIdXHR = (id) => new Promise( (resolve, reject) => {
    url = "https://intership-liga.ru/tasks/" + id
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);
    xhr.send();
})

const deleteTaskIdFetch = async (id) => await fetch("https://intership-liga.ru/tasks/" + id, {
    method: 'DELETE',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const deleteTaskId = async (id) => {
    console.log("DELETE /tasks/{id}")

    try {
        const res = await deleteTaskIdXHR(id)
        console.log("XHR loaded!")
        console.log(JSON.parse(res))
    } catch (err) {
        console.log("XHR error!")
        console.log("Status:", err)
    }
    
    try {
        const res = await (await deleteTaskIdFetch(id + 1)).json()
        console.log("Fetch loaded!")
        console.log(res)
    } catch (err) {
        console.log("Fetch error!")
        console.log("Status:", err)
    }
}

const runAll = async () => {
    await getTasks()
    console.log("------------------")

    const resultId = await postTasks()
    console.log(resultId)
    console.log("------------------")

    await getTaskId(resultId)
    console.log("------------------")

    await patchTaskId(resultId)
    console.log("------------------")

    await deleteTaskId(resultId)
}
runAll()


const btn = document.getElementById("btn")
const img = document.getElementById("img")
btn.addEventListener("click", async (e) => {
    try {
        const res = await(await fetch("https://dog.ceo/api/breeds/image/random")).json()
        img.src = res.message
        img.style.visibility = "visible"
    } catch (err) {
        console.log("Error fetching a dog", err)
        img.style.visibility = "hidden"
    }
})