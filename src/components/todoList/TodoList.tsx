import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../redux/tools/TodoSlice";
import scss from "./TodoList.module.scss";
const TodoList = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [valueName, setValueName] = useState("");
  const [valueImg, setValueImg] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImg, setEditImg] = useState("");
  const todos = useAppSelector((state) => state.todo.data);
  console.log(todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  const todoMemo = useMemo(() => todos, [todos]);

  const handleAdd = () => {
    if (valueImg === "" || valueName === "") {
      return null;
    } else {
      const newItems = {
        name: valueName,
        img: valueImg,
      };

      dispatch(postRequest(newItems));
    }
    setValueImg("");
    setValueName("");
    setIsCompleted(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const AddMemo = useMemo(() => handleAdd, [valueImg, valueName]);
  console.log(valueImg, valueName);

  const deleteItems = (id: number) => {
    dispatch(deleteRequest(id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const edit = (item: any) => {
    setEditName(item.name);
    setEditImg(item.img);
    setIsEdit(item._id);
  };

  const saveTodo = (id: number) => {
    dispatch(patchRequest({ id, name: editName, img: editImg }));
    setIsEdit(null);
  };

  return (
    <div>
      {isCompleted ? (
        <>
          <div className={scss.header}>
            <input
              type="text"
              placeholder="Test"
              value={valueName}
              onChange={(e) => setValueName(e.target.value)}
            />
            <input
              type="text"
              placeholder="image"
              value={valueImg}
              onChange={(e) => setValueImg(e.target.value)}
            />
            <button className={scss.button} onClick={AddMemo}>
              Add
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={scss.button}>
            <button onClick={() => setIsCompleted(true)}>open</button>
          </div>
        </>
      )}
      <div className={scss.aside}>
        {todoMemo.map((item) => (
          <div key={item._id}>
            {isEdit === item._id ? (
              <>
                <div className={scss.editStyle}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editImg}
                    onChange={(e) => setEditImg(e.target.value)}
                  />
                  <div className={scss.bar}>
                    <button onClick={() => saveTodo(item._id)}>save</button>
                    <button onClick={() => setIsEdit(null)}>cancel</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={scss.Render}>
                  <p>{item.name}</p>
                  <img src={item.img} alt="image" />
                  <div className={scss.buttons}>
                    <button onClick={() => deleteItems(item._id)}>
                      delete
                    </button>
                    <button onClick={() => edit(item)}>edit</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
