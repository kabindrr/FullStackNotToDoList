import express from "express";

import {
  delteTask,
  getTasks,
  insertTask,
  updateTask,
} from "../models/task/TaskModel.js";
const router = express.Router();

//controllers

//get data
router.get("/", async (req, res) => {
  try {
    //db query to get the data
    const tasks = await getTasks();
    res.json({
      status: "success",
      message: "Here are the tasks",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      tasks,
    });
  }
});

//Post data
router.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New task has been added",
        })
      : res.json({
          status: "error",
          message: "Failed to add new data",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

//update task
router.patch("/", async (req, res) => {
  try {
    const result = await updateTask(req.body);

    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "Your task has been updated",
        })
      : res.json({
          status: "error",
          message: "No change made in the db, may be invalid data request",
        });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong, try again later.",
    });
  }
});
//delete task
router.delete("/", async (req, res) => {
  try {
    const result = await delteTask(req.body);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: "Your task has been Deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete, try again later",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong, try again later.",
    });
  }
});

export default router;
