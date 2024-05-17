import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, todolistsActions, todolistsThunks } from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/Todolist/Task/model/tasks.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistsList/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/Todolist/Task/model/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/model/todolists.selectors";
import { TaskStatuses } from "common/enums";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = todolistsThunks.fetchTodolists();
    dispatch(thunk);
  }, []);

  const removeTask = useCallback(function (id: string, todolistId: string) {
    const thunk = tasksThunks.removeTask({ taskId: id, todolistId: todolistId });
    dispatch(thunk);
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    const thunk = tasksThunks.addTask({ title, todolistId });
    dispatch(thunk);
  }, []);

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const thunk = tasksThunks.updateTask({ taskId: id, domainModel: { status }, todolistId: todolistId });
    dispatch(thunk);
  }, []);

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    //const thunk = updateTaskTC(id, { title: newTitle }, todolistId);
    const thunk = tasksThunks.updateTask({ taskId: id, domainModel: { title: newTitle }, todolistId: todolistId });
    dispatch(thunk);
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    const thunk = todolistsThunks.removeTodolist({ id });
    dispatch(thunk);
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const thunk = todolistsThunks.changeTodolistTitle({ id, title });
    dispatch(thunk);
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = todolistsThunks.addTodolist({ title });
      dispatch(thunk);
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
