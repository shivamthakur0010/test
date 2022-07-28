import React, { useState, useEffect } from "react";

const getLocalItems = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [input, setInput] = useState("");
  const [array, setArray] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);

  const handleClick = () => {
    if (!input) {
      alert("please fill the data");
    } else if (input && !toggle) {
      setArray(
        array.map((val) => {
          if (val.id === edit) {
            return { ...val, name: input };
          }
          return val;
        })
      );
      setToggle(true);
      setInput("");
      setEdit(null);
    } else {
      const allItemData = { id: new Date().getTime().toString(), name: input };
      setArray([...array, allItemData]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const updateddata = array.filter((val) => {
      return index !== val.id;
    });
    setArray(updateddata);
  };

  const handleEdit = (id) => {
    let newEditItems = array.find((elem) => {
      return elem.id === id;
    });
    setToggle(false);
    setInput(newEditItems.name);
    setEdit(id);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(array));
  }, [array]);
  return (
    <>
    <h1 className="title">✍  Todo App ✍ </h1>
      <div className="container">
        <div className="input-field">
          <input
            type="text"
            placeholder=" ✍ Add today's task "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {toggle ? (
            <button onClick={handleClick}> + </button>
          ) : (
            <button onClick={handleClick}> ✍ </button>
          )}
        </div>
        <div className="list">
          {array.map((val) => {
            return (
              <>
                <div className="list-item" key={val.id}>
                  <h5 style={{ display: "inline-block" }}>
                    <b>{val.name}</b>
                  </h5>
                  <div className="btn-flex">
                  <button onClick={() => handleEdit(val.id)}> ✍ </button>
                  <button onClick={() => handleDelete(val.id)}> - </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="button">
          <button onClick={() => setArray([])}>Remove All</button>
        </div>
      </div>
    </>
  );
};

export default Todo;
