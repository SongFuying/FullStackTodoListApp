import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IState {
  List: IListObj[]
}

export interface IListObj {
  id: number
  Task: string
  Des: string
  StartTime: string
  FinishTime: string
  State: boolean
}

const todoList = create<IState>()(
  persist(
    get => ({
      List: []
    }),
    { name: 'todoList' }
  )
)

export default todoList
