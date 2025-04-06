'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import { IListObj } from './Store'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/hooks/use-toast'

export default function TodoList() {
  const queryClient = useQueryClient()

  //LoadingProcess
  const [progress, setProgress] = useState(13)
  const [completingTasks, setCompletingTasks] = useState<Set<number>>(new Set())
  const [deletingTasks, setDeletingTasks] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 200)
    return () => clearTimeout(timer)
  }, [])

  // Time Format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  //GET List
  const {
    data: list,
    error,
    isLoading
  } = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const response = await fetch('/api/getData')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await response.json()
      return result.data
    },
    refetchOnWindowFocus: true, // 窗口获得焦点时重新获取
    refetchOnMount: true, // 组件挂载时重新获取
    staleTime: 0 // 数据立即被视为过期，需要重新获取
  })

  // DELETE mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      setDeletingTasks(prev => new Set(prev).add(id))
      const response = await fetch(`/api/deleteDate?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
      return response.json()
    },
    onSuccess: (_, id) => {
      // 更新单个任务的状态
      queryClient.setQueryData(['getData'], (oldData: IListObj[]) => {
        if (!oldData) return oldData
        return oldData.filter((item: IListObj) => item.id !== id)
      })
      setDeletingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      toast({
        title: 'Success',
        description: 'Task deleted successfully!'
      })
    },
    onError: (error, id) => {
      setDeletingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      toast({
        title: 'Error',
        description: 'Failed to delete task. Please try again.',
        variant: 'destructive'
      })
    }
  })

  // PUT(Finish) mutation
  const finishMutation = useMutation({
    mutationFn: async (id: number) => {
      setCompletingTasks(prev => new Set(prev).add(id))
      const response = await fetch(`/api/putData?id=${id}`, {
        method: 'PUT'
      })
      if (!response.ok) {
        throw new Error('Failed to complete task')
      }
      return response.json()
    },
    onSuccess: (_, id) => {
      // 更新单个任务的状态
      queryClient.setQueryData(['getData'], (oldData: IListObj[]) => {
        if (!oldData) return oldData
        return oldData.map((item: IListObj) =>
          item.id === id
            ? { ...item, State: true, FinishTime: new Date().toISOString() }
            : item
        )
      })
      setCompletingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      toast({
        title: 'Success',
        description: 'Task completed successfully!'
      })
    },
    onError: (error, id) => {
      setCompletingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      toast({
        title: 'Error',
        description: 'Failed to complete task. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleFinish = (id: number) => {
    finishMutation.mutate(id)
  }

  if (isLoading)
    return (
      <div className="flex flex-col space-y-3">
        <div>Loading...</div>
        <Progress value={progress} className="w-[60%]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="w-full grid grid-cols-3 gap-2">
        {list?.map((item: IListObj) => {
          return (
            <Card key={item.id} className="">
              <CardHeader>
                <CardTitle className={item.State ? 'line-through' : ''}>
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {item.Task}
                  </h3>
                </CardTitle>
                <CardDescription className={item.State ? 'line-through' : ''}>
                  {item.Des}
                </CardDescription>
              </CardHeader>
              <CardContent className={item.State ? 'line-through' : ''}>
                <small className="text-sm font-medium leading-none">
                  {item.State
                    ? formatDate(item.FinishTime)
                    : formatDate(item.StartTime)}
                </small>
              </CardContent>
              <CardFooter className="flex justify-end ">
                <Button
                  variant="ghost"
                  onClick={() => handleFinish(item.id)}
                  disabled={completingTasks.has(item.id) || item.State}
                >
                  {completingTasks.has(item.id)
                    ? 'Completing...'
                    : item.State
                      ? 'Completed'
                      : 'Finish'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingTasks.has(item.id)}
                >
                  {deletingTasks.has(item.id) ? 'Deleting...' : 'Delete'}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  )
}
