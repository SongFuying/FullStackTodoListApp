import React from 'react'

import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function HomePage() {
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-between space-y-2 px-12 pb-2 pt-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome Back Master!
            </h2>
            <p className="text-muted-foreground">
              Here's the list of your TodoTask
            </p>
          </div>
        </div>

        <div className="w-full px-12 py-8">
          <TodoForm />
        </div>
        <div className="w-full px-12 py-2">
          <TodoList />
        </div>
      </div>
    </>
  )
}
