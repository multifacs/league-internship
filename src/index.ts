// const getTaskId = async (id) => {
//   console.log('GET /tasks/{id}');

//   try {
//     const res = await (
//       await fetch('https://intership-liga.ru/tasks/' + id, {
//         method: 'GET',
//         headers: {
//           'accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       })
//     ).json();
//     console.log('Fetch loaded!');
//     console.log(res);
//   } catch (err) {
//     console.log('Fetch error!');
//     console.log('Status:', err);
//   }
// };

// const patchTaskId = async (id) => {
//   console.log('PATCH /tasks/{id}');

//   try {
//     const res = await (
//       await fetch('https://intership-liga.ru/tasks/' + id, {
//         method: 'PATCH',
//         body: JSON.stringify({
//           'name': 'Nick 123',
//           'info': 'some info',
//           'isImportant': true,
//         }),
//         headers: {
//           'accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       })
//     ).json();
//     console.log('Fetch loaded!');
//     console.log(res);
//   } catch (err) {
//     console.log('Fetch error!');
//     console.log('Status:', err);
//   }
// };

// const deleteTaskId = async (id) => {
//   console.log('DELETE /tasks/{id}');

//   try {
//     const res = await (
//       await fetch('https://intership-liga.ru/tasks/' + (id + 1), {
//         method: 'DELETE',
//         headers: {
//           'accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       })
//     ).json();
//     console.log('Fetch loaded!');
//     console.log(res);
//   } catch (err) {
//     console.log('Fetch error!');
//     console.log('Status:', err);
//   }
// };

interface Task {
  name: string;
  info: string;
  isImportant: boolean;
  id: number;
  isCompleted: boolean;
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
  return await response.json();
};

interface PostBody {
  name: string;
  info: string;
  isImportant?: boolean;
  isCompleted?: boolean;
}

const postTask = async (body: PostBody): Promise<Task> => {
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
  return await response.json();
};

const runAll = async (): Promise<void> => {
  console.log('GET /tasks');
  try {
    const res = await getTasks(false, undefined, true);
    console.log('Fetch loaded!');
    console.log(res);
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
  console.log('------------------');

  let resultId: number;
  try {
    resultId = (
      await postTask({
        name: 'Nick',
        info: '123',
      })
    ).id;
    console.log('Fetch loaded!');
    console.log(resultId);
  } catch (err) {
    console.log('Fetch error!');
    console.log('Status:', err);
  }
  console.log('------------------');

  //   await getTaskId(resultId);
  //   console.log('------------------');

  //   await patchTaskId(resultId);
  //   console.log('------------------');

  //   await deleteTaskId(resultId);
};
runAll();
