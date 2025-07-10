from typing  import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import services

router = APIRouter()

class Task(BaseModel):
    id: int
    title: str
    description: str

class TaskCreate(BaseModel):
    title: str
    description: str

class DeleteTasksRequest(BaseModel):
    ids: List[int]


@router.get("/getTasks", response_model=list[Task])
def get_tasks():
    tasks = services.get_all_tasks()
    if tasks is None:
        raise HTTPException(status_code=500, detail="Error connecting to DB")
    return tasks

@router.post("/addTask", response_model=Task)
def create_task(task: TaskCreate):
    new_task = services.create_task(task.title, task.description)    
    if new_task is None:
        raise HTTPException(status_code=500, detail="Error creating task")
    return new_task

@router.delete("/deleteTasks")
def delete_tasks(request: DeleteTasksRequest):
    deleted = services.delete_tasks(request.ids)    
    if deleted is None:
        raise HTTPException(status_code=500, detail="Error deleting tasks")
    return {"deleted_ids": request.ids}
