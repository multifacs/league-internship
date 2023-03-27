interface Task {
  name: string;
  info?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  id?: number;
}

const getTasks = async (isImportant?: boolean, nameLike?: string, isCompleted?: boolean): Promise<Task[]> => {
  const params: string[] = [];
  if (isImportant != undefined) params.push(`isImportant=${isImportant}`);
  if (nameLike) params.push(`nameLike=${nameLike}`);
  if (isCompleted != undefined) params.push(`isCompleted=${isCompleted}`);
  const url = 'https://intership-liga.ru/tasks' + (params.length != 0 ? '?' + params.join('&') : '');
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const postTask = async (body: Task): Promise<Task> => {
  const url = 'https://intership-liga.ru/tasks';
  console.log(url);
  const response = await fetch('https://intership-liga.ru/tasks', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const getTaskById = async (id: number | string): Promise<Task[]> => {
  const url = 'https://intership-liga.ru/tasks/' + id;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const patchTaskById = async (id: number | string, body: Task): Promise<Task> => {
  const url = 'https://intership-liga.ru/tasks/' + id;
  console.log(url);
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const deleteTaskById = async (id: number | string): Promise<void> => {
  const url = 'https://intership-liga.ru/tasks/' + id;
  console.log(url);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

const runAll = async (): Promise<void> => {
  console.log('GET /tasks/*params*');
  try {
    const res = await getTasks(false, undefined, true);
    console.log('Fetch loaded!');
    console.log(res);
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
  console.log('------------------');

  console.log('POST /tasks');
  let resultId = 0;
  try {
    const result: Task = await postTask({
      name: 'Nick',
      info: '123',
    });
    console.log('Fetch loaded!');
    if (result.id) {
      resultId = result.id;
      console.log(resultId);
    }
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
  console.log('------------------');

  console.log('GET /tasks/{id}');
  try {
    const res = await getTaskById(resultId);
    console.log('Fetch loaded!');
    console.log(res);
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
  console.log('------------------');

  console.log('PATCH /tasks/{id}');
  try {
    const res = await patchTaskById(resultId, {
      name: 'Nick 123',
      info: 'some info',
      isImportant: true,
    });
    console.log('Fetch loaded!');
    console.log(res);
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
  console.log('------------------');

  console.log('DELETE /tasks/{id}');
  try {
    await deleteTaskById(resultId);
    console.log('Fetch loaded!');
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
};
runAll();
