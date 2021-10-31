import produce from "immer";
import React, { useRef, useCallback, useState } from "react";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    // Without Immer
    // setForm({
    //   ...form,
    //   [name]: [value],
    // });

    //  With Immer
    // setForm(
    //   produce(form, (draft) => {
    //     draft[name] = value;
    //   })
    // );

    // Immer and useState
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      // Without Immer
      // setData({
      //   ...data,
      //   array: data.array.concat(info),
      // });

      // Immer
      // setData(
      //   produce(data, (draft) => {
      //     draft.array.push(info);
      //   })
      // );
      // Immer and useState
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );

      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [form.name, form.username]
  );

  const onRemove = useCallback((id) => {
    // Without Immer
    // setData({
    //   ...data,
    //   array: data.array.filter((info) => info.id !== id),
    // });

    // Immer
    // setData(
    //   produce(data, (draft) => {
    //     draft.array.splice(
    //       draft.array.findIndex((info) => info.id === id),
    //       1
    //     );
    //   })
    // );

    //Immer and useState
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="ID"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
